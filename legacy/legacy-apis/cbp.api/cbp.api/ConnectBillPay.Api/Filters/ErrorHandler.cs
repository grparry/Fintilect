using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;

namespace ConnectBillPay.Api.Filters
{
    public class ErrorHandler<T> : IExceptionFilter
    {
        private readonly ILogger<T> _logger;
        private readonly IWebHostEnvironment _environment;

        public ErrorHandler(ILogger<T> logger, IWebHostEnvironment environment)
        {
            _logger = logger;
            _environment = environment;
        }

        public void OnException(ExceptionContext context)
        {
            _logger.LogError(context.Exception, $"An error occurred during {context.ActionDescriptor.DisplayName}");

            if (_environment.IsDevelopment())
            {
                context.Result = new ObjectResult(context.Exception)
                {
                    StatusCode = 500
                };
            }
        }
    }
}
