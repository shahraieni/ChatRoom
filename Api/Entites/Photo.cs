using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entites
{
    public class Photo
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }

        // [ForeignKey(nameof(UserId))]
        public Users Users { get; set; }
    }
}