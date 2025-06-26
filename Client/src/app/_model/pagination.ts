
export class IPagination{
    currentPage: number
    totalPage: number
    totalCount: number
    pageSize: number
}

export class PaginatedResult<T> extends IPagination{
    items:T;
    
}