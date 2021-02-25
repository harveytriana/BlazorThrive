using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace BlazorThrive.Server.Models
{
    public class Book
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Author")]
        public string Author { get; set; }

        [BsonElement("InStock")]
        public bool InStock { get; set; }

        [BsonElement("Price")]
        public decimal Price { get; set; }

        [BsonElement("CreationDate")]
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;

        public override string ToString() => $"[{Id}] {Name}, {Author} | ${Price:0.00}";
    }

    public class Seed
    {
        public static List<Book> GetBooks()
        {
            return new List<Book>
            {
                new Book { Author = "Justine Picardie", Name = "Inge Morath: On Style" , InStock = true, Price = 70.2M },
                new Book { Author = "Justine Picardie", Name = "If the Spirit Moves You" , InStock = false, Price = 321.0M },
                new Book { Author = "Justine Picardie", Name = "Wish I May", InStock = false, Price = 521.7M },
                new Book { Author = "Tembi Locke", Name = "From Scratch", InStock = true, Price = 389.4M },
                new Book { Author = "John Lennon", Name = "In His On Right", InStock = true, Price = 189.4M }
            };
        }
    }
}
