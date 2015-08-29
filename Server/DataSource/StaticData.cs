using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Server.Entities;

namespace Server.DataSource
{
    public static class StaticData
    {
        public static List<Products> GetAllProducts()
        {
            List<Products> AveenaProducts = new List<Products>();

            AveenaProducts.Add(new Products() { Name = "Millet", Category = ProductCategory.Edible, Type = ProductType.CerealsAndPulses, ImageId = "Millet" });
            AveenaProducts.Add(new Products() { Name = "Maize", Category = ProductCategory.Edible, Type = ProductType.CerealsAndPulses, ImageId= "Maize" });
            AveenaProducts.Add(new Products() { Name = "Wheat", Category = ProductCategory.NonEdible, Type = ProductType.CerealsAndPulses, ImageId= "Wheat" });
            AveenaProducts.Add(new Products() { Name = "Mung", Category = ProductCategory.NonEdible, Type = ProductType.CerealsAndPulses, ImageId= "Mung" });
            AveenaProducts.Add(new Products() { Name = "Castor", Category = ProductCategory.Edible, Type = ProductType.OilSeeds, ImageId= "Castor" });
            AveenaProducts.Add(new Products() { Name = "Mustard", Category = ProductCategory.Edible, Type = ProductType.OilSeeds, ImageId= "Mustard" });
            AveenaProducts.Add(new Products() { Name = "Paddy", Category = ProductCategory.NonEdible, Type = ProductType.OilSeeds, ImageId= "Paddy" });
            AveenaProducts.Add(new Products() { Name = "Cotton", Category = ProductCategory.NonEdible, Type = ProductType.OilSeeds, ImageId= "Cotton" });
            AveenaProducts.Add(new Products() { Name = "Tomato", Category = ProductCategory.Edible, Type = ProductType.Vegetables, ImageId= "Tomato" });
            AveenaProducts.Add(new Products() { Name = "Cucumber", Category = ProductCategory.Edible, Type = ProductType.Vegetables, ImageId= "Cucumber" });
            AveenaProducts.Add(new Products() { Name = "Okra", Category = ProductCategory.NonEdible, Type = ProductType.Vegetables, ImageId= "Okra" });
            AveenaProducts.Add(new Products() { Name = "Bottle Gourd", Category = ProductCategory.NonEdible, Type = ProductType.Vegetables, ImageId= "BottleGourd" });
            AveenaProducts.Add(new Products() { Name = "Brinjal", Category = ProductCategory.Edible, Type = ProductType.Vegetables, ImageId= "Brinjal" });
            AveenaProducts.Add(new Products() { Name = "Bitter Gourd", Category = ProductCategory.Edible, Type = ProductType.Vegetables, ImageId= "Bitter Gourd" });
            AveenaProducts.Add(new Products() { Name = "Watermelon", Category = ProductCategory.Edible, Type = ProductType.Vegetables, ImageId= "Watermelon" });

            return AveenaProducts;
        }
    }
}