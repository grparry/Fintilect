"use strict";

// JScript File

   function controlPrefix(sID)
   {
		var posLastUnderscore = sID.lastIndexOf("_");
		var s;
		if (posLastUnderscore >= 0)
		{
			s = sID.substring(0, posLastUnderscore + 1);
		}
		else
		{
			s = "";
		}
		return s;
   }
   
   function controlID(sID)
   {
		var posLastUnderscore = sID.lastIndexOf("_");
		var s;
		if (posLastUnderscore >= 0)
		{
			 s = sID.substring(posLastUnderscore + 1);
		}
		else
		{
			s = sID;
		}
		return s;   
   }
   

   /* *
	* Convenience function for creating new namespaces.
	* 
	* @param {String} sNameSpace - The name of the namespace.
	* @returns {Object} The leaf namespace as a convenience to caller.
	*/

   var HomeBankingAdmin = HomeBankingAdmin || {};

	HomeBankingAdmin.namespace = function (sNameSpace) {
   		var saParts = sNameSpace.split('.');
   		var oParent = window;

   		for (var iIndex = 0; iIndex < saParts.length; iIndex++) {
   			if (typeof oParent[saParts[iIndex]] === 'undefined') {
   				oParent[saParts[iIndex]] = {};
   			}

   			oParent = oParent[saParts[iIndex]];
   		}

   		return oParent;
   };
