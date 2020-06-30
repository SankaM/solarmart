using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SolarMart.Models
{
    public class ItemModel
    {
        public string ItemId { get; set; }

        public string ItemName { get; set; }

        public int BuyPrice { get; set; }

        public int SellPrice { get; set; }

        public int CategoryId { get; set; }

        public string ItemDetails { get; set; }

        public string ProBrand { get; set; }

        public string ProModel { get; set; }

        public string ProColor { get; set; }

        public string feature1 { get; set; }

        public string feature2 { get; set; }

        public string feature3 { get; set; }

        public string feature4 { get; set; }

        public string feature5 { get; set; }

        public string feature6 { get; set; }

        public string ProDiscrit { get; set; }
    }
}