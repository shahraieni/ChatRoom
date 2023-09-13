using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entitis;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers


{
     [ApiController]
    [Route("api/[controller]")]
    public class UserController :ControllerBase
    {
        private readonly DataContext _context;
        public UserController(DataContext context)
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
            return await _context.Users.FirstOrDefaultAsync(x=>x.Id == id);
        }
    }
}