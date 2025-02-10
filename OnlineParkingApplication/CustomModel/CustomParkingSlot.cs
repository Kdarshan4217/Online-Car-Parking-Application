namespace OnlineParkingApplication.CustomModel
{
    public class CustomParkingSlot
    {
        public int SlotId { get; set; }
        public ulong? IsOccupied { get; set; }
        public string? SlotName { get; set; }
        public CustomParkingZone? CustomParkingZone { get; set; }
    }
}
