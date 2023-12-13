using Microsoft.AspNetCore.Mvc;
using Paytrack.Models;



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
        var jobs = _context.Jobs.Where(t => t.UiD == uid).ToArray();
        return jobs;
    }

    [HttpPost]
    public int PostJob(Job job)
    {
        _context.Add(job);
        _context.SaveChanges();
        return job.ID;
    }


    [HttpPut]
    public bool PutJob(Job job)
    {
        var jobs = _context.Jobs.Find(job.ID);
        if (jobs == null)
        {
            return false;
        }

        jobs.jobName = job.jobName;
        jobs.payRate = job.payRate;
        
        _context.SaveChanges();
        return true;

    }


    [HttpDelete]
    public bool DeleteJob(int jobID)
    {
        var jobToDelete = _context.Jobs.FirstOrDefault(j => j.ID == jobID);

        if (jobToDelete != null)
        {
            _context.Jobs.Remove(jobToDelete);
            _context.SaveChanges();

            return true; // Successful deletion
        }

        return false; // Job not found
    }





}
