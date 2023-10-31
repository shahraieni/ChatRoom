using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entitis;
using API.Interfaces;

namespace API.Servisce
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }
        


        public Task<IEnumerable<Users>> GetAllUsers()
        {
            throw new System.NotImplementedException();
        }

        public Task<Users> GetUserById(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<Users> GetUserByUserName(string userName)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> SaveAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public void Update(Users user)
        {
            throw new System.NotImplementedException();
        }

    }
}