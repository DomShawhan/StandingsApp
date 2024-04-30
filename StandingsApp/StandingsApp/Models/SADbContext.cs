using Microsoft.EntityFrameworkCore;
using StandingsApp.Models.EF;

namespace StandingsApp.Models
{
    public class SADbContext : DbContext
    {
        public  DbSet<User> Users { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<League> Leagues { get; set; }

        public SADbContext(DbContextOptions<SADbContext> options) : base(options) { }
    }
}
