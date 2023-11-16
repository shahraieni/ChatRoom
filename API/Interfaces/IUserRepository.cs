using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entitis;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        
        void Update(Users user);
        Task<IEnumerable<Users>> GetAllUsers();
        Task<Users> GetUserById(int id);
        Task<Users> GetUserByUserName(string userName);
        Task<bool> SaveAllAsync();
    }
}