var builder = WebApplication.CreateBuilder(args);

// Configure port 8080
builder.WebHost.UseUrls("http://localhost:8080");

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add YARP Reverse Proxy
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();

app.UseCors("AllowFrontend");

app.MapReverseProxy();

Console.WriteLine("🚀 JobPortal .NET API Gateway running on http://localhost:8080");
app.Run();
