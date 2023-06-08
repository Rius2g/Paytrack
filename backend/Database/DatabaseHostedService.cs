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
                                ShiftID INTEGER PRIMARY KEY AUTOINCREMENT,
                                ShiftStartTime INTEGER NOT NULL,
                                ShiftDate INTEGER NOT NULL,
                                ShiftEndTime INTEGER NOT NULL,
                                UiD INTEGER NOT NULL,
                                JobbID INTEGER NOT NULL,
                                FOREIGN KEY(UiD) REFERENCES Users(UiD)
                            );

                            CREATE TABLE IF NOT EXISTS Jobs (
                                JobID INTEGER PRIMARY KEY AUTOINCREMENT,
                                jobName TEXT,
                                payRate INTEGER,
                                UiD INTEGER NOT NULL
                            );

                            CREATE TABLE IF NOT EXISTS Users (
                                UiD INTEGER PRIMARY KEY AUTOINCREMENT,
                                Email TEXT NOT NULL,
                                Password TEXT NOT NULL,
                                TaxRate INTEGER,
                                Currency TEXT
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

                            CREATE TABLE IF NOT EXISTS Salts (
                                SaltID INTEGER PRIMARY KEY AUTOINCREMENT,
                                UiD INTEGER,
                                Salt VARCHAR(64),
                                FOREIGN KEY(UiD) REFERENCES Users(UiD),
                                UNIQUE(UiD),
                                UNIQUE(UiD,Salt)
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
                            DELETE TABLE IF EXISTS Salts;
            ");

            return Task.CompletedTask;
        }
    }
}