using System.ComponentModel.DataAnnotations;

namespace StandingsApp.Models.DTO
{
    public class UserDTO
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Username { get; set; }
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
        
        public UserDTO(
            int id,
            string username,
            string firstname,
            string lastname,
            string phone,
            string email,
            bool admin
        )
        {
            Id = id;
            Username = username;
            Firstname = firstname;
            Lastname = lastname;
            Phone = phone;
            Email = email;
            Admin = admin;
        }
    }
}
