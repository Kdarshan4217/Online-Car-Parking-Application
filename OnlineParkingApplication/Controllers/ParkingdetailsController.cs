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
    public class ParkingdetailsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ParkingdetailsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Parkingdetails
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Parkingdetail>>> GetParkingdetails()
        //{
        //  if (_context.Parkingdetails == null)
        //  {
        //      return NotFound();
        //  }
        //    return await _context.Parkingdetails.ToListAsync();
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


        // GET: api/Parkingdetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Parkingdetail>> GetParkingdetail(int id)
        {
          if (_context.Parkingdetails == null)
          {
              return NotFound();
          }
            var parkingdetail = await _context.Parkingdetails.FindAsync(id);

            if (parkingdetail == null)
            {
                return NotFound();
            }

            return parkingdetail;
        }

        // PUT: api/Parkingdetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParkingdetail(int id, Parkingdetail parkingdetail)
        {
            if (id != parkingdetail.DetailsId)
            {
                return BadRequest();
            }

            _context.Entry(parkingdetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParkingdetailExists(id))
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

        // POST: api/Parkingdetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Parkingdetail>> PostParkingdetail(Parkingdetail parkingdetail)
        {
          if (_context.Parkingdetails == null)
          {
              return Problem("Entity set 'MyDbContext.Parkingdetails'  is null.");
          }
            _context.Parkingdetails.Add(parkingdetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetParkingdetail", new { id = parkingdetail.DetailsId }, parkingdetail);
        }

        // DELETE: api/Parkingdetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParkingdetail(int id)
        {
            if (_context.Parkingdetails == null)
            {
                return NotFound();
            }
            var parkingdetail = await _context.Parkingdetails.FindAsync(id);
            if (parkingdetail == null)
            {
                return NotFound();
            }

            _context.Parkingdetails.Remove(parkingdetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParkingdetailExists(int id)
        {
            return (_context.Parkingdetails?.Any(e => e.DetailsId == id)).GetValueOrDefault();
        }
    }
}
