using Microsoft.AspNetCore.Mvc;
using Paytrack.Models;
using Paytrack.Database;
using Microsoft.Data.Sqlite;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShiftController : BaseController
{
    public ShiftController(DatabaseConfig config) : base(config)
    {
    }

    //get all shifts
    // GET: api/Shift
    [HttpGet]
    public IEnumerable<Shift> GetShifts()
    {
        using var connection = new SqliteConnection(_db.name);

        var shifts = connection.query<Shift>("SELECT * FROM Shifts;");
        return shifts;
    }
   

    //get shift by id
    // GET: api/Shift/5
    [HttpGet("{id}")]
    public Shift GetShift(int id)
    {
        using var connection = new SqliteConnection(_db.name);

        var shift = connection.query<Shift>($"SELECT * FROM Shifts WHERE Id = {id};");
        return shift.FirstOrDefault();
    }

    //add shift
    // POST: api/Shift
    [HttpPost]
    public void PostShift(Shift shift)
    {
        using var connection = new SqliteConnection(_db.name);

         var result = connection.QuerySingleOrDefault<int>(@"
                INSERT INTO Shifts (
                        Start,
                        Date,
                        End,
                        UiD,
                        JobID
                    ) VALUES (
                        @Start,
                        @Date,
                        @End,
                        @UiD,
                        @JobID
                        )
                        RETURNING *;",
                new
                {
                    UserID = shift.UiD,
                    Date = shift.Date,
                    Start = shift.Start,
                    End = shift.End,
                    JobID = shift.JobID
                });

        return result;
    }
    
}
