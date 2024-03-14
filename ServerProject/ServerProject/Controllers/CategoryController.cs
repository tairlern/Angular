using Microsoft.AspNetCore.Mvc;
using ServerProject.Edentities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        public static List<Category> categories = new List<Category>()
        {
             
            new Category(){Id=1,Name="pastries",UrlImage="../../../../assets/bread20.jpg"},
            new Category(){Id=2,Name="soups",UrlImage="../../../../assets/bread20.jpg"},
            new Category(){Id=3,Name="desserts",UrlImage="../../../../assets/bread20.jpg"},
            new Category(){Id=4,Name="breads",UrlImage="../../../../assets/bread20.jpg"},
        };
        // GET: api/<CategoryController>
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return categories;
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public Category Get(int id)
        {
            var category = categories.Find(x=>x.Id==id);
            return category;
        }

        // POST api/<CategoryController>
        [HttpPost]
        public void Post([FromBody] Category value)
        {
            if(value!=null)
                categories.Add(value);  
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Category value)
        {
            categories.Find(x => x.Id == id).Name = value.Name;
           // categories.Find(x => x.Id == id).UrlImage = value.UrlImage;
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var c = categories.Find(x => x.Id == id);
            categories.Remove(c);
        }
    }
}
