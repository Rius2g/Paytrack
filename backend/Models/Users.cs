namespace Paytrack.Models
{
    public class User
    {
        public int UiD { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }

        public decimal TaxRate { get; set; }

        public string? Currency { get; set; }

    }
}