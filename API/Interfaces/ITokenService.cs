using API.Entitis;

namespace API.Interfases
{
    public interface ITokenService
    {
         string CreateToken(Users user);
    }
}