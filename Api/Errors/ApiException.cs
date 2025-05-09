using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;

namespace Api.Errors
{
   public class ApiExeption : ApiResponse
    {
        public string Detail { get; set; }
        public ApiExeption(int statusCode, string message = null , string detail = null) : base(statusCode, message)
        {
            Detail = detail;
        }
    }
}