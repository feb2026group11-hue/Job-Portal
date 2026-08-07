using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using JobPortal.Shared.Data;
using JobPortal.CandidateService.Services;

var builder = WebApplication.CreateBuilder(args);

// Configure Candidate Service to run on Port 8082
builder.WebHost.UseUrls("http://localhost:8082");

// Database configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<JobPortalDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// HTTP Client for ResumeParserService
builder.Services.AddHttpClient<ResumeParserService>();

// Register Service Layer classes for Dependency Injection
builder.Services.AddScoped<CandidateSkillsService>();
builder.Services.AddScoped<CandidateProfileService>();
builder.Services.AddScoped<CandidateEducationService>();
builder.Services.AddScoped<CandidateExperienceService>();
builder.Services.AddScoped<CandidateProjectService>();
builder.Services.AddScoped<CandidateCertificateService>();
builder.Services.AddScoped<SkillService>();
builder.Services.AddScoped<CandidateResumeService>();

// JWT authentication configuration (same as AuthService for token validation compatibility)
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

// Configure CORS for web client integration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

Console.WriteLine("🚀 JobPortal Candidate Service running on http://localhost:8082");
app.Run();
