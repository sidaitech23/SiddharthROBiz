using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;

namespace AquaPure.Api.Models
{
    public class CartEnquiry
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(15)]
        public string Mobile { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string City { get; set; } = string.Empty;

        [StringLength(1000)]
        public string Message { get; set; } = string.Empty;

        [Range(0, 1000000)]
        public decimal TotalAmount { get; set; }

        public List<CartItemEnquiry> Items { get; set; } = new List<CartItemEnquiry>();
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

    public class CartItemEnquiry
    {
        public int Id { get; set; }
        public string ProductId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int CartEnquiryId { get; set; }
    }
}
