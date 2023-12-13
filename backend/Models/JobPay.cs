using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace backend.Models
{
    public class JobPay
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? jobName { get; set; } //jobname
        public int baseRate { get; set; } //basepay
        public int hoursWorked { get; set; } //hours worked 
        public int basePay { get; set; } //basepay * hours with worked * baserate 
        public int TotalPay { get; set; } //totalpay
        public int ExtraPay { get; set; } //totalpay - basepay
    }
}