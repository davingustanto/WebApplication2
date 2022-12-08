namespace WebApplication2.Commands
{
    public class CalculateCommand
    {
        public string Unit { get; set; }
        public long Quantity { get; set; }
        public long Price { get; set; }
        public string Discount { get; set; }
        public string AdditionalDiscount { get; set; }
    }
}
