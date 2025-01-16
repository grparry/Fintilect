var Util = {
    ShowLoadingInInnerHtml: function (obj) {
        var str = '<center><h3>Loading...</h3></center>';
        $(obj).html(str);
        Util.ShowLoading();
    },
    ShowErrorInInnerHtml: function(obj, error) {
        var str = '<div class="alert alert-danger"><h2>Oops! Something went wrong...</h2><p>'+error+'</p></div>';
        $(obj).html(str);
    },
    ShowLoading: function() {
        var jDiv = $("#LoadingCloud");
        if (jDiv.hasClass('hide')) jDiv.removeClass('hide');
    },
    HideLoading: function () {
        var jDiv = $("#LoadingCloud");
        if (!jDiv.hasClass('hide')) jDiv.addClass('hide');
    }
};

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(function () {
    // In the side menu, if something is active but hidden in a submenu, then it should not be collapsed by default
	$("#side-nav li.panel li.active")
		.closest("li.panel")
		.find("ul.collapse")
		.addClass('no-transition')
		.collapse('show');

	// Are we 2 levels deep?
	$("#side-nav li.panel li.active")
		.closest("li.panel")
		.parent()
		.closest("li.panel")
		.find("ul.collapse").first()
		.addClass('no-transition')
		.collapse('show');

    // We just added "no-transition" so that we don't have an animation on page load as we un-collapse the selected menu.  Let's remove that after a second or so.
    setTimeout(function () {
        $(".no-transition").removeClass("no-transition");
    }, 1000);
});


var AutoSizeTextAreas = {
    Set: function () {

        setTimeout(function () {
            autosize($('textarea'));
        }, 100);

        setTimeout(function () {
            autosize.update($('textarea'));
        }, 200);

    }
};

