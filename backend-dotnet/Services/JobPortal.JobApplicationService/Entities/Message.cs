using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.JobApplications.Entities;

[Table("message")]
public class Message
{
    [Key]
    [Column("msgid")]
    public int Msgid { get; set; }

    [Column("sender_id")]
    public int? SenderId { get; set; }

    [Column("receiver_id")]
    public int? ReceiverId { get; set; }

    [Column("datetime")]
    public DateTime Datetime { get; set; } = DateTime.Now;

    [Required]
    [Column("text_message", TypeName = "TEXT")]
    public string TextMessage { get; set; } = string.Empty;
}
