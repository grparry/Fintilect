@*
#########################################################################
#########################################################################

        Layout page for Olb Admin Pages in OMEGA


#########################################################################
#########################################################################


*@


@Code
    Layout = Nothing
End Code

<!DOCTYPE html>

<html>
<head>
	<title>@ViewBag.Title</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />

	
	
    @System.Web.Optimization.Styles.Render("~/Content/bootstrap.min.css")
	@System.Web.Optimization.Styles.Render("~/Content/toastr/toastr.css")
    @*@System.Web.Optimization.Styles.Render("~/Content/Styles/_MainLayout.css")*@
    @*@System.Web.Optimization.Styles.Render("~/Styles/base.css")*@
    @System.Web.Optimization.Styles.Render("~/Styles/jquery-ui-theme/redmond/jquery-ui-1.10.3.custom.css")
    @System.Web.Optimization.Styles.Render("~/Styles/jquery-ui-theme/jquery-ui-timepicker-addon-1.4.3.css")


	@RenderSection("LinkedStyleSheets", required:=False)

    @System.Web.Optimization.Scripts.Render("~/Scripts/jquery-3.3.1.min.js")
    @System.Web.Optimization.Scripts.Render("~/Scripts/jquery-ui-1.8.16.custom.min.js")
	@System.Web.Optimization.Scripts.Render("~/Scripts/dhtmlgoodies_nav.js")
	@System.Web.Optimization.Scripts.Render("~/Scripts/MasterPage.js")
	@System.Web.Optimization.Scripts.Render("~/Assets/bootstrap/js/bootstrap.min.js")
	@System.Web.Optimization.Scripts.Render("~/Scripts/jquery.unobtrusive-ajax.min.js")
	@System.Web.Optimization.Scripts.Render("~/Scripts/jquery.validate.min.js")
    @System.Web.Optimization.Scripts.Render("~/Scripts/jquery.validate.unobtrusive.min.js")
    @System.Web.Optimization.Scripts.Render("~/Scripts/modal.js")
	@System.Web.Optimization.Scripts.Render("~/Content/toastr.min.js")
	 
	<script type="text/javascript">
		// Create Base URL
		HomeBankingAdmin.BASE_URL = '@HttpUtility.JavaScriptStringEncode(Url.Content("~/"))';
	</script>


</head>
<body>
		<div id="body">
			<div class="main-content container" role="main">
				<div id="divPageContent" class="clearfix">
					@RenderBody()
				</div>
			</div>
	</div>


    @RenderSection("Javascript", required:=False)
</body>
</html>
