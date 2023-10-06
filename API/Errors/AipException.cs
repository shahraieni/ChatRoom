namespace API.Errors
{
    public class AipException : ApiResponse
    {
        public string  Detail { get; set; }
        public AipException(int statusCode, string message = null , string detail =null) : base(statusCode, message)
        {
            Detail = detail;
        }

    }
}