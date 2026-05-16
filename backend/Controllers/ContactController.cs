using AquaPure.Api.Data;
using AquaPure.Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using System.Text;

namespace AquaPure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public ContactController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitEnquiry([FromBody] ContactEnquiry enquiry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            enquiry.CreatedAt = DateTime.Now;
            _context.ContactEnquiries.Add(enquiry);
            await _context.SaveChangesAsync();

            // Send Email Notification
            try
            {
                var body = new StringBuilder();
                body.AppendLine("<h2>New General Website Enquiry</h2>");
                body.AppendLine($"<p><strong>Name:</strong> {enquiry.Name}</p>");
                body.AppendLine($"<p><strong>Mobile:</strong> {enquiry.Mobile}</p>");
                body.AppendLine($"<p><strong>City:</strong> {enquiry.City}</p>");
                body.AppendLine($"<p><strong>Product Interest:</strong> {enquiry.ProductInterest}</p>");
                body.AppendLine($"<p><strong>Message:</strong> {enquiry.Message}</p>");
                
                await SendEmail($"General Website Enquiry from {enquiry.Name}", body.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
            }

            return Ok(new { message = "Enquiry submitted successfully" });
        }

        [HttpPost("cart")]
        public async Task<IActionResult> SubmitCartEnquiry([FromBody] CartEnquiry enquiry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            enquiry.CreatedAt = DateTime.Now;
            _context.CartEnquiries.Add(enquiry);
            await _context.SaveChangesAsync();

            // Send Email Notification
            try
            {
                var body = new StringBuilder();
                body.AppendLine("<h2>New Shopping Cart Enquiry</h2>");
                body.AppendLine($"<p><strong>Name:</strong> {enquiry.Name}</p>");
                body.AppendLine($"<p><strong>Mobile:</strong> {enquiry.Mobile}</p>");
                body.AppendLine($"<p><strong>City:</strong> {enquiry.City}</p>");
                body.AppendLine($"<p><strong>Message:</strong> {enquiry.Message}</p>");
                body.AppendLine("<br/>");
                body.AppendLine("<h3>Order Items:</h3>");
                body.AppendLine("<table border='1' cellpadding='5' style='border-collapse: collapse;'>");
                body.AppendLine("<tr><th>Product Name</th><th>Quantity</th><th>Price</th><th>Total</th></tr>");
                
                foreach (var item in enquiry.Items)
                {
                    body.AppendLine($"<tr><td>{item.Name}</td><td>{item.Quantity}</td><td>₹{item.Price}</td><td>₹{item.Price * item.Quantity}</td></tr>");
                }
                
                body.AppendLine("</table>");
                body.AppendLine($"<h3>Total Amount: ₹{enquiry.TotalAmount}</h3>");

                await SendEmail($"Shopping Cart Enquiry from {enquiry.Name}", body.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
            }

            return Ok(new { message = "Cart enquiry submitted successfully" });
        }

        private async Task SendEmail(string subject, string htmlBody)
        {
            var smtpServer = _configuration["EmailSettings:SmtpServer"] ?? "smtp.gmail.com";
            var smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"] ?? "587");
            var senderEmail = _configuration["EmailSettings:SenderEmail"] ?? "your-email@gmail.com";
            var senderPassword = _configuration["EmailSettings:SenderPassword"] ?? "your-app-password";
            var receiverEmail = "tpandya35@gmail.com";

            using (var message = new MailMessage())
            {
                message.From = new MailAddress(senderEmail, "Siddharth RO Systems");
                message.To.Add(new MailAddress(receiverEmail));
                message.Subject = subject;
                message.Body = htmlBody;
                message.IsBodyHtml = true;

                using (var client = new SmtpClient(smtpServer, smtpPort))
                {
                    client.EnableSsl = true;
                    client.Credentials = new NetworkCredential(senderEmail, senderPassword);
                    await client.SendMailAsync(message);
                }
            }
        }
    }
}
