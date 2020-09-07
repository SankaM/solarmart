using Newtonsoft.Json;
using Stripe;
using System.Net;
using System.Net.Http;
using System.Web.Http;
//using System.Web.Mvc;

namespace SolarMart.Controllers
{
    public class PaymentController : ApiController
    {

       [HttpPost]
       public HttpResponseMessage Create(PaymentIntentCreateRequest request)
        {
            var paymentIntents = new PaymentIntentService();
            var paymentIntent = paymentIntents.Create(new PaymentIntentCreateOptions
            {
                Amount = 1400,
                Currency="usd",
            });
            var clientSecret = paymentIntent.ClientSecret;
            return Request.CreateResponse(HttpStatusCode.OK, clientSecret);
        }

    }
    public class Item
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("price")]
        public string Price { get; set; }
    }

    public class PaymentIntentCreateRequest
    {
        [JsonProperty("items")]
        public Item[] Items { get; set; }
    }
}
