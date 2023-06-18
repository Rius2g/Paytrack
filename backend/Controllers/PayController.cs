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
   public double ExpectedPay(int userID, int startTime, int endTime)
{
    double ExpectedPay = 0;
    using var connection = new SqliteConnection(_db.Name);
    var shifts_with_jobs = connection.Query<dynamic>(@"
        SELECT * FROM Shifts NATURAL JOIN Jobs WHERE UiD = @userID AND ShiftStartTime >= @startTime AND ShiftEndTime <= @endTime;",
        new { userID, startTime, endTime }).ToArray();

    if (shifts_with_jobs.Count() == 0)
    {
        return 0;
    }
    
    //get all the rules to pass in so we dont have to qeury the database for each shift
    var rules = connection.Query<Rules>(@"
        SELECT * FROM Rules WHERE UiD = @userID;",
        new { userID }).ToArray();

    
    foreach(var shift in shifts_with_jobs)
    {
        ExpectedPay += CalculateBasePayHours(shift, shift.payRate);
        if (rules != null)
            ExpectedPay += CalculateExtraFromRules(rules, shift, shift.payRate);

    }

    // Access the data in the shifts_with_jobs and rules variables as needed

    return 0;
}

    public double CalculateExtraFromRules(Rules[] rules, Shift shift, int basePay) //call this with each individual shift to find the extra pay
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
                        return CalculateStartRule(rule, shift, basePay);
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

    public double CalculateDayRule(Rules rule, Shift shift, int basePay)
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

    public double CalculateDateRule(Rules rule, Shift shift, int basePay)
    {
        //calculate the extra pay for a shift based on the date rule

        //create 2 dateTime objects to check the date
        // if(rule.Date == shift.shiftStartTime.Date)
        // {
        //     return basePay * rule.Rate;
        // }
        return 0;
    }

    public double CalculateStartRule(Rules rule, Shift shift, int basePay)
    {
        //calculate the extra pay for a shift based on the start rule
        if(rule.Start == shift.shiftStartTime)
        {
            return basePay * rule.Rate;
        }
        return 0;
    }

    public double CalculateDayAndTimeRule(Rules rule, Shift shift, int basePay)
    {
        //calculate the extra pay for a shift based on the day and time rule
        //create dateTime object with the string to check the day

        // if(rule.Day == shift.shiftStartTime.DayOfWeek.ToString() && rule.Start == shift.shiftStartTime)
        // {
        //     return basePay * rule.Rate;
        // }
        return 0;
    }
    
}
