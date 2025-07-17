using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.extensions;
using Api.Helpers;
using Api.interfaces;
using Api.Models;
using API.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
   // [Authorize]
    public class UserLikeController : BaseApiController
    {
        private readonly IUserLikeRepository _userLikeRepository;
        private readonly IUserRepository _userRepository;

        public UserLikeController(IUserLikeRepository userLikeRepository , IUserRepository userRepository)
        {
            _userLikeRepository = userLikeRepository;
            _userRepository = userRepository;
        }

        [HttpPost("Add-Like")]
        // [Authorize(Roles = "member")]
        public async Task<IActionResult> AddLike([FromQuery] string targetUserName)
        {
            var sourceUserId = User.GetUserId();
            var targetUser = await _userRepository.GetUserByUserName(targetUserName);
            if (targetUser == null) return NotFound("user not found");
            if (sourceUserId == targetUser.Id) return BadRequest("you cannot like yourSelf");

            var userLike = await _userLikeRepository.GetUserLike(sourceUserId, targetUser.Id);
            if (userLike != null) return BadRequest(new ApiResponse(400, "you already liked this user"));

            await _userLikeRepository.AddLike(sourceUserId, targetUser.Id);
            if (await _userLikeRepository.Saveasync())
                return Ok();
            return BadRequest();
        }

        [HttpGet("get-likes")]
        public async Task<ActionResult<PagedList<LikeDto>>> GetUserLikes([FromQuery] GetLikeParams getLikeParams)
        {
            return Ok(await _userLikeRepository.GetUserLIkes(getLikeParams, User.GetUserId()));
        }


    }
}