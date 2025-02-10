using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OnlineParkingApplication.Models
{
    public partial class Parkingarea
    {
        public Parkingarea()
        {
            Parkingzones = new HashSet<Parkingzone>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AreaId { get; set; }
        public string? AreaName { get; set; }
        public int? Rate { get; set; }
        public int? TotalSlots { get; set; }
        public int? TotalZones { get; set; }

        [JsonIgnore]
        public virtual ICollection<Parkingzone> Parkingzones { get; set; }
    }
}
