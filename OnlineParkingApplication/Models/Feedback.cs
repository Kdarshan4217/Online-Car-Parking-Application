using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OnlineParkingApplication.Models
{
    public partial class Feedback
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FeedbackId { get; set; }
        public string? UserFeedback { get; set; }
        [Required]
        [ForeignKey("Userdetail")]
        public int? UserId { get; set; }

        [JsonIgnore]
        public virtual Userdetail? User { get; set; }
    }
}
