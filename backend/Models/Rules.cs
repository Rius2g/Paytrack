namespace Paytrack.Models
{
   public class Rules
    {
        public int RuleID { get; set; }
        public int JobID { get; set; }
        public int Rate { get; set; }
        public int UiD { get; set; }
        public int RateType { get; set; }
        public int RuleType { get; set; }
        public int? Day { get; set; }
        public int? Start { get; set; }
        public int? Date { get; set; }
        public string? jobName { get; set; }
    }
}