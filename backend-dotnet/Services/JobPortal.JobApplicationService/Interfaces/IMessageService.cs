using JobPortal.JobApplications.DTOs;

namespace JobPortal.JobApplications.Interfaces;

public interface IMessageService
{
    Task<MessageDto> SendMessageAsync(MessageDto messageDto);
    Task<List<MessageDto>> GetChatHistoryAsync(int user1, int user2);
}
