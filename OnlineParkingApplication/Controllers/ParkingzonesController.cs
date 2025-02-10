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
    public class ParkingzonesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ParkingzonesController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Parkingzones
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Parkingzone>>> GetParkingzones()
        //{
        //  if (_context.Parkingzones == null)
        //  {
        //      return NotFound();
        //  }
        //    return await _context.Parkingzones.ToListAsync();
        //}
        // GET: api/Parkingzones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ParkingZoneDto>>> GetParkingzones()
        {
            if (_context.Parkingzones == null)
            {
                return NotFound();
            }

            var parkingZones = await _context.Parkingzones
                .Include(pz => pz.Parkingslots)
                .ToListAsync();

            var parkingZoneDtos = parkingZones.Select(pzone => new ParkingZoneDto
            {
                ZoneId = pzone.ZoneId,
                AvailableSlots = pzone.AvailableSlots,
                TotalSlots = pzone.TotalSlots,
                AreaId = pzone.AreaId,
                ZoneName = pzone.ZoneName,
                Slots = pzone.Parkingslots.Select(pslot => new ParkingSlotDto
                {
                    SlotId = pslot.SlotId,
                    IsOccupied = pslot.IsOccupied,
                    SlotName = pslot.SlotName,
                    ZoneId = pslot.ZoneId
                }).ToList()
            }).ToList();

            return Ok(parkingZoneDtos);
        }


        // GET: api/Parkingzones/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Parkingzone>> GetParkingzone(int id)
        //{
        //  if (_context.Parkingzones == null)
        //  {
        //      return NotFound();
        //  }
        //    var parkingzone = await _context.Parkingzones.FindAsync(id);

        //    if (parkingzone == null)
        //    {
        //        return NotFound();
        //    }

        //    return parkingzone;
        //}
        // GET: api/Parkingzones/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ParkingZoneDto>> GetParkingzone(int id)
        {
            var parkingZone = await _context.Parkingzones
                .Include(pz => pz.Parkingslots)
                .FirstOrDefaultAsync(pz => pz.ZoneId == id);

            if (parkingZone == null)
            {
                return NotFound();
            }

            var parkingZoneDto = new ParkingZoneDto
            {
                ZoneId = parkingZone.ZoneId,
                AvailableSlots = parkingZone.AvailableSlots,
                TotalSlots = parkingZone.TotalSlots,
                AreaId = parkingZone.AreaId,
                Slots = parkingZone.Parkingslots.Select(pslot => new ParkingSlotDto
                {
                    SlotId = pslot.SlotId,
                    IsOccupied = pslot.IsOccupied,
                    SlotName = pslot.SlotName,
                    ZoneId = pslot.ZoneId
                }).ToList()
            };

            return Ok(parkingZoneDto);
        }


        // PUT: api/Parkingzones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParkingzone(int id, Parkingzone parkingzone)
        {
            if (id != parkingzone.ZoneId)
            {
                return BadRequest();
            }

            _context.Entry(parkingzone).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParkingzoneExists(id))
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

        // POST: api/Parkingzones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Parkingzone>> PostParkingzone(Parkingzone parkingzone)
        {
            if (_context.Parkingzones == null)
            {
                return Problem("Entity set 'MyDbContext.Parkingzones'  is null.");
            }
            _context.Parkingzones.Add(parkingzone);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetParkingzone", new { id = parkingzone.ZoneId }, parkingzone);
        }

        // DELETE: api/Parkingzones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParkingzone(int id)
        {
            if (_context.Parkingzones == null)
            {
                return NotFound();
            }
            var parkingzone = await _context.Parkingzones.FindAsync(id);
            if (parkingzone == null)
            {
                return NotFound();
            }

            _context.Parkingzones.Remove(parkingzone);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParkingzoneExists(int id)
        {
            return (_context.Parkingzones?.Any(e => e.ZoneId == id)).GetValueOrDefault();
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

//namespace OnlineParkingApplication.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ParkingzonesController : ControllerBase
//    {
//        private readonly MyDbContext _context;

//        public ParkingzonesController(MyDbContext context)
//        {
//            _context = context;
//        }

//        // GET: api/Parkingzones
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<ParkingZoneDto>>> GetParkingzones()
//        {
//            if (_context.Parkingzones == null)
//            {
//                return NotFound();
//            }

//            var parkingZones = await _context.Parkingzones
//                .Include(pz => pz.Parkingslots)
//                .ToListAsync();

//            var parkingZoneDtos = parkingZones.Select(pzone => new ParkingZoneDto
//            {
//                ZoneId = pzone.ZoneId,
//                ZoneName = pzone.ZoneName,  // Added ZoneName
//                AvailableSlots = pzone.AvailableSlots,
//                TotalSlots = pzone.TotalSlots,
//                AreaId = pzone.AreaId,
//                Slots = pzone.Parkingslots.Select(pslot => new ParkingSlotDto
//                {
//                    SlotId = pslot.SlotId,
//                    IsOccupied = pslot.IsOccupied,
//                    SlotName = pslot.SlotName,
//                    ZoneId = pslot.ZoneId
//                }).ToList()
//            }).ToList();

//            return Ok(parkingZoneDtos);
//        }

//        // GET: api/Parkingzones/{id}
//        [HttpGet("{id}")]
//        public async Task<ActionResult<ParkingZoneDto>> GetParkingzone(int id)
//        {
//            var parkingZone = await _context.Parkingzones
//                .Include(pz => pz.Parkingslots)
//                .FirstOrDefaultAsync(pz => pz.ZoneId == id);

//            if (parkingZone == null)
//            {
//                return NotFound();
//            }

//            var parkingZoneDto = new ParkingZoneDto
//            {
//                ZoneId = parkingZone.ZoneId,
//                ZoneName = parkingZone.ZoneName, // Added ZoneName
//                AvailableSlots = parkingZone.AvailableSlots,
//                TotalSlots = parkingZone.TotalSlots,
//                AreaId = parkingZone.AreaId,
//                Slots = parkingZone.Parkingslots.Select(pslot => new ParkingSlotDto
//                {
//                    SlotId = pslot.SlotId,
//                    IsOccupied = pslot.IsOccupied,
//                    SlotName = pslot.SlotName,
//                    ZoneId = pslot.ZoneId
//                }).ToList()
//            };

//            return Ok(parkingZoneDto);
//        }

//        // PUT: api/Parkingzones/5
//        [HttpPut("{id}")]
//        public async Task<IActionResult> PutParkingzone(int id, Parkingzone parkingzone)
//        {
//            if (id != parkingzone.ZoneId)
//            {
//                return BadRequest();
//            }

//            _context.Entry(parkingzone).State = EntityState.Modified;

//            try
//            {
//                await _context.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                if (!ParkingzoneExists(id))
//                {
//                    return NotFound();
//                }
//                else
//                {
//                    throw;
//                }
//            }

//            return NoContent();
//        }

//        // POST: api/Parkingzones
//        [HttpPost]
//        public async Task<ActionResult<Parkingzone>> PostParkingzone(Parkingzone parkingzone)
//        {
//            if (_context.Parkingzones == null)
//            {
//                return Problem("Entity set 'MyDbContext.Parkingzones' is null.");
//            }

//            _context.Parkingzones.Add(parkingzone);
//            await _context.SaveChangesAsync();

//            return CreatedAtAction("GetParkingzone", new { id = parkingzone.ZoneId }, parkingzone);
//        }

//        // DELETE: api/Parkingzones/5
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteParkingzone(int id)
//        {
//            if (_context.Parkingzones == null)
//            {
//                return NotFound();
//            }
//            var parkingzone = await _context.Parkingzones.FindAsync(id);
//            if (parkingzone == null)
//            {
//                return NotFound();
//            }

//            _context.Parkingzones.Remove(parkingzone);
//            await _context.SaveChangesAsync();

//            return NoContent();
//        }

//        private bool ParkingzoneExists(int id)
//        {
//            return (_context.Parkingzones?.Any(e => e.ZoneId == id)).GetValueOrDefault();
//        }
//    }
//}
