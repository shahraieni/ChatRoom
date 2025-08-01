using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Enums;

namespace Api.Models
{
    public class UserParams :BasePagination
    {
       
      
        public string currentUserName { get; set; }
        public GenderEnum Gender { get; set; } = GenderEnum.Male;
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 150;
        public OrderByEnum OrderBy { get; set; } = OrderByEnum.lastActive;
        public TypeSort TypeSort { get; set; }
 
       
       
    }

    public enum OrderByEnum
    {
        lastActive,
        created,
        age,
    }

    public enum TypeSort
    {
        asc,
        desc
    }
}