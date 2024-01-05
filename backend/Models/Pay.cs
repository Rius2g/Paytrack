namespace backend.Models
{
    public class Pay
    {
        public double ExpectedPay { get; set; } //expected pay for that range

        public Expleantion[]? Explanations { get; set; } //explanations for that range
    }
}