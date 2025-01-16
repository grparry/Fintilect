
var ConfigResetter = {
    // Look for any button with a class of reset-config-button and turn it into a functioning reset config button!
    SetupButtons: function() {
        $('.reset-config-button')
            .addClass('btn btn-default reset-config-button-processed')
            .removeClass('reset-config-button')
            .prop('type', 'button')
            .click(ConfigResetter.ResetConfig)
            .prop('title', 'Reset the config on applications using these resources')
            .html('<i class="fa fa-refresh" aria-hidden="true"></i> &nbsp; Reset Consuming App\'s Config');
        $('.config-search').attr('readonly', false);
    },

    ResetConfig: function() {
        var callback = function(data, status) {
            $('.reset-config-button-processed .fa-refresh').removeClass('fa-spin');
            $('.reset-config-button-processed').prop('disabled', false);

            if (status !== 'success')
                alert('Error refreshing config...\r\n' + data);
        }
        $('.reset-config-button-processed .fa-refresh').addClass('fa-spin');
        $('.reset-config-button-processed').prop('disabled', true);

        $.get('./Home/ResetConfig', callback);
    },
};

$(function () {
    ConfigResetter.SetupButtons();
});
