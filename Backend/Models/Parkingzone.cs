//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.Text.Json.Serialization;

//namespace OnlineParkingApplication.Models
//{
//    public partial class Parkingzone
//    {
//        public Parkingzone()
//        {
//            Parkingslots = new HashSet<Parkingslot>();
//        }
//        [Key]
//        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
//        public int ZoneId { get; set; }
//        public int? AvailableSlots { get; set; }
//        public int? TotalSlots { get; set; }


//        [Required]
//        [ForeignKey("Parkingarea")]
//        public int? AreaId { get; set; }
//        [JsonIgnore]
//        public virtual Parkingarea? Area { get; set; }
//        [JsonIgnore]
//        public virtual ICollection<Parkingslot> Parkingslots { get; set; }
//    }
//}


using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OnlineParkingApplication.Models
{
    public partial class Parkingzone
    {
        public Parkingzone()
        {
            Parkingslots = new HashSet<Parkingslot>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ZoneId { get; set; }

        public int? AvailableSlots { get; set; }
        public int? TotalSlots { get; set; }

        [Required]
        [ForeignKey("Parkingarea")]
        public int? AreaId { get; set; }

        [Required]
        [StringLength(50)] // Adjust the length as needed
        public string ZoneName { get; set; } = string.Empty; // Ensures a non-null default value

        [JsonIgnore]
        public virtual Parkingarea? Area { get; set; }

        [JsonIgnore]
        public virtual ICollection<Parkingslot> Parkingslots { get; set; }
    }
}
