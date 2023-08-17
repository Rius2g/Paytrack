using Microsoft.AspNetCore.Mvc;
using Paytrack.Models;
using Paytrack.Database;
using Microsoft.Data.Sqlite;
using System;
using Dapper;


namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RulesController : BaseController
{
    public RulesController(MyDbContext context) : base(context)
    {
    }

    [HttpGet] //returns all rules
    public IEnumerable<Rules> GetRules()
    {
        var rules = _context.Rules.ToArray();

        return rules;
    }

    [HttpGet("{id}")] //returns all rules for a user
    public IEnumerable<Rules> GetUsersRules(int id)
    {
        var rules = _context.Rules.Where(r => r.UiD == id).ToArray();

        return rules;
    }

    [HttpPost]
    public int PostRule(Rules rule)
    {
        _context.Rules.Add(rule);
        _context.SaveChanges();
        return 1;
    }

    [HttpPut]
    public IActionResult PutRule(Rules rule)
    {
        var rule_to_update = _context.Rules.Find(rule.ID);
        if (rule_to_update == null)
        {
            return NotFound();
        }
        else
        {
            rule_to_update.JobID = rule.JobID;
            rule_to_update.Rate = rule.Rate;
            rule_to_update.UiD = rule.UiD;
            rule_to_update.RateType = rule.RateType;
            rule_to_update.RuleType = rule.RuleType;
            rule_to_update.Day = rule.Day;
            rule_to_update.Start = rule.Start;
            rule_to_update.Date = rule.Date;
            rule_to_update.jobName = rule.jobName;
            _context.SaveChanges();
            return Ok();
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteRule(int id)
    {
        var rule_to_delete = _context.Rules.Find(id);
        if (rule_to_delete == null)
        {
            return NotFound();
        }
        else
        {
            _context.Rules.Remove(rule_to_delete);
            _context.SaveChanges();
            return Ok();
        }
    }
    
}
