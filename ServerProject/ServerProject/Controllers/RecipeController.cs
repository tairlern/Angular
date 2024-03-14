using Microsoft.AspNetCore.Mvc;
using ServerProject.Edentities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        public static List<Recipe> recipes=new List<Recipe>()
        {
              new Recipe {
        Id = 0,
        NameRecipe = "Chocolate Cake",
        CategoryId = 1,
        PreparationTime = 45,
        LevelOfDifficulty = 5,
        DateAdd = DateTime.Now,
        ListIngredients = new List<string> { "Flour", "Sugar", "Cocoa Powder", "Eggs", "Milk" },
        Preparation = new List<string> { "Preheat oven to 350°F", "Mix dry ingredients", "Add wet ingredients", "Bake for 30 minutes" },
        UserId = 2,
        UrlImage = "../../../../assets/c4.jpg"
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
        UrlImage = "../../../../assets/c3.jpg"
      },
      new Recipe {
        Id = 1,
        NameRecipe = "Chocolate Cake",
        CategoryId = 1,
        PreparationTime = 45,
        LevelOfDifficulty = 1,
        DateAdd = DateTime.Now,
        ListIngredients = new List<string> { "Flour", "Sugar", "Cocoa Powder", "Eggs", "Milk" },
        Preparation = new List<string> { "Preheat oven to 350°F", "Mix dry ingredients", "Add wet ingredients", "Bake for 30 minutes" },
        UserId = 1,
        UrlImage = "../../../../assets/c2.jpg"

      },
      new Recipe {
        Id = 3,
        NameRecipe = "Vegetable Stir-Fry",
        CategoryId = 2,
        PreparationTime = 30,
        LevelOfDifficulty = 5,
        DateAdd = DateTime.Now,
        ListIngredients = new List<string> { "Broccoli", "Carrots", "Bell Peppers", "Onions", "Garlic", "Soy Sauce" },
        Preparation = new List<string> { "Chop vegetables", "Stir-fry in hot oil", "Add sauce", "Cook until tender" },
        UserId = 2,
        UrlImage = "../../../../assets/c1.jpg"
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
            recipes.Add(value);
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
