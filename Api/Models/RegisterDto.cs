using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class RegisterDto
    {
        [Display(Name = "نام کاربری")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        [MaxLength(50,ErrorMessage ="بیشترین کاراکتر 50 میباشد ")]
        [MinLength(3, ErrorMessage ="کمترین کارکتر 3 میباشد")]
        public string userName { get; set; }

         [Display(Name = "گذر واژه")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        [MaxLength(20,ErrorMessage ="بیشترین کاراکتر 20 میباشد ")]
        [MinLength(5, ErrorMessage ="کمترین کارکتر 5 میباشد")]
        public string Password { get; set; }

         [Display(Name = "جنسیت")]
        [Required(ErrorMessage = "لطفا {0} را وارد نمائید")]
        public int Gender { get; set; }

        [Display(Name = "تاریخ تولد")]
        [Required(ErrorMessage = "لطفا {0} را وارد نمائید")]
        [DataType(DataType.Date, ErrorMessage = "لطفا مقدار {0} را صحیح وارد کنید")]
        public DateTime DateOfBirth { get; set; }

        [Display(Name = "نام مستعار")]
        [Required(ErrorMessage = "لطفا {0} را وارد نمائید")]
        public string KnownAs { get; set; }

        [Display(Name = "شعر")]
        [Required(ErrorMessage = "لطفا {0} را وارد نمائید")]
        public string City { get; set; }
        
        [Display(Name = "کشور")]
        [Required(ErrorMessage = "لطفا {0} را وارد نمائید")]
        public string Country { get; set; }


    }
}