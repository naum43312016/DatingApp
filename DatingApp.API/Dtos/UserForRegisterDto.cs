using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }



        [Required]
        [StringLength(12,MinimumLength=4, ErrorMessage="You Must specify password 4-12 char")]
        public string Password { get; set; }
    }
}