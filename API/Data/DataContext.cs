using API.Entitis;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext:DbContext
    {
         public DataContext(DbContextOptions options) : base(options)
        {
        }
         public DbSet<Users> Users { get; set; }
         public DbSet<Photo> photo { get; set; }
    }
}