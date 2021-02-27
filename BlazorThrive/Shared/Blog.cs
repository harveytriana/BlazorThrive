using System;
using System.ComponentModel.DataAnnotations;

namespace BlazorThrive.Shared
{
    /// <summary>
    /// represent a blog post.
    /// </summary>
    public class Blog
    {
        [Key]
        public int BlogId { get; set; }

        [MaxLength(200)]
        public string Title { get; set; }

        [MaxLength(50)]
        public string Author { get; set; }

        public DateTime Published { get; set; }

        public string Post { get; set; }

        [MaxLength(500)]
        public string Summary { get; set; }

        [MaxLength(50)]
        public string Tags { get; set; }

        [MaxLength(50)]
        public string Language { get; set; }
    }
}
