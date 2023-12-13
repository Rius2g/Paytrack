using Microsoft.EntityFrameworkCore;
using backend.Models;


namespace backend.Database
{
    public class MyDbContext: DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Shift> Shifts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Rules> Rules { get; set; }

        public DbSet<Salts> Salts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Job>().ToTable("Jobs").HasKey(j => j.ID);
            modelBuilder.Entity<Shift>().ToTable("Shifts").HasKey(s => s.ID);
            modelBuilder.Entity<User>().ToTable("Users").HasKey(u => u.ID);
            modelBuilder.Entity<Rules>().ToTable("Rules").HasKey(r => r.ID);
            modelBuilder.Entity<Salts>().ToTable("Salts").HasKey(s => s.ID);
        }
    }
}