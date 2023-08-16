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
        public JobController(MyDbContext _context) : base(_context)
        {
        }


    [HttpGet]
    public IEnumerable<Job> GetJobs()
    {

        var jobs = _context.Jobs.ToArray();
        return jobs;
    }

    [HttpGet("{uid}")]
    public IEnumerable<Job> GetJobsByUser(int uid)
    {
        var jobs = _context.Jobs.Where(t => t.uiD == uid).ToArray();
        return jobs;
    }

    [HttpPost]
    public int PostJob(Job job)
    {
        _context.Add(job);
        _context.SaveChanges();
        return job.jobID;
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
