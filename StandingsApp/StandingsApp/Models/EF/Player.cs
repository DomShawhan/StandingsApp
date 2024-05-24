using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StandingsApp.Models.EF
{
    [Table("Player")]
    public class Player
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Firstname { get; set; }
        
        [Required]
        public string Lastname { get; set; }

        [Required]
        public DateTime Birthday { get; set; }

        [Required]
        public int TeamId { get; set; }

        public string Bats { get; set; }

        public string Throws { get; set; }
    }
}
