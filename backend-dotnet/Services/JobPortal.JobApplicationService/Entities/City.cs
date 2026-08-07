using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.JobApplications.Entities;

[Table("city")]
public class City
{
    [Key]
    [Column("cid")]
    public int Cid { get; set; }

    [Column("cname")]
    public string? Cname { get; set; }

    [Column("sid")]
    public int? Sid { get; set; }

    public City() { }

    public City(int cid, string? cname, int? sid)
    {
        Cid = cid;
        Cname = cname;
        Sid = sid;
    }
}
