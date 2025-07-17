using Api.Enums;
using Microsoft.AspNetCore.Mvc;

namespace Api.Models
{
    public class GetLikeParams :BasePagination
    {
        public PredicateLikeEnum  predicateUserLike   { get; set; }
    }
}
