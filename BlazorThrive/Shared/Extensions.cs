// ======================================
//  Blazor Spread. LHTV
// ======================================
namespace BlazorThrive.Shared
{
    public static class Extensions
    {
        public static string Quotes(this string text)
        {
            if (string.IsNullOrEmpty(text) == false && text.IndexOf('|') > 0) {
                return text.Replace("|", "\"");
            }
            return text;
        }

        public static bool IsEmail(this string text)
        {
            try {
                var addr = new System.Net.Mail.MailAddress(text);
                return addr.Address == text;
            }
            catch {
                return false;
            }
        }

        public static bool Empty(this string text)
        {
            return string.IsNullOrEmpty(text);
        }

    }

}
