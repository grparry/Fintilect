!function(e){"use strict";"function"==typeof define&&define.amd?define("jQueryUI/safe-active-element",["jquery","./version"],e):e(jQuery)}(function(e){"use strict";return e.ui.safeActiveElement=function(e){var n;try{n=e.activeElement}catch(t){n=e.body}return n||(n=e.body),n.nodeName||(n=e.body),n}});

