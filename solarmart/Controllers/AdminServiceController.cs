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

namespace SolarMart.Controllers
{
    public class AdminServiceController : ApiController
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

        public HttpResponseMessage GetForCard()
        {
            DataTable tb = new DataTable();
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("sp_GetProductForHome", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                tb.Load(dr);
                return Request.CreateResponse(HttpStatusCode.OK, tb);
            }

        }
        public string Post(ItemModel item)
        {
            DataTable tb = new DataTable();
            try
            {
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    SqlCommand cmd = new SqlCommand("spInsertProduct", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProductId", item.ItemId);
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
                    //SqlParameter returnValue = new SqlParameter("@lastId", SqlDbType.Int);
                    //returnValue.Direction = ParameterDirection.Output;           
                    //int renValue = (int)cmd.Parameters["@lastId"].Value;
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

        [HttpPost]
        public async Task<string> InsertItemImage()
        {
            var ctx = HttpContext.Current;
            var root = ctx.Server.MapPath("~/Images");
            var provider = new MultipartFormDataStreamProvider(root);
            try
            {
                var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString);
                await Request.Content.ReadAsMultipartAsync(provider);
                foreach(var file in provider.FileData)
                {
                    var name = file.Headers.ContentDisposition.FileName;
    
                    name = name.Trim('"');
                    var localFileName = file.LocalFileName;
                    var filePath = Path.Combine(root, name);
                    var ext = Path.GetExtension(name);
                    var id = ctx.Request.Params["ItemId"];
                    File.Move(localFileName, filePath);
                    SqlCommand cmd = new SqlCommand("spInsertFeaturedImage", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ImgName", name);
                    cmd.Parameters.AddWithValue("@ImgExt", ext);
                    cmd.Parameters.AddWithValue("@ItemId", id);
                    cmd.Parameters.AddWithValue("@ImgPath", filePath);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch(Exception e)
            {
                return $"Error : {e.Message}";
            }
            return "Image uploaded";
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


        public string Delete (string id)
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
