// ======================================
//  Blazor Spread. LHTV
// ======================================
using BlazorThrive.Shared;
using Markdig;
using Markdig.SyntaxHighlighting;

namespace BlazorThrive.Client
{
    public static class MarkdownParser
    {
        public static string Parse(string markdown)
        {
            var pipeline = new MarkdownPipelineBuilder()
                .UseAdvancedExtensions()
                .UseSyntaxHighlighting()
                .Build();
            var html = Markdown.ToHtml(markdown, pipeline);
            // html surrogates
            var sr = new string[] {
                // img style
                "data-align=|center|".Quotes(),
                "class=|img-fluid|".Quotes(),
                // center img
                "<img",
                "<p style=|text-align:center;|><img class=|img-fluid|".Quotes(),
                // external url to new page
                "a href=",
                "a target=|_blank| href=".Quotes()
            };

            // IMGDOC => IMGURL was replaced by base64
            Surrogate(ref html, sr[0], sr[1]);
            Surrogate(ref html, sr[2], sr[3]);
            Surrogate(ref html, sr[4], sr[5]);

            return html;
        }

        static void Surrogate(ref string text, string contain, string replace)
        {
            if (text.Contains(contain)) {
                text = text.Replace(contain, replace);
            }
        }
    }

    
}
