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
        public int Gender { get; set; }
        public string DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public DateTime Created { get; set; }
        public string UserName { get; set; }   
        public string Email { get; set; }
        public DateTime LastActive { get; set; }
        public string KnowAs { get; set; }
        public string City { get; set; }
        public  string Country { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        public int Age { get; set; }
 
        //    public int GetAge()
        // {
        //     return DateOfBirth.CalculateAge();
        // }

    }
}