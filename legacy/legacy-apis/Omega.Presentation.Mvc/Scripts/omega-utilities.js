// Generic utilities for Omega


var OmegaUtilies = OmegaUtilies || {};

OmegaUtilies = (function () {

    return {

        // test if is a number:
		// TODO: jQuery has this built-in.  Should we just use that?
        isNumeric : function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },

        // copy to clipboard
		copyToClipboard: function(text) {
			var temp = $("<input>");
			$("body").append(temp);
			temp.val(text).select();
			document.execCommand("copy");
			temp.remove();
		}
    }
})();