using BlazorThrive.Server.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace BlazorThrive.Server.Services
{
    public class BooksStoreContext
    {
        readonly IMongoDatabase _context;

        readonly IMongoCollection<Book> _booksCollection;

        readonly string _section="MongoAtlas"; // | MongoNetwork

        public BooksStoreContext(IConfiguration configuration)
        {
            var connectionString = configuration[$"{_section}:ConnectionString"];
            var databaseName = configuration[$"{_section}:DatabaseName"];

            // connect the mongo service
            var client = new MongoClient(connectionString);
            // get the database
            _context = client.GetDatabase(databaseName);
            // collctions
            _booksCollection = _context.GetCollection<Book>("Book");
        }

        // get the collections
        public IMongoCollection<Book> Books => _booksCollection;
    }
}
