//using Microsoft.AspNetCore.Builder;
//using Microsoft.EntityFrameworkCore;
//using OnlineParkingApplication.Models;
//using Microsoft.AspNetCore.SignalR;


//var builder = WebApplication.CreateBuilder(args);

//// Add Health checks (Optional for health monitoring)
//builder.Services.AddHealthChecks();

//// Add services to the container
//builder.Services.AddControllers();
//builder.Services.AddSignalR();  // Register SignalR 


//builder.Services.AddDbContext<MyDbContext>(options =>
//               options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
//               new MySqlServerVersion(new Version(8, 0, 40)),
//               mySqlOptions => mySqlOptions.EnableRetryOnFailure()
//           ));

////// Enable CORS - Allow connections from the frontend React app
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAllOrigins",
//        policy => policy
//            .AllowAnyOrigin()  // ✅ Allow requests from ANY frontend (Temporary Fix)
//                               //.WithOrigins("http://localhost:3001", "https://yourfrontend.com") // Replace with actual frontend URLs for security
//            .AllowAnyMethod()
//            .AllowAnyHeader()); // If using cookies or authentication
//});


//// Register Swagger for API documentation
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//// ✅ Fix: Correct Port Handling (No modifying `app.Urls`)
//var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
//builder.WebHost.UseUrls($"http://*:{port}"); // Bind to the correct port

//var app = builder.Build();

//// Use CORS policy


//// ✅ Enable Swagger in BOTH Development & Production modes
//if (app.Environment.IsDevelopment() || builder.Configuration.GetValue<bool>("Swagger:Enabled"))
//{
//    app.UseSwagger();
//    app.UseSwaggerUI(c =>
//    {
//        c.SwaggerEndpoint("/swagger/v1/swagger.json", "parkvilla API V1");
//        c.RoutePrefix = string.Empty;
//    });
//}

//// Map routes and endpoints
//app.MapGet("/", () => Results.Ok("Welcome to parkvilla API"));
//app.MapGet("/health", () => Results.Ok("Healthy"));

//// Enable Health checks at /health endpoint
//app.UseHealthChecks("/health");
//app.UseCors("AllowAllOrigins");
//// Enable Authorization if using Auth
//app.UseAuthorization();

//// Map the SignalR Hub for chat functionality
////app.MapHub<RideShareChat>("/chathub");

//// Map API controllers
//app.MapControllers();

//// Start the application
//app.Run();



using Microsoft.EntityFrameworkCore;
using OnlineParkingApplication.Models;


namespace OnlineParkingApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();

            // Enable CORS
            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowReactApp",
            //        policy =>
            //        {
            //            policy.WithOrigins("http://localhost:3000") // Allow React frontend
            //                  .AllowAnyHeader()
            //                  .AllowAnyMethod();
            //        });
            //});


            //// Enable CORS - Allow connections from the frontend React app
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    policy => policy
                        .AllowAnyOrigin()  // ✅ Allow requests from ANY frontend (Temporary Fix)
                                           //.WithOrigins("http://localhost:3001", "https://yourfrontend.com") // Replace with actual frontend URLs for security
                        .AllowAnyMethod()
                        .AllowAnyHeader()); // If using cookies or authentication
            });

            // Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Database Configuration
            builder.Services.AddDbContext<MyDbContext>(options =>
                options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
                new MySqlServerVersion(new Version(8, 0, 40)),
                mySqlOptions => mySqlOptions.EnableRetryOnFailure()
            ));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Use CORS Middleware
            app.UseCors("AllowAllOrigins");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}