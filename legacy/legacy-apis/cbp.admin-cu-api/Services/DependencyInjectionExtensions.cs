using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Reflection;

namespace Services
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            var serviceTypePairs = Assembly.GetExecutingAssembly()
                .GetTypes()
                .Where(x => x.Name.EndsWith("service", StringComparison.OrdinalIgnoreCase) && !x.IsInterface && x.GetInterfaces().Length > 0)
                .Select(x => (x, x.GetInterfaces().First(y => y.Name.EndsWith(x.Name, StringComparison.OrdinalIgnoreCase))));

            foreach (var typePair in serviceTypePairs)
            {
                services.AddScoped(typePair.Item2, typePair.x);
            }

            return services;
        }
    }
}
