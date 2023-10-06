using System;
using System.Diagnostics.SymbolStore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace API.Middlewares
{
    public class ExceptionHandlerMiddleware

    {
        private readonly  IWebHostEnvironment _env;
        private readonly  ILoggerFactory _logger;
        private readonly  RequestDelegate _next;
        public ExceptionHandlerMiddleware(IWebHostEnvironment env, ILoggerFactory logger = null, RequestDelegate next = null)
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
            catch(Exception  ex)
            {
                     throw;
            }
        }
    }
}