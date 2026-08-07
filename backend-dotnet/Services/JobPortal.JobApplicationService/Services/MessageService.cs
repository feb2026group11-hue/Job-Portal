using JobPortal.JobApplications.DTOs;
using JobPortal.JobApplications.Entities;
using JobPortal.JobApplications.Interfaces;

namespace JobPortal.JobApplications.Services;

public class MessageService : IMessageService
{
    private readonly IMessageRepository _messageRepository;

    public MessageService(IMessageRepository messageRepository)
    {
        _messageRepository = messageRepository;
    }

    public async Task<MessageDto> SendMessageAsync(MessageDto messageDto)
    {
        var msg = new Message
        {
            SenderId = messageDto.SenderId,
            ReceiverId = messageDto.ReceiverId,
            TextMessage = messageDto.TextMessage,
            Datetime = DateTime.Now
        };

        var saved = await _messageRepository.SaveAsync(msg);
        return MapEntityToDto(saved);
    }

    public async Task<List<MessageDto>> GetChatHistoryAsync(int user1, int user2)
    {
        var history = await _messageRepository.FindChatHistoryAsync(user1, user2);
        return history.Select(MapEntityToDto).ToList();
    }

    private static MessageDto MapEntityToDto(Message entity)
    {
        return new MessageDto
        {
            Msgid = entity.Msgid,
            SenderId = entity.SenderId,
            ReceiverId = entity.ReceiverId,
            Datetime = entity.Datetime,
            TextMessage = entity.TextMessage
        };
    }
}
