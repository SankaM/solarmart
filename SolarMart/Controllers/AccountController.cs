using SolarMart.Helper;
using SolarMart.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Web.Http;

namespace SolarMart.Controllers
{
    public class AccountController : ApiController
    {


        [HttpPost]
        public string CreateUserAccount(UserModel user)
        {
            try
            {
                Connections connections = new Connections();
                connections.Connection();
                connections.conn.Open();
                SqlCommand cmd = new SqlCommand("sp_CreateUserAccount", connections.conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@fname", user.Fname);
                cmd.Parameters.AddWithValue("@lname", user.Lname);
                cmd.Parameters.AddWithValue("@email", user.Email);
                cmd.Parameters.AddWithValue("@Cnumber", user.Pnumber);
                cmd.Parameters.AddWithValue("@address", user.Address);
                var UserSalt = CryptoService.GenerateSalt();
                var hmac = CryptoService.ComputeHMAC256(data: Encoding.UTF8.GetBytes(user.Password),UserSalt);
                cmd.Parameters.AddWithValue("@password", Convert.ToBase64String(hmac));
                cmd.Parameters.AddWithValue("@UserSalt", Convert.ToBase64String(UserSalt));
                cmd.Parameters.AddWithValue("@bDay", user.Bday);
                cmd.Parameters.AddWithValue("@gender", user.Gender);
                cmd.Parameters.AddWithValue("@AccType", 2);
                cmd.Parameters.AddWithValue("@AccountState", "Active");
                cmd.ExecuteNonQuery();
                connections.conn.Close();
                
                return "Successfully  created";
            }
            catch (Exception ex)
            {
                string exep = ex.ToString();
                return exep;
            }
        }


        [HttpGet]
        public HttpResponseMessage EmailExist(string Email)
        {
            Connections connections = new Connections();
            connections.Connection();
            connections.conn.Open();
            SqlCommand cmd = new SqlCommand("sp_IsEmailExist", connections.conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@email", Email);
            SqlDataReader reader = cmd.ExecuteReader();
            DataTable tb = new DataTable();
            tb.Load(reader);
            connections.conn.Close();
            string email = tb.Rows[0][0].ToString();
            if(email == "true")
            {
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

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
                    cmd.Parameters.AddWithValue("@State", "Active");
                    SqlDataReader reader = cmd.ExecuteReader();
                    DataTable tb = new DataTable();
                    tb.Load(reader);
                    string user = tb.Rows[0][0].ToString();
                    string userId = tb.Rows[0][1].ToString();
                    if (user=="true")
                    {
                        byte[] salt = Convert.FromBase64String(tb.Rows[0][2].ToString());
                        byte[] bytePassword = Encoding.UTF8.GetBytes(password);
                        byte[] passwordConversion = CryptoService.ComputeHMAC256(data: bytePassword, salt);
                        string actualPassword = Convert.ToBase64String(passwordConversion);
                        string UserPwrd = tb.Rows[0][3].ToString();
                        if (UserPwrd == actualPassword)
                        {
                            return Request.CreateResponse(HttpStatusCode.OK, value: TokenManager.GenarateToken(userId));
                        }
                        else
                        {
                            return Request.CreateErrorResponse(HttpStatusCode.BadGateway, message: "Username or password is invalid");
                        }
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
