using System.Net;
using System.Text.Json;
using JobPortal.JobApplications.Exceptions;

namespace JobPortal.JobApplications.Middleware;

public class GlobalExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;

    public GlobalExceptionHandlerMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlerMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred.");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        int statusCode = (int)HttpStatusCode.InternalServerError;
        string error = "Internal Server Error";
        string message = exception.Message;

        if (exception is NotFoundException)
        {
            statusCode = (int)HttpStatusCode.NotFound;
            error = "Not Found";
        }
        else if (exception is BadRequestException)
        {
            statusCode = (int)HttpStatusCode.BadRequest;
            error = "Bad Request";
        }

        context.Response.StatusCode = statusCode;

        var responseBody = new Dictionary<string, object>
        {
            { "timestamp", DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss.fff") },
            { "status", statusCode },
            { "error", error },
            { "message", message }
        };

        var jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        return context.Response.WriteAsync(JsonSerializer.Serialize(responseBody, jsonOptions));
    }
}
