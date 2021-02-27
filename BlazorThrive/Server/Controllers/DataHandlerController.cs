// ======================================
//  Blazor Spread. LHTV
// ======================================
using System.Collections.Generic;
using System.Threading.Tasks;
using BlazorSpread.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlazorSpread.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataHandlerController<T> : ControllerBase where T : class
    {
        readonly IDataService<T> _service;

        public DataHandlerController(IDataService<T> service)
        {
            _service = service;
        }

        // GET: api/T
        [HttpGet]
        public async Task<IEnumerable<T>> Get()
        {
            try {
                return await _service.Items();
            }
            catch {
                return new List<T> {
                }; 
            }
        }

        // GET: api/T/5
        [HttpGet("{id}")]
        public async Task<T> Get(int id)
        {
            return await _service.Read(id);
        }

        // PUT: api/T
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut]
        public async Task<bool> Put(T item)
        {
            return await _service.Update(item);
        }

        // POST: api/T
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<bool> Post(T item)
        {
            return await _service.Create(item);
        }

        // DELETE: api/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            return await _service.Delete(id);
        }
    }
}
