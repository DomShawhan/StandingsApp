using StandingsApp.Utilities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StandingsApp.Models.EF
{
    [Table("Game")]
    public class Game
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int HomeTeamId { get; set; }

        [Required]
        public int AwayTeamId { get; set; }

        public int HomeScore { get; set; }

        public int AwayScore { get; set; }

        public DateTime Scheduled { get; set; }

        public int? WinningTeamId { get; set; }

        public int? LosingTeamId { get; set; }

        [Required, StringLength(15)]
        public string Status { get; set; } = GameStatuses.NEW;

        // navigation properties
        public virtual Team? HomeTeam { get; set; }
        public virtual Team? AwayTeam { get; set; }
    }
}
