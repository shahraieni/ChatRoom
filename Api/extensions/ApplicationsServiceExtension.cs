using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Errors;
using Api.Helpers;
using Api.interfaces;
using Api.Middlewares;
using Api.services;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Api.extensions
{
    public  static  class ApplicationsServiceExtension
    {
         public static IServiceCollection  AddApplicationService(this IServiceCollection services , IConfiguration configuration)
         {
                services.AddScoped<ITokenService , TokenService>();
                services.AddScoped<IUserRepository , UserRepository>();
                services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IUserLikeRepository, UserLikeRepository>();

            services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);


                
              services.AddDbContext<DataContext>(options =>{
                     options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddScoped<LogUserActivity>();

             services.Configure<CloudinarySettings>(configuration.GetSection("CloudinarySettings"));
             services.AddScoped<IPhotoService , PhotoService>();


            services.AddControllers();

            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api", Version = "v1" });
            });

           
               //validation error handling
            services.Configure<ApiBehaviorOptions>(options =>
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState.Where(e => e.Value.Errors.Count > 0).SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray();
                    var errorResponse = new ApiValidationErrorResponse
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