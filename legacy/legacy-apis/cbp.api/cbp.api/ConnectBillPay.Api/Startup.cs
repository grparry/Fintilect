using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using System.IO;
using System.Reflection;
using ConnectBillPay.Core;
using ConnectBillPay.Core.Middleware;
using ConnectBillPay.Services.Abstract;
using ConnectBillPay.Services.Implementation;
using ConnectBillPay.Api.Filters;

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
            services.AddScoped<ICalendarService, CalendarService>();
            services.AddScoped<ICheckImageService, CheckImageService>();
            services.AddScoped<IConfigurationService, ConfigurationService>();
            services.AddScoped<IExceptionService, ExceptionService>();
            services.AddScoped<IFisApiService, FisApiService>();
            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<IPayeeService, PayeeService>();
            services.AddScoped<IPaymentHistoryService, PaymentHistoryService>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IRunService, RunService>();
            services.AddScoped<IStatusService, StatusService>();
            services.AddScoped<IVersionService, VersionService>();

            services.AddScoped(typeof(ErrorHandler<>));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ConnectBillPay.Api", Version = "v1" });
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
                    c.SwaggerEndpoint(swaggerUrl, "ConnectBillPay.Api v1");
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
