using Microsoft.AspNetCore.Mvc;
using Paytrack.Models;
using Paytrack.Database;
using Microsoft.Data.Sqlite;
using System;
using Dapper;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShiftController : BaseController
{
    public ShiftController(MyDbContext _context) : base(_context)
    {
    }

    //get all shifts
    // GET: api/Shift
    [HttpGet]
    public IEnumerable<Shift> GetShifts()
    {
        using var connection = new SqliteConnection(_db.Name);

        var shifts = connection.Query<Shift>("SELECT * FROM Shifts;");
        return shifts;
    }
   

    //get shift by id
    // GET: api/Shift/5
   [HttpGet("{id}")]
    public Shift GetShift(int id)
    {
        using var connection = new SqliteConnection(_db.Name);

        var shift = connection.QueryFirstOrDefault<Shift>($"SELECT * FROM Shifts WHERE Id = {id};");
        
        return shift;
    }

    //get shifts by user id
    // GET: api/Shift/5
    [HttpGet("weekly/{id}")]
    public IEnumerable<Shift> GetWeeklyShifts([FromQuery]long DateStart, [FromQuery]long DateEnd, int id)
    {
        using var connection = new SqliteConnection(_db.Name);                                                                                                 
        // Execute query to get session with matching SessionID
        var shifts = connection.Query<Shift>(
                @"SELECT * FROM Shifts WHERE 
                ((ShiftDate BETWEEN @dateStart AND @dateEnd)
                 AND UiD = @UserId);",
                new {dateStart = DateStart, dateEnd = DateEnd, UserId = id});

        return shifts;
    }


    [HttpDelete("admin/{id}")]
    public bool Delete(int id)
    // Deletes a specific session from the database, based on SessionID
    {
        using var connection = new SqliteConnection(_db.Name);                                                                                                     // create connection to sqlite database
        var result = connection.Execute(                                                                                                                            // Execute query to delete session with matching SessionID
            @"DELETE FROM Shifts
                    WHERE ShiftID = @IdInsert;",
            new { IdInsert = id });


        return result == 1;                                                                                                                                          // return true if query was successful
    }


    [HttpDelete]
    public bool Delete([FromQuery]int id, [FromQuery]int uID)

    // Checks if a user is owner of session, and delete it if called by owner
    {
        using var connection = new SqliteConnection(_db.Name);
        int owner = connection.QuerySingleOrDefault<int>(@"
                    SELECT UiD
                        FROM Shifts
                        WHERE ShiftID = @IdInsert;",
                new { IdInsert = id });

        var result = false;

        if(owner == uID) //check if the user is the owner of the shift
        {
            result = Delete(id);
        }

        return result;
    }


    //add shift
    // POST: api/Shift
    [HttpPost]
    public int PostShift(Shift shift)
    {
        using var connection = new SqliteConnection(_db.Name);

         var result = connection.QuerySingleOrDefault<int>(@"
                INSERT INTO Shifts (
                        ShiftStartTime,
                        ShiftDate,
                        ShiftEndTime,
                        UiD,
                        JobbID,
                        JobName
                    ) VALUES (
                        @Start,
                        @Date,
                        @End,
                        @UiD,
                        @JobID,
                        @JobName
                        )
                        RETURNING *;",
                new
                {
                    Start = shift.shiftStartTime,
                    Date = shift.shiftDate,
                    End = shift.shiftEndTime,
                    UiD = shift.uiD,
                    JobID = shift.jobbID,
                    JobName = shift.jobName
                });

        return result;
    }

    //update shift
    // PUT: api/Shift/5
    [HttpPut("{id}")]
    public bool PutShift(int id, Shift shift)
    {
        using var connection = new SqliteConnection(_db.Name);

        var result = connection.Execute(
            @"UPDATE Shifts
                    SET
                        ShiftStartTime = @Start,
                        ShiftDate = @Date,
                        ShiftEndTime = @End,
                        UiD = @UiD,
                        JobbID = @JobID,
                        JobName = @JobName
                    WHERE ShiftID = @ID;",
            new
            {
                ID = id,
                UiD = shift.uiD,
                Date = shift.shiftDate,
                Start = shift.shiftStartTime,
                End = shift.shiftEndTime,
                JobID = shift.jobbID,
                JobName = shift.jobName
            });

        return result == 1;
    }
    
    
}
