using System.Net;
using System.Text.Json;
using JobPortal.EmployerProfiles.Exceptions;

namespace JobPortal.EmployerProfiles.Middleware;

public class GlobalExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;

    public GlobalExceptionHandlerMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (HttpStatusException ex)
        {
            await WriteErrorResponseAsync(context, ex.StatusCode, ex.Message);
        }
        catch (Exception ex)
        {
            await WriteErrorResponseAsync(context, HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    private static Task WriteErrorResponseAsync(HttpContext context, HttpStatusCode statusCode, string message)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var reasonPhrase = GetReasonPhrase(statusCode);

        var response = new Dictionary<string, object>
        {
            { "timestamp", DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss.fff") },
            { "status", (int)statusCode },
            { "error", reasonPhrase },
            { "message", message }
        };

        var json = JsonSerializer.Serialize(response);
        return context.Response.WriteAsync(json);
    }

    private static string GetReasonPhrase(HttpStatusCode statusCode)
    {
        return statusCode switch
        {
            HttpStatusCode.OK => "OK",
            HttpStatusCode.Created => "Created",
            HttpStatusCode.NoContent => "No Content",
            HttpStatusCode.BadRequest => "Bad Request",
            HttpStatusCode.Unauthorized => "Unauthorized",
            HttpStatusCode.Forbidden => "Forbidden",
            HttpStatusCode.NotFound => "Not Found",
            HttpStatusCode.Conflict => "Conflict",
            HttpStatusCode.InternalServerError => "Internal Server Error",
            _ => statusCode.ToString()
        };
    }
}
