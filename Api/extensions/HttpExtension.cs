using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Api.Helpers;
using Microsoft.AspNetCore.Http;

namespace Api.extensions
{
    public   static class HttpExtension
    {
        public static void AddPaginationHeader(this HttpResponse response, int currentPage, int itemParPage,
        int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemParPage, totalItems, totalPages);
             var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader,options));
             response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
            
        }
    }
}