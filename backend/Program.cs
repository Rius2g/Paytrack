using Microsoft.EntityFrameworkCore;
using backend.Database;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MyDbContext>(options =>
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

            // Construct the path to the Configs.json file
            string configFilePath = Path.Combine(currentDirectory.FullName, "Configs.json");

            // Build configuration
            IConfiguration config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(configFilePath, optional: false, reloadOnChange: true)
                .Build();

    options.UseSqlServer(config["Azure"]);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(builder => 
{
    builder.WithOrigins("http://localhost:3000")
           .AllowAnyHeader()
           .AllowAnyMethod();
});

app.MapControllers();

app.Run();
