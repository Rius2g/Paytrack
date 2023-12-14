
using System.Data;
using Microsoft.EntityFrameworkCore; // Add this line
using Microsoft.Extensions.Configuration;



namespace backend.tests.Controllers
{
    public class BaseTestController
    {


        protected readonly MyDbContext _context;

        public BaseTestController()
        {
            // Traverse up until you find the /paytrack/ directory
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

            // Construct the path to the Configs.json file
            string configFilePath = Path.Combine(currentDirectory.FullName, "Configs.json");

            // Build configuration
            IConfiguration config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(configFilePath, optional: false, reloadOnChange: true)
                .Build();

            // Get the connection string from Configs.json
            string? connectionString = config["ConnectionStrings:Azure"];

            // Configure DbContextOptions
            var options = new DbContextOptionsBuilder<MyDbContext>()
                .UseSqlServer(connectionString)
                .Options;

            _context = new MyDbContext(options);
        }

        public void PurgeDB() //used for test cleanup
        {
            _context.Database.ExecuteSqlRaw("DELETE FROM Shifts");
            _context.Database.ExecuteSqlRaw("DELETE FROM Rules");
            _context.Database.ExecuteSqlRaw("DELETE FROM Jobs");
            _context.Database.ExecuteSqlRaw("DELETE FROM Users"); 
        }
        public User MockUser()
        {
            User user = new User();

            user.Email = "test123@outlook.com";
            user.Taxrate = 25;
            user.Currency = "NOK";
            user.ID = 1;

            return user;
        }

        public Job MockJob()
        {
            Job job = new Job();

            job.jobName = "Test job";
            job.payRate = 175;
            job.UiD = 1;
            job.ID = 1;

            return job;
        }

        public Rules MockRule()
        {
            Rules rule = new Rules();

            rule.JobID = 1;
            rule.Rate = 175;
            rule.UiD = 1;
            rule.RateType = "Hourly";
            rule.RuleType = "Day";
            rule.Day = "Monday";
            rule.jobName = "Test job";
            rule.Start = 0;
            rule.Date = null;
            rule.ID = 1;


            return rule;
        }

        public Shift MockShift()
        {
            Shift shift = new Shift();

            shift.jobbID = 1;
            shift.uiD = 1;
            shift.shiftDate = 2023125;
            shift.shiftStartTime = 0;
            shift.shiftEndTime = 1;
            shift.jobName = "Test job";
            shift.ID = 1;

            return shift;
        }
    }
}