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
        if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
                // Replace {your_username} and {your_password} with actual values
                string connectionString = configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");
                
                optionsBuilder.UseSqlServer(connectionString);
            }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Job>().ToTable("Jobs").HasKey(j => j.ID);
        modelBuilder.Entity<Shift>().ToTable("Shift").HasKey(s => s.ID);
        modelBuilder.Entity<User>().ToTable("Users").HasKey(u => u.ID);
        modelBuilder.Entity<Rules>().ToTable("Rules").HasKey(r => r.ID);
        modelBuilder.Entity<Salts>().ToTable("Salts").HasKey(s => s.ID);
    }
}