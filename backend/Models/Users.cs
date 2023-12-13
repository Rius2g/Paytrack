using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace backend.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }

        public int Taxrate { get; set; }

        public string? Currency { get; set; }

    }
}