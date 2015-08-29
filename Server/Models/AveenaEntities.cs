using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server.Entities
{
    public class Products
    {
        public string Name { get; set; }
        public ProductType Type { get; set; }
        public ProductCategory Category { get; set; }
        public string ImageId { get; set; }
    }


    public enum ProductType: int
    {
        CerealsAndPulses,
        OilSeeds,
        Vegetables
    }

    public enum ProductCategory : int
    {
        Edible,
        NonEdible
    }
}