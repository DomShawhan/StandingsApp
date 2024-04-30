using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using StandingsApp.Models;
using StandingsApp.Models.DTO;
using StandingsApp.Models.EF;
using StandingsApp.Utilities;
using System.Security.Claims;

namespace StandingsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController] // converts to and from JSON on API calls
    public class UsersController : ControllerBase
    {
        private readonly SADbContext _context;

        public UsersController(SADbContext context)
        {
            _context = context;
        }

        // Get all users
        // returns a list of users if successfull
        // GET: api/Users
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            try
            {
                if(User.FindFirst("Admin")?.Value != "True")
                {
                    return StatusCode(403);
                }
                return await _context.Users.ToListAsync();
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

        // Get user by id
        // returns a single user if successfull
        // GET: api/Users/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            try
            {
                if(User.FindFirst("UserId")?.Value != id.ToString() && User.FindFirst("Admin")?.Value != "True")
                {
                    return StatusCode(403);
                }
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

                if (user == null)
                {
                    // returns 404 Not Found
                    return NotFound();
                }

                return user;
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

        // Insert a new user
        // returns the created user if successfull
        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            try
            {
                user.Salt = SecurePassword.GenerateSalt(18);

                user.Password = SecurePassword.HashPassword(user.Password, user.Salt);

                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUser", new { id = user.Id }, user);
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

        // Login a user
        // Returns the user if successfull
        // POST: /api/users/login
        [HttpPost("login")]
        public async Task<ActionResult> PostLogin(LoginDTO loginInfo)
        {
            try
            {
                // Retrieve the user
                var user = await _context.Users.Where(u => u.Username == loginInfo.Username).FirstOrDefaultAsync();

                if (user == null)
                {
                    return NotFound();
                }
                // Hash the incoming password
                string hashed = SecurePassword.HashPassword(loginInfo.Password, user.Salt);

                if(user.Password == hashed )
                {
                    var claimsIdentity = new ClaimsIdentity(new[]
                        {
                            new Claim(ClaimTypes.Name, user.Username),
                            new Claim("UserId", user.Id.ToString()),
                            new Claim("Admin", user.Admin.ToString())
                        },
                        "Cookies");

                    var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

                    await Request.HttpContext.SignInAsync("Cookies", claimsPrincipal);

                    return Ok(user);
                }
                else
                {
                    return BadRequest();
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

        [HttpGet("logout")]
        public async Task<ActionResult> LogoutUser()
        {
            await Request.HttpContext.SignOutAsync();
            return Ok();
        }

        // Update a user
        // PUT: api/Users/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                // Returns a 400 Bad Request
                return BadRequest();
            }
            try
            {
                if (User.FindFirst("UserId")?.Value != id.ToString() && User.FindFirst("Admin")?.Value != "True")
                {
                    return StatusCode(403);
                }
                _context.Entry(user).State = EntityState.Modified;
                _context.Entry(user).Property(u => u.Password).IsModified = false;
                _context.Entry(user).Property(u => u.Salt).IsModified = false;
                await _context.SaveChangesAsync();
                return user;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // delete a user
        // returns a 204 NoContent code if successfull
        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteUser(int id)
        {
            try
            {
                if (User.FindFirst("UserId")?.Value != id.ToString() && User.FindFirst("Admin")?.Value != "True")
                {
                    return StatusCode(403);
                }
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
                if (user == null)
                {
                    // returns 404 Not Found
                    return NotFound();
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                // returns true
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

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
