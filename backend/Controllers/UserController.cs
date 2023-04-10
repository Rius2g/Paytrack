using Microsoft.AspNetCore.Mvc;
using Paytrack.Models;
using Paytrack.Database;
using Microsoft.Data.Sqlite;
using System;
using Dapper;
using backend.Security;


namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : BaseController
{

    public UserController(DatabaseConfig dbConfig) : base(dbConfig)
    {
    }


    [HttpPost("register")]
    public int RegisterUser(User user)
    {
        using var connection = new SqliteConnection(_db.Name);

        var newUserID = connection.QueryFirstOrDefault<int>(
            @"INSERT INTO Users (Email, Password) VALUES (@Email, @Password);
            SELECT last_insert_rowid();",
            user);

        return newUserID;
    }

    [HttpPost("login")]
    public int LoginUser(User user)
    {
        using var connection = new SqliteConnection(_db.Name);

        var userID = connection.QueryFirstOrDefault<int>(
            @"SELECT * FROM Users WHERE Email = @Email AND Password = @Password;",
            user);

        return userID;
    }



    
}
