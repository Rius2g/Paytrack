using Microsoft.AspNetCore.Mvc;
using System;
using Dapper;
using Paytrack.Models;
using Paytrack.Database;
using Microsoft.Data.Sqlite;


namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobController : BaseController
{
        public JobController(DatabaseConfig dbConfig) : base(dbConfig)
        {
        }


    [HttpGet]
    public IEnumerable<Job> GetJobs()
    {
        using var connection = new SqliteConnection(_db.Name);

        var jobs = connection.Query<Job>("SELECT * FROM Jobs;");
        return jobs;
    }

    [HttpGet("{uid}")]
    public IEnumerable<Job> GetJobsByUser(int uid)
    {
        using var connection = new SqliteConnection(_db.Name);

        var jobs = connection.Query<Job>($"SELECT * FROM Jobs WHERE UiD = {uid};");
        return jobs;
    }

    [HttpPost]
    public int PostJob(Job job)
    {
        using var connection = new SqliteConnection(_db.Name);

        var newJob = connection.QueryFirstOrDefault<Job>(
            @"INSERT INTO Jobs (jobName, payRate, UiD) VALUES (@jobName, @payRate, @uiD);
            SELECT * FROM Jobs WHERE JobID = last_insert_rowid();",
            job);

        return newJob.jobID;
    }


    [HttpPut]
    public bool PutJob(Job job)
    {
        using var connection = new SqliteConnection(_db.Name);

        var result = connection.Execute(
                @"UPDATE Jobs SET
                            jobName = @Name,
                            payRate = @Rate
                        WHERE JobID = @JobID;",
                        new
                        {
                            Name = job.jobName,
                            Rate = job.payRate,
                            JobID = job.jobID
                        });

        return result == 1;
    }


    [HttpDelete]
    public bool DeleteJob(Job job)
    {
        using var connection = new SqliteConnection(_db.Name);

        var deletedJob = connection.Execute(
            @"DELETE FROM Jobs WHERE JobID = @jobID;",
            job);

        return deletedJob == 1;
    }




}
