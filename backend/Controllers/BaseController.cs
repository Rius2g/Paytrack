using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;


public class BaseController : ControllerBase
{
    protected readonly MyDbContext _context;

    public BaseController(MyDbContext context)
    {
        _context = context;
    }

}