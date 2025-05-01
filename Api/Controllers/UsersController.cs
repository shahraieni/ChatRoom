using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{

      [ApiController]
    [Route("api/[controller]")]
   
    public class UsersController : ControllerBase
    {
        
        private readonly DataContext _context ;
       
        public UsersController(DataContext context)
        {
            _context = context;
            
        }

        [HttpGet]
        public async Task<List<Users>> GetUsers()
        {
                return await _context.Users.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<Users> GetUser(int id)
        {
                return await _context.Users.FirstOrDefaultAsync(x=> x.Id == id);
        }

    }
}