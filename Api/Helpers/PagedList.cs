using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Helpers
{
    public class PagedList<T>  where T :  class
    {
        public PagedList(IEnumerable<T> item, int pageNumber, int pageSize, int count)
        {
            this.TotalPage = (int)Math.Ceiling(count / (double)pageSize);
            this.CurrentPage = pageNumber;
            this.PageSize = pageSize;
            this.TotalCount = count;
            this.items = item;
        }
        public int CurrentPage { get; set; }
        public int TotalPage { get; set; }
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public IEnumerable<T> items { get; set; } = new List<T>();
        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pagenumber, int pageSize)
        {
            var cont = await source.CountAsync();
            var item = await source.Skip((pagenumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(item, pagenumber, pageSize, cont);
        }
    }
}