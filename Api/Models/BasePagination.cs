namespace Api.Models
{
    public class BasePagination
    {
        private const int MaxPageSize = 50;
        private int _pageSize = 10;
        //1 , 2 3 4 5 6 
        public int PageNumber { get; set; } = 1;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}
