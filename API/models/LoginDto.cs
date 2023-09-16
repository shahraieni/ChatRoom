using System.ComponentModel.DataAnnotations;

namespace API.models
{
    public class LoginDto
    {
         [Display(Name ="  نام کاربری")]
        [Required(ErrorMessage ="وارد کردن {0} الزامی میباشد")]
        [MaxLength(15,ErrorMessage ="حداکثر 15 حرف وارد شود")]
        [MinLength(3,ErrorMessage ="حداقل 3 حرف وارد شود")]
        public string userName { get; set; }

         [Display(Name =" گذر واژه")]
        [Required(ErrorMessage ="وارد کردن {0}الزامی میباشد")]
        [MaxLength(10,ErrorMessage ="حداکثر 10 حرف وارد شود")]
        [MinLength(5,ErrorMessage ="حداقل 5 حرف وارد شود")]
        public string password { get; set; }
    }
}