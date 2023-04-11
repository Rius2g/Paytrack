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

    
    
}
