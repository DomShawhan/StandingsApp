using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StandingsApp.Models.EF
{
    [Table("League")]
    public class League
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Name { get; set; }

        [Required]
        public DateTime BirthdayBefore { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        public int ManagerId { get; set; }

        [Required]
        public string Status { get; set; }

        public virtual User? Manager { get; set; }

    }
}
