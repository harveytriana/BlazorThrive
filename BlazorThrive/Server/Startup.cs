using BlazorSpread.Server.Services;
using BlazorThrive.Server.Services;
using BlazorThrive.Shared;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using System;
using AspNetCore.SEOHelper;

namespace BlazorThrive.Server
{
    public class Startup
    {
        const string SQL = "LocalDevelopment"; 

        public static string  ROOTPATH { get;private set; }
        public static bool ISDEVELOPER { get; private set; }

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;

            ROOTPATH = env.ContentRootPath;

            ISDEVELOPER = env.IsDevelopment();
           
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllersWithViews();
            services.AddRazorPages();

            services.AddScoped<BooksStoreContext>();
            // SQL
            services.AddDbContext<SqlContext>(options => options.UseSqlServer(Configuration.GetConnectionString(SQL)));
            // entities
            services.AddScoped<IDataService<Blog>, SqlService<Blog>>();

            services.AddSingleton<FileLogger>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
                app.UseWebAssemblyDebugging();
            }
            else {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, 
                // see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            // SEO
            app.UseXMLSitemap(env.ContentRootPath);
            // app.UseRobotsTxt(env.ContentRootPath);

            app.UseHttpsRedirection();
            app.UseBlazorFrameworkFiles();
            app.UseStaticFiles();
            
            app.UseRouting();

            app.UseEndpoints(endpoints => {
                endpoints.MapRazorPages();
                endpoints.MapControllers();
                endpoints.MapFallbackToFile("index.html");
            });
        }
    }
}
