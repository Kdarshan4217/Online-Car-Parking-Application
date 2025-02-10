using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OnlineParkingApplication.Models
{
    public partial class Parkingslot
    {
        public Parkingslot()
        {
            Parkingdetails = new HashSet<Parkingdetail>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SlotId { get; set; }
        public ulong? IsOccupied { get; set; }
        public string? SlotName { get; set; }

        [Required]
        [ForeignKey("Parkingzone")]
        public int? ZoneId { get; set; }

        [JsonIgnore]
        public virtual Parkingzone? Zone { get; set; }
        [JsonIgnore]
        public virtual ICollection<Parkingdetail> Parkingdetails { get; set; }
    }
}
