define([], function() {
	"use strict";

	var FakeResponses;
	FakeResponses = {

		errorResponse: '{"response":{"type":"ERROR","errors":{"error":{"code":"300-700","message":"Could not find that device based on the PIN you entered."}}}}',
		successResponse: '{"response":{"type":"OK","body":{"activation":{"code":"ROKU","description":"Roku Streaming Players","serialNumber":"002481C56DEF ","dateActivated":"2012-09-05 13:37:43.642 UTC","active":true}}}}',

		toString:function ()
		{
			return "[object FakeResponses]";
		}
	};

	return FakeResponses;
});
