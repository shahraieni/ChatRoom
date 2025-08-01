using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Api.extensions
{
    public static   class ClaimsPrincipleExtension
    {
          public static string GetUserName(this ClaimsPrincipal principal)
        {
            return principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
        public static int GetUserId(this ClaimsPrincipal principal)
        {
            var userId = principal?.Claims.ToList().FirstOrDefault(x => x.Type == "sid")?.Value;
            return int.Parse(userId);
            // return Convert.ToInt32(principal.FindFirst(ClaimTypes.Sid)?.Value);


        }
    }
}