using System.ComponentModel.DataAnnotations;

namespace API.Entitis
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}