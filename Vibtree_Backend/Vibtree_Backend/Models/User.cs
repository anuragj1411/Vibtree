using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vibtree_Backend.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public string DateOfBirth { get; set; }

        [Required]
        public string EMail { get; set; }

        [Required]
        public string Password { get; set; }

        public bool IsActive { get; set; }
    }

    public class GetUser
    {
        public int UserID { get; set; }
        public string Name { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public string DateOfBirth { get; set; }

        [Required]
        public string EMail { get; set; }

    }
}
