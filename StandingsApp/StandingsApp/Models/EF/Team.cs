using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StandingsApp.Models.EF
{
    [Table("Team")]
    public class Team
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CoachId { get; set; }

        [Required]
        [StringLength(75)]
        public string Name { get; set; }

        [Required]
        public int LeagueId { get; set; }

        public virtual User? Coach { get; set; }
        public virtual League? League { get; set; }
    }
}
