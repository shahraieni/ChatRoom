using System;

namespace API.Extensins
{
    public   static class DateTimeExtension
    {
        public static int calculatAge(this DateTime birthday){

                var today = DateTime.Today;
                var age = today.Year - birthday.Year;
                 if (birthday.Date > today.AddYears(-age).Date)
            {
                age--;
            }
            return age;

        }
        
    }
}