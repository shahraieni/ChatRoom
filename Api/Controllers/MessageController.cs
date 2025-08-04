using Api.Entites;
using Api.extensions;
using Api.Helpers;
using Api.interfaces;
using Api.Models;
using API.Errors;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Controllers
{
    public class MessageController : BaseApiController
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public MessageController(IMessageRepository messageRepository, IUserRepository userRepository, IMapper mapper)
        {
            _messageRepository = messageRepository;
            _userRepository = userRepository;
            _mapper = mapper;

        }
        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessage)
        {
           // var currentUser = User.GetUserName();
            var currentUser = "todd";
            if (currentUser == createMessage.RecipientUserName) return BadRequest("You cannat send message to yourself");
            var sender = await _userRepository.GetUserByUserName(currentUser);
            if (sender == null) return BadRequest(new ApiResponse(404,"Sender not found"));
            var recipient = await _userRepository.GetUserByUserName(createMessage.RecipientUserName);
            if (recipient == null) return BadRequest(new ApiResponse(404, "Recipient not found"));
            var message = new Message
            {
                SenterId = sender.Id,
                SenterUserName = sender.UserName,
                ReceiverId = recipient.Id,
                ReceiverUserName = recipient.UserName,
                Content = createMessage.Content,
                MessageSent = DateTime.Now
            };

            await _messageRepository.AddMessage(message);
            if(await _messageRepository.SaveAll())
            {
                return Ok(_mapper.Map<Message , MessageDto>(message));
            }

            return BadRequest(new ApiResponse(400, "Failed to send message"));
           
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<MessageDto>>> GetMessages([FromQuery] MessageParams messageParams)
        {

            var currntUserName = User.GetUserName();
            messageParams.UserName = currntUserName;
            return Ok(await _messageRepository.GetMessageForUser(messageParams));
        }

        [HttpGet("thread/{UserName}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string userName)
        {
         // var currnetUserName = User.GetUserName();
           var currnetUserName = "todd";
            return Ok(await _messageRepository.GetMessageThread(currnetUserName, userName));
        }
    }
}
