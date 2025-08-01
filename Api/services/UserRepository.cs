using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Entites;
using Api.Helpers;
using Api.interfaces;
using Api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Api.services
{
    public class UserRepository : IUserRepository
    {
            private readonly DataContext _context;
            private readonly  IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper )
        {
            _context = context;
            _mapper = mapper;
        }

        public  async Task<IEnumerable<Users>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<PagedList<MemberDto>> GetAllUsersMemberDto(UserParams userParams)
        {
            var query = _context.Users.AsNoTracking();
            query = query.Where(x => x.UserName != userParams.currentUserName);
            query = query.Where(x => x.Gender == userParams.Gender);
            var minDate = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            var maxDate = DateTime.Today.AddYears(-userParams.MinAge );

            query = query.Where(x => x.DateOfBirth.Date >= minDate.Date && x.DateOfBirth.Date <= maxDate.Date);

            if (userParams.TypeSort == TypeSort.desc)
            {

                query = userParams.OrderBy switch
                {

                    OrderByEnum.lastActive => query.OrderByDescending(x => x.LastActive),
                    OrderByEnum.created => query.OrderByDescending(x => x.Created),
                    OrderByEnum.age => query.OrderByDescending(x => x.DateOfBirth),
                    _ => query.OrderByDescending(x => x.LastActive)
                };
            }
            else
            {
                
                   query = userParams.OrderBy switch
                    {
                    
                        OrderByEnum.lastActive => query.OrderBy(x => x.LastActive),
                        OrderByEnum.created => query.OrderBy(x => x.Created),
                        OrderByEnum.age => query.OrderBy(x => x.DateOfBirth),
                        _ => query.OrderBy(x=>x.LastActive)
                    };  
            }

            var result = query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider);
            var items = await PagedList<MemberDto>.CreateAsync(result, userParams.PageNumber, userParams.PageSize);

            return items;
        }

        public async Task<MemberDto> GetMemberDtoById(int userId)
        {
            return await _context.Users.ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(x=>x.Id == userId);
        }

        public async  Task<MemberDto> GetMemberDtoByUserName(string userName)
        {
             return await _context.Users.ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(x=>x.UserName.ToLower() == userName.ToLower());
        }

        public async  Task<Users> GetUserById(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<Users> GetUserByUserName(string userName)
        {
            return await _context.Users
            .SingleOrDefaultAsync(x =>x.UserName.ToLower() == userName.ToLower());
        }

        public async Task<Users> GetUserByUserNameWithPhotos(string userName)
        {
            return await _context.Users.Include(x=> x.Photos)
            .SingleOrDefaultAsync(x =>x.UserName.ToLower() == userName.ToLower());
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0 ;
        }

        public void Update(Users user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}