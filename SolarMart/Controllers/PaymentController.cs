using Newtonsoft.Json;
using Stripe;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;


namespace SolarMart.Controllers
{
    public class PaymentController : ApiController
    {
        [HttpPost]
       public HttpResponseMessage PaymentIntent(PaymentIntentCreateRequest request)
        {
            var paymentIntents = new PaymentIntentService();
            var paymentIntent = paymentIntents.Create(new PaymentIntentCreateOptions
            {
                Amount = request.amount * 100,
                Currency="lkr",
            });

            var clientSecret = paymentIntent.ClientSecret;
            return Request.CreateResponse(HttpStatusCode.OK, clientSecret);
        }
        [HttpGet]
        [CustomAuthenticationFilter]
        public HttpResponseMessage GetUserInfoForBill()
        {
            try
            {
                var claimIdentity = this.User.Identity as ClaimsIdentity;
                int CurrentuserId = Int32.Parse(User.Identity.Name);
                DataTable tb = new DataTable();
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("sp_getUserInfoForBill", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userId", CurrentuserId);
                    SqlDataReader reader = cmd.ExecuteReader();
                    tb.Load(reader);
                }
                return Request.CreateResponse(HttpStatusCode.OK, tb);
            }
            catch (Exception ex)
            {
                string exe = ex.ToString();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError,exe);
            }
          
        }

    }
    public class Item
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("price")]
        public int Price { get; set; }
    }

    public class PaymentIntentCreateRequest
    {
        [JsonProperty("items")]
        public Item[] Items { get; set; }

        public long amount { get; set; }
    }

}
