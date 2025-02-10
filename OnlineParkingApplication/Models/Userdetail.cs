using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OnlineParkingApplication.Models
{
    public partial class Userdetail
    {
        public Userdetail()
        {
            Cardetails = new HashSet<Cardetail>();
            Feedbacks = new HashSet<Feedback>();
            Parkingdetails = new HashSet<Parkingdetail>();
            Paymentdetails = new HashSet<Paymentdetail>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public string? AadhaarNo { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? MobileNo { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }

        [JsonIgnore]
        public virtual ICollection<Cardetail> Cardetails { get; set; }
        [JsonIgnore]
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        [JsonIgnore]
        public virtual ICollection<Parkingdetail> Parkingdetails { get; set; }
        [JsonIgnore]
        public virtual ICollection<Paymentdetail> Paymentdetails { get; set; }
    }
}
