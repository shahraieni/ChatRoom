using System.Linq;
using API.Entitis;
using API.models;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Users ,MemberDto>()
           .ForMember(x => x.DateOfBirth, c => c.MapFrom(v => v.DateOfBirth.Date.ToString("yyyy/MM/dd")))
            .ForMember(x=>x.Age , c=>c.MapFrom(v=>v.GetAge()))
            .ForMember(x=>x.PhotoUrl , C=>C.MapFrom(V=>V.Photos.FirstOrDefault(B=>B.IsMain).Url));

            CreateMap<Photo , PhotoDto>();
        }
        
    }
}