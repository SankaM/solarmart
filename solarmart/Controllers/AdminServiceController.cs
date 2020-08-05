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
        public string Post(ItemModel item)
        {
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
                    name = DateTime.Now.ToString("ddMMyyhhmmsstt")+"_"+name;
                    var localFileName = file.LocalFileName;
                    var filePath = Path.Combine(root, name);
                    var ext = Path.GetExtension(name);
                    var id = ctx.Request.Params["ItemId"];
                    var IsMain = ctx.Request.Params["IsMain"];
                    File.Move(localFileName, filePath);
                    SqlCommand cmd = new SqlCommand("spInsertFeaturedImage", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ImgName", name);
                    cmd.Parameters.AddWithValue("@ImgExt", ext);
                    cmd.Parameters.AddWithValue("@ItemId", id);
                    cmd.Parameters.AddWithValue("@IsMain", IsMain);
                    cmd.Parameters.AddWithValue("@ImgPath", filePath);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
            catch (Exception e)
            {
                return $"Error : {e.Message}";
            }
            return "Image uploaded";
        }

        [HttpPost]
        public async Task<string> AddOtherImages()
        {
            var ctx2 = HttpContext.Current;
            var root = ctx2.Server.MapPath("~/Images");
            var OtherImageProvider = new MultipartFormDataStreamProvider(root);
            try
            {
                var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString);
                await Request.Content.ReadAsMultipartAsync(OtherImageProvider);
                conn.Open();
                foreach (var file in OtherImageProvider.FileData)
                {
                    var name = file.Headers.ContentDisposition.FileName;
                    name = name.Trim('"');
                    name = DateTime.Now.ToString("ddMMyyhhmmsstt") + "_" + name;
                    var localFileName = file.LocalFileName;
                    var filePath = Path.Combine(root, name);
                    var ext = Path.GetExtension(name);
                    var id = ctx2.Request.Params["ItemId"];
                    var IsMain = ctx2.Request.Params["IsMain"];
                    File.Move(localFileName, filePath);
                    SqlCommand cmd = new SqlCommand("spInsertFeaturedImage", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ImgName", name);
                    cmd.Parameters.AddWithValue("@ImgExt", ext);
                    cmd.Parameters.AddWithValue("@ItemId", id);
                    cmd.Parameters.AddWithValue("@IsMain", IsMain);
                    cmd.Parameters.AddWithValue("@ImgPath", filePath);
                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
            catch(Exception e)
            {
                return $"Error : {e.Message}";
            }
            return "Other Image uploaded";
        }
     
        public string Delete (string id)
        {
            try
            {
                DataTable tb = new DataTable();
                List<string> ImgPath = new List<string>();
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    string query = @"select ImgPath from ItemImages where ItemId = @id";
                    conn.Open();
                    SqlCommand cmdGetImagePathe = new SqlCommand(query, conn);
                    cmdGetImagePathe.Parameters.AddWithValue("@id", id);
                    SqlDataReader dr = cmdGetImagePathe.ExecuteReader();
                    tb.Load(dr);
                    for (int i = 0; i <= tb.Rows.Count - 1; i++)
                    {
                        ImgPath.Add(Convert.ToString(tb.Rows[i][0]));
                        string[] ImgPathList = ImgPath.ToArray();
                        if (File.Exists(ImgPathList[i]))
                        {
                            File.Delete(ImgPathList[i]);
                        }
                    }
                    conn.Close();

                    SqlCommand cmd = new SqlCommand("sp_deleteProduct", conn);
                    cmd.CommandType =    CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", id);
                    conn.Open();
                    cmd.ExecuteNonQuery();
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
