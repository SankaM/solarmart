using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SolarMart.Models
{
    public class orderModel
    {
        public string orderId { get; set; }

        public string fname { get; set; }

        public string lname { get; set; }

        public string email { get; set; }

        public string paymentId { get; set; }

        public address adress { get; set; }

        public string mobile { get; set; }

        public long total_amount { get; set; }

        public ord_prod[] ord_Prod { get; set; }
    }

    public class ord_prod
    {
        public string prodId { get; set; }

        public int quntity { get; set; }
    }

    public class address
    {
        public string line1 { get; set; }

        public string line2 { get; set; }

        public string city { get; set; }

        public string state { get; set; }

        public string country { get; set; }

        public long postal_code { get; set; }
    }
}