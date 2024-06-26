﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using StandingsApp.Models.EF;
using StandingsApp.Models;
using Microsoft.AspNetCore.Authorization;
using StandingsApp.Utilities;

namespace StandingsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController] // converts to and from JSON on API calls
    public class TeamsController : ControllerBase
    {
        private readonly SADbContext _context;

        public TeamsController(SADbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Team>>> GetTeams()
        {
            try
            {
                return await _context.Teams
                    .Include(t => t.League)
                    .Include(t => t.Coach)
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
        public async Task<ActionResult<Team>> GetTeam(int id)
        {
            try
            {
                var team = await _context.Teams
                    .Include(t => t.League)
                    .Include(t => t.Coach)
                    .FirstOrDefaultAsync(g => g.Id == id);

                if (team == null)
                {
                    // returns 404 Not Found
                    return NotFound();
                }

                return team;
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
        public async Task<ActionResult<IEnumerable<Team>>> GetTeamByLeagueId(int leagueid)
        {
            try
            {
                var teams = await _context.Teams
                    .Include(t => t.League)
                    .Include(t => t.Coach)
                    .Where(t => t.LeagueId == leagueid).ToListAsync();

                if (teams == null)
                {
                    // returns 404 Not Found
                    return NotFound();
                }

                return teams;
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
        public async Task<ActionResult<Team>> PostTeam(Team team)
        {
            try
            {
                League? league = await _context.Leagues.Where(l => l.Id == team.Id).FirstOrDefaultAsync();
                if (league == null || User.FindFirst("UserId")?.Value != league.ManagerId.ToString())
                {
                    return StatusCode(403);
                }
                if (league.Status != LeagueStatuses.NEW)
                {
                    return BadRequest();
                }
                team.Coach = null;
                team.League = null;
                await _context.Teams.AddAsync(team);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetTeam", new { id = team.Id }, team);
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
        [HttpPut("{id}")]
        public async Task<ActionResult<Team>> PutTeam(int id, Team team)
        {
            if (id != team.Id)
            {
                return BadRequest();
            }
            try
            {
                League? league = await _context.Leagues.Where(l => l.Id == team.Id).FirstOrDefaultAsync();
                if (league == null || User.FindFirst("UserId")?.Value != league.ManagerId.ToString())
                {
                    return StatusCode(403);
                }
                if (league.Status != LeagueStatuses.NEW)
                {
                    return BadRequest();
                }
                team.Coach = null;
                team.League = null;
                _context.Entry(team).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return team;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamExists(id))
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
        public async Task<ActionResult<bool>> DeleteTeam(int id)
        {
            try
            {
                var team = await _context.Teams.FirstOrDefaultAsync(u => u.Id == id);
                if (team == null)
                {
                    return NotFound();
                }

                League? league = await _context.Leagues.Where(l => l.Id == team.Id).FirstOrDefaultAsync();
                if (league == null || User.FindFirst("UserId")?.Value != league.ManagerId.ToString())
                {
                    return StatusCode(403);
                }

                if(league.Status != LeagueStatuses.NEW)
                {
                    return BadRequest();
                }

                _context.Teams.Remove(team);
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

        private bool TeamExists(int id)
        {
            return (_context.Teams?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
