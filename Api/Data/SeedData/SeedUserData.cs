using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Api.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Api.Data.SeedData
{
    public class SeedUserData
    {
         public static async Task SeedUsers(DataContext context ,ILoggerFactory logger )
        {
            try
            {
                if (!await context.Users.AnyAsync())
                {
                    var userData = await File.ReadAllTextAsync("Data/SeedData/UserSeedData.json");
                    var users = JsonSerializer.Deserialize<List<Users>>(userData);
                    if (users == null) return;
                    foreach (var user in users)
                    {
                        // await userManager.CreateAsync(user, "P@$$w0rd");

                        using var hmac = new HMACSHA512();
                        user.UserName = user.UserName.ToLower();
                        user.PasswordSalt = hmac.Key;
                        user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("P@$$w0rd"));

                    }
                    await context.Users.AddRangeAsync(users);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var log = logger.CreateLogger<SeedUserData>();
                log.LogError(ex.Message);
                throw;
            }
        }
    }
}