using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Api.Data;
using Api.Entites;
using Api.interfaces;
using Api.Models;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class AccountController :BaseApiController
    {

         private readonly DataContext _context;
         private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }


        [HttpPost("register")]   
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse),StatusCodes.Status400BadRequest)]

        
        public async Task<ActionResult<UserTokenDto>> Register(RegisterDto model )
        {


                  if(await IsExistUserName(model.userName))
                        return BadRequest(new ApiResponse (400,  "نام کاربری تکراری میباشد"));

               using var  hmac = new HMACSHA512();

               var user = new Users 
               {
                UserName = model. userName,
                PasswordSalt = hmac.Key,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(model.Password))
               };

                await _context.Users.AddAsync(user);

                if(await _context.SaveChangesAsync() > 0)
                {



                        return  Ok(new UserTokenDto{
                            userName = user.UserName,
                            Token = _tokenService.CreateToken(user)

                        }) ;
                }

                return BadRequest(new ApiResponse(400, "خطا در ثبت اطلاعات"));
                
        }



        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse),StatusCodes.Status400BadRequest)]

        public async Task<ActionResult<UserTokenDto>> Login([FromBody]LoginDto model)
        {
            var user = _context.Users.SingleOrDefault(x=> x.UserName.ToLower() == model.userName.ToLower());

            if(user == null) return BadRequest( new ApiResponse(400,"نام کاربری یافت نشد"));

             using var  hmac = new HMACSHA512(user.PasswordSalt);

             var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(model.Password));

             for (int i = 0; i < computedHash.Length; i++)
             {
                if(computedHash[i] != user.PasswordHash[i]) return BadRequest( new ApiResponse(400,"رمز عبور اشتباه است"));
             }

             return Ok( new UserTokenDto{
                    userName = user.UserName,
                    Token = _tokenService.CreateToken(user)

                });
        }


         private async Task<bool> IsExistUserName(string userName)
        {
            return await _context.Users.AnyAsync(x => x.UserName.ToLower() == userName.ToLower());
        }
    }
}