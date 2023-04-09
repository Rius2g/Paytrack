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

    [HttpGet("{id}")]
    public Job GetJob(int id)
    {
        using var connection = new SqliteConnection(_db.Name);

        var job = connection.QueryFirstOrDefault<Job>($"SELECT * FROM Jobs WHERE JobID = {id};");
        return job;
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
            @"INSERT INTO Jobs (Name, Rate, UiD) VALUES (@Name, @Rate, @UiD);
            SELECT * FROM Jobs WHERE JobID = last_insert_rowid();",
            job);

        return newJob.JobID;
    }


    [HttpPut]
    public bool PutJob(Job job)
    {
        using var connection = new SqliteConnection(_db.Name);

        var updatedJob = connection.Execute(
            @"UPDATE Jobs SET Name = @Name, Rate = @Rate, UiD = @UiD WHERE JobID = @JobID;",
            job);

        return updatedJob == 1;
    }


    [HttpDelete]
    public bool DeleteJob(Job job)
    {
        using var connection = new SqliteConnection(_db.Name);

        var deletedJob = connection.Execute(
            @"DELETE FROM Jobs WHERE JobID = @JobID;",
            job);

        return deletedJob == 1;
    }




}
