var OmegaTargetedMarketingPromotionModal = OmegaTargetedMarketingPromotionModal || {};

// Module for the other AJAX button on this modal: Delete promotion button, Add More button
OmegaTargetedMarketingPromotionModal = (function () {
    // local vars:
    var _inDelay = false;

    // show the spinner in a div to let the user know that the record is loading
    var _showSpinner = function () {
        $('#divProcessing').show("normal");
    }

    // Get account group data:
    var _getAccountGroupsForThisPromotion = function() {
        console.log("We are logging this click from ajax. - Action Begun from  GetAccountGroupsForThisPromotion");
        $.ajax(
               {
                   cache: false,
                   context: this,
                   dataType: "text",
                   error: function(reply) {
                       console.log("error GetAccountGroupsForThisPromotion.");
                       $('#failureAccountsDiv').show("normal");
                       $('#ProcessingAccountsDiv').hide();
                   },
                   success: function(reply) {
                       console.log("success GetAccountGroupsForThisPromotion.");
                       $('#failureAccountsDiv').hide();
                       $('#ProcessingAccountsDiv').hide();
                       $('#accountDetailsDiv').html(reply);
                   },
                   type: "Get",
                   data: { id: $('#promotionId').html() },
                   url: location.protocol + "//" + location.hostname + "/Omega/TargetedMarketing/GetAccountGroupsForThisPromotion"
               }
           );
    }

    // Get promotion slots:
    var _getPromotionSlotsForThisPromotion = function () {
        console.log("We are logging this click from ajax. - Action Begun from  getPromotionSlotsForThisPromotion");
        $.ajax(
               {
                   cache: false,
                   context: this,
                   dataType: "text",
                   error: function(reply) {
                       console.log("error getPromotionSlotsForThisPromotion.");
                       $('#failureContentItemsDiv').show("normal");
                       $('#ProcessingContentItemsDiv').hide();
                   },
                   success: function(reply) {
                       console.log("success getPromotionSlotsForThisPromotion.");
                       $('#failureContentItemsDiv').hide();
                       $('#ProcessingContentItemsDiv').hide();
                       $('#ContentItemsDivData').html(reply);
                   },
                   type: "Get",
                   data: { id: $('#promotionId').html() },
                   url: location.protocol + "//" + location.hostname + "/Omega/TargetedMarketing/GetPromotionSlotsForThisPromotion"
               }
           );
    }

    // Get features:
    var _getFeaturesForThisPromotion = function () {
        console.log("We are logging this click from ajax. - Action Begun from  _getFeaturesForThisPromotion");
        $.ajax(
               {
                   cache: false,
                   context: this,
                   dataType: "text",
                   error: function(reply) {
                       console.log("error _getFeaturesForThisPromotion.");
                       $('#FailureFeaturesItemsDiv').show("normal");
                       $('#ProcessingFeaturesItemsDiv').hide();
                   },
                   success: function(reply) {
                       console.log("success _getFeaturesForThisPromotion.");
                       $('#FailureFeaturesItemsDiv').hide();
                       $('#ProcessingFeaturesItemsDiv').hide();
                       $('#FeaturesItemsDivData').html(reply);
                       $("#FeaturesItemsDivData").slideDown();
                   },
                   type: "Get",
                   data: { id: $('#promotionId').html() },
                   url: location.protocol + "//" + location.hostname + "/Omega/TargetedMarketing/GetFeaturesForThisPromotion"
               }
           );
    }


    ///////////// Delete button methods
    //Ajax starting, getting a record detail
    var _logDeleteAjaxBegin = function () {
        console.log("We are logging this click from ajax. - Action Begun from OmegaTargetedMarketingPromotionModal");
        _inDelay = setTimeout(_showSpinner, 1000); // using setTimeout because jQuery delay only works on animate
        $("#failureDiv").hide();
        $("#SubmitButton").prop("disabled", true);
        $("#DeleteButton").prop("disabled", true);
    }

    // Ajax complete, show the modal
    var _showDeleteComplete = function (result) {
        console.log("We are logging this click from ajax. - Action Complete");
        clearTimeout(_inDelay);
        if (result.responseText.toLowerCase() === 'success' && result.statusText.toLowerCase() === 'ok') {
            $('#deleteDiv').show("normal");
            $('#failureDiv').hide();
            $('#divProcessing').hide();
        } else {
            $('#deleteDiv').hide();
            $('#failureDiv').show("normal");
            $('#divProcessing').hide();
        }
    }

    // Ajax failure, show the warning
    var _showDeleteFailure = function () {
        console.log("We are logging this click from ajax. - Action Failed");
        if (_inDelay == true) {
            _inDelay = null;
        }
        $("#divProcessing").hide();
        $("#failureDiv").show("normal");

    }


    ////////////// Add More Account Group Button methods:
    // Ajax starting, getting all
    var _logAddAjaxBegin = function () {
        console.log("We are logging this click from ajax. - Action Begun from OmegaTargetedMarketingPromotionModal Add Account Groups button");
        _inDelay = setTimeout(_showSpinner, 1000); // using setTimeout because jQuery delay only works on animate
        $("#failureDiv").hide();
    }


    // Ajax complete, show the modal
    var _showAddModal = function (result) {
        console.log("We are logging this click from ajax. - Action Complete");
        clearTimeout(_inDelay);

        $("#divFailure").hide();
        $('#divProcessing').hide();
        $("#targeted-marketing-account-group-modal").modal();
    }

    // Ajax failure, show the warning
    var _showAddFailure = function () {
        console.log("We are logging this click from ajax. - Action Failed");
        if (_inDelay == true) {
            _inDelay = null;
        }
        $('#divProcessing').hide();
        $("#targeted-marketing-account-group-modal").hide();
        $("#divFailure").show("normal");

    }


    //////////////   Selected Account Groups Button methods:
    // Ajax starting, setting account groups
    var _logSetGroupAjaxBegin = function () {
        console.log("We are logging this click from ajax. - Action Begun from OmegaTargetedMarketingPromotionModal Add Selected Account Groups button (on modal)");
        _inDelay = setTimeout(_showSpinner3, 1000); // using setTimeout because jQuery delay only works on animate
        $("#failureDiv3").hide();
    }

    // show the spinner in a div to let the user know that the record is loading
    var _showSpinner3 = function () {
        $('#processingDiv3').show("normal");
    }


    // Ajax complete, show success
    var _showSetGroupComplete = function (result) {
        console.log("We are logging this click from ajax. - Action Complete. result = " + result);
        console.log(result);
        clearTimeout(_inDelay);


        if (result.responseText.toLowerCase() === 'success' && result.statusText.toLowerCase() === 'ok') {
            $("#successDiv3").show("normal");
            $("#failureDiv3").hide();
            $('#processingDiv3').hide();
        } else {
            $("#successDiv3").hide();
            $("#failureDiv3").show("normal");
            $('#processingDiv3').hide();
        }
    }

    // Ajax complete, show success
    var _showSetGroupCompletePromotionAddAccountGroups = function (result) {
        console.log("We are logging this click from ajax. - Action Complete. showSetGroupCompletePromotionAddAccountGroups. result = " + result);
        console.log(result);
        clearTimeout(_inDelay);


        if (result.responseText.toLowerCase() === 'success' && result.statusText.toLowerCase() === 'ok') {
            _getAccountGroupsForThisPromotion();
            $("#successDiv3").show("normal");
            $("#failureDiv3").hide();
            $('#processingDiv3').hide();
        } else {
            $("#successDiv3").hide();
            $("#failureDiv3").show("normal");
            $('#processingDiv3').hide();
        }
    }

    // Ajax failure, show the warning
    var _showSetGroupFailure = function () {
        console.log("We are logging this click from ajax. - Action Failed");
        if (_inDelay == true) {
            _inDelay = null;
        }
        $('#processingDiv3').hide();
        $("#failureDiv3").show("normal");

    }

    ////////////// Add More Content Items Button methods:
    // Ajax starting, getting all
    var _logContentItemsAjaxBegin = function () {
        console.log("We are logging this click from ajax. - Action Begun from OmegaTargetedMarketingPromotionModal Add Account Groups button");
        _inDelay = setTimeout(_showSpinner, 1000); // using setTimeout because jQuery delay only works on animate
        $("#failureDiv").hide();
    }


    // Ajax complete, show the modal
    var _showContentItemsModal = function (result) {
        console.log("We are logging this click from ajax. - Action Complete");
        clearTimeout(_inDelay);

        $("#divFailure").hide();
        $('#divProcessing').hide();
        $("#targeted-marketing-content-item-modal").modal();
        document.getElementById("targeted-marketing-content-item-modal").style.zIndex = 99999999;
    }

    // Ajax failure, show the warning
    var _showContentItemsFailure = function () {
        console.log("We are logging this click from ajax. - Action Failed");
        if (_inDelay == true) {
            _inDelay = null;
        }
        $('#divProcessing').hide();
        $("#targeted-marketing-content-item-modal").hide();
        $("#divFailure").show("normal");
    }

    //////////////   Selected Content Items Groups Button methods:
    // Ajax starting, setting account groups
    var _logSetContentItemsAjaxBegin = function () {
        console.log("We are logging this click from ajax. - Action Begun from OmegaTargetedMarketingPromotionModal Add Selected Content Items button (on modal)");
        _inDelay = setTimeout(_showSpinner4, 1000); // using setTimeout because jQuery delay only works on animate
        $("#failureDiv4").hide();
    }

    // show the spinner in a div to let the user know that the record is loading
    var _showSpinner4 = function () {
        $('#processingDiv4').show("normal");
    }


    // Ajax complete, show success
    var _showSetContentItemsComplete = function (result) {
        console.log("We are logging this click from ajax. - Action Complete. result = " + result);
        console.log(result);
        clearTimeout(_inDelay);


        if (result.responseText.toLowerCase() === 'success' && result.statusText.toLowerCase() === 'ok') {
            $("#successDiv4").show("normal");
            $("#failureDiv4").hide();
            $('#processingDiv4').hide();
        } else {
            $("#successDiv4").hide();
            $("#failureDiv4").show("normal");
            $('#processingDiv4').hide();
        }
    }

    // Ajax failure, show the warning
    var _showSetContentItemsFailure = function () {
        console.log("We are logging this click from ajax. - Action Failed");
        if (_inDelay == true) {
            _inDelay = null;
        }
        $('#processingDiv4').hide();
        $("#failureDiv4").show("normal");

    }


    // Public interface
    return {
        logDeleteAjaxBegin: _logDeleteAjaxBegin,
        showDeleteComplete: _showDeleteComplete,
        showDeleteFailure: _showDeleteFailure,
        logAddAjaxBegin: _logAddAjaxBegin,
        showAddDetailModal: _showAddModal,
        showAddFailure: _showAddFailure,
        logSetGroupAjaxBegin: _logSetGroupAjaxBegin,
        showSetGroupComplete: _showSetGroupComplete,
        showSetGroupCompletePromotionAddAccountGroups: _showSetGroupCompletePromotionAddAccountGroups,
        showSetGroupFailure: _showSetGroupFailure,
        logContentItemsAjaxBegin: _logContentItemsAjaxBegin,
        showContentItemsDetailModal: _showContentItemsModal,
        showContentItemsFailure: _showContentItemsFailure,
        logSetContentItemsAjaxBegin: _logSetContentItemsAjaxBegin,
        showSetContentItemsComplete: _showSetContentItemsComplete,
        showSetContentItemsFailure: _showSetContentItemsFailure,
        getAccountGroupsForThisPromotion: _getAccountGroupsForThisPromotion,
        getPromotionSlotsForThisPromotion: _getPromotionSlotsForThisPromotion,
        getFeaturesForThisPromotion: _getFeaturesForThisPromotion
    }

})();