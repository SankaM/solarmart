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
using System.Security.Claims;
using System;

namespace SolarMart.Controllers
{
    public class CartAndWishListController : ApiController
    {
        [HttpPost]
        [CustomAuthenticationFilter]
        public string UpdateWishList(string prodId)
        {
            var claimsItenity = this.User.Identity as ClaimsIdentity;
            var userID = User.Identity.Name;
            int UserId = Int32.Parse(userID);
            try
            {
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    SqlCommand cmd = new SqlCommand("sp_addTOWIshList", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userId", UserId);
                    cmd.Parameters.AddWithValue("@ItemId", prodId);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
                return "Added to wishlist";
            }
            catch(Exception ex)
            {
                string exe = ex.ToString();
                return exe;
            }
        }

        [HttpGet]
        [CustomAuthenticationFilter]
        public HttpResponseMessage GetNoOfWishItem()
        {
            var claimsItenity = this.User.Identity as ClaimsIdentity;
            var userID = User.Identity.Name;
            int UserId = Int32.Parse(userID);
            string numOfItem = null;
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
            {
                conn.Open();
                SqlCommand command = new SqlCommand("sp_getNoOfWishItem", conn);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@userId", UserId);
                SqlDataReader reader = command.ExecuteReader();
                DataTable tb = new DataTable();
                tb.Load(reader);
                numOfItem = tb.Rows[0][0].ToString();
                conn.Close();
            }
            return Request.CreateResponse(HttpStatusCode.OK, numOfItem);
        }
    }
}
