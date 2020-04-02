using SolarMart.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SolarMart.Controllers
{
    public class CatagoryController : ApiController
    {

        // GET api/values/5
        public HttpResponseMessage Get()
        {   DataTable tb = new DataTable();
            string name = "lakmal";
            return Request.CreateResponse(HttpStatusCode.OK,name);
        }

        // POST api/values
        public string Post(CategoryModel category)
        {
            try
            {
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    string query = @"insert into Categories values(@category)";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@category", category.CategoryName);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return "added successfull";
            }
            catch (Exception ex)
            {
                string exe = ex.ToString();
                return exe;
            }
           
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
