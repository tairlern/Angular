using Microsoft.AspNetCore.Mvc;
using ServerProject.Edentities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        static int count = 5;
        public static List<User> users = new List<User>()
        {
            new User(){  Id = 1,Name="Moshe",Address="bnybrak",Email="123@gmail.com",Password="m1234" },
            new User(){  Id = 2,Name="rivki",Address="netivot",Email="153@gmail.com",Password="r1234" },
            new User(){  Id = 3,Name="sari",Address="techovot",Email="1263@gmail.com",Password="s1234" },
            new User(){  Id = 4,Name="yosi",Address="tifrach",Email="1293@gmail.com",Password="y1234" }
        };
        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return users;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            var user = users.Find(x => x.Id == id);
            return user;
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] User value)
        {
            if (value != null)
               {   value.Id = count++;
           users.Add(value); }
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User value)
        {
            users.Find(x => x.Id == id).Name = value.Name;
            users.Find(x => x.Id == id).Address = value.Address;
            users.Find(x => x.Id == id).Email = value.Email;
            users.Find(x => x.Id == id).Password = value.Password;

        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var u = users.Find(x => x.Id == id);
            users.Remove(u);
        }
    }
}
