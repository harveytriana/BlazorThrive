using AspNetCore.SEOHelper.Sitemap;
using BlazorThrive.Server.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using IO = System.IO;

namespace BlazorThrive.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SiteMapController : ControllerBase
    {
        readonly string _path;
        readonly FileLogger _fileLogger;

        public SiteMapController(IWebHostEnvironment env, FileLogger fileLogger)
        {
            _path = env.ContentRootPath;
            _fileLogger = fileLogger;

            _fileLogger.Log("SiteMapController");
            _fileLogger.Log($"ROOTPATH = {Startup.ROOTPATH}");
            _fileLogger.Log($"IsDevelpment = {Startup.ISDEVELOPER}");
        }

        [HttpGet]
        public bool Get()
        {
            // validate if has to update the file
            if(IO.File.Exists(Startup.ROOTPATH + "/sitemap.xml")) {
                _fileLogger.Log("The sitempa exists.");
                return false;
            }
            try {
                var date = DateTime.UtcNow.Date;
                var list = new List<SitemapNode> {
                    new SitemapNode { LastModified = date, Priority = 0.8, Url = "https://www.blazorspread.net", Frequency = SitemapFrequency.Weekly },
                    new SitemapNode { LastModified = date, Priority = 0.8, Url = "https://www.example.com/asp-dot-net-turotial-part2", Frequency = SitemapFrequency.Yearly },
                    new SitemapNode { LastModified = date, Priority = 0.7, Url = "https://www.example.com/asp-dot-net-turotial-part3", Frequency = SitemapFrequency.Monthly }
                };
                new SitemapDocument().CreateSitemapXML(list, _path);
                _fileLogger.Log("The sitempa was created.");
                return true;
            }
            catch (Exception e){
                _fileLogger.Log($"Exception in SiteMapController.GET: {e.Message}");
            }
            return false;
        }



    }
}
