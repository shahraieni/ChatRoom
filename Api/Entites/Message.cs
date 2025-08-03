using System;

namespace Api.Entites
{
    public class Message
    {
        public int Id { get; set; }
        public int SenterId { get; set; }
        public string SenterUserName { get; set; }
        public int ReceiverId { get; set; }
        public string ReceiverUserName { get; set; }
        public string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime? MessageSent { get; set; } = DateTime.Now;
        public bool SentrDeleted { get; set; }
        public bool ReceverDeleted { get; set; }
        public bool IsRead { get; set; }

        public Users Senter { get; set; }
        public Users Receiver { get; set; }


    }
}
