using static System.Net.Mime.MediaTypeNames;

namespace ServerProject.Edentities
{
    public class Category
    {
        //קוד, שם, ניתוב לאייקון
        public int Id { get; set; }
        public string Name { get; set; }
        public string UrlImage { get; set; }
      
    }

}
