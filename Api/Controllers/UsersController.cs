using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Entites;
using API.Errors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{

   

    public class UsersController : BaseApiController
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
        public async Task<ActionResult<Users>> GetUser(int id)
        {
            var user =  await _context.Users.FirstOrDefaultAsync(x=> x.Id == id);
            if(user == null)  return BadRequest(new ApiResponse(400 , "کاربری یافت نشد"));
            
                return user;
        }

    }
}