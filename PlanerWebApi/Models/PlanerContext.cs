using Microsoft.EntityFrameworkCore;
namespace PlanerWebApi.Models
{
    public class PlanerContext : DbContext
    {
        public DbSet<Planer> Planeri {get; set;}
        public DbSet<Dan> Dani {get; set;}
        public DbSet<Obaveza> Obaveze {get; set;}
        public DbSet<Mesec> Meseci {get; set;}

        public PlanerContext(DbContextOptions options) : base(options)
        {

        }
    }
}