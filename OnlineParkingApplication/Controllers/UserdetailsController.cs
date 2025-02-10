using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineParkingApplication.CustomModel;
using OnlineParkingApplication.Models;

namespace OnlineParkingApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserdetailsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public UserdetailsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Userdetails
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Userdetail>>> GetUserdetails()
        //{
        //  if (_context.Userdetails == null)
        //  {
        //      return NotFound();
        //  }
        //    return await _context.Userdetails.ToListAsync();
        //}

        // GET: api/Userdetails
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<CustomeFullUserDetail>>> GetUserdetails()
        //{
        //    if (_context.Userdetails == null)
        //    {
        //        return NotFound();
        //    }

        //    var users = await _context.Userdetails
        //        .Include(u => u.Cardetails)
        //        .Include(u => u.Feedbacks)
        //        .Include(u => u.Parkingdetails)
        //        .Include(u => u.Paymentdetails)
        //        .ToListAsync();


        //    var userDetails = users.Select(user => new CustomeFullUserDetail
        //    {
        //        UserId = user.UserId,
        //        AadhaarNo = user.AadhaarNo,
        //        Email = user.Email,
        //        FirstName = user.FirstName,
        //        LastName = user.LastName,
        //        MobileNo = user.MobileNo,
        //        Password = user.Password,
        //        Role = user.Role,

        //        Cardetails = user.Cardetails.Select(car => new CarDetailDto
        //        {
        //            CarId = car.CarId,
        //            CarNo = car.CarNo,
        //            CarType = car.CarType
        //        }).ToList(),

        //        Feedbacks = user.Feedbacks.Select(feedback => new FeedbackDto
        //        {
        //            FeedbackId = feedback.FeedbackId,
        //            UserFeedback = feedback.UserFeedback
        //        }).ToList(),

        //        Parkingdetails = user.Parkingdetails.Select(pd => new CustomeParkingDetail
        //        {
        //            DetailsId = pd.DetailsId,
        //            FromDate = pd.FromDate,
        //            ToDate = pd.ToDate,

        //            CustomParkingSlot = pd.Slot != null ? new CustomParkingSlot
        //            {
        //                SlotId = pd.Slot.SlotId,
        //                IsOccupied = pd.Slot.IsOccupied,
        //                SlotName = pd.Slot.SlotName,

        //                CustomParkingZone = pd.Slot.Zone != null ? new CustomParkingZone
        //                {
        //                    AvailableSlots = pd.Slot.Zone.AvailableSlots,
        //                    TotalSlots = pd.Slot.Zone.TotalSlots,

        //                    CustomParkingArea = pd.Slot.Zone.Area != null ? new CustomParkingArea
        //                    {
        //                        AreaId = pd.Slot.Zone.Area.AreaId,
        //                        AreaName = pd.Slot.Zone .Area.AreaName,
        //                        Rate = pd.Slot.Zone.Area.Rate,
        //                        TotalSlots = pd.Slot.Zone.Area.TotalSlots,
        //                        TotalZones = pd.Slot.Zone   .Area.TotalZones
        //                    } : null

        //                } : null
        //            } : null
        //        }).ToList(),

        //        Paymentdetails = user.Paymentdetails.Select(payment => new PaymentDetailDto
        //        {
        //            PaymentId = payment.PaymentId,
        //            Amount = payment.Amount,
        //            PaymentTime = payment.PaymentTime
        //        }).ToList()
        //    }).ToList();

        //    return Ok(userDetails);
        //}

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomeFullUserDetail>>> GetUserdetails()
        {
            // Fetch all users with their related entities
            var users = await _context.Userdetails
                .Include(u => u.Cardetails)
                .Include(u => u.Feedbacks)
                .Include(u => u.Parkingdetails)
                    .ThenInclude(pd => pd.Slot)
                        .ThenInclude(ps => ps.Zone)
                            .ThenInclude(pz => pz.Area)
                .Include(u => u.Paymentdetails)
                .ToListAsync(); // Fetch all users, not just one

            if (users == null || !users.Any())
            {
                return NotFound();
            }

            // Loop over each user to create a list of CustomeFullUserDetail
            var userDetails = users.Select(user => new CustomeFullUserDetail
            {
                UserId = user.UserId,
                AadhaarNo = user.AadhaarNo,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                MobileNo = user.MobileNo,
                Password = user.Password,
                Role = user.Role,
                Cardetails = user.Cardetails.Select(car => new CarDetailDto
                {
                    CarId = car.CarId,
                    CarNo = car.CarNo,
                    CarType = car.CarType
                }).ToList(),

                Feedbacks = user.Feedbacks.Select(feedback => new FeedbackDto
                {
                    FeedbackId = feedback.FeedbackId,
                    UserFeedback = feedback.UserFeedback
                }).ToList(),

                Parkingdetails = user.Parkingdetails.Select(pd => new CustomeParkingDetail
                {
                    DetailsId = pd.DetailsId,
                    FromDate = pd.FromDate,
                    ToDate = pd.ToDate,
                    CustomParkingSlot = new CustomParkingSlot
                    {
                        SlotId = pd.Slot.SlotId,
                        IsOccupied = pd.Slot.IsOccupied,
                        SlotName = pd.Slot.SlotName,
                        CustomParkingZone = new CustomParkingZone
                        {
                            AvailableSlots = pd.Slot.Zone.AvailableSlots,
                            TotalSlots = pd.Slot.Zone.TotalSlots,
                            CustomParkingArea = new CustomParkingArea
                            {
                                AreaId = pd.Slot.Zone.Area.AreaId,
                                AreaName = pd.Slot.Zone.Area.AreaName,
                                Rate = pd.Slot.Zone.Area.Rate,
                                TotalSlots = pd.Slot.Zone.Area.TotalSlots,
                                TotalZones = pd.Slot.Zone.Area.TotalZones
                            }
                        }
                    }
                }).ToList(),

                Paymentdetails = user.Paymentdetails.Select(payment => new PaymentDetailDto
                {
                    PaymentId = payment.PaymentId,
                    Amount = payment.Amount,
                    PaymentTime = payment.PaymentTime
                }).ToList()

            }).ToList();

            // Return the list of user details
            return Ok(userDetails);
        }

        // GET: api/Userdetails/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Userdetail>> GetUserdetail(int id)
        //{
        //  if (_context.Userdetails == null)
        //  {
        //      return NotFound();
        //  }
        //    var userdetail = await _context.Userdetails.FindAsync(id);

        //    if (userdetail == null)
        //    {
        //        return NotFound();
        //    }

        //    return userdetail;
        //}
        // GET: api/Userdetails/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomeFullUserDetail>> GetUserdetail(int id)
        {
            var user = await _context.Userdetails
                .Include(u => u.Cardetails)
                .Include(u => u.Feedbacks)
                .Include(u => u.Parkingdetails)
                    .ThenInclude(pd => pd.Slot)
                        .ThenInclude(ps => ps.Zone)
                            .ThenInclude(pz => pz.Area)
                .Include(u => u.Paymentdetails)
                .FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
            {
                return NotFound();
            }

            var userDetails = new CustomeFullUserDetail
            {
                UserId = user.UserId,
                AadhaarNo = user.AadhaarNo,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                MobileNo = user.MobileNo,
                Password = user.Password,
                Role = user.Role,
                Cardetails = user.Cardetails.Select(car => new CarDetailDto
                {
                    CarId = car.CarId,
                    CarNo = car.CarNo,
                    CarType = car.CarType
                }).ToList(),
                Feedbacks = user.Feedbacks.Select(feedback => new FeedbackDto
                {
                    FeedbackId = feedback.FeedbackId,
                    UserFeedback = feedback.UserFeedback
                }).ToList(),
                Parkingdetails = user.Parkingdetails.Select(pd => new CustomeParkingDetail
                {
                    DetailsId = pd.DetailsId,
                    FromDate = pd.FromDate,
                    ToDate = pd.ToDate,
                    CustomParkingSlot = new CustomParkingSlot
                    {
                        SlotId = pd.Slot.SlotId,
                        IsOccupied = pd.Slot.IsOccupied,
                        SlotName = pd.Slot.SlotName,
                        CustomParkingZone = new CustomParkingZone
                        {
                            AvailableSlots = pd.Slot.Zone.AvailableSlots,
                            TotalSlots = pd.Slot.Zone.TotalSlots,
                            CustomParkingArea = new CustomParkingArea
                            {
                                AreaId = pd.Slot.Zone.Area.AreaId,
                                AreaName = pd.Slot.Zone.Area.AreaName,
                                Rate = pd.Slot.Zone.Area.Rate,
                                TotalSlots = pd.Slot.Zone.Area.TotalSlots,
                                TotalZones = pd.Slot.Zone.Area.TotalZones
                            }
                        }
                    }
                }).ToList(),
                Paymentdetails = user.Paymentdetails.Select(payment => new PaymentDetailDto
                {
                    PaymentId = payment.PaymentId,
                    Amount = payment.Amount,
                    PaymentTime = payment.PaymentTime
                }).ToList()
            };

            return Ok(userDetails);
        }


        // PUT: api/Userdetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserdetail(int id, Userdetail userdetail)
        {
            if (id != userdetail.UserId)
            {
                return BadRequest();
            }

            _context.Entry(userdetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserdetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Userdetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Userdetail>> PostUserdetail(Userdetail userdetail)
        {
            if (_context.Userdetails == null)
            {
                return Problem("Entity set 'MyDbContext.Userdetails'  is null.");
            }
            _context.Userdetails.Add(userdetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserdetail", new { id = userdetail.UserId }, userdetail);
        }

        //[HttpPost("login")]
        //public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        //{
        //    if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
        //    {
        //        return BadRequest("Invalid login request");
        //    }

        //    // Find user by email
        //    var user = await _context.Userdetails.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

        //    // Check if user exists and if password matches
        //    if (user == null || user.Password != loginRequest.Password)
        //    {
        //        return Unauthorized("Invalid credentials");
        //    }

        //    // Store user information in session
        //    HttpContext.Session.SetString("UserId", user.UserId.ToString());
        //    HttpContext.Session.SetString("Role", user.Role);

        //    // Return response with userId and role
        //    return Ok(new { role = user.Role, userId = user.UserId });
        //}


        //[HttpPost("login")]
        //public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        //{
        //    if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
        //    {
        //        return BadRequest("Invalid login request");
        //    }

        //    var user = await _context.Userdetails.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

        //    if (user == null || !VerifyPassword(loginRequest.Password, user.Password))
        //    {
        //        return Unauthorized("Invalid credentials");
        //    }

        //    // Ensure UserId and Role are not null before setting in session
        //    if (user.UserId == null || string.IsNullOrEmpty(user.Role))
        //    {
        //        return StatusCode(500, "User data is invalid.");
        //    }

        //    HttpContext.Session.SetString("UserId", user.UserId.ToString());
        //    HttpContext.Session.SetString("Role", user.Role ?? "");  // Use empty string if Role is null

        //    return Ok(new { role = user.Role, userId = user.UserId });
        //}


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest("Invalid login request");
            }

            var user = await _context.Userdetails.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            if (user == null || user.Password != loginRequest.Password)
            {
                return Unauthorized("Invalid credentials");
            }

            HttpContext.Session.SetString("UserId", user.UserId.ToString());
            HttpContext.Session.SetString("Role", user.Role ?? "");

            return Ok(new { role = user.Role, userId = user.UserId });
        }



        //private bool VerifyPassword(string inputPassword, string storedHashedPassword)
        //{
        //    return BCrypt.Net.BCrypt.Verify(inputPassword, storedHashedPassword);
        //}

        //private bool VerifyPassword(string inputPassword, string storedHashedPassword)
        //{
        //    if (string.IsNullOrWhiteSpace(storedHashedPassword) || !storedHashedPassword.StartsWith("$2"))
        //    {
        //        Console.WriteLine("Invalid password hash detected! Possible plain text or incorrect hashing method.");
        //        return false;
        //    }

        //    return BCrypt.Net.BCrypt.Verify(inputPassword, storedHashedPassword);
        //}




        // DELETE: api/Userdetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserdetail(int id)
        {
            if (_context.Userdetails == null)
            {
                return NotFound();
            }
            var userdetail = await _context.Userdetails.FindAsync(id);
            if (userdetail == null)
            {
                return NotFound();
            }

            _context.Userdetails.Remove(userdetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserdetailExists(int id)
        {
            return (_context.Userdetails?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}



//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using OnlineParkingApplication.CustomModel;
//using OnlineParkingApplication.Models;
//using BCrypt.Net; // Add this for password hashing

//namespace OnlineParkingApplication.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class UserdetailsController : ControllerBase
//    {
//        private readonly MyDbContext _context;

//        public UserdetailsController(MyDbContext context)
//        {
//            _context = context;
//        }

//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<CustomeFullUserDetail>>> GetUserdetails()
//        {
//            var users = await _context.Userdetails
//                .Include(u => u.Cardetails)
//                .Include(u => u.Feedbacks)
//                .Include(u => u.Parkingdetails)
//                    .ThenInclude(pd => pd.Slot)
//                        .ThenInclude(ps => ps.Zone)
//                            .ThenInclude(pz => pz.Area)
//                .Include(u => u.Paymentdetails)
//                .ToListAsync();

//            if (users == null || !users.Any())
//            {
//                return NotFound();
//            }

//            var userDetails = users.Select(user => new CustomeFullUserDetail
//            {
//                UserId = user.UserId,
//                AadhaarNo = user.AadhaarNo,
//                Email = user.Email,
//                FirstName = user.FirstName,
//                LastName = user.LastName,
//                MobileNo = user.MobileNo,
//                Password = user.Password,
//                Role = user.Role,
//                Cardetails = user.Cardetails.Select(car => new CarDetailDto
//                {
//                    CarId = car.CarId,
//                    CarNo = car.CarNo,
//                    CarType = car.CarType
//                }).ToList(),
//                Feedbacks = user.Feedbacks.Select(feedback => new FeedbackDto
//                {
//                    FeedbackId = feedback.FeedbackId,
//                    UserFeedback = feedback.UserFeedback
//                }).ToList(),
//                Parkingdetails = user.Parkingdetails.Select(pd => new CustomeParkingDetail
//                {
//                    DetailsId = pd.DetailsId,
//                    FromDate = pd.FromDate,
//                    ToDate = pd.ToDate,
//                    CustomParkingSlot = new CustomParkingSlot
//                    {
//                        SlotId = pd.Slot.SlotId,
//                        IsOccupied = pd.Slot.IsOccupied,
//                        SlotName = pd.Slot.SlotName,
//                        CustomParkingZone = new CustomParkingZone
//                        {
//                            AvailableSlots = pd.Slot.Zone.AvailableSlots,
//                            TotalSlots = pd.Slot.Zone.TotalSlots,
//                            CustomParkingArea = new CustomParkingArea
//                            {
//                                AreaId = pd.Slot.Zone.Area.AreaId,
//                                AreaName = pd.Slot.Zone.Area.AreaName,
//                                Rate = pd.Slot.Zone.Area.Rate,
//                                TotalSlots = pd.Slot.Zone.Area.TotalSlots,
//                                TotalZones = pd.Slot.Zone.Area.TotalZones
//                            }
//                        }
//                    }
//                }).ToList(),
//                Paymentdetails = user.Paymentdetails.Select(payment => new PaymentDetailDto
//                {
//                    PaymentId = payment.PaymentId,
//                    Amount = payment.Amount,
//                    PaymentTime = payment.PaymentTime
//                }).ToList()
//            }).ToList();

//            return Ok(userDetails);
//        }

//        [HttpGet("{id}")]
//        public async Task<ActionResult<CustomeFullUserDetail>> GetUserdetail(int id)
//        {
//            var user = await _context.Userdetails
//                .Include(u => u.Cardetails)
//                .Include(u => u.Feedbacks)
//                .Include(u => u.Parkingdetails)
//                    .ThenInclude(pd => pd.Slot)
//                        .ThenInclude(ps => ps.Zone)
//                            .ThenInclude(pz => pz.Area)
//                .Include(u => u.Paymentdetails)
//                .FirstOrDefaultAsync(u => u.UserId == id);

//            if (user == null)
//            {
//                return NotFound();
//            }

//            var userDetails = new CustomeFullUserDetail
//            {
//                UserId = user.UserId,
//                AadhaarNo = user.AadhaarNo,
//                Email = user.Email,
//                FirstName = user.FirstName,
//                LastName = user.LastName,
//                MobileNo = user.MobileNo,
//                Password = user.Password,
//                Role = user.Role,
//                Cardetails = user.Cardetails.Select(car => new CarDetailDto
//                {
//                    CarId = car.CarId,
//                    CarNo = car.CarNo,
//                    CarType = car.CarType
//                }).ToList(),
//                Feedbacks = user.Feedbacks.Select(feedback => new FeedbackDto
//                {
//                    FeedbackId = feedback.FeedbackId,
//                    UserFeedback = feedback.UserFeedback
//                }).ToList(),
//                Parkingdetails = user.Parkingdetails.Select(pd => new CustomeParkingDetail
//                {
//                    DetailsId = pd.DetailsId,
//                    FromDate = pd.FromDate,
//                    ToDate = pd.ToDate,
//                    CustomParkingSlot = new CustomParkingSlot
//                    {
//                        SlotId = pd.Slot.SlotId,
//                        IsOccupied = pd.Slot.IsOccupied,
//                        SlotName = pd.Slot.SlotName,
//                        CustomParkingZone = new CustomParkingZone
//                        {
//                            AvailableSlots = pd.Slot.Zone.AvailableSlots,
//                            TotalSlots = pd.Slot.Zone.TotalSlots,
//                            CustomParkingArea = new CustomParkingArea
//                            {
//                                AreaId = pd.Slot.Zone.Area.AreaId,
//                                AreaName = pd.Slot.Zone.Area.AreaName,
//                                Rate = pd.Slot.Zone.Area.Rate,
//                                TotalSlots = pd.Slot.Zone.Area.TotalSlots,
//                                TotalZones = pd.Slot.Zone.Area.TotalZones
//                            }
//                        }
//                    }
//                }).ToList(),
//                Paymentdetails = user.Paymentdetails.Select(payment => new PaymentDetailDto
//                {
//                    PaymentId = payment.PaymentId,
//                    Amount = payment.Amount,
//                    PaymentTime = payment.PaymentTime
//                }).ToList()
//            };

//            return Ok(userDetails);
//        }

//        [HttpPost("login")]
//        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
//        {
//            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
//            {
//                return BadRequest("Invalid login request.");
//            }

//            var user = await _context.Userdetails.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

//            if (user == null || !VerifyPassword(loginRequest.Password, user.Password))
//            {
//                return Unauthorized("Invalid credentials.");
//            }

//            HttpContext.Session.SetString("UserId", user.UserId.ToString());
//            HttpContext.Session.SetString("Role", user.Role ?? "");

//            return Ok(new { role = user.Role, userId = user.UserId });
//        }

//        private bool VerifyPassword(string inputPassword, string storedHashedPassword)
//        {
//            return BCrypt.Net.BCrypt.Verify(inputPassword, storedHashedPassword);
//        }

//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteUserdetail(int id)
//        {
//            var userdetail = await _context.Userdetails.FindAsync(id);
//            if (userdetail == null)
//            {
//                return NotFound();
//            }

//            _context.Userdetails.Remove(userdetail);
//            await _context.SaveChangesAsync();

//            return NoContent();
//        }

//        private bool UserdetailExists(int id)
//        {
//            return (_context.Userdetails?.Any(e => e.UserId == id)).GetValueOrDefault();
//        }
//    }
//}


