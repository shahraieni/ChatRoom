using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Entites;
using Api.Helpers;
using Api.Models;

namespace Api.interfaces
{
    public interface IUserRepository
    {
         Task<Users> GetUserByUserNameWithPhotos(string userName);
         Task<IEnumerable<Users>> GetAllUsers();
         Task<PagedList<MemberDto>> GetAllUsersMemberDto(UserParams userParams);
         Task<Users> GetUserById(int id);
         Task<MemberDto> GetMemberDtoById(int userId);
         Task<Users> GetUserByUserName(string userName);
         Task<MemberDto> GetMemberDtoByUserName(string userName);
        void Update(Users user);
        Task<bool> SaveAllAsync();
    }
}