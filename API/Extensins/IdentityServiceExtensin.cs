using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensins
{
    public  static class IdentityServiceExtensin
    {
        public static IServiceCollection AddIdentityService( this IServiceCollection services , IConfiguration configuration)
        {
              services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(option=>
            {
                option.TokenValidationParameters = new TokenValidationParameters
                {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Token:Key"]))


                };

            });
            
            return services;

        }
    }
}