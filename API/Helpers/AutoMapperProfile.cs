using API.Entitis;
using API.models;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Users ,MemberDto>();
        }
        
    }
}