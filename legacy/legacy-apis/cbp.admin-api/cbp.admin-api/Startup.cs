using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.IO;
using System.Reflection;
using cbp.admin_api.Filters;
using ConnectBillPay.Core;
using ConnectBillPay.Core.Middleware;
using Services.Abstract;
using Services.Implementation;

namespace ConnectBillPay.Api
{
    public class Startup
    {
        private static Version s_applicationVersion = new Version(1, 0, 1);

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                .AddNewtonsoftJson();

            services.AddCbpCore(Configuration, ServiceLifetime.Scoped);
            services.UseServiceHost();

            services.AddSingleton(s_applicationVersion);
            services.AddAutoMapper(typeof(Responses.AutoMapping));

            services.AddScoped<IBadRecordService, BadRecordService>();
            services.AddScoped<IConfigurationService, ConfigurationService>();
            services.AddScoped<ICreditUnionService, CreditUnionService>();
            services.AddScoped<IExceptionService, ExceptionService>();
            services.AddScoped<IFisApiService, FisApiService>();
            services.AddScoped<IPayeeService, PayeeService>();
            services.AddScoped<IRunService, RunService>();
            services.AddScoped<ISearchService, SearchService>();
            services.AddScoped<ISupportNotificationService, SupportNotificationService>();
            services.AddScoped<IVersionService, VersionService>();

            services.AddScoped(typeof(ErrorHandler<>));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ConnectBillPay Admin.Api", Version = "v1" });
                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            })
                .AddSwaggerGenNewtonsoftSupport();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var swaggerPrefix = Configuration["SwaggerPrefix"] ?? string.Empty;

            if (env.IsDevelopment() || env.IsEnvironment("Test"))
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    var swaggerUrl = $"{swaggerPrefix}/swagger/v1/swagger.json";
                    c.SwaggerEndpoint(swaggerUrl, "ConnectBillPay Admin.Api v1");
                    c.RoutePrefix = string.Empty;
                });
            }

            app.UseRequestResponseLogging();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
