"use strict";

/*
    PsiModal - TOOLS TO HANDLE MODALS
    =================================

    Features:
        - Can display a server-rendered modal using a line of javascript. 
            e.g. PsiModal.Render("outofband/requestmodal");

        - Can generate a simple modal on the fly with a line of javascript.
            e.g. PsiModal.GenerateModal('Panda Express','Special offer from your nearest Panda Express.');

        - Can have links/buttons that show server-rendered modals with no javascript needed.
            e.g. <a modal-href="outofband/requestmodal" class="btn btn-default">Show Me the Modal!</a>

        - Supports nested modals (If a modal opens another modal, works fine as one would expect)

        - Removes modal from DOM when closed (no residuals if you open and close a ton of modals on a page)

*/

// TODO: Rename PsiModal to something better?  Was going to call this "Modal" but there appear to be conflicts with bootstrap, etc.
var PsiModal = {

    Render: function (url) {

        // First display a loading message  TODO: Could replace with a spinner.  Font awesome spinners are easy and nice.
        var loadingDiv = 
            $("<div class='modal-backdrop in modal-loading-div' style='opacity:0.4; text-align:center; padding-top:200px;'>"
            + "     <span style='font-weight:bold; color:#ccc; font-size:26px; display:none;' class='loading-message'>Loading...</span>"
            + "</div>");

        var zIndex = 1040 + (10 * $('.modal:visible').length) - 1;
        $(loadingDiv)
            .css('z-index', zIndex);

        if ($('.modal').length > 0)
            $('.modal').last().after($(loadingDiv));
        else
            $( "body" ).append($(loadingDiv));

        // If the modal takes more than a second or two to load, let's show the "loading..." message.
        setTimeout(function(){
            $(".modal-loading-div .loading-message").fadeIn('slow');
        }, 1000);

        // Get the modal html
	    var baseUrl = "";

	    if (typeof GLOBAL_BaseUrl !== 'undefined')
		    baseUrl = GLOBAL_BaseUrl + "/";
	    else if (typeof HomeBanking !== 'undefined')
		    baseUrl = HomeBanking.BASE_URL + "/";

		$.get(baseUrl + url, function (data) {

            // Remove loading message
            $(".modal-loading-div").fadeOut('slow', function () {
                $(".modal-loading-div").remove();
            });

            if (data.indexOf("<!-- Modal Layout -->") == -1) {
                // Error
                PsiModal.GenerateModal("Unable to load", "There was a problem processing your request.  Please try again.");
                return;
            }

            PsiModal.ShowModal(data);
        }).fail(function () { window.location.href = '/omega'; });
    },

    GenerateModal: function(title, contents, extraStuff)
    {
        if (typeof extraStuff === 'undefined' || extraStuff == null)
            extraStuff = {};

        var modalHeader =
            '<div class="modal-header">' +
            '   <h4 class="modal-title" id="myModalLabel">' + title + '</h4>' +
            '</div>';

        var buttons = [];
        var closeButtonText = extraStuff.closeButtonText || "OK";

        if (extraStuff.primaryButtonText) {
            buttons.push('<button type="button" class="btn btn-primary modal-generated-primary-button modal-generated-button" data-dismiss="modal">' + (extraStuff.primaryButtonText) + '</button>');
            closeButtonText = extraStuff.closeButtonText || "Cancel";
        }

        buttons.push('<button type="button" class="btn btn-default modal-generated-close-button modal-generated-button" data-dismiss="modal">' + closeButtonText + '</button>');

	    var modalFooter = typeof extraStuff.hideButtons === 'boolean' && extraStuff.hideButtons ? '' 
			: '<div class="modal-footer">' + buttons.join('') + "</div>";
        
        var modalHtml = $('<div runat="server" class="modal fade destroy-when-closed" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
                + '    <div class="modal-dialog ' + extraStuff.extra_modal_class + '" role="document">'
                + '        <div class="modal-content">'
                +              (typeof title !== 'undefined' && title !== '' ? modalHeader : '')
                + '            <div class="modal-body">' + contents + '</div>'
				+			   modalFooter
                + '        </div>'
                + '    </div>'
                + '</div>'
                );
        var modal = PsiModal.ShowModal(modalHtml);

        $(modal).on('hidden.bs.modal', extraStuff.closeCallback);

        // Attach any callbacks, if provided
        $(".modal-generated-button").not(".modal-generated-button-processed").each(function () {

            var callback = null;
            
            if ($(this).hasClass("modal-generated-primary-button"))
                callback = extraStuff.successCallback;

            if ($(this).hasClass("modal-generated-close-button"))
                callback = extraStuff.failCallback;

            $(this).addClass("modal-generated-button-processed")
                .click(callback);
        });
    },

    Alert: function (contents, extraStuff) {
        var title = typeof extraStuff !== 'undefined' ? extraStuff.title : '';

        PsiModal.GenerateModal(title, contents, extraStuff);
    },

    Confirm: function (contents, successCallback, failCallback, extraStuff) {

        if (typeof extraStuff === 'undefined' || extraStuff == null)
            extraStuff = {};

        extraStuff.successCallback = successCallback;
        extraStuff.failCallback = failCallback;

        extraStuff.primaryButtonText = extraStuff.primaryButtonText || "OK";
        extraStuff.closeButtonText = extraStuff.closeButtonText || "Cancel";

        PsiModal.GenerateModal(extraStuff.title, contents, extraStuff);
    },

    // NOTE: This is called on page load, and when a modal is displayed, but if you are late-loading content another way,
    // you may need to call this yourself once that new content is loaded, if it may contain modal links.
    ProcessModalLinks: function()
    {
        $("a[modal-href]").not(".modal-href-processed").each(function(){
            $(this)
                .addClass("modal-href-processed")
                .attr('href', '#')
                .click(function(){
                    PsiModal.Render($(this).attr('modal-href'))
                    return false;
                })
                ;
        });
    },


    ShowModal: function(modalHtml) {
        var modal = $(modalHtml);
        $( "body" ).prepend( modal );
        $(modal)
            .on('shown.bs.modal', function () {
	    	// In case this modal contains any modal links.
                PsiModal.ProcessModalLinks();
            })
            .modal()
        ;

        return $(modal);
    },

    Topmost: function () {
        // Should be the first one encountered (even though from z-index perspective, you'd think it would be the last.)  
        // If there are issues with this, feel free to change this function to loop through all modals and check z-index.

        return $(".modal.in").first();
    },

    HideTopmost: function () {
	    PsiModal.Topmost().modal('hide');
    },

	ClearErrors: function (targetModal, afterSlideUpCallback) {
        if (typeof targetModal === "undefined")
            targetModal = PsiModal.Topmost();

        // Use slideUp callbacks so that when retrying, there is a bit of animation to show that yes we did retry.  Otherwise
        // it can be difficult to see whether it did anything.
        if ($(targetModal).find('.error-list').length === 0) {

            if (typeof afterSlideUpCallback !== "undefined")
                afterSlideUpCallback();

        } else {
            $(targetModal).find('.error-list').slideUp("fast", function () {
                $(targetModal).find('.has-error').removeClass("has-error");

                var errorList = $($(targetModal).find('.error-list')[0]);

                if (errorList.length != 0)
                    errorList.empty();

                if (typeof afterSlideUpCallback !== "undefined")
                    afterSlideUpCallback();
            });
        }
    },

    ShowErrors: function (errors, targetModal) {

        if (typeof targetModal === "undefined")
            targetModal = PsiModal.Topmost();

        // Clear any existing errors
        PsiModal.ClearErrors(targetModal, function () {

            // No errors?  We're done here.
            if (typeof errors === "undefined" || errors == null || errors.length === 0)
                return;

            // Create new errors div if needed
            if ($(targetModal).find('.error-list').length === 0)
                $(targetModal).find('.modal-body').prepend($("<div class='error-list' style='display:none;'></div>"));

            var errorList = $($(targetModal).find('.error-list')[0]);

            errorList.empty();

            // If a single string was passed instead of an array, turn it into an array now.
            if (typeof errors === "string")
                errors = [errors];

            for (var i = 0; i < errors.length; i++) {
                var error = errors[i];

                var msg = "";
                var fieldName = "";

                // Each error element can be either a message string, or an array with the field name being the first element and the message 
                // string as the second.
                if (typeof error === "string")
                    msg = error;
                else if (typeof error === "object" && error.length === 2) {
                    fieldName = error[0];

                    $(targetModal).find('.' + fieldName + '-form-group').addClass("has-error");

                    msg = error[1];
                }

                errorList.append($("<div>" + msg + "</div>"));
            }

            errorList.slideDown();
        });

    },

	BeginFormSubmit: function() {

		// show that something is happening, disable submit button, etc.
		
		var targetModal = PsiModal.Topmost();

		var submitButton = $(targetModal).find('[type=submit]');
		$(submitButton)
			.attr('disabled', 'true')
			.addClass('disabled');

		PsiModal.ClearErrors(targetModal);

		// TODO: Could also change the submit button text, show a spinner, etc.
	},

	FormSubmitFailed: function(ajaxContent) {

		var targetModal = PsiModal.Topmost();
		
		var submitButton = $(targetModal).find('[type=submit]');

		$(submitButton)
			.removeAttr('disabled')
			.removeClass('disabled');

		// Counting on error object returning in an acceptable format.  See http://localhost/HomeBanking/InternalDevDocs/Modals
		if (typeof ajaxContent.responseJSON != 'undefined' && typeof ajaxContent.responseJSON.errors != 'undefined')
			PsiModal.ShowErrors(ajaxContent.responseJSON.errors);
		else
			PsiModal.ShowErrors("There was a problem submitting this information.  Try again?");

	}
};


// Enable nested modals (made sure the new backdrop and the new modal are in front of old ones)
$(document).on('show.bs.modal', '.modal', function () {
    if ($(this).hasClass('set-index'))
        return;

    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this)
    	.css('z-index', zIndex)
    	.addClass('set-index');

    setTimeout(function () {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});

// If modal was generated through this module, remove from DOM when closed
$(document).on('hidden.bs.modal', '.modal', function () {
    $(this).removeClass('set-index');

    if ($(this).hasClass("destroy-when-closed"))
        $(this).remove();
});


// Process modal links for initial page load.  (If you introduce more links later, you'll need to run this yourself.)
$(function(){
    PsiModal.ProcessModalLinks();
});
