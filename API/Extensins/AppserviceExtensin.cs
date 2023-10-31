using System.Linq;
using API.Data;
using API.Errors;
using API.Extensins;
using API.Interfaces;
using API.Interfases;
using API.Servisce;
using Microsoft.AspNetCore.Mvc;
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
            services.AddScoped<IUserRepository , UserRepository>();
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

            //validation error handling
             services.Configure<ApiBehaviorOptions>(option=>
                option.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState.Where(e=>e.Value.Errors.Count>0)
                    .SelectMany(x=>x.Value.Errors)
                    .Select(x=>x.ErrorMessage).ToArray();
                    var errorResponse = new AipValidationErrorResponse
                    {
                        Errors = errors
                    };

                    return new BadRequestObjectResult(errorResponse);

                });
            services.AddIdentityService(configuration);
            return services;
        }
    }
}