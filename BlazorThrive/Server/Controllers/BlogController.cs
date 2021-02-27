// ======================================
//  Blazor Spread. LHTV
// ======================================
using BlazorSpread.Server.Services;
using BlazorThrive.Shared;
using Microsoft.AspNetCore.Mvc;

namespace BlazorSpread.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : DataHandlerController<Blog>
    {
        public BlogController(IDataService<Blog> service) : base(service) { }
    }
}

