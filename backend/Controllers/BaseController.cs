using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Paytrack.Database;

namespace backend.Controllers;


public class BaseController : ControllerBase
{
    protected readonly DatabaseConfig _db;

    public BaseController(DatabaseConfig config)
    {
        _db = config;
    }

}