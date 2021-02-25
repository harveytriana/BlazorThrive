using BlazorThrive.Server.Models;
using BlazorThrive.Server.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace BlazorThrive.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        readonly BooksStoreContext _context;

        public BooksController(BooksStoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Book>> Get()
        {
            try {
                var result = await _context.Books.FindAsync(_ => true);
                return result.ToEnumerable();
            }
            catch (Exception e) {
                var escape = new List<Book> {
                    new Book {
                        Name = e.Message,
                        Author = "Exception"
                    }
                };
                return escape;
            }
        }

    }
}
