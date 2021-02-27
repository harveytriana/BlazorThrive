// ======================================
//  Blazor Spread. LHTV
// ======================================
using BlazorThrive.Shared;
using Microsoft.EntityFrameworkCore;

namespace BlazorSpread.Server.Services
{
    public class SqlContext : DbContext
    {
        public DbSet<Blog> Blogs { get; set; }

        public SqlContext(DbContextOptions<SqlContext> options) : base(options) { }
    }
}
