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
    public DbSet<CandidateProfile> CandidateProfiles => Set<CandidateProfile>();
    public DbSet<CandidateEducation> CandidateEducations => Set<CandidateEducation>();
    public DbSet<CandidateExperience> CandidateExperiences => Set<CandidateExperience>();
    public DbSet<CandidateProject> CandidateProjects => Set<CandidateProject>();
    public DbSet<CandidateCertificate> CandidateCertificates => Set<CandidateCertificate>();
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<CandidateSkills> CandidateSkills => Set<CandidateSkills>();
    public DbSet<CandidateResume> CandidateResumes => Set<CandidateResume>();

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

        modelBuilder.Entity<CandidateProfile>(entity =>
        {
            entity.HasKey(e => e.Cid);
            entity.HasIndex(e => e.Uid).IsUnique();
        });

        modelBuilder.Entity<CandidateEducation>(entity =>
        {
            entity.HasKey(e => e.Ceid);
        });

        modelBuilder.Entity<CandidateExperience>(entity =>
        {
            entity.HasKey(e => e.ExpId);
        });

        modelBuilder.Entity<CandidateProject>(entity =>
        {
            entity.HasKey(e => e.Cpid);
        });

        modelBuilder.Entity<CandidateCertificate>(entity =>
        {
            entity.HasKey(e => e.CertiId);
        });

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.HasKey(e => e.SkillId);
            entity.HasIndex(e => e.SkillName).IsUnique();
        });

        modelBuilder.Entity<CandidateSkills>(entity =>
        {
            entity.HasKey(e => e.CsId);
        });

        modelBuilder.Entity<CandidateResume>(entity =>
        {
            entity.HasKey(e => e.ResumeId);
            entity.HasOne(e => e.CandidateProfile)
                  .WithMany()
                  .HasForeignKey(e => e.Cid);
        });
    }
}
