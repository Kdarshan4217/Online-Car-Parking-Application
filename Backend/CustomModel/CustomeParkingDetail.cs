namespace OnlineParkingApplication.CustomModel
{
    public class CustomeParkingDetail
    {
        public int DetailsId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }        
        public CustomParkingSlot? CustomParkingSlot { get; set; }

    }
}
