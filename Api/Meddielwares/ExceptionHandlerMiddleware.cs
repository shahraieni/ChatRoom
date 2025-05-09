using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Api.Errors;
using API.Errors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Api.Meddielwares
{
    public class ExceptionHandlerMiddleware
    {
         private readonly IWebHostEnvironment _env;
        private readonly ILoggerFactory _logger;
        private readonly RequestDelegate _next;

        public ExceptionHandlerMiddleware(IWebHostEnvironment env, ILoggerFactory logger, RequestDelegate next)
        {
            _env = env;
            _logger = logger;
            _next = next;


        }

          public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                //for console
                var logger = _logger.CreateLogger("ExceptionHandleMiddleware");
                logger.LogError(ex, ex.Message);

                //send error to client
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                var response = _env.IsDevelopment() ?
                    new ApiExeption(context.Response.StatusCode, ex?.Message, ex?.StackTrace?.ToString()) :
                    new ApiResponse((int)HttpStatusCode.InternalServerError,ex?.Message);

                 var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(response ,options);
                await context.Response.WriteAsync(json);
                
            }
        }
    }
}