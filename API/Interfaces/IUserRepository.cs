using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entitis;
using API.models;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        
        Task<IEnumerable<Users>> GetAllUsers();
        Task<IEnumerable<MemberDto>> GetAllUsersMemberDto();
        Task<Users> GetUserById(int id);
        Task<Users> GetUserByUserName(string userName);
        void Update(Users user);
        Task<bool> SaveAllAsync();
    }
}