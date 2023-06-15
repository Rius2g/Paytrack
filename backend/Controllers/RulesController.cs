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
    public RulesController(DatabaseConfig dbConfig) : base(dbConfig)
    {
    }

    [HttpGet] //returns all rules
    public IEnumerable<Rules> GetRules()
    {
        using var connection = new SqliteConnection(_db.Name);

        var rules = connection.Query<Rules>("SELECT * FROM Rules");

        return rules;
    }

    [HttpGet("{id}")] //returns all rules for a user
    public IEnumerable<Rules> GetUsersRules(int id)
    {
        using var connection = new SqliteConnection(_db.Name);

        var rules = connection.Query<Rules>(
            @"SELECT * FROM Rules WHERE UiD = @userID;",
            new {userID = id});

        return rules;
    }

    [HttpPost]
    public int PostRule(Rules rule)
    {
        using var connection = new SqliteConnection(_db.Name);
        var result = connection.QuerySingleOrDefault<int>(@"
        INSERT INTO Rules (
            JobID,
            Rate,
            UiD,
            RateType,
            RuleType,
            Day,
            Start,
            Date
        ) VALUES (
            @JobID,
            @Rate,
            @UiD,
            @RateType,
            @RuleType,
            @Day,
            @Start,
            @Date
        );
        SELECT last_insert_rowid();",
        rule);
        return result;
    }

    [HttpPut]
    public IActionResult PutRule(Rules rule)
    {
        using var connection = new SqliteConnection(_db.Name);
        connection.Execute(@"
        UPDATE Rules SET
            JobID = @JobID,
            Rate = @Rate,
            UiD = @UiD,
            RateType = @RateType,
            RuleType = @RuleType,
            Day = @Day,
            Start = @Start,
            Date = @Date
        WHERE RuleID = @RuleID;",
        rule);


        return Ok();
    }



    
}
