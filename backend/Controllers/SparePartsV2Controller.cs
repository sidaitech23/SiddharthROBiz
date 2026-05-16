using AquaPure.Api.Data;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace AquaPure.Api.Controllers
{
    [ApiController]
    [Route("api/v2/spareparts")]
    public class SparePartsV2Controller : ControllerBase
    {
        [HttpGet]
        public IActionResult GetSpareParts([FromQuery] string? category)
        {
            var parts = new List<object>
            {
                new { Id = 1, Name = "RO Membrane 75 GPD", Image = "/images/spares/membrane.png", Price = 899.0, Compatibility = "All brands", Category = "Membranes", Quality = "4K Premium" },
                new { Id = 2, Name = "Sediment Filter 5 Micron", Image = "/images/spares/sediment.png", Price = 149.0, Compatibility = "Pre-filter", Category = "Filters", Quality = "4K Premium" },
                new { Id = 3, Name = "Carbon Block Filter", Image = "/images/spares/carbon.png", Price = 199.0, Compatibility = "Activated carbon", Category = "Filters", Quality = "4K Premium" },
                new { Id = 4, Name = "Post Carbon Filter", Image = "/images/spares/post_carbon.png", Price = 179.0, Compatibility = "Polishing filter", Category = "Filters", Quality = "4K Premium" },
                new { Id = 5, Name = "UV Lamp 11W", Image = "/images/spares/uv.png", Price = 349.0, Compatibility = "UV sterilization", Category = "UV Lamps", Quality = "4K Premium" },
                new { Id = 6, Name = "Booster Pump 24V", Image = "/images/spares/pump.png", Price = 699.0, Compatibility = "Low pressure solution", Category = "Pumps", Quality = "4K Premium" },
                new { Id = 7, Name = "SMPS Adaptor", Image = "/images/spares/smps.png", Price = 299.0, Compatibility = "Power supply", Category = "Housings", Quality = "4K Premium" },
                new { Id = 8, Name = "Float Valve", Image = "/images/spares/float.png", Price = 99.0, Compatibility = "Tank valve", Category = "Housings", Quality = "4K Premium" },
                new { Id = 9, Name = "Quick Connect Fittings Set", Image = "/images/spares/fittings.png", Price = 249.0, Compatibility = "Plumbing kit", Category = "Housings", Quality = "4K Premium" },
                new { Id = 10, Name = "Storage Tank 10L", Image = "/images/spares/tank.png", Price = 599.0, Compatibility = "Pressure tank", Category = "Housings", Quality = "4K Premium" }
            };

            if (!string.IsNullOrEmpty(category) && category != "All")
            {
                parts = parts.Where(p => {
                    var prop = p.GetType().GetProperty("Category");
                    return prop != null && (string)prop.GetValue(p)! == category;
                }).ToList();
            }

            return Ok(parts);
        }
    }
}
