
using System.Security.Cryptography;
using System.Threading.Tasks;
using Api.Data;
using Api.Entities;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class AccountController : BaseApiController
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
                        return BadRequest("نام کاربری تکراری میباشد");
                using var hmac = new HMACSHA512();
                var user = new Users{
                    UserName =model.userName,
                    PasswordSalt = hmac.Key,
                    PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(model.Password)),
                };

                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
                return user;
        }

        private async Task<bool> IsExistUserName(string userName)
        {
            return await _context.Users.AnyAsync(x => x.UserName.ToLower() == userName.ToLower());
        }
    }
}