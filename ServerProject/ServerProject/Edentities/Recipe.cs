using static System.Net.Mime.MediaTypeNames;

namespace ServerProject.Edentities
{
    public class Recipe
    {
        //קוד מתכון, שם מתכון, קוד קטגוריה, זמן הכנה בדקות, דרגת קושי 1-5
        //, תאריך הוספת המתכון לאתר, רשימת הרכיבים (אוסף מחרוזות), אופן ההכנה
        //(אוסף מחרוזות), קוד משתמש שהכניס את המתכון, תמונה (מחרוזת של ניתוב).
        public int Id { get; set; }
        public string NameRecipe { get; set; }
        public int CategoryId { get; set; }
      //  public Category Category { get; set; }
        public int PreparationTime { get; set; }
        public int LevelOfDifficulty { get; set; }
        public DateTime DateAdd { get; set; }
        public List<string> ListIngredients { get; set; }
        public List<string> Preparation { get; set; }
        public int UserId { get; set; }
        //public User User { get; set; }
        public string UrlImage { get; set; }
      
    }
}
