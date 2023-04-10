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

       var resGet = connection.QuerySingleOrDefault<int>(@"
            SELECT UserID FROM Users WHERE Email = @Email;",
            new
            {
                Email = user.Email
            });

        if (resGet != 0)
        {
            return 0;
        }

        var passwordHash = new PasswordHash();

        var hash = passwordHash.CreateHashPassword(user.Password, out var salt);

        var result = connection.QuerySingleOrDefault<int>(@"
                INSERT OR IGNORE INTO Users (
                        Email,
                        Password,
                    ) VALUES (
                        @Email,
                        @Password,
                        )
                        RETURNING *;",
                new
                {
                    Password = hash,
                    Email = user.Email,
                });

       var res = passwordHash.PostSalt(result, salt, _db.Name);

        return result;

    }

    [HttpPost("login")]
    public User loginUser(string email, string password)
    {
        using var connection = new SqliteConnection(_db.Name);

        var PW = new PasswordHash();

        var correct = PW.VerifyPassword(password, email, _db.Name);

        if(correct)
        {
            var user = connection.QueryFirstOrDefault<User>(@"
            SELECT * FROM Users WHERE Email = @Email;",
            new
            {
                Email = email
            });
            return user;
        }
        User falseUser = new User();
        return falseUser;


    }



    
}
