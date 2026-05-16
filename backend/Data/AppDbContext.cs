using AquaPure.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace AquaPure.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<SparePart> SpareParts { get; set; }
        public DbSet<ContactEnquiry> ContactEnquiries { get; set; }
        public DbSet<CartEnquiry> CartEnquiries { get; set; }
        public DbSet<CartItemEnquiry> CartItemEnquiries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().Property(p => p.Features)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null!),
                    v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions)null!) ?? new List<string>()
                );

            // Seed Products
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Dolphine Metalic", Image = "/images/products/dolphine-metalic.png", Price = 14499, Capacity = "12L", Features = new List<string> { "Metallic RO System", "Advanced Filtration", "Sleek Design" }, Badge = "Premium" },
                new Product { Id = 2, Name = "Aqua 2090", Image = "/images/products/aqua-2090.png", Price = 16999, Capacity = "15L", Features = new List<string> { "Carbon Fiber Accents", "Smart LED Indicators", "High Flow Rate" }, Badge = "Futuristic" },
                new Product { Id = 3, Name = "Water Marse", Image = "/images/products/water-marse.png", Price = 15999, Capacity = "12L", Features = new List<string> { "Rose Gold Accents", "Mineral Fortification", "Touch Interface" } },
                new Product { Id = 4, Name = "Hi flo", Image = "/images/products/hi-flo.png", Price = 13499, Capacity = "18L", Features = new List<string> { "Industrial Performance", "Heavy Duty Pump", "Quick Purification" } },
                new Product { Id = 5, Name = "Aqua v5", Image = "/images/products/aqua-v5.png", Price = 11999, Capacity = "10L", Features = new List<string> { "Compact Design", "Energy Efficient", "Blue LED Ring" } },
                new Product { Id = 6, Name = "Aqua Era", Image = "/images/products/aqua-era.png", Price = 12499, Capacity = "12L", Features = new List<string> { "Forest Blue Design", "Multi-Stage Purification", "Premium Finish" }, Badge = "Best Seller" },
                new Product { Id = 7, Name = "Water Mark", Image = "/images/products/water-mark.png", Price = 7499, Capacity = "10L", Features = new List<string> { "100% Pure Water", "Sleek Gray Build", "Affordable Quality" } },
                new Product { Id = 8, Name = "Water Lilly", Image = "/images/products/water-lilly.png", Price = 12999, Capacity = "12L", Features = new List<string> { "Organic Design", "Soft Pearlescent Finish", "Friendly Interface" } },
                new Product { Id = 9, Name = "Aqua Flip", Image = "/images/products/aqua-flip.png", Price = 13999, Capacity = "12L", Features = new List<string> { "Modular Front Panel", "Vibrant Accents", "Easy Maintenance" } },
                new Product { Id = 10, Name = "Aqua Jade", Image = "/images/products/aqua-jade.png", Price = 17499, Capacity = "15L", Features = new List<string> { "Emerald Green Finish", "Gold Trim Details", "Glass Front Panel" }, Badge = "Luxury" },
                new Product { Id = 11, Name = "Aqua Roma", Image = "/images/products/aqua-roma.png", Price = 8999, Capacity = "8L", Features = new List<string> { "Water Purification", "Black-Silver Finish", "Compact Cabinet" } },
                new Product { Id = 12, Name = "Neptune Nile", Image = "/images/products/nile-neptune.png", Price = 10999, Capacity = "10L", Features = new List<string> { "Metallic RO System", "TDS Controller", "High Flow Rate" } },
                new Product { Id = 13, Name = "Aqua DG", Image = "/images/products/aqua-dg.png", Price = 14999, Capacity = "12L", Features = new List<string> { "Digital TDS Display", "Filter Life Monitor", "Chrome Finish" }, Badge = "Smart" },
                new Product { Id = 14, Name = "Aqua Innovica", Image = "/images/products/aqua-innovica.png", Price = 18999, Capacity = "15L", Features = new List<string> { "Nano-Filtration Tech", "Copper + Silver Ionization", "Transparent Design" }, Badge = "New Tech" }
            );

            // Seed Spare Parts
            modelBuilder.Entity<SparePart>().HasData(
                new SparePart { Id = 1, Name = "RO Membrane 75 GPD", Image = "/images/spares/membrane.png", Price = 899, Compatibility = "All brands", Category = "Membranes" },
                new SparePart { Id = 2, Name = "Sediment Filter 5 Micron", Image = "/images/spares/sediment.png", Price = 149, Compatibility = "Pre-filter", Category = "Filters" },
                new SparePart { Id = 3, Name = "Carbon Block Filter", Image = "/images/spares/carbon.png", Price = 199, Compatibility = "Activated carbon", Category = "Filters" },
                new SparePart { Id = 4, Name = "Post Carbon Filter", Image = "/images/spares/post_carbon.png", Price = 179, Compatibility = "Polishing filter", Category = "Filters" },
                new SparePart { Id = 5, Name = "UV Lamp 11W", Image = "/images/spares/uv.png", Price = 349, Compatibility = "UV sterilization", Category = "UV Lamps" },
                new SparePart { Id = 6, Name = "Booster Pump 24V", Image = "/images/spares/pump.png", Price = 699, Compatibility = "Low pressure solution", Category = "Pumps" },
                new SparePart { Id = 7, Name = "SMPS Adaptor", Image = "/images/spares/smps.png", Price = 299, Compatibility = "Power supply", Category = "Housings" },
                new SparePart { Id = 8, Name = "Float Valve", Image = "/images/spares/float.png", Price = 99, Compatibility = "Tank valve", Category = "Housings" },
                new SparePart { Id = 9, Name = "Quick Connect Fittings Set", Image = "/images/spares/fittings.png", Price = 249, Compatibility = "Plumbing kit", Category = "Housings" },
                new SparePart { Id = 10, Name = "Storage Tank 10L", Image = "/images/spares/tank.png", Price = 599, Compatibility = "Pressure tank", Category = "Housings" }
            );
        }
    }
}
