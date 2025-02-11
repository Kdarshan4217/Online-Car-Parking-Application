using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OnlineParkingApplication.Models
{
    public partial class Cardetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CarId { get; set; }
        public string? CarNo { get; set; }
        public string? CarType { get; set; }
        [Required]
        [ForeignKey("Userdetail")]
        public int? UserId { get; set; }
        [JsonIgnore]
        public virtual Userdetail? User { get; set; }
    }
}
