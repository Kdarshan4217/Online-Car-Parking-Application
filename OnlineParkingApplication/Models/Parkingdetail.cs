using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OnlineParkingApplication.Models
{
    public partial class Parkingdetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DetailsId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        [Required]
        [ForeignKey("Parkingslot")]
        public int? SlotId { get; set; }

        [Required]
        [ForeignKey("Userdetail")]
        public int? UserId { get; set; }

        [JsonIgnore]

        public virtual Parkingslot? Slot { get; set; }
        [JsonIgnore]
        public virtual Userdetail? User { get; set; }
    }
}
