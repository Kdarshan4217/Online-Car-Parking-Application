//namespace OnlineParkingApplication.CustomModel
//{
//    public class CustomParkingZone
//    {
//        public int? AvailableSlots { get; set; }
//        public int? TotalSlots { get; set; }

//        public CustomParkingArea? CustomParkingArea { get; set; } 
//    }
//}


namespace OnlineParkingApplication.CustomModel
{
    public class CustomParkingZone
    {
        public int? AvailableSlots { get; set; }
        public int? TotalSlots { get; set; }

        public string? ZoneName { get; set; } = string.Empty; // Ensuring it's not null

        public CustomParkingArea? CustomParkingArea { get; set; }
    }
}
