using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OnlineParkingApplication.Models
{
    public partial class Paymentdetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PaymentId { get; set; }
        public double? Amount { get; set; }
        public DateTime? PaymentTime { get; set; }

        [Required]
        [ForeignKey("Userdetail")]
        public int? UserId { get; set; }

        [JsonIgnore]
        public virtual Userdetail? User { get; set; }
    }
}
