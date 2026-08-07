using Microsoft.EntityFrameworkCore;
using JobPortal.Shared.Entities;

namespace JobPortal.Shared.Data;

public class JobPortalDbContext : DbContext
{
    public JobPortalDbContext(DbContextOptions<JobPortalDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Uid);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasIndex(e => e.Phone).IsUnique();

            entity.HasOne(e => e.Role)
                  .WithMany()
                  .HasForeignKey(e => e.Rid);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Rid);
            entity.HasIndex(e => e.Rname).IsUnique();
        });
    }
}
