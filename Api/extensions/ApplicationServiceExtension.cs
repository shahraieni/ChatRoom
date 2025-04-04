
using Api.Data;
using Api.interfaces;
using Api.services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Api.extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services , IConfiguration configuration)
        {
             services.AddScoped<ITokenService,TokenService>();

               services.AddDbContext<DataContext>(options =>{
                     options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });


            services.AddControllers();

            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api", Version = "v1" });
            });
            services.AddIdentityService(configuration);
            return services;

        }
    }
}