using Microsoft.AspNetCore.Mvc;
using JobPortal.JobApplications.DTOs;
using JobPortal.JobApplications.Interfaces;

namespace JobPortal.JobApplications.Controllers;

[ApiController]
[Route("api/messages")]
public class MessageController : ControllerBase
{
    private readonly IMessageService _messageService;

    public MessageController(IMessageService messageService)
    {
        _messageService = messageService;
    }

    [HttpPost]
    public async Task<IActionResult> SendMessage([FromBody] MessageDto request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var response = await _messageService.SendMessageAsync(request);
        return StatusCode(StatusCodes.Status201Created, response);
    }

    [HttpGet("history")]
    public async Task<ActionResult<List<MessageDto>>> GetChatHistory(
        [FromQuery] int user1,
        [FromQuery] int user2)
    {
        var response = await _messageService.GetChatHistoryAsync(user1, user2);
        return Ok(response);
    }
}
