using Microsoft.EntityFrameworkCore;
using JobPortal.EmployerProfiles.Models;

namespace JobPortal.EmployerProfiles.Data;

public class EmployerProfileDbContext : DbContext
{
    public EmployerProfileDbContext(DbContextOptions<EmployerProfileDbContext> options) : base(options)
    {
    }

    public DbSet<EmployerProfile> EmployerProfiles => Set<EmployerProfile>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<EmployerProfile>(entity =>
        {
            entity.HasKey(e => e.EmployerId);
            
            entity.HasIndex(e => e.UserId).IsUnique();
            entity.HasIndex(e => e.RegistrationId).IsUnique();

            entity.Property(e => e.CompanyName).HasMaxLength(150);
            entity.Property(e => e.Email).HasMaxLength(150);
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.Country).HasMaxLength(50);
            entity.Property(e => e.RegistrationId).HasMaxLength(100);
            entity.Property(e => e.Industry).HasMaxLength(100);
        });
    }
}
