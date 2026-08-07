using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JobPortal.Shared.Data;
using JobPortal.Shared.Entities;
using JobPortal.CandidateService.DTOs;

namespace JobPortal.CandidateService.Services;

public class CandidateCertificateService
{
    private readonly JobPortalDbContext _context;

    public CandidateCertificateService(JobPortalDbContext context)
    {
        _context = context;
    }

    public async Task<CandidateCertificateDto> AddCertificateAsync(CandidateCertificateDto dto)
    {
        var certificate = new CandidateCertificate
        {
            Cid = dto.Cid,
            Name = dto.Name,
            IssuedBy = dto.IssuedBy,
            IssueDate = dto.IssueDate,
            ExpiryDate = dto.ExpiryDate,
            Duration = dto.Duration,
            Image = dto.Image
        };

        _context.CandidateCertificates.Add(certificate);
        await _context.SaveChangesAsync();

        return ToDto(certificate);
    }

    public async Task<CandidateCertificateDto> UpdateCertificateAsync(int certiId, CandidateCertificateDto dto)
    {
        var certificate = await _context.CandidateCertificates.FindAsync(certiId);
        if (certificate == null)
        {
            throw new KeyNotFoundException("Certificate not found");
        }

        certificate.Cid = dto.Cid;
        certificate.Name = dto.Name;
        certificate.IssuedBy = dto.IssuedBy;
        certificate.IssueDate = dto.IssueDate;
        certificate.ExpiryDate = dto.ExpiryDate;
        certificate.Duration = dto.Duration;
        certificate.Image = dto.Image;

        await _context.SaveChangesAsync();
        return ToDto(certificate);
    }

    public async Task DeleteCertificateAsync(int certiId)
    {
        var certificate = await _context.CandidateCertificates.FindAsync(certiId);
        if (certificate == null)
        {
            throw new KeyNotFoundException("Certificate not found");
        }

        _context.CandidateCertificates.Remove(certificate);
        await _context.SaveChangesAsync();
    }

    public async Task<CandidateCertificateDto> GetCertificateByIdAsync(int certiId)
    {
        var certificate = await _context.CandidateCertificates.FindAsync(certiId);
        if (certificate == null)
        {
            throw new KeyNotFoundException("Certificate not found");
        }
        return ToDto(certificate);
    }

    public async Task<List<CandidateCertificateDto>> GetCertificatesByCandidateAsync(int cid)
    {
        var list = await _context.CandidateCertificates.Where(c => c.Cid == cid).ToListAsync();
        return list.Select(ToDto).ToList();
    }

    public async Task<List<CandidateCertificateDto>> GetAllCertificatesAsync()
    {
        var list = await _context.CandidateCertificates.ToListAsync();
        return list.Select(ToDto).ToList();
    }

    private CandidateCertificateDto ToDto(CandidateCertificate certificate)
    {
        return new CandidateCertificateDto
        {
            CertiId = certificate.CertiId,
            Cid = certificate.Cid,
            Name = certificate.Name,
            IssuedBy = certificate.IssuedBy,
            IssueDate = certificate.IssueDate,
            ExpiryDate = certificate.ExpiryDate,
            Duration = certificate.Duration,
            Image = certificate.Image
        };
    }
}
