using System.ComponentModel.DataAnnotations;

namespace JobPortal.JobApplications.DTOs;

public class MessageDto
{
    public int? Msgid { get; set; }

    [Required(ErrorMessage = "Sender ID is required")]
    public int? SenderId { get; set; }

    [Required(ErrorMessage = "Receiver ID is required")]
    public int? ReceiverId { get; set; }

    public DateTime? Datetime { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "Message text cannot be blank")]
    public string TextMessage { get; set; } = string.Empty;
}
