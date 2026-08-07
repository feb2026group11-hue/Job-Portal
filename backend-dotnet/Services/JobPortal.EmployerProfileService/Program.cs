using System.Text;
using JobPortal.EmployerProfiles.Data;
using JobPortal.EmployerProfiles.Interfaces;
using JobPortal.EmployerProfiles.Mappings;
using JobPortal.EmployerProfiles.Middleware;
using JobPortal.EmployerProfiles.Repositories;
using JobPortal.EmployerProfiles.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Configure port 8085
builder.WebHost.UseUrls("http://localhost:8085");

// Add DB Context with MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<EmployerProfileDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Add Repositories & Services
builder.Services.AddScoped<IEmployerProfileRepository, EmployerProfileRepository>();
builder.Services.AddScoped<EmployerProfileService>();

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// JWT Authentication setup matching AuthService exactly
var jwtSecret = builder.Configuration["JwtSettings:Secret"] ?? "mysecretkeymysecretkeymysecretkey123456";
var key = Encoding.UTF8.GetBytes(jwtSecret);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        // Custom format for validation errors to match MethodArgumentNotValidException of Spring Boot
        options.InvalidModelStateResponseFactory = context =>
        {
            var fields = context.ModelState
                .Where(e => e.Value?.Errors.Count > 0)
                .ToDictionary(
                    kvp =>
                    {
                        // Convert property name to camelCase to match Java field names
                        var key = kvp.Key;
                        if (string.IsNullOrEmpty(key)) return key;
                        return char.ToLower(key[0]) + key.Substring(1);
                    },
                    kvp => kvp.Value!.Errors.First().ErrorMessage
                );

            var responseBody = new Dictionary<string, object>
            {
                { "timestamp", DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss.fff") },
                { "status", 400 },
                { "error", "Bad Request" },
                { "message", "Validation failed" },
                { "fields", fields }
            };

            return new BadRequestObjectResult(responseBody);
        };
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable Global Exception Handler Middleware
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

Console.WriteLine("🚀 JobPortal Employer Profile Service running on http://localhost:8085");
app.Run();
