using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineParkingApplication.Models;

namespace OnlineParkingApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkingslotsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ParkingslotsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Parkingslots
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Parkingslot>>> GetParkingslots()
        {
          if (_context.Parkingslots == null)
          {
              return NotFound();
          }
            return await _context.Parkingslots.ToListAsync();
        }

        // GET: api/Parkingslots/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Parkingslot>> GetParkingslot(int id)
        {
          if (_context.Parkingslots == null)
          {
              return NotFound();
          }
            var parkingslot = await _context.Parkingslots.FindAsync(id);

            if (parkingslot == null)
            {
                return NotFound();
            }

            return parkingslot;
        }

        // PUT: api/Parkingslots/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParkingslot(int id, Parkingslot parkingslot)
        {
            if (id != parkingslot.SlotId)
            {
                return BadRequest();
            }

            _context.Entry(parkingslot).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParkingslotExists(id))
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

        // POST: api/Parkingslots
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Parkingslot>> PostParkingslot(Parkingslot parkingslot)
        {
          if (_context.Parkingslots == null)
          {
              return Problem("Entity set 'MyDbContext.Parkingslots'  is null.");
          }
            _context.Parkingslots.Add(parkingslot);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetParkingslot", new { id = parkingslot.SlotId }, parkingslot);
        }

        // DELETE: api/Parkingslots/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParkingslot(int id)
        {
            if (_context.Parkingslots == null)
            {
                return NotFound();
            }
            var parkingslot = await _context.Parkingslots.FindAsync(id);
            if (parkingslot == null)
            {
                return NotFound();
            }

            _context.Parkingslots.Remove(parkingslot);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParkingslotExists(int id)
        {
            return (_context.Parkingslots?.Any(e => e.SlotId == id)).GetValueOrDefault();
        }

        [HttpPut("occupy/{slotId}")]
        public async Task<IActionResult> OccupySlot(int slotId)
        {
            var slot = await _context.Parkingslots.FindAsync(slotId);
            if (slot == null)
                return NotFound(new { message = "Slot not found" });

            if (slot.IsOccupied == 1)
                return BadRequest(new { message = "Slot is already occupied" });

            slot.IsOccupied = 1;
            _context.Parkingslots.Update(slot);
            await _context.SaveChangesAsync();

            // ✅ Schedule Auto-Unoccupy with a safer approach
            _ = Task.Run(() => AutoUnoccupy(slotId));

            return Ok(new { message = "Slot occupied successfully" });
        }

        // ✅ Function to Auto-Unoccupy Slot After 2 Hours (Safe Background Task)
        private async Task AutoUnoccupy(int slotId)
        {
            //await Task.Delay(TimeSpan.FromHours(2)); // 2-hour delay

            await Task.Delay(TimeSpan.FromSeconds(10));

            using (var scope = _context.Database.BeginTransaction()) // Ensure transaction safety
            {
                var slot = await _context.Parkingslots.FindAsync(slotId);
                if (slot != null && slot.IsOccupied == 1)
                {
                    slot.IsOccupied = 0;
                    _context.Parkingslots.Update(slot);
                    await _context.SaveChangesAsync();
                }

                await scope.CommitAsync(); // Commit transaction
            }
        }
    }
}
