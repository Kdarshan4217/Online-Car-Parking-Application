using OnlineParkingApplication.Models;

namespace OnlineParkingApplication.CustomModel
{
    public class CustomeFullUserDetail
    {
        public int UserId { get; set; }
        public string? AadhaarNo { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? MobileNo { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }

  
        public virtual ICollection<CarDetailDto> Cardetails { get; set; }

        public virtual ICollection<FeedbackDto> Feedbacks { get; set; }
     
        public virtual ICollection<CustomeParkingDetail> Parkingdetails { get; set; }
  
        public virtual ICollection<PaymentDetailDto> Paymentdetails { get; set; }
    }
}
