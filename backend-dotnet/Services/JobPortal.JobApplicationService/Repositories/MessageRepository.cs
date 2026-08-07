using Microsoft.EntityFrameworkCore;
using JobPortal.JobApplications.Data;
using JobPortal.JobApplications.Entities;
using JobPortal.JobApplications.Interfaces;

namespace JobPortal.JobApplications.Repositories;

public class MessageRepository : IMessageRepository
{
    private readonly JobApplicationDbContext _context;

    public MessageRepository(JobApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Message> SaveAsync(Message message)
    {
        if (message.Msgid == 0)
        {
            await _context.Messages.AddAsync(message);
        }
        else
        {
            _context.Messages.Update(message);
        }
        await _context.SaveChangesAsync();
        return message;
    }

    public async Task<List<Message>> FindChatHistoryAsync(int user1, int user2)
    {
        return await _context.Messages
            .Where(m => (m.SenderId == user1 && m.ReceiverId == user2) ||
                        (m.SenderId == user2 && m.ReceiverId == user1))
            .OrderBy(m => m.Datetime)
            .ToListAsync();
    }
}
