
using System.Security.Cryptography;
using System.Threading.Tasks;
using Api.Data;
using Api.Entities;
using Api.interfaces;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]   
        public async Task<ActionResult<UserTokenDto>> Register(RegisterDto model)
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
                return new UserTokenDto{
                    userName = user.UserName,
                    Token = _tokenService.CreateToken(user)
                };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserTokenDto>> Login([FromBody] LoginDto model)
        {
            var user =  await _context.Users.SingleOrDefaultAsync(x => x.UserName.ToLower() == model.userName.ToLower());
            if(user == null) return BadRequest( "نام کاربری یافت نشد");

            using var hmac = new HMACSHA512(user.PasswordSalt) ;
            var ComputeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(model.Password));
            for (int i = 0; i < ComputeHash.Length; i++)
            {
                if(ComputeHash[i] != user.PasswordHash[i]) return BadRequest(" کلمه عبور اشتباه است");
            }
             return new UserTokenDto{
                    userName = user.UserName,
                    Token = _tokenService.CreateToken(user)
                };
        }

        private async Task<bool> IsExistUserName(string userName)
        {
            return await _context.Users.AnyAsync(x => x.UserName.ToLower() == userName.ToLower());
        }
    }
}