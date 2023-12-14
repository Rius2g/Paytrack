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
            // Configuring the Job entity
            modelBuilder.Entity<Job>()
                .ToTable("Jobs")
                .HasKey(j => j.ID);

            // Configuring the Shift entity and its relationship with Job
            modelBuilder.Entity<Shift>()
                .ToTable("Shifts")
                .HasKey(s => s.ID);
            modelBuilder.Entity<Shift>()
                .HasOne(s => s.job)
                .WithMany()
                .HasForeignKey(s => s.jobbID); // Assuming jobbID is the foreign key

            // Configuring the User entity
            modelBuilder.Entity<User>()
                .ToTable("Users")
                .HasKey(u => u.ID);

            // Configuring the Rules entity
            modelBuilder.Entity<Rules>()
                .ToTable("Rules")
                .HasKey(r => r.ID);

            // Configuring the Salts entity
            modelBuilder.Entity<Salts>()
                .ToTable("Salts")
                .HasKey(s => s.ID);
        }

    }
}