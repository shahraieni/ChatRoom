using System;
using System.Collections.Generic;
using API.Extensins;

namespace API.models
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
        public string Contry { get; set; }
        public string PhotoURL { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        //get age
         public int GetAge()
        {
            return Birthday.calculatAge();
        }
    }
        
    
}