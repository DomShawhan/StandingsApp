﻿using Microsoft.AspNetCore.Authorization;
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
    public class LeaguesController : ControllerBase
    {
        private readonly SADbContext _context;

        public LeaguesController(SADbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<League>>> GetLeagues() {
            try
            {
                return await _context.Leagues.Include(l => l.Manager).ToListAsync();
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
        public async Task<ActionResult<League>> GetLeague(int id)
        {
            try
            {
                var league = await _context.Leagues.Include(l => l.Manager).FirstOrDefaultAsync(l => l.Id == id);

                if (league == null)
                {
                    // returns 404 Not Found
                    return NotFound();
                }

                return league;
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
        public async Task<ActionResult<League>> PostLeague(League league)
        {
            try
            {
                int managerId;
                if (!int.TryParse(User.FindFirst("UserId")?.Value, out managerId))
                {
                    return StatusCode(403);
                }
                league.Status = LeagueStatuses.NEW;
                league.ManagerId = managerId;
                league.Manager = null;
                await _context.Leagues.AddAsync(league);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetLeague", new { id = league.Id }, league);
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
        [HttpPost("finalize/{id}")]
        public async Task<ActionResult<League>> PostFinalizeLeague(int id)
        {
            try
            {
                League? league = await _context.Leagues.FirstOrDefaultAsync(l => l.Id == id);
                if (league == null || User.FindFirst("UserId")?.Value != league.ManagerId.ToString())
                {
                    return StatusCode(403);
                }

                league.Status = LeagueStatuses.FINALIZED;
                league.Manager = null;
                _context.Entry(league).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return league;
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
        public async Task<ActionResult<League>> PutLeague(int id, League league)
        {
            if(id != league.Id)
            {
                return BadRequest();
            }
            try
            {
                League? l = await _context.Leagues.FirstOrDefaultAsync(l => l.Id == id);
                if (l == null || User.FindFirst("UserId")?.Value != l.ManagerId.ToString())
                {
                    return StatusCode(403);
                }
                league.Manager = null;
                _context.Entry(league).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return league;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeagueExists(id))
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
        public async Task<ActionResult<bool>> DeleteLeague(int id)
        {
            try
            {
                var league = await _context.Leagues.FirstOrDefaultAsync(u => u.Id == id);
                if(league == null || User.FindFirst("UserId")?.Value != league.ManagerId.ToString())
                {
                    return StatusCode(403);
                }

                _context.Leagues.Remove(league);
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

        private bool LeagueExists(int id)
        {
            return (_context.Leagues?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
