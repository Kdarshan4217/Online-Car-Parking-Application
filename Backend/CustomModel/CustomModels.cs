namespace OnlineParkingApplication.CustomModel
{
    public class ParkingAreaDto
    {
        public int AreaId { get; set; }
        public string? AreaName { get; set; }
        public int? Rate { get; set; }
        public int? TotalSlots { get; set; }
        public int? TotalZones { get; set; }
        public List<ParkingZoneDto> Zones { get; set; } = new();
    }

    public class ParkingZoneDto
    {
        public int ZoneId { get; set; }

        public string ZoneName { get; set; } = string.Empty;
        public int? AvailableSlots { get; set; }
        public int? TotalSlots { get; set; }
        public int? AreaId { get; set; }
        public List<ParkingSlotDto> Slots { get; set; } = new();
    }

    public class ParkingSlotDto
    {
        public int SlotId { get; set; }
        public ulong? IsOccupied { get; set; }
        public string? SlotName { get; set; }
        public int? ZoneId { get; set; }


    }

    // DTO for Parking Detail
    public class ParkingDetailDto
    {
        public int DetailsId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public int? SlotId { get; set; }
    }
   

    // DTO for Car Detail
    public class CarDetailDto
    {
        public int CarId { get; set; }
        public string? CarNo { get; set; }
        public string? CarType { get; set; }
    }

    // DTO for Feedback
    public class FeedbackDto
    {
        public int FeedbackId { get; set; }
        public string? UserFeedback { get; set; }
    }

    // DTO for Payment Detail
    public class PaymentDetailDto
    {
        public int PaymentId { get; set; }
        public double? Amount { get; set; }
        public DateTime? PaymentTime { get; set; }
    }

    // Custom DTO for User including Car Details, Feedbacks, and Parking Details
    public class UserCustomDto
    {
        public int UserId { get; set; }
        public string? AadhaarNo { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? MobileNo { get; set; }
        public string? Role { get; set; }

        // Including the related collections
        public List<CarDetailDto> CarDetails { get; set; } = new();
        public List<FeedbackDto> Feedbacks { get; set; } = new();
        public List<ParkingDetailDto> ParkingDetails { get; set; } = new();

        public List<PaymentDetailDto> PaymentDetails { get; set; } = new();
    }



}
