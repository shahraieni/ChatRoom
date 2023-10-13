using System.Collections.Generic;

namespace API.Errors
{
    public class AipValidationErrorResponse : ApiResponse
    {
        public IEnumerable<string>Errors { get; set; }
        public AipValidationErrorResponse(int statusCode=400, string message = null) : base(statusCode, message)
        {
        }

    }
}