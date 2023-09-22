using API.Data;
using API.Extensins;
using API.Interfases;
using API.Servisce;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Protocols;
using Microsoft.OpenApi.Models;

namespace API.extensions
{
    public  static class AppserviceExtensin
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services , IConfiguration configuration)
        {
             //DEPANANSY INGCTIN
            services.AddScoped<ITokenService,TokenService>();
             //connect to database
             services.AddDbContext<DataContext>(options=>{
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));

            });
              services.AddControllers();
                 services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
            services.AddIdentityService(configuration);
            return services;
        }
    }
}