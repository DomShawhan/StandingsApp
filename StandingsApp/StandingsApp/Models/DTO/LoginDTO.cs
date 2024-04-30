using System.ComponentModel.DataAnnotations;

namespace StandingsApp.Models.DTO
{
    public class LoginDTO
    {
        [Required]
        [StringLength(20)]
        public string Username { get; set; }

        [Required]
        [StringLength(70)]
        public string Password { get; set; }
    }
}
