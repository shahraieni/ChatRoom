using System.Security.AccessControl;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entitis;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Errors;
using API.Data.Migrations;
using API.Interfaces;

namespace API.Controllers


{
     
    public class UsersController : BaseApiController
    {
       private readonly IUserRepository _UserRepository;

        public UsersController(IUserRepository userRepository)
        {
            _UserRepository = userRepository;
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<List<Users>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        

        [HttpGet("{id:int}")]
        //[Authorize]
        public async Task<ActionResult<Users>> GetUser(int id)
        {
             var user =  await _context.Users.FirstOrDefaultAsync(x=>x.Id == id);
             if(user == null)
             
                return BadRequest(new ApiResponse(400,"نام کاربری یافت نشد"));
                return user;
             
        }
    }
}