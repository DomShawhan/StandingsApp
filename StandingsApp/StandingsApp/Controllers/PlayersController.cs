﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using StandingsApp.Models;
using StandingsApp.Models.EF;

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
                var player = await _context.Players.FindAsync(id);

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
        [HttpPut("{id}")]
        public async Task<ActionResult<Player>> PutPlayer(int id, Player player)
        {
            if (id != player.Id)
            {
                return BadRequest();
            }
            try
            {
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
        [HttpPost]
        public async Task<ActionResult<Player>> PostPlayer(Player player)
        {
            try
            { 
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
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeletePlayer(int id)
        {
            try 
            { 
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