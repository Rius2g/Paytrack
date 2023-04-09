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
    
}
