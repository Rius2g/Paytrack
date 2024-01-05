namespace backend.Models
{
    public class Expleantion
    {
        public string? Job { get; set; } //job name
        public int shifts { get; set; } //amount of shifts
        public double Hours { get; set; } //hours worked that job in that range 
        public int Rate { get; set; } //the rate of the job 
        public double Salary { get; set; } //total compensation for that job in that range (base OR Rule)
        public string? Type { get; set; } //base or rule addition
        public string? RuleType { get; set; } //rule name
    }
}
