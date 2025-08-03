using Api.Entites;
using Api.Helpers;
using Api.Models;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.interfaces
{
    public interface IMessageRepository
    {
        Task AddMessage(Message message);
        Task<Message> GetMessageById(int id);   
        void DeleteMessage(Message message);
        Task<PagedList<MessageDto>> GetMessageForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDto>> GetMessageThread(string currenUserId, string recipientName);
        Task<bool> SaveAll();
        Task UpdateMessageToRead(List<MessageDto> messages, string userName);
    }
}
