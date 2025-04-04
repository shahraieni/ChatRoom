using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Entities;

namespace Api.interfaces
{
    public interface ITokenService
    {
        string CreateToken(Users user);
    }
}