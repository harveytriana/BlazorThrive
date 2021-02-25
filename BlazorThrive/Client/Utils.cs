using System;

namespace BlazorThrive.Client
{
    public static class Utils
    {
        public static bool IsJson(string js)
        {
            var s = js.Trim();

            if ((s.StartsWith("{") && s.EndsWith("}")) || //For object
                (s.StartsWith("[") && s.EndsWith("]"))) //For array
            {
                return true;
            }
            Console.WriteLine("The variable has not JSON structure.");
            return false;
        }
    }
}
