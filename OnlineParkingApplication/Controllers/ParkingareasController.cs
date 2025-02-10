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
    public class ParkingareasController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ParkingareasController(MyDbContext context)
        {
            _context = context;
        }

        //// GET: api/Parkingareas
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<ParkingAreaDto>>> GetParkingareas()
        //{
        //  if (_context.Parkingareas == null)
        //  {
        //      return NotFound();
        //  }
        //    var parea = await _context.Parkingareas.ToListAsync();
        //    var parkingAreaDto = new ParkingAreaDto();
        //    parkingAreaDto.AreaId =  parea.

        //}
        // GET: api/Parkingareas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ParkingAreaDto>>> GetParkingareas()
        {
            if (_context.Parkingareas == null)
            {
                return NotFound();
            }

            // Fetching Parkingareas along with related Parkingzones and Parkingslots
            var parkingAreas = await _context.Parkingareas
                .Include(pa => pa.Parkingzones) // Include Parkingzones
                .ThenInclude(pz => pz.Parkingslots) // Include Parkingslots in each Parkingzone
                .ToListAsync();

            // Mapping to ParkingAreaDto
            var parkingAreaDtos = parkingAreas.Select(parea => new ParkingAreaDto
            {
                AreaId = parea.AreaId,
                AreaName = parea.AreaName,
                Rate = parea.Rate,
                TotalSlots = parea.TotalSlots,
                TotalZones = parea.TotalZones,
                Zones = parea.Parkingzones.Select(pzone => new ParkingZoneDto
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
                }).ToList()
            }).ToList();

            return Ok(parkingAreaDtos);
        }


        //// GET: api/Parkingareas/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Parkingarea>> GetParkingarea(int id)
        //{
        //  if (_context.Parkingareas == null)
        //  {
        //      return NotFound();
        //  }
        //    var parkingarea = await _context.Parkingareas.FindAsync(id);

        //    if (parkingarea == null)
        //    {
        //        return NotFound();
        //    }

        //    return parkingarea;
        //}
        // GET: api/Parkingareas/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ParkingAreaDto>> GetParkingarea(int id)
        {
            var parkingArea = await _context.Parkingareas
                .Include(pa => pa.Parkingzones)
                .ThenInclude(pz => pz.Parkingslots)
                .FirstOrDefaultAsync(pa => pa.AreaId == id);

            if (parkingArea == null)
            {
                return NotFound();
            }

            var parkingAreaDto = new ParkingAreaDto
            {
                AreaId = parkingArea.AreaId,
                AreaName = parkingArea.AreaName,
                Rate = parkingArea.Rate,
                TotalSlots = parkingArea.TotalSlots,
                TotalZones = parkingArea.TotalZones,
                Zones = parkingArea.Parkingzones.Select(pzone => new ParkingZoneDto
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
                }).ToList()
            };

            return Ok(parkingAreaDto);
        }

        // PUT: api/Parkingareas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParkingarea(int id, Parkingarea parkingarea)
        {
            if (id != parkingarea.AreaId)
            {
                return BadRequest();
            }

            _context.Entry(parkingarea).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParkingareaExists(id))
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

        // POST: api/Parkingareas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Parkingarea>> PostParkingarea(Parkingarea parkingarea)
        {
          if (_context.Parkingareas == null)
          {
              return Problem("Entity set 'MyDbContext.Parkingareas'  is null.");
          }
            _context.Parkingareas.Add(parkingarea);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetParkingarea", new { id = parkingarea.AreaId }, parkingarea);
        }

        // DELETE: api/Parkingareas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParkingarea(int id)
        {
            if (_context.Parkingareas == null)
            {
                return NotFound();
            }
            var parkingarea = await _context.Parkingareas.FindAsync(id);
            if (parkingarea == null)
            {
                return NotFound();
            }

            _context.Parkingareas.Remove(parkingarea);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParkingareaExists(int id)
        {
            return (_context.Parkingareas?.Any(e => e.AreaId == id)).GetValueOrDefault();
        }
    }
}
