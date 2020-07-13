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
    public class EditProductController : ApiController
    {
        public HttpResponseMessage GetUpdate()
        {
            DataTable tb = new DataTable();
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("spGetProduct", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                tb.Load(dr);
                return Request.CreateResponse(HttpStatusCode.OK, tb);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetProdImgList(string id)
        {
            try
            {
                using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("Sp_getProdImgList", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", id);
                    var dataAdpter = new SqlDataAdapter(cmd);
                    var ImgList = new DataSet();
                    dataAdpter.Fill(ImgList);
                    conn.Close();
                    return Request.CreateResponse(HttpStatusCode.OK, ImgList);
                }
            }
            catch (Exception ex)
            {
                string exe = ex.ToString();
                return Request.CreateResponse(HttpStatusCode.OK, exe);
            }
        }

        [HttpPost]
        public async Task<string> EditMainImg()
        {
            var ctx = HttpContext.Current;
            var root = ctx.Server.MapPath("~/Images");
            var provider = new MultipartFormDataStreamProvider(root);
            try
            {
                var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString);
                await Request.Content.ReadAsMultipartAsync(provider);
                foreach (var file in provider.FileData)
                {
                    var name = file.Headers.ContentDisposition.FileName;
                    name = name.Trim('"');
                    name = DateTime.Now.ToString("ddMMyyhhmmsstt") + "_" + name;
                    var localFileName = file.LocalFileName;
                    var filePath = Path.Combine(root, name);
                    var ext = Path.GetExtension(name);
                    var Imgid = ctx.Request.Params["ImgId"];
                    var ImgPath = ctx.Request.Params["ImgPath"];
                    File.Move(localFileName, filePath);
                    SqlCommand cmd = new SqlCommand("sp_EditProductMainImage", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ImgName", name);
                    cmd.Parameters.AddWithValue("@ImgExt", ext);
                    cmd.Parameters.AddWithValue("@ImgId", Imgid);
                    cmd.Parameters.AddWithValue("@ImgPath", filePath);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    if (File.Exists(ImgPath))
                    {
                        File.Delete(ImgPath);
                    }
                }
                conn.Close();
            }
            catch (Exception e)
            {
                return $"Error : {e.Message}";
            }
            return "Image Edited";
        }

        public string UpdateProduct(ItemModel item)
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
    }
}
