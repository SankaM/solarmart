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
using System.Security.Claims;

namespace SolarMart.Controllers
{
    public class HomeController : ApiController
    {
        public HttpResponseMessage GetCat1Cards(int id)
        {
            try
            {
                DataTable tb = new DataTable();
                Connections connections = new Connections();
                connections.Connection();
                connections.conn.Open();
                SqlCommand cmd = new SqlCommand("sp_GetCatRize1Product", connections.conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@mid", id);
                SqlDataReader dr = cmd.ExecuteReader();
                tb.Load(dr);
                return Request.CreateResponse(HttpStatusCode.OK, tb);
            }
            catch(Exception ex)
            {
                string exe = ex.ToString();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exe);
            }
            
        }

        public HttpResponseMessage GetCards(int id)
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
        [HttpGet]
        public HttpResponseMessage GetProdAccodPrice(float min  , float max ,int McId , int ScId)  
        {
            try
            {
                DataTable tb = new DataTable();
                Connections connections = new Connections();
                connections.Connection();
                connections.conn.Open();
                SqlCommand cmd = new SqlCommand("sp_GetProductAccordingPrice", connections.conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@mcid", McId);
                cmd.Parameters.AddWithValue("@scid", ScId);
                cmd.Parameters.AddWithValue("@max", max);
                cmd.Parameters.AddWithValue("@min", min);
                SqlDataReader dr = cmd.ExecuteReader();
                tb.Load(dr);
                return Request.CreateResponse(HttpStatusCode.OK, tb);
            }
            catch (Exception ex)
            {
                string exe = ex.ToString();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exe);
            }

        }

        [HttpGet]
        public HttpResponseMessage getNewArrivelItem()
        {
            try
            {
                Connections connections = new Connections();
                connections.Connection();
                connections.conn.Open();
                SqlCommand cmd = new SqlCommand("sp_getNewArrivelItem ", connections.conn);
                cmd.CommandType = CommandType.StoredProcedure;
                DataTable tb = new DataTable();
                SqlDataReader reder = cmd.ExecuteReader();
                tb.Load(reder);
                connections.conn.Close();
                return Request.CreateResponse(HttpStatusCode.OK, tb);
            }
            catch(Exception ex)
            {
                string exe = ex.ToString();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exe);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetTrendingItem()
        {
            try
            {
                Connections connections = new Connections();
                connections.Connection();
                connections.conn.Open();
                SqlCommand sqlCommand = new SqlCommand("sp_getTrendItems", connections.conn);
                DataTable tb = new DataTable();
                SqlDataReader reder = sqlCommand.ExecuteReader();
                tb.Load(reder);
                connections.conn.Close();
                return Request.CreateResponse(HttpStatusCode.OK, tb);
            }
            catch(Exception ex)
            {
                string exe = ex.ToString();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exe);
            }
        }
    }
}
