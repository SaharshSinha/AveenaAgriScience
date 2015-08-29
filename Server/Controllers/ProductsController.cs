using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Server.Entities;
using Server.DataSource;

namespace Server.Controllers
{
    public class ProductsController : ApiController
    {
        // GET api/products
        public IEnumerable<Products> Get()
        {
            return StaticData.GetAllProducts();
        }

        // GET api/products/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/products
        public void Post([FromBody]string value)
        {
        }

        // PUT api/products/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/products/5
        public void Delete(int id)
        {
        }
    }
}
