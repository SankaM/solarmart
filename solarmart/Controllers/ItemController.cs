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

namespace SolarMart.Controllers
{
    public class ItemController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable tb = new DataTable();
            using( var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("spGetProduct", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                tb.Load(dr);
                return Request.CreateResponse(HttpStatusCode.OK, tb);
            }
        }

        public string Post(ItemModel item)
        {
            try
            {
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    SqlCommand cmd = new SqlCommand("spInsertProduct", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ItemName", item.ItemName);
                    cmd.Parameters.AddWithValue("@Bprice", item.BuyPrice);
                    cmd.Parameters.AddWithValue("@Sprice", item.SellPrice);
                    cmd.Parameters.AddWithValue("@CId", item.CategoryId);
                    cmd.Parameters.AddWithValue("@Idetails", item.ItemDetails);
                    cmd.Parameters.AddWithValue("@proBrand", item.ProBrand);
                    cmd.Parameters.AddWithValue("@proModel", item.ProModel);
                    cmd.Parameters.AddWithValue("@proColor", item.ProColor);
                    cmd.Parameters.AddWithValue("@feature1", item.feature1);
                    cmd.Parameters.AddWithValue("@feature2", item.feature2);
                    cmd.Parameters.AddWithValue("@feature3", item.feature3);
                    cmd.Parameters.AddWithValue("@feature4", item.feature4);
                    cmd.Parameters.AddWithValue("@feature5", item.feature5);
                    cmd.Parameters.AddWithValue("@feature6", item.feature6);
                    cmd.Parameters.AddWithValue("@ProDiscrit", item.ProDiscrit);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
                return "Successfully added";
            }
            catch (Exception ex)
            {
                string exe = ex.ToString();
                return exe;
            }
        }


        public string Put(ItemModel item)
        {
            try
            {
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    SqlCommand cmd = new SqlCommand("sp_UpdateProduct", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@itemId", item.ItemId);
                    cmd.Parameters.AddWithValue("@ItemName", item.ItemName);
                    cmd.Parameters.AddWithValue("@Bprice", item.BuyPrice);
                    cmd.Parameters.AddWithValue("@Sprice", item.SellPrice);
                    cmd.Parameters.AddWithValue("@CId", item.CategoryId);
                    cmd.Parameters.AddWithValue("@Idetails", item.ItemDetails);
                    cmd.Parameters.AddWithValue("@proBarnd", item.ProBrand);
                    cmd.Parameters.AddWithValue("@proModel", item.ProModel);
                    cmd.Parameters.AddWithValue("@proColor", item.ProColor);
                    cmd.Parameters.AddWithValue("@featureOne", item.feature1);
                    cmd.Parameters.AddWithValue("@featureTwo", item.feature2);
                    cmd.Parameters.AddWithValue("@featureThree", item.feature3);
                    cmd.Parameters.AddWithValue("@featureFore", item.feature4);
                    cmd.Parameters.AddWithValue("@featureFive", item.feature5);
                    cmd.Parameters.AddWithValue("@featureSix", item.feature6);
                    cmd.Parameters.AddWithValue("@ProDiscription", item.ProDiscrit);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
                return "Successfully Updated";
            }
            catch (Exception ex)
            {
                string exe = ex.ToString();
                return exe;
            }
        }


        public string Delete (int id)
        {
            try
            {
 //               string query = @"delete from Item where ItemId = @id";
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    SqlCommand cmd = new SqlCommand("sp_deleteProduct", conn);
                    cmd.CommandType =    CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", id);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
                return "Successfully Deleted";
            }
            catch (Exception ex)
            {
                string exe = ex.ToString();
                return exe;
            }
        }
    }
}
