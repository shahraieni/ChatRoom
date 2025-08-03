using Api.Data;
using Api.Entites;
using Api.Helpers;
using Api.interfaces;
using Api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.services
{
    public class MessgeRepository : IMessageRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MessgeRepository(DataContext context , IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async  Task AddMessage(Message message)
        {
            await _context.Message.AddAsync(message);
        }

        public void DeleteMessage(Message message)
        {
            throw new System.NotImplementedException();
        }

        public async   Task<Message> GetMessageById(int id)
        {
            return await _context.Message.FindAsync(id);
        }

        public  async Task<PagedList<MessageDto>> GetMessageForUser(MessageParams  messageParams)
        {
            var query = _context.Message.OrderByDescending(x => x.MessageSent).AsQueryable();
            query = messageParams.Container switch
            {
                "Inbox" => query.Where(x => x.ReceiverUserName == messageParams.UserName),
                "outbox" => query.Where(x => x.SenterUserName == messageParams.UserName),
                _ => query.Where(x => x.ReceiverUserName == messageParams.UserName && !x.DateRead.HasValue),
            };
            var message = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);
            return await PagedList<MessageDto>.CreateAsync(message , messageParams.PageNumber,messageParams.PageSize);
        } 

        public async   Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserName, string recipientName)
        {
            var messages = await _context.Message.Where(
                    x => x.ReceiverUserName == currentUserName &&
                    x.SenterUserName == recipientName ||
                    x.SenterUserName == currentUserName &&
                    x.ReceiverUserName == recipientName)
                .ProjectTo<MessageDto>(_mapper.ConfigurationProvider)
                .OrderBy(x => x.MessageSent)
                .ToListAsync();
            await UpdateMessageToRead(messages, currentUserName);
            return messages;
        }

        public async   Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public  async Task UpdateMessageToRead(List<MessageDto> messages, string userName)
        {
            messages = messages.Where(x => !x.DateRead.HasValue && x.ReceiverUserName == userName).ToList(); //دریافت ککنده خودم باشم
            if (messages.Any())
            {
                messages.ForEach(x =>
                {
                    x.DateRead = DateTime.Now;
                    x.IsRead = true;
                });
                _context.UpdateRange(_mapper.Map<List<Message>>(messages));
                await _context.SaveChangesAsync();
            }
        }
    }


  
}
