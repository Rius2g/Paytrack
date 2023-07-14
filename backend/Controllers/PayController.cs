using Microsoft.AspNetCore.Mvc;
using Paytrack.Models;
using Paytrack.Database;
using Microsoft.Data.Sqlite;
using System;
using Dapper;


namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PayController : BaseController
{
    public PayController(DatabaseConfig dbConfig) : base(dbConfig)
    {
    }

[HttpGet]
public decimal ExpectedPay(int userID, int startTime, int endTime)
{
    decimal ExpectedPay = 0;
    using var connection = new SqliteConnection(_db.Name);
    var shifts_with_jobs = connection.Query<dynamic>(@"
        SELECT * FROM Shifts NATURAL JOIN Jobs WHERE UiD = @userID AND ShiftDate>= @startTime AND ShiftDate <= @endTime;",
        new { userID, startTime, endTime }).ToArray();

    if (shifts_with_jobs.Count() == 0)
    {
        return 0;
    }
    
    //get all the rules to pass in so we dont have to qeury the database for each shift
    var rules = connection.Query<Rules>(@"
        SELECT * FROM Rules WHERE UiD = @userID;",
        new { userID }).ToArray();

    var user = connection.QuerySingleOrDefault<User>(@"
        SELECT * FROM Users WHERE UiD = @userID;",
        new { userID });
    
    foreach(var shift in shifts_with_jobs)
    {
        ExpectedPay += CalculateBasePayHours(shift, shift.payRate);
        if (rules.Length != 0)
            ExpectedPay += CalculateExtraFromRules(rules, shift, shift.payRate);

    }

    return 1 * (1 - user.TaxRate);
}

    private double CalculateExtraFromRules([FromBody] Rules[] rules, [FromBody] Shift shift, int basePay)
    {
        //case switch for each rule type and then call the appropriate method
        foreach(var rule in rules)
        {
            if (rule.JobID == shift.jobbID)
            {
                switch(rule.RuleType)
                {
                    case "Day":
                        return CalculateDayRule(rule, shift, basePay);
                    case "Date":
                        return CalculateDateRule(rule, shift, basePay);
                    case "Time":
                        return CalculateTimeRule(rule, shift, basePay);
                    case "Time and Day":
                        return CalculateDayAndTimeRule(rule, shift, basePay);
                    default:
                        return 0;
                }
            }
        }
        return 0;
    }

    public double CalculateBasePayHours(Shift shift, int basepay)
    {
        //calculate the base pay for a shift
        var hours_worked = (int)Math.Floor((shift.shiftEndTime - shift.shiftStartTime) / 100.0);
        var minutes_worked = (shift.shiftEndTime - shift.shiftStartTime) % 100;
        if(minutes_worked > 50)
        {
            //then wee need to take 100 - minutes worked and we get minutes
            //here 30 = 0.5 hours
            var minutes = 100 - minutes_worked;
            hours_worked += minutes / 60;
            
        }
        else if(minutes_worked > 0 || minutes_worked < 50)
        {
            //here 30 = 0.5 hours
            hours_worked += minutes_worked / 60;
        }
        return basepay * hours_worked;
    }

    private double CalculateDayRule(Rules rule, Shift shift, int basePay)
    {
        string dateString = shift.shiftDate.ToString();
        int year = int.Parse(dateString.Substring(0, 4));
        // Accessing the month
        int month = int.Parse(dateString.Substring(4, 2));
        // Accessing the date
        int day = int.Parse(dateString.Substring(6, 2));

        DateTime date = new DateTime(year, month, day);

        if(rule.Day == date.DayOfWeek.ToString())
        {
         //check rate type
            if(rule.RateType == "%")
            {
                return CalculateBasePayHours(shift, basePay * ((rule.Rate / 100) + 1)) - CalculateBasePayHours(shift, basePay);
            }
            else
            {
                return CalculateBasePayHours(shift, basePay+rule.Rate) - CalculateBasePayHours(shift, basePay);
            }
        }
        return 0;
    }

    private double CalculateDateRule(Rules rule, Shift shift, int basePay)
    {
        string dateString = shift.shiftDate.ToString();
        string ruleDateString = rule.Date.ToString();

        int year = int.Parse(dateString.Substring(0, 4));
        int ruleYear = int.Parse(ruleDateString.Substring(0, 4));
        // Accessing the month
        int month = int.Parse(dateString.Substring(4, 2));
        int ruleMonth = int.Parse(ruleDateString.Substring(4, 2));
        // Accessing the date
        int day = int.Parse(dateString.Substring(6, 2));
        int ruleDay = int.Parse(ruleDateString.Substring(6, 2));

        DateTime date = new DateTime(year, month, day);
        DateTime ruleDate = new DateTime(ruleYear, ruleMonth, ruleDay);

        if(ruleDate == date)
        {
            //check rate type
            if(rule.RateType == "%")
            {
                return CalculateBasePayHours(shift, basePay * ((rule.Rate / 100) + 1)) - CalculateBasePayHours(shift, basePay);
            }
            else
            {
                return CalculateBasePayHours(shift, basePay+rule.Rate) - CalculateBasePayHours(shift, basePay);
            }
        }
        return 0;
    }

    private double CalculateTimeRule(Rules rule, Shift shift, int basePay)
    {
    var hours_worked = (int)Math.Floor((shift.shiftEndTime - rule.Start) / 100.0);
    var minutes_worked = (shift.shiftEndTime - rule.Start) % 100;

    if (minutes_worked > 50)
    {
        // Then we need to take 100 - minutes worked and we get minutes
        // Here 30 = 0.5 hours
        var minutes = 100 - minutes_worked;
        hours_worked += minutes / 60; // Use 60.0 instead of 60 to perform floating-point division
    }
    else if (minutes_worked > 0 && minutes_worked < 50) // Use && instead of || in the condition
    {
        // Here 30 = 0.5 hours
        hours_worked += minutes_worked / 60; // Use 60.0 instead of 60 to perform floating-point division
    }

    if(rule.RateType == "%")
    {
        return hours_worked * (basePay * ((rule.Rate / 100) + 1) - basePay); // Return the calculated hours_worked instead of 0
    }
    else
    {
        return hours_worked * rule.Rate; // Return the calculated hours_worked instead of 0
    }
    }


    private double CalculateDayAndTimeRule(Rules rule, Shift shift, int basePay)
    {
        string dateString = shift.shiftDate.ToString();
        int year = int.Parse(dateString.Substring(0, 4));
        // Accessing the month
        int month = int.Parse(dateString.Substring(4, 2));
        // Accessing the date
        int day = int.Parse(dateString.Substring(6, 2));

        DateTime date = new DateTime(year, month, day);

        if(rule.Day == date.DayOfWeek.ToString())
        {
            return CalculateTimeRule(rule, shift, basePay);
        }
       //just check if the Day is right and if it iss call the time Rule
        return 0;
    }
    
}
