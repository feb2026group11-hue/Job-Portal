using JobPortal.JobApplications.Entities;

namespace JobPortal.JobApplications.Interfaces;

public interface IMessageRepository
{
    Task<Message> SaveAsync(Message message);
    Task<List<Message>> FindChatHistoryAsync(int user1, int user2);
}
