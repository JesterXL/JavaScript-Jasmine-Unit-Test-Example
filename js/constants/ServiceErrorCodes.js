define([], function() {
	"use strict";

	var ServiceErrorCodes;
	ServiceErrorCodes = {

		ERROR_NONE:  "0",
		ERROR_SYSTEM:  "200",
		MISSING_USER_ID: "300-700",
		COOKIES_DISABLED: "600-200",

		toString:function ()
		{
			return "[object ServiceErrorCodes]";
		}
	};

	return ServiceErrorCodes;
});
