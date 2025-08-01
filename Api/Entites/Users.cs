using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Api.Enums;
using Api.extensions;

namespace Api.Entites
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public GenderEnum Gender { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[]  PasswordSalt { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public string Interests { get; set; }
        public string LookingFor { get; set; }
        public string KnownAs { get; set; }
        public string City { get; set; }
        public  string Country { get; set; }
        public DateTime Created { get; set; }

        [InverseProperty("Users")]
        public ICollection<Photo> Photos { get; set; }

        public ICollection<UserLike>   SourceUserlikes{ get; set; }
        public ICollection<UserLike> TargetUserlikes { get; set; }

        //get age
        public int GetAge()
        {
            return DateOfBirth.CalculateAge();
        }


    }
}