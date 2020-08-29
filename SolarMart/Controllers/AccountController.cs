using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace SolarMart.Controllers
{
    public class AccountController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage ValidAdminLogin(string email , string password)
        {
            using(var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("sp_checkAdmin", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", email);
                cmd.Parameters.AddWithValue("@password", password);
                cmd.Parameters.AddWithValue("@State", "Active");
                cmd.Parameters.AddWithValue("@type", 1);
                SqlDataReader reader = cmd.ExecuteReader();
                DataTable tb = new DataTable();
                tb.Load(reader);
                string user = tb.Rows[0][0].ToString();
                string userId = tb.Rows[0][1].ToString();
                if (user == "true")
                {
                    return Request.CreateResponse(HttpStatusCode.OK, value: TokenManager.GenarateToken(userId));
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadGateway, message: "Username or password is invalid");
                }
            }
           
        }

        [HttpGet]
        public HttpResponseMessage ValidUserLogin(string email , string password)
        {
            try
            {
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("sp_checkUser", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@username", email);
                    cmd.Parameters.AddWithValue("@password", password);
                    cmd.Parameters.AddWithValue("@State", "Active");
                    SqlDataReader reader = cmd.ExecuteReader();
                    DataTable tb = new DataTable();
                    tb.Load(reader);
                    string user = tb.Rows[0][0].ToString();
                    string userId = tb.Rows[0][1].ToString();
                    if (user=="true")
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, value: TokenManager.GenarateToken(userId));
                    }
                    else
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.BadGateway, message: "Username or password is invalid");
                    }
                }
            }
            catch(Exception ex)
            {
                string exep = ex.ToString();
                return Request.CreateErrorResponse(HttpStatusCode.BadGateway, message: exep);
            }
        }

        [HttpGet]
        [CustomAuthenticationFilter]
        public HttpResponseMessage CurrentUsername()
        {
            var claimIdentity = this.User.Identity as ClaimsIdentity;
            int CurrentuserId = Int32.Parse(User.Identity.Name);
            string username = null;
            using(var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("sp_getCurrentUser", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CurrentuserId", CurrentuserId);
                SqlDataReader reader = cmd.ExecuteReader();
                DataTable tb = new DataTable();
                tb.Load(reader);
                username = tb.Rows[0][0].ToString();
            }

            return Request.CreateResponse(HttpStatusCode.OK, value: username);
        }
        //front end test framework mocha, enzyme and jsDom
    }
}
