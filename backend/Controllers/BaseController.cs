using Microsoft.AspNetCore.Mvc;
using backend.Database;


namespace backend.Controllers;


public class BaseController : ControllerBase
{
    protected readonly MyDbContext _context;

    public BaseController(MyDbContext context)
    {
        _context = context;
    }

}