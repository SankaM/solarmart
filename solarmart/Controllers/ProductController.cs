using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using SolarMart.Models;
using System.Web.Mvc;

namespace SolarMart.Controllers
{
    public class ProductController : ApiController
    {   [System.Web.Http.HttpGet]
        public HttpResponseMessage Product(string id)
        {
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("sp_getProductDetailsToItem", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                var dataAdpter = new SqlDataAdapter(cmd);
                var result = new DataSet();
                dataAdpter.Fill(result);
                return Request.CreateResponse(HttpStatusCode.OK, result);

            }
        }

    }
}
