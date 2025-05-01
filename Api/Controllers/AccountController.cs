using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Api.Data;
using Api.Entites;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class AccountController :BaseApiController
    {

         private readonly DataContext _context;
        // private readonly ITokenService _tokenService;

        public AccountController(DataContext context)
        {
            _context = context;
            // _tokenService = tokenService;
        }


         [HttpPost("register")]   
        public async Task<ActionResult<Users>> Register(string userName , string password)
        {
               using var  hmac = new HMACSHA512();

               var user = new Users 
               {
                UserName = userName,
                PasswordSalt = hmac.Key,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password))
               };

                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
                return user;
        }
    }
}