using Microsoft.EntityFrameworkCore;
using JobPortal.JobApplications.Entities;

namespace JobPortal.JobApplications.Data;

public class JobApplicationDbContext : DbContext
{
    public JobApplicationDbContext(DbContextOptions<JobApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Job> Jobs => Set<Job>();
    public DbSet<JobApplication> JobApplications => Set<JobApplication>();
    public DbSet<JobStatus> JobStatuses => Set<JobStatus>();
    public DbSet<Message> Messages => Set<Message>();
    public DbSet<State> States => Set<State>();
    public DbSet<City> Cities => Set<City>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Job>(entity =>
        {
            entity.HasKey(e => e.JobId);
        });

        modelBuilder.Entity<JobStatus>(entity =>
        {
            entity.HasKey(e => e.Jsid);
        });

        modelBuilder.Entity<JobApplication>(entity =>
        {
            entity.HasKey(e => e.ApplicationId);
            entity.HasOne(e => e.Status)
                  .WithMany()
                  .HasForeignKey(e => e.StatusId);
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.Msgid);
        });

        modelBuilder.Entity<State>(entity =>
        {
            entity.HasKey(e => e.Sid);
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.Cid);
        });
    }
}
