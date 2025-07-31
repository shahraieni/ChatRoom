using Api.Data;
using Api.Entites;
using Api.Enums;
using Api.Helpers;
using Api.interfaces;
using Api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Api.services
{
    public class UserLikeRepository : IUserLikeRepository
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;


        public UserLikeRepository(DataContext dataContext , IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }
        public  async Task AddLike(int sourceId, int targetId)
        {
            await _dataContext.UserLike.AddAsync(new UserLike { SourceUserId = sourceId, TargetUserId = targetId });
        }

        public async Task<UserLike> GetUserLike(int sourceId, int targetId)
        {
            return await _dataContext.UserLike.FindAsync(sourceId, targetId);
        }

        public async Task<PagedList<MemberDto>> GetUserLIkes(GetLikeParams getLikeParams, int userId)
        {
            var users = _dataContext.Users.AsQueryable();
            var likes = _dataContext.UserLike.AsQueryable();

            if(getLikeParams.predicateUserLike == PredicateLikeEnum.liked)
            {
                likes = likes.Include(x => x.TargetUser)
                    .ThenInclude(x => x.Photos)
                    .Where(x => x.SourceUserId == userId);
                users = likes.Select(x => x.TargetUser);
            }
            if(getLikeParams.predicateUserLike == PredicateLikeEnum.likeby)
            {
                likes = likes.Include(x => x.SourceUser)
                   .ThenInclude(x => x.Photos)
                   .Where(x => x.TargetUserId == userId);
                users = likes.Select(x => x.SourceUser);
            }

            var result = users.ProjectTo<MemberDto>(_mapper.ConfigurationProvider);
            return await PagedList<MemberDto>.CreateAsync(result, getLikeParams.PageNumber, getLikeParams.PageSize);

            
        }

        public async Task<Users> GetUserWithLike(int userId)
        {
            return await _dataContext.Users.Include(x => x.TargetUserlikes)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }

        public async Task<bool> Saveasync()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }
    }
}
