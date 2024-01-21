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
using Microsoft.VisualBasic;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using System.Security.Claims;
using API.Extensins;
using Microsoft.AspNetCore.Http;

namespace API.Controllers


{
     
    public class UsersController : BaseApiController
    {
       private readonly IUserRepository _UserRepository;
       private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public UsersController(IUserRepository userRepository,IPhotoService photoService, IMapper mapper)
        {
            _UserRepository = userRepository;
            _mapper = mapper;
            _photoService = photoService;


        }


        [HttpGet("GetAllUsers")]
       [Authorize]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            return Ok(await _UserRepository.GetAllUsersMemberDto());   
        }
    
        [HttpGet("GetUserById/{id:int}")]
        [Authorize]
        public async Task<ActionResult<MemberDto>> GetUserById(int id)

        {
            var user = await  _UserRepository.GetMemberDtoById(id);
            if(user==null) return NotFound(new ApiResponse(404 , "چنین کاربری یافت نشد"));
            return Ok(user);
        }

         [HttpGet("GetUserByUserName/{userName}")]
        [Authorize]
        public async Task<ActionResult<MemberDto>> GetUserByUsrName(string userName)

        {
            var user = await  _UserRepository.GetMemberDtoByUserName(userName);
            if(user==null) return NotFound(new ApiResponse(404 , "چنین کاربری یافت نشد"));
            return Ok(user);
        }
        [HttpPut("UpdateUser")]
        [Authorize]
        public async Task<ActionResult<MemberDto>> UpdateUser([FromBody]MemberUpdateDto memberDto)
        {
           var username = User?.GetUserName();
           var member = await _UserRepository.GetMemberDtoByUserName(username);
           if(member == null) return NotFound(new ApiResponse(404));
           member = _mapper.Map(memberDto, member);
           //_UserRepository.Update(member);
           if(await _UserRepository.SaveAllAsync())
           return Ok(_mapper.Map<MemberDto>(member));
           return BadRequest(new ApiResponse(400));
        }

         [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var result = await _photoService.AddPhotoAsync(file);
            if (result.Error != null) return BadRequest(new ApiResponse(400, "عملیات با شکست روبرو شد"));

            var user = await _UserRepository.GetUserByUserNameWithPhotos(User.GetUserName());
            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                UserId = user.Id,
                IsMain = user.Photos.Count == 0 ? true : false
            };
            user.Photos.Add(photo);
            _UserRepository.Update(user);
            if (await _UserRepository.SaveAllAsync())
            return Ok(_mapper.Map<PhotoDto>(photo));
                //return CreatedAtRoute("GetUser", new { userName = user.UserName }, _mapper.Map<PhotoDto>(photo));
            return BadRequest(new ApiResponse(400, "عملیات با شکست روبرو شد"));
        }

    }
}