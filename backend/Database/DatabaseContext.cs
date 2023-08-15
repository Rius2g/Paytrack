using Microsoft.EntityFrameworkCore;
using Paytrack.Models;

public class MyDbContext: DbContext
{

    public DbSet<Job> Jobs { get; set; }
    public DbSet<Shift> Shifts { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Rules> Rules { get; set; }

    public DbSet<Salts> Salts { get; set; }

    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=db.sqlite"); //change to azure server
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Job>().ToTable("Jobs").HasKey(j => j.jobID);
        modelBuilder.Entity<Shift>().ToTable("Shift").HasKey(s => s.shiftID);
        modelBuilder.Entity<User>().ToTable("Users").HasKey(u => u.UiD);
        modelBuilder.Entity<Rules>().ToTable("Rules").HasKey(r => r.RuleID);
        modelBuilder.Entity<Salts>().ToTable("Salts").HasKey(s => s.SaltID);
    }
}