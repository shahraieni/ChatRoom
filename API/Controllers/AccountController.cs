using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.Entitis;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<Users>> Register(string userName , string password)
        {
            using var hmac = new  HMACSHA512();
            var user =new Users{
                UserName = userName,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)),
                PasswordSalt =hmac.Key
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;

            
        }

      
    }

    

}