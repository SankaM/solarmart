using SolarMart.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SolarMart.Controllers
{
    public class CatagoryController : ApiController
    {
        public HttpResponseMessage GetCategory()
        {
            try
            {
                Connections connections = new Connections();
                connections.Connection();
                DataTable tb = new DataTable();
                DataTable tb2 = new DataTable();
                string query = @"select * from Categories";
                SqlCommand cmd = new SqlCommand(query, connections.conn);
                connections.conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                tb.Load(dr);
                int mainId = 0;
                List<CategoryModel> Category = new List<CategoryModel>();
                for (int i = 0; i < tb.Rows.Count; i++)
                {
                    SqlCommand cmd2 = new SqlCommand("select SubCatId,subCatName from SubCategory where mainId = @mainId", connections.conn);
                    mainId = Int32.Parse(tb.Rows[i][0].ToString());
                    cmd2.Parameters.AddWithValue("@mainId", mainId);
                    SqlDataReader reader2 = cmd2.ExecuteReader();
                    tb2.Clear();
                    tb2.Load(reader2);
                    List<SubCatData> subCatDatas = new List<SubCatData>();
                    subCatDatas.Clear();
                    for (int j = 0; j < tb2.Rows.Count; j++)
                    {
                        subCatDatas.Add(new SubCatData { SubCatId = Int32.Parse(tb2.Rows[j][0].ToString()) ,SubCatName= tb2.Rows[j][1].ToString() });
                    }
                    Category.Add(new CategoryModel
                    {
                        CategoryId = Int32.Parse(tb.Rows[i][0].ToString()),
                        CategoryName = tb.Rows[i][1].ToString(),
                        SubCat = subCatDatas
                    });
                }

                return Request.CreateResponse(HttpStatusCode.OK, Category);
            }
            catch(Exception ex)
            {
                string exe = ex.ToString();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exe);
            }
        }

        public string Post(CategoryModel category)
        {
            try
            {
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["SolarMartDB"].ConnectionString))
                {
                    string query = @"insert into Categories values(@category)";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@category", category.CategoryName);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return "added successfull";
            }
            catch (Exception ex)
            {
                string exe = ex.ToString();
                return exe;
            }
           
        }

        [HttpGet]
        public HttpResponseMessage GetSubCats(int id)
        {
            try
            {
                Connections connections = new Connections();
                connections.Connection();
                connections.conn.Open();
                SqlCommand sqlCommand = new SqlCommand("select SubCatId , subCatName from SubCategory where mainId = @id", connections.conn);
                sqlCommand.Parameters.AddWithValue("@id", id);
                DataTable tb = new DataTable();
                SqlDataReader rd = sqlCommand.ExecuteReader();
                tb.Load(rd);
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
