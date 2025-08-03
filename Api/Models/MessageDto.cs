using Api.Entites;
using System;

namespace Api.Models
{
    public class MessageDto
    {
        public int Id { get; set; }
        public int SenterId { get; set; }
        public string SenterUserName { get; set; }
        public string SenderPhotoUrl { get; set; }
        public int ReceiverId { get; set; }
        public string ReceiverUserName { get; set; }
        public string ReceiverPhotoUrl { get; set; }
        public string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime? MessageSent { get; set; } = DateTime.Now;
        public bool IsRead { get; set; }


    }
}
