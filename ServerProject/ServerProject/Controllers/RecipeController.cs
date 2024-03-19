using Microsoft.AspNetCore.Mvc;
using ServerProject.Edentities;
using System.Drawing;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        static int count = 5;
        public static List<Recipe> recipes=new List<Recipe>()
        {
              new Recipe {
        Id = 0,
        NameRecipe = "Chocolate Cookieד",
        CategoryId = 2,
        PreparationTime = 45,
        LevelOfDifficulty = 5,
        DateAdd = DateTime.Now,
        ListIngredients = new List<string> { "Flour", "Sugar", "Cocoa Powder", "Eggs", "Milk" },
        Preparation = new List<string> { "Preheat oven to 350°F", "Mix dry ingredients", "Add wet ingredients", "Bake for 30 minutes" },
        UserId = 2,
        UrlImage = "t../../../../assets/c7.jpg"
      },
      new Recipe
      {
        Id = 2,
        NameRecipe = "Chocolate Cake",
        CategoryId = 1,
        PreparationTime = 45,
        LevelOfDifficulty = 5,
        DateAdd = DateTime.Now,
        ListIngredients = new List<string> { "Flour", "Sugar", "Cocoa Powder", "Eggs", "Milk" },
        Preparation = new List<string> { "Preheat oven to 350°F", "Mix dry ingredients", "Add wet ingredients", "Bake for 30 minutes" },
        UserId = 1,
        UrlImage = "../../../../assets/c1.jpg"
      },
      new Recipe {
        Id = 1,
        NameRecipe = "beard",
        CategoryId =4,
        PreparationTime = 45,
        LevelOfDifficulty = 1,
        DateAdd = DateTime.Now,
        ListIngredients = new List<string> { "Flour", "Sugar", "Cocoa Powder", "Eggs", "Milk" },
        Preparation = new List<string> { "Preheat oven to 350°F", "Mix dry ingredients", "Add wet ingredients", "Bake for 30 minutes" },
        UserId = 1,
        UrlImage = "../../../../assets/bread20.jpg"

      },
      new Recipe {
        Id = 3,
        NameRecipe = "Orange cake",
        CategoryId = 1,
        PreparationTime = 30,
        LevelOfDifficulty = 5,
        DateAdd = DateTime.Now,
        ListIngredients = new List<string> { "Flour", "Sugar", "Cocoa Powder", "Eggs", "Milk","Orange jump"},
        Preparation = new List<string> { "Separate eggs","whip" ,"add other ingredients" , "put in the oven"},
        UserId = 2,
        UrlImage = "../../../../assets/bread9.jpg"
      }
        };
        // GET: api/<RecipeController>
        [HttpGet]
        public IEnumerable<Recipe> Get()
        {
            return recipes;
        }

        // GET api/<RecipeController>/5
        [HttpGet("{id}")]
        public Recipe Get(int id)
        {
            var r=recipes.Find(x => x.Id == id);
            return r;
        }

        // POST api/<RecipeController>
        [HttpPost]
        public void Post([FromBody] Recipe value)
        {
            if(value != null) {
                value.Id = count++;
                recipes.Add(value);
            }
         
        }

        // PUT api/<RecipeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Recipe value)
        {
            recipes.FirstOrDefault(x => x.Id == id).NameRecipe=value.NameRecipe;
            recipes.FirstOrDefault(x => x.Id == id).CategoryId = value.CategoryId;
            recipes.FirstOrDefault(x => x.Id == id).PreparationTime = value.PreparationTime;
            recipes.FirstOrDefault(x => x.Id == id).LevelOfDifficulty = value.LevelOfDifficulty;
            recipes.FirstOrDefault(x => x.Id == id).DateAdd = value.DateAdd;
            recipes.FirstOrDefault(x => x.Id == id).ListIngredients = value.ListIngredients;
            recipes.FirstOrDefault(x => x.Id == id).Preparation = value.Preparation;
            recipes.FirstOrDefault(x => x.Id == id).UserId = value.UserId;
            recipes.FirstOrDefault(x => x.Id == id).UrlImage = value.UrlImage;

        }

        // DELETE api/<RecipeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var r = recipes.Find(x => x.Id == id);
            recipes.Remove(r);
        }
    }
}
