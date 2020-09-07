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
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("sp_addTOWIshList", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userId", UserId);
                    cmd.Parameters.AddWithValue("@ItemId", prodId);
                    SqlDataReader reader = cmd.ExecuteReader();
                    DataTable tb = new DataTable();
                    tb.Load(reader);
                    conn.Close();
                    string resp = tb.Rows[0][0].ToString();
                    if (resp == "true")
                    {
                        return "Added to wishlist";
                    }
                    else
                    {
                        return "this Item Alredy In wish list";
                    }
                }
            }
            catch(Exception ex)
            {
                string exe = ex.ToString();
                return exe;
            }
        }

        [HttpPost]
        [CustomAuthenticationFilter]
        public string UpdateCart(string prodId)
        {
            var claimsItenity = this.User.Identity as ClaimsIdentity;
            var userID = User.Identity.Name;
            int UserId = Int32.Parse(userID);
            try
            {
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("sp_addTOCart", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userId", UserId);
                    cmd.Parameters.AddWithValue("@ItemId", prodId);
                    SqlDataReader reader = cmd.ExecuteReader();
                    DataTable tb = new DataTable();
                    tb.Load(reader);
                    conn.Close();
                    string resp = tb.Rows[0][0].ToString();
                    if (resp == "true")
                    {
                        return "Added to Cart";
                    }
                    else
                    {
                        return "this Item Alredy In Your Cart";
                    }
                }
            }
            catch (Exception ex)
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

        [HttpGet]
        [CustomAuthenticationFilter]
        public HttpResponseMessage GetNoOfCartItem()
        {
            var claimsItenity = this.User.Identity as ClaimsIdentity;
            var userID = User.Identity.Name;
            int UserId = Int32.Parse(userID);
            string numOfItem = null;
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
            {
                conn.Open();
                SqlCommand command = new SqlCommand("sp_getNoOfCartItem", conn);
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

        [HttpGet]
        [CustomAuthenticationFilter]
        public HttpResponseMessage getWishItemList()
        {
            var claimsItenity = this.User.Identity as ClaimsIdentity;
            var userID = User.Identity.Name;
            int UserId = Int32.Parse(userID);
            DataTable tb = new DataTable();
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("sp_getWishlistItems", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@userId", UserId);
                SqlDataReader reader = cmd.ExecuteReader();
                tb.Load(reader);
                conn.Close();
            }
            return Request.CreateResponse(HttpStatusCode.OK,tb);
        }

        [HttpGet]
        [CustomAuthenticationFilter]
        public HttpResponseMessage getCartItemList()
        {
            var claimsItenity = this.User.Identity as ClaimsIdentity;
            var userID = User.Identity.Name;
            int UserId = Int32.Parse(userID);
            DataTable tb = new DataTable();
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("sp_getCartItems", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@userId", UserId);
                SqlDataReader reader = cmd.ExecuteReader();
                tb.Load(reader);
                conn.Close();
            }
            return Request.CreateResponse(HttpStatusCode.OK, tb);
        }

        [HttpDelete]
        [CustomAuthenticationFilter]
        public string DeleteWishItem(string itemId)
        {
            try
            {
                var claimsItenity = this.User.Identity as ClaimsIdentity;
                var userID = User.Identity.Name;
                int UserId = Int32.Parse(userID);
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("sp_deleteWishListItem", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", UserId);
                    cmd.Parameters.AddWithValue("@itemId", itemId);
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
                return "successfuly deleted";
            }
            catch(Exception ex)
            {
                string exe = ex.ToString();
                return exe;
            }
        }


        [HttpDelete]
        [CustomAuthenticationFilter]
        public string DeleteCartItem(string itemId)
        {
            try
            {
                var claimsItenity = this.User.Identity as ClaimsIdentity;
                var userID = User.Identity.Name;
                int UserId = Int32.Parse(userID);
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("sp_deleteItemFromCart", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", UserId);
                    cmd.Parameters.AddWithValue("@itemId", itemId);
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
                return "successfuly deleted";
            }
            catch(Exception ex)
            {
                string exe = ex.ToString();
                return exe;
            }
        }
    }
}
