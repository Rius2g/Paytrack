using Microsoft.AspNetCore.Mvc;
using Paytrack.Models;

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
        var shifts = _context.Shifts.ToArray();

        return shifts;
    }
   

    //get shift by id
    // GET: api/Shift/5
   [HttpGet("{id}")]
    public Shift GetShift(int id)
    {
        var shift = _context.Shifts.FirstOrDefault(t => t.ID == id);
        if(shift == null)
        {
            return null;
        }

        return shift;
    }

    //get shifts by user id
    // GET: api/Shift/5
    [HttpGet("weekly/{id}")]
    public IEnumerable<Shift> GetWeeklyShifts([FromQuery]long DateStart, [FromQuery]long DateEnd, int id)
    {                                                                                              
        // Execute query to get session with matching SessionID
        var shifts = _context.Shifts.Where(t => t.shiftDate >= DateStart && t.shiftDate <= DateEnd && t.uiD == id).ToArray();

        return shifts;
    }


    [HttpDelete("admin/{id}")]
    public bool Delete(int id)
    // Deletes a specific session from the database, based on SessionID
    {
        var shift = _context.Shifts.FirstOrDefault(t => t.ID == id); 
        if(shift == null)                                                                                       
        {
            return false;                                                                                                                                           
        }
        _context.Shifts.Remove(shift);    
        _context.SaveChanges();
        return true;                                                                                                                       
    }


    [HttpDelete]
    public bool Delete([FromQuery]int id, [FromQuery]int uID)

    // Checks if a user is owner of session, and delete it if called by owner
    {
        var shift = _context.Shifts.FirstOrDefault(t => t.ID == id);
        if(shift == null)
        {
            return false;
        }
        if(shift.uiD == uID) //check if the user is the owner of the shift
        {
            return Delete(id);
        }

        return false;
    }


    //add shift
    // POST: api/Shift
    [HttpPost]
    public int PostShift(Shift shift)
    {
        _context.Shifts.Add(shift);
        _context.SaveChanges();

        return 1;
    }

    //update shift
    // PUT: api/Shift/5
    [HttpPut("{id}")]
    public bool PutShift(int id, Shift shift)
    {

        var shift_to_update = _context.Shifts.FirstOrDefault(t => t.ID == id);
        if(shift_to_update == null)
        {
            return false;
        }
        shift_to_update.shiftStartTime = shift.shiftStartTime;
        shift_to_update.shiftEndTime = shift.shiftEndTime;
        shift_to_update.shiftDate = shift.shiftDate;
        shift_to_update.jobbID = shift.jobbID;
        shift_to_update.jobName = shift.jobName;
        _context.SaveChanges();
        return true;
    }
    
}
