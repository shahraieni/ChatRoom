using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;

namespace Api.Errors
{
    public class ApiValidationErrorResponse : ApiResponse
    {
        public IEnumerable<string> Errors {get; set;}
        public ApiValidationErrorResponse(int statusCode = 400, string message = null) : base(statusCode, message)
        {
        }
    }
}