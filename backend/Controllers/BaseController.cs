using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Paytrack.Database;

namespace backend.Controllers;


public class BaseController : ControllerBase
{
    protected readonly MyDbContext _context;

    public BaseController(MyDbContext context)
    {
        _context = context;
    }

}