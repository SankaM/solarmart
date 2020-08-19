using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using SolarMart.Models;
using System.Web;
using System.IO;
using System.Threading.Tasks;

namespace SolarMart.Controllers
{
    public class HomeController : ApiController
    {
        public HttpResponseMessage GetForCardAll()
        {
            DataTable tb = new DataTable();
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("sp_GetAllProductForHome", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                tb.Load(dr);
                return Request.CreateResponse(HttpStatusCode.OK, tb);
            }

        }

        public HttpResponseMessage GetForCard(int id)
        {
            DataTable tb = new DataTable();
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("sp_GetProductForHome", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                SqlDataReader dr = cmd.ExecuteReader();
                tb.Load(dr);
                return Request.CreateResponse(HttpStatusCode.OK, tb);
            }

        }

        public HttpResponseMessage GetProBrand(int id)
        {
            DataTable dataTable = new DataTable();
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("sp_getProBrand", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                SqlDataReader dr = cmd.ExecuteReader();
                dataTable.Load(dr);
                conn.Close();
                return Request.CreateResponse(HttpStatusCode.OK, dataTable);
            }
        }
        [HttpPost]
        public string CreateUserAccount(UserModel user)
        {
            try
            {
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    SqlCommand cmd = new SqlCommand("sp_CreateUserAccount", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@fname", user.Fname);
                    cmd.Parameters.AddWithValue("@lname", user.Lname);
                    cmd.Parameters.AddWithValue("@email", user.email);
                    cmd.Parameters.AddWithValue("@Cnumber", user.Pnumber);
                    cmd.Parameters.AddWithValue("@address", user.Address);
                    cmd.Parameters.AddWithValue("@password", user.Password);
                    cmd.Parameters.AddWithValue("@bDay", user.Bday);
                    cmd.Parameters.AddWithValue("@gender", user.Gender);
                    cmd.Parameters.AddWithValue("@AccType", 2);
                    cmd.Parameters.AddWithValue("@AccountState", "Active");
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
                return "Successfully  created";
            }
            catch(Exception ex)
            {
                string exep = ex.ToString();
                return exep;
            }
        }
    }
}
