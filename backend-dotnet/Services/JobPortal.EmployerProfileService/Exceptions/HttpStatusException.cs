using System.Net;

namespace JobPortal.EmployerProfiles.Exceptions;

public class HttpStatusException : Exception
{
    public HttpStatusCode StatusCode { get; }

    public HttpStatusException(HttpStatusCode statusCode, string message) : base(message)
    {
        StatusCode = statusCode;
    }
}
