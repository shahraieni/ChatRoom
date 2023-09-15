using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.Entitis;
using API.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
   
    public class AccountController: BaseApiController
    {
        private readonly DataContext _context;

        public AccountController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Users>> Register(RegisterDto model)
        {
            if(await IsExistUserName(model.userName))
            return BadRequest("نام کاربری موجود میباشد");
            using var hmac = new  HMACSHA512();
            var user =new Users{
                UserName = model.userName,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(model.password)),
                PasswordSalt =hmac.Key
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private async Task<bool> IsExistUserName(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());

        }

      
    }

    

}