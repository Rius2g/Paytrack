namespace Paytrack.Models
{
   public class Rules
    {
        public int ID { get; set; }
        public int JobID { get; set; }
        public int Rate { get; set; }
        public int UiD { get; set; }
        public string RateType { get; set; }
        public string RuleType { get; set; }
        public string? Day { get; set; }
        public int Start { get; set; }
        public int? Date { get; set; }
        public string? jobName { get; set; }
    }
}