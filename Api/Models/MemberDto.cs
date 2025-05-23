using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.extensions;

namespace Api.Models
{
    public class MemberDto
    {
     
        public int Id { get; set; }
        public string UserName { get; set; }
       
        public string Email { get; set; }
        public DateTime Birthday { get; set; }
        public DateTime LastActive { get; set; }
        public string KnowAs { get; set; }
        public string City { get; set; }
        public  string Country { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        public int Age { get; set; }
 
           public int GetAge()
        {
            return Birthday.CalculateAge();
        }

    }
}