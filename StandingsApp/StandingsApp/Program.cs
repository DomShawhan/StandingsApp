using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using MySql.EntityFrameworkCore.Extensions;
using StandingsApp.Models;

namespace StandingsApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddAuthentication(authoptions =>
            {
                authoptions.DefaultScheme = "Cookies";
            })
            .AddCookie("Cookies", cookieoptions =>
            {
                cookieoptions.Cookie.Name = "cookie_authentication";
                cookieoptions.Cookie.SameSite = SameSiteMode.None;
                cookieoptions.Events = new CookieAuthenticationEvents
                {
                    OnRedirectToLogin = redirectContext =>
                    {
                        redirectContext.HttpContext.Response.StatusCode = 401;  // Not Authorized
                        // 401 is similar to 403 Forbidden, but specifically for use when authentication 
                        // is possible but has failed or not yet been provided.

                        return Task.CompletedTask;
                    }
                };
            });

            builder.Services.AddControllers()
                .AddJsonOptions(opt =>
                {
                    opt.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
                });

            //Setup the dbContext class and use our SAConnection string
            builder.Services.AddDbContext<SADbContext>(
                    options => options.UseMySQL("server=localhost; user=baseballstanding; pwd=B@seb@11; database=baseballstanding")/*builder.Configuration.GetConnectionString("SAConnection")*/
                    );

            var app = builder.Build();

            app.UseCors(builder =>
                builder.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
