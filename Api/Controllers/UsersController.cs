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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
           
           return Ok(await _userRepository.GetAllUsersMemberDto()) ; 
        }

        [HttpGet("getUserById/{id:int}")]
        public async Task<ActionResult<MemberDto>> GetUserById(int id)
        {
            var user =  await _userRepository.GetMemberDtoById(id);
            if(user == null)  return BadRequest(new ApiResponse(400 , "کاربری یافت نشد"));
            
                return Ok(user);
        }
          [HttpGet("getUserByUserName/{userName}")]
        public async Task<ActionResult<MemberDto>> GetUserByUserName(string userName)
        {
            var user =  await _userRepository.GetMemberDtoByUserName(userName);
            if(user == null)  return BadRequest(new ApiResponse(400 , "کاربری یافت نشد"));
            
                return Ok(user);
        }

    }
}