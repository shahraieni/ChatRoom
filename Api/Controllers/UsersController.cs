using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Entites;
using Api.interfaces;
using Api.Models;
using API.Errors;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{



    public class UsersController : BaseApiController
    {

        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper = null)
        {
            _userRepository = userRepository;
            _mapper = mapper;
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
        [HttpGet("getUserByUserName/{userName}")]
        public async Task<ActionResult<MemberDto>> GetUserByUserName(string userName)
        {
            var user = await _userRepository.GetMemberDtoByUserName(userName);
            if (user == null) return BadRequest(new ApiResponse(400, "کاربری یافت نشد"));

            return Ok(user);
        }

        [HttpPut("UpdateUser")]
        [Authorize]
        public async Task<ActionResult<MemberDto>> UpdateUser(MemberUpdateDto memberDto)
        {
            var userName = HttpContext.User.FindFirst("nameid")?.Value;

            var member = await _userRepository.GetUserByUserName(userName);

            if (member == null) return NotFound(new ApiResponse(404));

            member = _mapper.Map(memberDto, member);
            _userRepository.Update(member);

            if (await _userRepository.SaveAllAsync())
                return Ok(_mapper.Map<MemberDto>(member));
            return BadRequest(new ApiResponse(400)); 

        }
 
    }
}