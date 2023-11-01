using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.Entitis;
using API.Interfases;
using API.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Controllers
{
    
   
    public class AccountController: BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenservice;

        public AccountController(DataContext context, ITokenService tokenservice )
        {
            _context = context;
            _tokenservice = tokenservice;

        }

        

        [HttpPost("register")]
        public async Task<ActionResult<UserTokenDto>> Register(RegisterDto model)
        {
            if(await IsExistUserName(model.userName))
            return BadRequest("نام کاربری موجود میباشد");
            using var hmac = new  HMACSHA512();
            var user =new Users{
                UserName = model.userName,
                PasswordSalt =hmac.Key,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(model.password)),
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return new UserTokenDto{
                userName = user.UserName,
                Token = _tokenservice.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserTokenDto>> Login([FromBody]LoginDto model)
        {
            var user =  await _context.Users.SingleOrDefaultAsync(x => x.UserName.ToLower() == model.userName.ToLower());
            if(user == null) return BadRequest("نام کاربری یافت نشد");
                using var hmac = new HMACSHA512(user.PasswordSalt);
                var  computehash =  hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(model.password));
                for(int i=0 ; i < computehash.Length; i++)
                {
                        if(computehash[i] != user.PasswordHash[i]) return BadRequest(" رمز عبور اشتباه است");
                }
                return new UserTokenDto{
                userName = user.UserName,
                Token = _tokenservice.CreateToken(user)
            };

        }
        private async Task<bool> IsExistUserName(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());

        }


      
    }

    

}