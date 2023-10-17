using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.Entitis;
using API.Errors;
using API.Interfases;
using API.models;
using Microsoft.AspNetCore.Http;
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserTokenDto>> Register(RegisterDto model)
        {
            if(await IsExistUserName(model.userName))
            return BadRequest(new ApiResponse(400,model.userName + "یافت نشد"));

            using var hmac = new  HMACSHA512();
            var user =new Users{
                UserName = model.userName,
                PasswordSalt =hmac.Key,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(model.password)),
            };
            await _context.Users.AddAsync(user);
         if(await _context.SaveChangesAsync()>0)
         {

            return Ok(new UserTokenDto{
                userName = user.UserName,
                Token = _tokenservice.CreateToken(user)
            }); 
         }

         return BadRequest(new ApiResponse(400, "خطا در ثبت اطلاعات"));
        }

        [HttpPost("login")]
         [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserTokenDto>> Login([FromBody]LoginDto model)
        {
            var user =  await _context.Users.SingleOrDefaultAsync(x => x.UserName.ToLower() == model.userName.ToLower());
            if(user == null) return BadRequest(new ApiResponse(440,"نام کاربری یافت نشد"));
                using var hmac = new HMACSHA512(user.PasswordSalt);
                var  computehash =  hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(model.password));
                for(int i=0 ; i < computehash.Length; i++)
                {
                        if(computehash[i] != user.PasswordHash[i]) return BadRequest(new ApiResponse(400," رمز عبور اشتباه است"));
                }
                return Ok (new UserTokenDto{
                userName = user.UserName,
                Token = _tokenservice.CreateToken(user)
            });

        }
        private async Task<bool> IsExistUserName(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());

        }


      
    }

    

}