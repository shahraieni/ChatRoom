using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entitis;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Servisce
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }
        


        public  async Task<IEnumerable<Users>> GetAllUsers()
        {
            return   await  _context.Users.ToListAsync();
        }

        public async  Task<Users> GetUserById(int id)
        {
            return await  _context.Users.FindAsync(id);
        }

        public  async Task<Users> GetUserByUserName(string userName)
        {
            return await  _context.Users.
            SingleOrDefaultAsync(x=>x.UserName.ToLower() == userName.ToLower());
        }

        public  async Task<bool> SaveAllAsync()
        {
             return await  _context.SaveChangesAsync()>0;
        }

        public void Update(Users user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

    }
}