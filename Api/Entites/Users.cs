using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Api.extensions;

namespace Api.Entites
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[]  PasswordSalt { get; set; }
        public string Email { get; set; }
        public DateTime Birthday { get; set; }
        public DateTime LastActive { get; set; }
        public string KnowAs { get; set; }
        public string City { get; set; }
        public  string Country { get; set; }
        public ICollection<Photo> Photos { get; set; }

         //get age
        public int GetAge()
        {
            return Birthday.CalculateAge();
        }


    }
}