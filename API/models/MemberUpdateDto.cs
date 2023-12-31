using System.ComponentModel.DataAnnotations;

namespace API.models
{
    public class MemberUpdateDto
    {
        
       
        public string Email { get; set; }
       
        public string KnownAs  { get; set; }
        
        public string Introduction { get; set; }
        
        public string LookingFor { get; set; }
        
        public string Interests { get; set; }
        
        public string City { get; set; }
        
        public string Country { get; set; }
       
        
    }
}