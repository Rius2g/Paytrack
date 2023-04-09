using Dapper;
using Microsoft.Data.Sqlite;

//database setup functions
namespace Paytrack.Database
{
    
    public class DatabaseHostedService : IHostedService
    {
        private readonly DatabaseConfig databaseConfig;

        public DatabaseHostedService(DatabaseConfig databaseConfig)
        {
            this.databaseConfig = databaseConfig;    
        }
        
        //function that creates all tables if they do not exist from before.
        public Task StartAsync(CancellationToken cancellationToken)
        {
            using var connection = new SqliteConnection(databaseConfig.Name);

            connection.Execute(@"
                            CREATE TABLE IF NOT EXISTS Shifts (
                                ShiftId INTEGER PRIMARY KEY AUTOINCREMENT,
                                Start INTEGER NOT NULL,
                                Date INTEGER NOT NULL,
                                End INTEGER NOT NULL,
                                UiD INTEGER NOT NULL,
                                JobID INTEGER NOT NULL
                            );

                            CREATE TABLE IF NOT EXISTS Jobs (
                                JobID INTEGER PRIMARY KEY AUTOINCREMENT,
                                Name TEXT NOT NULL,
                                Rate INTEGER NOT NULL,
                                UiD INTEGER NOT NULL
                            );

                            CREATE TABLE IF NOT EXISTS Users (
                                UiD INTEGER PRIMARY KEY AUTOINCREMENT,
                                Email TEXT NOT NULL,
                                Password TEXT NOT NULL
                            );

                            CREATE TABLE IF NOT EXISTS Rules (
                                RuleID INTEGER PRIMARY KEY AUTOINCREMENT,
                                UiD INTEGER NOT NULL,
                                JobID INTEGER NOT NULL,
                                Start INTEGER NOT NULL,
                                End INTEGER NOT NULL,
                                Rate INTEGER NOT NULL,
                                RateType TEXT,
                                RuleType TEXT,
                                Day INTEGER,
                                Date INTEGER
                            );

            ");

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            using var connection = new SqliteConnection(databaseConfig.Name);

            connection.Execute(@"
                            DELETE TABLE IF EXISTS Shifts;
                            DELETE TABLE IF EXISTS Jobs;
                            DELETE TABLE IF EXISTS Users;
                            DELETE TABLE IF EXISTS Rules;
            ");

            return Task.CompletedTask;
        }
    }
}