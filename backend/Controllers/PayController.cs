using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Database;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{

[ApiController]
[Route("api/[controller]")]
public class PayController : BaseController
{
    public PayController(MyDbContext _context) : base(_context)
    {
    }

[HttpGet]
public double ExpectedPay(int userID, int startTime, int endTime)
{
    double ExpectedPay = 0;
    var shifts = _context.Shifts.Include(t => t.job).Where(t => t.uiD == userID && t.shiftDate >= startTime && t.shiftDate <= endTime).ToArray();
    var rules = _context.Rules.Where(t => t.UiD == userID).ToArray();

    var user = _context.Users.Where(t => t.ID == userID).FirstOrDefault();

    if (user == null)
    {
        return 0;
    }

    if (shifts.Count() == 0)
    {
        return 0;
    }
    
    foreach(var shift in shifts)
    {
        if (shift.job == null)
        {
            continue;
        }
        var payRate = shift.job.payRate; // Access payRate from the Job object
        ExpectedPay += CalculateBasePayHours(shift, payRate);
        
        if (rules.Length != 0)
        {
            ExpectedPay += CalculateExtraFromRules(rules, shift, payRate); // Pass payRate here
        }
    }
    double tax = (double)user.Taxrate / 100;
    return ExpectedPay * (1 - tax);
}

    private double CalculateExtraFromRules([FromBody] Rules[] rules, [FromBody] Shift shift, int basePay)
    {
        //case switch for each rule type and then call the appropriate method
        double extraPay = 0;
        foreach(var rule in rules)
        {
            if (rule.JobID == shift.jobbID)
            {
                switch(rule.RuleType)
                {
                    case "Day":
                        extraPay += CalculateDayRule(rule, shift, basePay);
                        break;
                    case "Date":
                        extraPay += CalculateDateRule(rule, shift, basePay);
                        break;
                    case "Time":
                        extraPay += CalculateTimeRule(rule, shift, basePay);
                        break;
                    case "Time and Day":
                        extraPay += CalculateDayAndTimeRule(rule, shift, basePay);
                        break;
                    default:
                        break;
                }
            }
        }
        return extraPay;
    }

    public double CalculateBasePayHours(Shift shift, int basepay)
    {
        //calculate the base pay for a shift
        var hours_worked = (int)Math.Floor((shift.shiftEndTime - shift.shiftStartTime) / 100.0);
        var minutes_worked = (shift.shiftEndTime - shift.shiftStartTime) % 100;
        if(minutes_worked > 50)
        {
            //then we need to take 100 - minutes worked and we get minutes
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
        
        string? ruleDateString = rule.Date.ToString();

        if(ruleDateString == null)
        {
            return 0;
        }

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
        var rule_diff = shift.shiftStartTime - rule.Start;
        if (rule_diff  > 0)
        {
            rule_diff = 0;
        }
    var hours_worked = (shift.shiftEndTime - shift.shiftStartTime + rule_diff)/100;
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
}
