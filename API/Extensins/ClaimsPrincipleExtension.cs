using System.Security.Claims;

namespace API.Extensins
{
    public static  class ClaimsPrincipleExtension
    {
         public static string GetUserName(this ClaimsPrincipal principal)
        {
            return principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}