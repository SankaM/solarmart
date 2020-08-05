using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SolarMart.Controllers
{
    public class AccountController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage ValidLogin(string userName , string userPassword)
        {
            if (userName == "admin" && userPassword == "admin")
            {
                return Request.CreateResponse(HttpStatusCode.OK, value: TokenManager.GenarateToken(userName));
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadGateway, message: "Username or password is invalid");
            }
        }

        [HttpGet]
        [CustomAuthenticationFilter]
        public HttpResponseMessage GetEmployee()
        {
            return Request.CreateResponse(HttpStatusCode.OK, value: "SuccessFully Valid");
        }
    }
}
