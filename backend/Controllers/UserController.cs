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

    public UserController(MyDbContext _context) : base(_context)
    {
    }


    [HttpPost("register")]
    public int RegisterUser(User user)
    {
        var newuser = _context.Users.FirstOrDefault(u => u.Email == user.Email);

        if (newuser != null)
        {
            return 0;
        }

        var passwordHash = new PasswordHash(_context);

        var hash = passwordHash.CreateHashPassword(user.Password, out var salt);

        newuser = new User {
            Email = user.Email,
            Password = hash,
            TaxRate = 0
        };
        
        _context.Users.Add(newuser);
        _context.SaveChanges();

       //a way to get the ID of the new post
        var result = newuser.ID;

       var res = passwordHash.PostSalt(result, salt);

        return result;

    }

    [HttpPost("login")]
    public User loginUser(User user)
    {

        var PW = new PasswordHash(_context);

        var correct = PW.VerifyPassword(user.Password, user.Email);

        if(correct)
        {
            var use = _context.Users.FirstOrDefault(u => u.Email == user.Email);
            return use;
        }

        User falseUser = new User();
        return falseUser;


    }

    [HttpPut("{uid}")]
    public bool putUser(int uid, [FromQuery]decimal TaxRate, [FromQuery]string Currency)
    {
        var user = _context.Users.FirstOrDefault(u => u.ID == uid);
        user.Currency = Currency;
        user.TaxRate = TaxRate;
        _context.SaveChanges();
        return true;
    }

    [HttpGet("{uid}")]
    public User getUser(int uid)
    {
        var user = _context.Users.FirstOrDefault(u => u.ID == uid);
        
        return user;
    }
    
}
