using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using SolarMart.Models;
//using System.Web.Mvc;

namespace SolarMart.Controllers
{
    public class ProductController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Product(string id)
        {
            Connections connections = new Connections();
            connections.Connection();
            connections.conn.Open();
            SqlCommand cmd = new SqlCommand("sp_getProductDetailsToItem", connections.conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            var dataAdpter = new SqlDataAdapter(cmd);
            var result = new DataSet();
            dataAdpter.Fill(result);
            connections.conn.Close();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPut]
        public void UpdateViews(string prodId)
        {
            try
            {
                Connections connections = new Connections();
                connections.Connection();
                connections.conn.Open();
                SqlCommand cmd = new SqlCommand("Update Product set NoOfViews = NoOfViews + 1 where ProductId = @pId", connections.conn);
                cmd.Parameters.AddWithValue("@pId", prodId);
                cmd.ExecuteNonQuery();
            }
            catch(Exception ex)
            {
                string exe = ex.ToString();
            }
        }

        [HttpGet]
        public HttpResponseMessage GetRelatedItem(string id)
        {
            try
            {
                Connections connections = new Connections();
                connections.Connection();
                connections.conn.Open();
                SqlCommand cmd = new SqlCommand("sp_getRelatedItem", connections.conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                DataTable tb = new DataTable();
                SqlDataReader reder = cmd.ExecuteReader();
                tb.Load(reder);
                connections.conn.Close();
                return Request.CreateResponse(HttpStatusCode.OK, tb);
            }
            catch (Exception ex)
            {
                string exe = ex.ToString();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exe);
            }
        }
    }
}
