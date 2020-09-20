using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SolarMart
{
    public  class Connections
    {
        public SqlConnection  conn;
        
        public void Connection()
        {
            conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString);
        }
    }
}