using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Optimization;

namespace Omega.Presentation.Mvc
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/toastr").Include(
                        "~/Content/toastr/toastr.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/autosize.min.js"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                      "~/Scripts/Main.js",
                      "~/Scripts/reset-config.js",
                      "~/Scripts/modal.js",
                      "~/Scripts/app.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/site.css",
                        "~/Content/font-awesome.min.css"));

            foreach (var theme in new List<String> {"light", "dark", "white"})
                bundles.Add(new StyleBundle($"~/Content/theme/{theme}").Include(
                            $"~/Content/bootstrap-themed-{theme}.css"));

            bundles.Add(new ScriptBundle("~/bundles/datetimepicker").Include(
                        "~/Scripts/moment.js",
                        "~/Scripts/bootstrap-datetimepicker.js"));

            bundles.Add(new StyleBundle("~/datetimepicker/css").Include(
                        "~/Content/bootstrap-datetimepicker.css"));
        }
    }
}
