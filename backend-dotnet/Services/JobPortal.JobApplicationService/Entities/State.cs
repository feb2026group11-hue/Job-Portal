using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.JobApplications.Entities;

[Table("state")]
public class State
{
    [Key]
    [Column("sid")]
    public int Sid { get; set; }

    [Column("sname")]
    public string? Sname { get; set; }

    public State() { }

    public State(int sid, string? sname)
    {
        Sid = sid;
        Sname = sname;
    }
}
