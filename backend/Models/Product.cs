namespace AquaPure.Api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Capacity { get; set; } = string.Empty;
        public List<string> Features { get; set; } = new();
        public string? Badge { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
