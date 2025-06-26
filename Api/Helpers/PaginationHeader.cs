using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Helpers
{
    public class PaginationHeader
    {
        public PaginationHeader(int currentPage, int itemParPage, int totalItems, int totalPages)
        {

        }
        public int CurrentPage { get; set; }
        public int ItemParPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }

    }
}