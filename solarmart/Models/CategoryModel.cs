using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SolarMart.Models
{
    public class CategoryModel
    {
        public int CategoryId { get; set; }

        public string CategoryName { get; set; }

        public List<SubCatData> SubCat { get; set; }
    }


    public class SubCatData
    {
        public int SubCatId { get; set; }

        public string SubCatName { get; set; }
    }
}