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
    public class CardetailsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CardetailsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Cardetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cardetail>>> GetCardetails()
        {
          if (_context.Cardetails == null)
          {
              return NotFound();
          }
            return await _context.Cardetails.ToListAsync();
        }

        // GET: api/Cardetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cardetail>> GetCardetail(int id)
        {
          if (_context.Cardetails == null)
          {
              return NotFound();
          }
            var cardetail = await _context.Cardetails.FindAsync(id);

            if (cardetail == null)
            {
                return NotFound();
            }

            return cardetail;
        }

        // PUT: api/Cardetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCardetail(int id, Cardetail cardetail)
        {
            if (id != cardetail.CarId)
            {
                return BadRequest();
            }

            _context.Entry(cardetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CardetailExists(id))
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

        // POST: api/Cardetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cardetail>> PostCardetail(Cardetail cardetail)
        {
          if (_context.Cardetails == null)
          {
              return Problem("Entity set 'MyDbContext.Cardetails'  is null.");
          }
            _context.Cardetails.Add(cardetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCardetail", new { id = cardetail.CarId }, cardetail);
        }

        // DELETE: api/Cardetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCardetail(int id)
        {
            if (_context.Cardetails == null)
            {
                return NotFound();
            }
            var cardetail = await _context.Cardetails.FindAsync(id);
            if (cardetail == null)
            {
                return NotFound();
            }

            _context.Cardetails.Remove(cardetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CardetailExists(int id)
        {
            return (_context.Cardetails?.Any(e => e.CarId == id)).GetValueOrDefault();
        }
    }
}
