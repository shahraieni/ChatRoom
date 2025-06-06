using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class LoginDto
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
    }
}