﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SolarMart.Models
{
	public class UserModel
	{
        public string Fname { get; set; }

        public string Lname { get; set; }

        public string email { get; set; }

        public string Pnumber { get; set; }

        public string Address { get; set; }

        public DateTime Bday { get; set; }

        public string Gender { get; set; }

        public string Password { get; set; }
	}
}