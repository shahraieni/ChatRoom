using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.extensions;
using Api.interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Middlewares
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();
            if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;
            var userName = resultContext.HttpContext.User.GetUserName();
            var rep = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
            var user = await rep.GetUserByUserName(userName);
            user.LastActive = DateTime.Now;
            rep.Update(user);
            await  rep.SaveAllAsync();   
        }
    }
}