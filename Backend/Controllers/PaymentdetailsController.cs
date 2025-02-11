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
    public class PaymentdetailsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public PaymentdetailsController(MyDbContext context)
        {
            _context = context;
        }

        //// GET: api/Paymentdetails
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Paymentdetail>>> GetPaymentdetails()
        //{
        //  if (_context.Paymentdetails == null)
        //  {
        //      return NotFound();
        //  }
        //    return await _context.Paymentdetails.ToListAsync();
        //}
        // GET: api/Parkingdetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomeParkingDetail>>> GetParkingdetails()
        {
            if (_context.Parkingdetails == null)
            {
                return NotFound();
            }

            var parkingDetails = await _context.Parkingdetails
                .Include(pd => pd.Slot)
                    .ThenInclude(ps => ps.Zone)
                        .ThenInclude(pz => pz.Area)
                .ToListAsync();

            var result = parkingDetails.Select(pd => new CustomeParkingDetail
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
            }).ToList();

            return Ok(result);
        }


        // GET: api/Paymentdetails/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Paymentdetail>> GetPaymentdetail(int id)
        //{
        //  if (_context.Paymentdetails == null)
        //  {
        //      return NotFound();
        //  }
        //    var paymentdetail = await _context.Paymentdetails.FindAsync(id);

        //    if (paymentdetail == null)
        //    {
        //        return NotFound();
        //    }

        //    return paymentdetail;
        //}

        // GET: api/Parkingdetails/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomeParkingDetail>> GetParkingdetail(int id)
        {
            if (_context.Parkingdetails == null)
            {
                return NotFound();
            }

            var parkingDetail = await _context.Parkingdetails
                .Include(pd => pd.Slot)
                    .ThenInclude(ps => ps.Zone)
                        .ThenInclude(pz => pz.Area)
                .FirstOrDefaultAsync(pd => pd.DetailsId == id);  // ✅ Filtering by ID

            if (parkingDetail == null)
            {
                return NotFound();
            }

            var result = new CustomeParkingDetail
            {
                DetailsId = parkingDetail.DetailsId,
                FromDate = parkingDetail.FromDate,
                ToDate = parkingDetail.ToDate,
                CustomParkingSlot = parkingDetail.Slot != null ? new CustomParkingSlot
                {
                    SlotId = parkingDetail.Slot.SlotId,
                    IsOccupied = parkingDetail.Slot.IsOccupied,
                    SlotName = parkingDetail.Slot.SlotName,
                    CustomParkingZone = parkingDetail.Slot.Zone != null ? new CustomParkingZone
                    {
                        AvailableSlots = parkingDetail.Slot.Zone.AvailableSlots,
                        TotalSlots = parkingDetail.Slot.Zone.TotalSlots,
                        CustomParkingArea = parkingDetail.Slot.Zone.Area != null ? new CustomParkingArea
                        {
                            AreaId = parkingDetail.Slot.Zone.Area.AreaId,
                            AreaName = parkingDetail.Slot.Zone.Area.AreaName,
                            Rate = parkingDetail.Slot.Zone.Area.Rate,
                            TotalSlots = parkingDetail.Slot.Zone.Area.TotalSlots,
                            TotalZones = parkingDetail.Slot.Zone.Area.TotalZones
                        } : null
                    } : null
                } : null
            };

            return Ok(result);
        }

        // PUT: api/Paymentdetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaymentdetail(int id, Paymentdetail paymentdetail)
        {
            if (id != paymentdetail.PaymentId)
            {
                return BadRequest();
            }

            _context.Entry(paymentdetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentdetailExists(id))
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

        // POST: api/Paymentdetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Paymentdetail>> PostPaymentdetail(Paymentdetail paymentdetail)
        {
          if (_context.Paymentdetails == null)
          {
              return Problem("Entity set 'MyDbContext.Paymentdetails'  is null.");
          }
            _context.Paymentdetails.Add(paymentdetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaymentdetail", new { id = paymentdetail.PaymentId }, paymentdetail);
        }

        // DELETE: api/Paymentdetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentdetail(int id)
        {
            if (_context.Paymentdetails == null)
            {
                return NotFound();
            }
            var paymentdetail = await _context.Paymentdetails.FindAsync(id);
            if (paymentdetail == null)
            {
                return NotFound();
            }

            _context.Paymentdetails.Remove(paymentdetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaymentdetailExists(int id)
        {
            return (_context.Paymentdetails?.Any(e => e.PaymentId == id)).GetValueOrDefault();
        }
    }
}
