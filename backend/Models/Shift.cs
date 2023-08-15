namespace Paytrack.Models
{
    public class Shift
    {
        public int shiftID { get; set; }
        public int shiftStartTime { get; set; }
        public int shiftEndTime { get; set; }

        public int uiD { get; set; }

        public int jobbID { get; set; }

        public int shiftDate { get; set; }

        public string? jobName { get; set; }
      
    }
}