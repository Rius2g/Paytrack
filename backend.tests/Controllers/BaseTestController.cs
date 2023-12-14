using System.Data;
using Microsoft.EntityFrameworkCore; // Add this line
using Microsoft.Extensions.Configuration;
using System.IO;

namespace backend.tests.Controllers
{
    public class BaseTestController
    {
        protected readonly MyDbContext _context;

        public BaseTestController()
        {
            string paytrackDirectory = FindPaytrackDirectory();
            string configFilePath = Path.Combine(paytrackDirectory, "Configs.json");

            IConfiguration config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(configFilePath, optional: false, reloadOnChange: true)
                .Build();

            string? connectionString = config["ConnectionStrings:Azure"];

            var options = new DbContextOptionsBuilder<MyDbContext>()
                .UseSqlServer(connectionString)
                .Options;

            _context = new MyDbContext(options);
        }

        public void PurgeDB()
        {
            _context.Database.ExecuteSqlRaw("DELETE FROM Shifts");
            _context.Database.ExecuteSqlRaw("DELETE FROM Rules");
            _context.Database.ExecuteSqlRaw("DELETE FROM Jobs");
            _context.Database.ExecuteSqlRaw("DELETE FROM Users");

            _context.Database.ExecuteSqlRaw("TRUNCATE TABLE Users;");
            _context.Database.ExecuteSqlRaw("TRUNCATE TABLE Jobs;");
            _context.Database.ExecuteSqlRaw("TRUNCATE TABLE Shifts;");
            _context.Database.ExecuteSqlRaw("TRUNCATE TABLE Rules;");



        }

        public static User MockUser()
        {
            return new User
            {
                Email = "test123@outlook.com",
                Taxrate = 25,
                Password = "test123",
                Currency = "NOK"
            };
        }

        public static Job MockJob()
        {
            return new Job
            {
                jobName = "Test job",
                payRate = 175,
                UiD = 1,
            };
        }

        public static Rules MockRule()
        {
            return new Rules
            {
                JobID = 1,
                Rate = 175,
                UiD = 1,
                RateType = "Hourly",
                RuleType = "Day",
                Day = "Monday",
                jobName = "Test job",
                Start = 0,
                Date = null,
                ID = 1
            };
        }

        public static Shift MockShift()
        {
            return new Shift
            {
                jobbID = 1,
                uiD = 1,
                shiftDate = 20231205,
                shiftStartTime = 1000,
                shiftEndTime = 1200,
                jobName = "Test job",
            };
        }

        private static string FindPaytrackDirectory()
        {
            DirectoryInfo currentDirectory = new DirectoryInfo(Directory.GetCurrentDirectory());
            while (currentDirectory != null && !currentDirectory.Name.Equals("paytrack", StringComparison.OrdinalIgnoreCase))
            {
                if (currentDirectory.Parent == null)
                {
                    throw new InvalidOperationException("Unable to find the '/paytrack/' directory.");
                }
                currentDirectory = currentDirectory.Parent;
            }

            if (currentDirectory == null)
            {
                throw new InvalidOperationException("Unable to find the '/paytrack/' directory.");
            }

            return currentDirectory.FullName;
        }
    }
}