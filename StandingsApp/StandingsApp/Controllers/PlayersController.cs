using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using StandingsApp.Models;
using StandingsApp.Models.EF;
using StandingsApp.Utilities;

namespace StandingsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly SADbContext _context;

        public PlayersController(SADbContext context)
        {
            _context = context;
        }

        // GET: api/Players
        [HttpGet("team/{id}")]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers(int id)
        {
            try 
            { 
                return await _context.Players.Where(p => p.TeamId == id).ToListAsync();
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

        // GET: api/Players/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetPlayer(int id)
        {
            try 
            { 
                var player = await _context.Players.Include(p => p.Team)
                    .ThenInclude(t => t.League)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (player == null)
                {
                    return NotFound();
                }

                return player;
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

        // PUT: api/Players/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Player>> PutPlayer(int id, Player player)
        {
            if (id != player.Id)
            {
                return BadRequest();
            }
            try
            {
                Team? team = await _context.Teams.Where(t => t.Id == player.TeamId).FirstOrDefaultAsync();
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

                player.Team = null;
                _context.Entry(player).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return player;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayerExists(id))
                {
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

        // POST: api/Players
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Player>> PostPlayer(Player player)
        {
            try
            {
                Team? team = await _context.Teams.Where(t => t.Id == player.TeamId).FirstOrDefaultAsync();
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
                player.Team = null;
                _context.Players.Add(player);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetPlayer", new { id = player.Id }, player);
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

        // DELETE: api/Players/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeletePlayer(int id)
        {
            try 
            {
                Team? team = await _context.Teams.Where(t => t.Id == id).FirstOrDefaultAsync();
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
                var player = await _context.Players.FindAsync(id);
                if (player == null)
                {
                    return NotFound();
                }

                _context.Players.Remove(player);
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

        private bool PlayerExists(int id)
        {
            return _context.Players.Any(e => e.Id == id);
        }
    }
}
