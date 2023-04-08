namespace Paytrack.Models
{
    public class Rules
    {
        public int JobID { get; set; }
        public int Rate { get; set; }
        public int UiD { get; set; }

        public string? RateType { get; set; } //% or currency

        public string? RuleType { get; set; } //day? time? day and time? date?

        public int? Day { get; set; } //1-7 if day rule

        public int? Start { get; set; } //time if time rule

        public int? End { get; set; } //time if time rule

        public int? Date { get; set; } //date if date rule

    }
}