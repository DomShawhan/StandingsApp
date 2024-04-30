using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StandingsApp.Models.EF
{
    [Table("User")]
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Username { get; set; }

        [Required]
        [StringLength(70)]
        public string Password { get; set; }

        [StringLength(70)]
        public string? Salt { get; set; }

        [Required]
        [StringLength(20)]
        public string Firstname { get; set; }

        [Required]
        [StringLength(20)]
        public string Lastname { get; set; }

        [Required]
        [StringLength(13)]
        public string Phone { get; set; }

        [Required]
        [StringLength(75)]
        public string Email { get; set; }

        [Required]
        public bool Admin { get; set; }
    }
}
