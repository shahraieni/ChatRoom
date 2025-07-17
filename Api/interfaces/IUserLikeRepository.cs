using Api.Entites;
using Api.Enums;
using Api.Models;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.interfaces
{
    public interface IUserLikeRepository
    {
        Task<UserLike> GetUserLike(int sorceId, int targetId);
        Task<Users> GetUserWithLike(int userId);
        Task<IEnumerable<LikeDto>> GetUserLIkes(PredicateLikeEnum predicate, int userId);
        Task AddLike(int sourceId, int targetId);
        Task<bool> Saveasync();

    }
}
