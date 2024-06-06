using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using StandingsApp.Models;
using StandingsApp.Models.EF;
using StandingsApp.Utilities;
using System.Numerics;

namespace StandingsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly SADbContext _context;

        public GamesController(SADbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            try
            {
                return await _context.Games
                    .Include(g => g.HomeTeam)
                    .Include(g => g.AwayTeam)
                    .ToListAsync();
            }
            catch (MySqlException sqlex)
            {
                //returns 500 Internal Server Error
                return Problem($"SQL Error: {sqlex.Message}");
            }
            catch (Exception ex)
            {
                //returns 500 Internal Server Error
                return Problem(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(int id)
        {
            try
            {
                var game = await _context.Games
                    .Include(g => g.HomeTeam)
                    .Include(g => g.AwayTeam)
                    .FirstOrDefaultAsync(g => g.Id == id);

                if (game == null)
                {
                    // returns 404 Not Found
                    return NotFound();
                }

                return game;
            }
            catch (MySqlException sqlex)
            {
                //returns 500 Internal Server Error
                return Problem($"SQL Error: {sqlex.Message}");
            }
            catch (Exception ex)
            {
                //returns 500 Internal Server Error
                return Problem(ex.Message);
            }
        }

        [HttpGet("league/{leagueid}")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGameByLeagueId(int leagueid)
        {
            try
            {
                var games = await _context.Games
                    .Include(g => g.HomeTeam)
                    .Include(g => g.AwayTeam)
                    .Where(g => g.HomeTeam!.LeagueId == leagueid).ToListAsync();

                if (games == null)
                {
                    // returns 404 Not Found
                    return NotFound();
                }

                return games;
            }
            catch (MySqlException sqlex)
            {
                //returns 500 Internal Server Error
                return Problem($"SQL Error: {sqlex.Message}");
            }
            catch (Exception ex)
            {
                //returns 500 Internal Server Error
                return Problem(ex.Message);
            }
        }

        [HttpGet("team/{teamid}")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGamesByTeamId(int teamid)
        {
            try
            {
                var games = await _context.Games
                    .Include(g => g.HomeTeam)
                    .Include(g => g.AwayTeam)
                    .Where(g => g.HomeTeamId == teamid || g.AwayTeamId == teamid).ToListAsync();

                if (games == null)
                {
                    // returns 404 Not Found
                    return NotFound();
                }

                return games;
            }
            catch (MySqlException sqlex)
            {
                //returns 500 Internal Server Error
                return Problem($"SQL Error: {sqlex.Message}");
            }
            catch (Exception ex)
            {
                //returns 500 Internal Server Error
                return Problem(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Game>> PostGame(Game game)
        {
            try
            {
                Team? team = await _context.Teams.Where(t => t.Id == game.HomeTeamId).FirstOrDefaultAsync();
                if (team == null)
                {
                    return StatusCode(403);
                }
                League? league = await _context.Leagues.Where(l => l.Id == team.Id).FirstOrDefaultAsync();
                if (league == null)
                {
                    return StatusCode(403);
                }
                if (User.FindFirst("UserId")?.Value != team.CoachId.ToString() && User.FindFirst("UserId")?.Value != league.ManagerId.ToString())
                {
                    return StatusCode(403);
                }
                if (league.Status != LeagueStatuses.NEW)
                {
                    return BadRequest();
                }

                game.HomeTeam = null;
                game.AwayTeam = null;

                game.WinningTeamId = null;
                game.LosingTeamId = null;

                game.Status = GameStatuses.NEW;

                await _context.Games.AddAsync(game);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetGame", new { id = game.Id }, game);
            }
            catch (MySqlException sqlex)
            {
                return Problem($"SQL Error: {sqlex.Message}");
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        [Authorize]
        [HttpPost("score/{id}")]
        public async Task<ActionResult<Game>> PostGameScore(int id, [FromBody] Game game)
        {
            if (id != game.Id)
            {
                return BadRequest();
            }
            try
            {
                Team? team = await _context.Teams.Where(t => t.Id == game.HomeTeamId).FirstOrDefaultAsync();
                if (team == null)
                {
                    return StatusCode(403);
                }
                League? league = await _context.Leagues.Where(l => l.Id == team.Id).FirstOrDefaultAsync();
                if (league == null)
                {
                    return StatusCode(403);
                }
                if (User.FindFirst("UserId")?.Value != team.CoachId.ToString() && User.FindFirst("UserId")?.Value != league.ManagerId.ToString())
                {
                    return StatusCode(403);
                }
                if (league.Status != LeagueStatuses.FINALIZED)
                {
                    return BadRequest();
                }

                var gameInDb = await _context.Games.FirstOrDefaultAsync(g => g.Id == id);
                if (gameInDb == null || gameInDb.Status == GameStatuses.COMPLETED)
                {
                    return NotFound();
                }
                gameInDb.AwayScore = game.AwayScore;
                gameInDb.HomeScore = game.HomeScore;
                if(game.AwayScore > game.HomeScore)
                {
                    gameInDb.WinningTeamId = game.AwayTeamId;
                    gameInDb.LosingTeamId = game.HomeTeamId;
                } 
                else if (game.HomeScore > game.AwayScore)
                {
                    gameInDb.LosingTeamId = game.AwayTeamId;
                    gameInDb.WinningTeamId = game.HomeTeamId;
                }

                gameInDb.Status = GameStatuses.COMPLETED;
                _context.Entry(gameInDb).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return gameInDb;
            }
            catch (MySqlException sqlex)
            {
                //returns 500 Internal Server Error
                return Problem($"SQL Error: {sqlex.Message}");
            }
            catch (Exception ex)
            {
                //returns 500 Internal Server Error
                return Problem(ex.Message);
            }
        }
        [Authorize]
        [HttpPost("reschedule/{id}")]
        public async Task<ActionResult<Game>> PostGameReschedule(int id, [FromBody] Game game)
        {
            if (id != game.Id)
            {
                return BadRequest();
            }
            try
            {
                Team? team = await _context.Teams.Where(t => t.Id == game.HomeTeamId).FirstOrDefaultAsync();
                if (team == null)
                {
                    return StatusCode(403);
                }
                League? league = await _context.Leagues.Where(l => l.Id == team.Id).FirstOrDefaultAsync();
                if (league == null)
                {
                    return StatusCode(403);
                }
                if (User.FindFirst("UserId")?.Value != team.CoachId.ToString() && User.FindFirst("UserId")?.Value != league.ManagerId.ToString())
                {
                    return StatusCode(403);
                }
                if (league.Status != LeagueStatuses.FINALIZED)
                {
                    return BadRequest();
                }

                var gameInDb = await _context.Games.FirstOrDefaultAsync(g => g.Id == id);
                if (gameInDb == null || gameInDb.Status == GameStatuses.COMPLETED)
                {
                    return NotFound();
                }
                gameInDb.Scheduled = game.Scheduled;

                gameInDb.Status = GameStatuses.SCHEDULED;
                _context.Entry(gameInDb).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return gameInDb;
            }
            catch (MySqlException sqlex)
            {
                //returns 500 Internal Server Error
                return Problem($"SQL Error: {sqlex.Message}");
            }
            catch (Exception ex)
            {
                //returns 500 Internal Server Error
                return Problem(ex.Message);
            }
        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Game>> PutGame(int id, Game game)
        {
            if (id != game.Id)
            {
                return BadRequest();
            }
            try
            {
                Team? team = await _context.Teams.Where(t => t.Id == game.HomeTeamId).FirstOrDefaultAsync();
                if (team == null)
                {
                    return StatusCode(403);
                }
                League? league = await _context.Leagues.Where(l => l.Id == team.Id).FirstOrDefaultAsync();
                if (league == null)
                {
                    return StatusCode(403);
                }
                if (User.FindFirst("UserId")?.Value != team.CoachId.ToString() && User.FindFirst("UserId")?.Value != league.ManagerId.ToString())
                {
                    return StatusCode(403);
                }
                if (league.Status != LeagueStatuses.NEW)
                {
                    return BadRequest();
                }

                _context.Entry(game).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return game;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(id))
                {
                    // returns 404 Not Found
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (MySqlException sqlex)
            {
                //returns 500 Internal Server Error
                return Problem($"SQL Error: {sqlex.Message}");
            }
            catch (Exception ex)
            {
                //returns 500 Internal Server Error
                return Problem(ex.Message);
            }
        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteGame(int id)
        {
            try
            {
                var game = await _context.Games.FirstOrDefaultAsync(u => u.Id == id);
                if (game == null)
                {
                    return NotFound();
                }

                Team? team = await _context.Teams.Where(t => t.Id == game.HomeTeamId).FirstOrDefaultAsync();
                if (team == null)
                {
                    return StatusCode(403);
                }
                League? league = await _context.Leagues.Where(l => l.Id == team.Id).FirstOrDefaultAsync();
                if (league == null)
                {
                    return StatusCode(403);
                }
                if (User.FindFirst("UserId")?.Value != team.CoachId.ToString() && User.FindFirst("UserId")?.Value != league.ManagerId.ToString())
                {
                    return StatusCode(403);
                }
                if (league.Status != LeagueStatuses.NEW)
                {
                    return BadRequest();
                }

                _context.Games.Remove(game);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (MySqlException sqlex)
            {
                //returns 500 Internal Server Error
                return Problem($"SQL Error: {sqlex.Message}");
            }
            catch (Exception ex)
            {
                //returns 500 Internal Server Error
                return Problem(ex.Message);
            }
        }

        private bool GameExists(int id)
        {
            return (_context.Games?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
