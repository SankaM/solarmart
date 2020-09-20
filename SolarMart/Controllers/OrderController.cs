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
using System.Web.Http;

namespace SolarMart.Controllers
{
    public class OrderController : ApiController
    {
        [HttpPost]
        [CustomAuthenticationFilter]
        public HttpResponseMessage SubmitOrder(orderModel order)
        {
            try
            {
                var claimIdentity = this.User.Identity as ClaimsIdentity;
                int CurrentuserId = Int32.Parse(User.Identity.Name);
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("sp_insertOrder", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@orderId", order.orderId);
                    cmd.Parameters.AddWithValue("@paymentId", order.paymentId);
                    cmd.Parameters.AddWithValue("@UserId", CurrentuserId);
                    cmd.Parameters.AddWithValue("@fname", order.fname);
                    cmd.Parameters.AddWithValue("@laname", order.lname);
                    cmd.Parameters.AddWithValue("@mobile", order.mobile);
                    cmd.Parameters.AddWithValue("@tol_Amount", order.total_amount);
                    cmd.Parameters.AddWithValue("@orderdateTime", DateTime.Now);
                    cmd.Parameters.AddWithValue("@add_line1", order.adress.line1);
                    cmd.Parameters.AddWithValue("@add_line2", order.adress.line2);
                    cmd.Parameters.AddWithValue("@city", order.adress.city);
                    cmd.Parameters.AddWithValue("@state", order.adress.state);
                    cmd.Parameters.AddWithValue("@country", order.adress.country);
                    cmd.Parameters.AddWithValue("@postal_code", order.adress.postal_code);
                    cmd.ExecuteNonQuery();

                    for (int i = 0; i < order.ord_Prod.Length; i++)
                    {
                        SqlCommand cmd2 = new SqlCommand("sp_insertOrder_details", conn);
                        cmd2.CommandType = CommandType.StoredProcedure;
                        cmd2.Parameters.AddWithValue("@orderId", order.orderId);
                        cmd2.Parameters.AddWithValue("@prodId", order.ord_Prod[i].prodId);
                        cmd2.Parameters.AddWithValue("@quntity", order.ord_Prod[i].quntity);
                        cmd2.ExecuteNonQuery();
                    }
                    conn.Close();

                    return Request.CreateResponse(HttpStatusCode.OK, "order Created");
                }
            }
            catch (Exception ex)
            {
                string exe = ex.ToString();
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, exe);
            }
        }

        [HttpGet]
        [CustomAuthenticationFilter]
        public HttpResponseMessage getMyOrederDetails()
        {
            try
            {
                var claimIdentity = this.User.Identity as ClaimsIdentity;
                int CurrentuserId = Int32.Parse(User.Identity.Name);
                DataTable tb = new DataTable();
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("sp_getUserOrders", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userId", CurrentuserId);
                    SqlDataReader reader = cmd.ExecuteReader();
                    tb.Load(reader);
                    return Request.CreateResponse(HttpStatusCode.OK, tb);
                     
                }
            }
            catch(Exception ex)
            {
                string exe = ex.ToString();
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, exe);
            }
        }

        [HttpGet]
        public HttpResponseMessage getOrderedItems( string ord_id)
        {
            try
            {
                DataTable tb = new DataTable();
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("sp_getOrdedItemDetails", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@orderId", ord_id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    tb.Load(reader);
                    return Request.CreateResponse(HttpStatusCode.OK, tb);
                }
            }
            catch(Exception ex)
            {
                string exe = ex.ToString();
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, exe);
            }
        }
    }
}
