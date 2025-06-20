using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Data;
using Api.Entites;
using Api.extensions;
using Api.interfaces;
using Api.Models;
using API.Errors;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{


    public class UsersController : BaseApiController
    {

        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public UsersController(IUserRepository userRepository, IMapper mapper = null, IPhotoService photoService = null)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _photoService = photoService;
        }

        [HttpGet("GetAllUsers")]

        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {

            return Ok(await _userRepository.GetAllUsersMemberDto());
        }

        [HttpGet("getUserById/{id:int}")]

        public async Task<ActionResult<MemberDto>> GetUserById(int id)
        {
            var user = await _userRepository.GetMemberDtoById(id);
            if (user == null) return BadRequest(new ApiResponse(400, "کاربری یافت نشد"));

            return Ok(user);
        }
        [HttpGet("getUserByUserName/{userName}",Name ="GetUser")]
        public async Task<ActionResult<MemberDto>> GetUserByUserName(string userName)
        {
            var user = await _userRepository.GetMemberDtoByUserName(userName);
            if (user == null) return BadRequest(new ApiResponse(400, "کاربری یافت نشد"));

            return Ok(user);
        }

        [HttpPut("UpdateUser")]

        public async Task<ActionResult<MemberDto>> UpdateUser([FromBody] MemberUpdateDto memberDto)
        {
            var userName = User?.GetUserName();

            var member = await _userRepository.GetUserByUserNameWithPhotos(userName);

            if (member == null) return NotFound(new ApiResponse(404));

            member = _mapper.Map(memberDto, member);
            _userRepository.Update(member);

            if (await _userRepository.SaveAllAsync())
                return Ok(_mapper.Map<MemberDto>(member));
            return BadRequest(new ApiResponse(400));

        }

        [HttpPost("add-photo")]
        public async Task<IActionResult> AddPhoto(IFormFile file)
        {
             var result = await _photoService.AddPhotoAsync(file);
            if (result.Error != null) return BadRequest(new ApiResponse(400, "عملیات با شکست روبرو شد"));

            var user = await _userRepository.GetUserByUserNameWithPhotos(User.GetUserName());
            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                UserId = user.Id,
                IsMain = user.Photos.Count == 0 ? true : false
            };
            user.Photos.Add(photo);
            _userRepository.Update(user);
            if (await _userRepository.SaveAllAsync())
                 return CreatedAtRoute("GetUser", new { userName = user.UserName }, _mapper.Map<PhotoDto>(photo));
                // return Ok(_mapper.Map<PhotoDto>(photo));
            return BadRequest(new ApiResponse(400, "عملیات با شکست روبرو شد"));
            
        }
 
    }
}