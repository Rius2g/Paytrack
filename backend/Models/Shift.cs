using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Shift
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public int shiftStartTime { get; set; }
        public int shiftEndTime { get; set; }

        public int uiD { get; set; }

        public int jobbID { get; set; }

        public int shiftDate { get; set; }

        public string? jobName { get; set; }
      
    }
}