using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace Omega.Presentation.Mvc
{
	public class JsonFormatterConfig
	{
		public static void ConfigureJsonFormatting()
		{
			var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
			json.SerializerSettings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
			json.SerializerSettings.Formatting = Formatting.Indented;
			json.SerializerSettings.TypeNameHandling = TypeNameHandling.Auto;
			json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
			json.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
			json.SerializerSettings.Converters.Add(new StringEnumConverter());
		}
	}
}