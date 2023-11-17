using System.Security.AccessControl;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entitis;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Errors;
using API.Data.Migrations;
using API.Interfaces;
using System.Linq;
using API.models;
using AutoMapper;

namespace API.Controllers


{
     
    public class UsersController : BaseApiController
    {
       private readonly IUserRepository _UserRepository;
       private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _UserRepository = userRepository;
            _mapper = mapper;

        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            
           
            return Ok(await _UserRepository.GetAllUsersMemberDto());

            
        }
        

        [HttpGet("{id:int}")]
        //[Authorize]
        public async Task<ActionResult<Users>> GetUser(int id)
        {
             var user =  await _UserRepository.GetUserById(id);
             if(user == null)
             
                return BadRequest(new ApiResponse(400,"نام کاربری یافت نشد"));
                return user;
             
        }
    }
}