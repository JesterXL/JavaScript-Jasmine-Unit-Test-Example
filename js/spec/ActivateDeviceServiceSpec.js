define(["backbone",
		"underscore",
		"services/ActivateDeviceService",
		"fakeresponses/FakeResponses"], function(Backbone,
												 _,
												 ActivateDeviceService,
												 FakeResponses)
{
	"use strict";

	describe("ActivateDeviceService ", function()
	{
		var eventBus 		= _.extend({}, Backbone.Events);
		var service;
		var successString 	= FakeResponses.successResponse;
		var errorString 	= FakeResponses.errorResponse;

		beforeEach(function()
		{
			service = new ActivateDeviceService();
			service.eventBus = eventBus;
		});

		afterEach(function()
		{
			service = null;
		});

		it("not null", function()
		{
			expect(service).not.toBe(null);
		});

		if("eventBus is legit and ready to go", function()
		{
			expect(eventBus).not.toBe(null);
		})

		it("doesn't throw an exception receiving a successful response.", function()
		{
			var callback = function()
			{
				var json = JSON.parse(successString);
				service.onActivateDeviceSuccess(json);
			};
			expect(callback).not.toThrow();
		});

		it("doesn't throw an exception receiving an error response.", function()
		{
			var callback = function()
			{
				var json = JSON.parse(errorString);
				service.onActivateDeviceSuccess(json);
			};
			expect(callback).not.toThrow();
		});

		it("doesn't throw an exception receiving a null response.", function()
		{
			var callback = function()
			{
				service.onActivateDeviceSuccess(null);
			};
			expect(callback).not.toThrow();
		});

		it("onActivateDeviceError is called successfully with a string response.", function()
		{
			var callback = function()
			{
				service.onActivateDeviceError("error");
			};
			expect(callback).not.toThrow();
		});

		it("onActivateDeviceError is called successfully with a null response.", function()
		{
			var callback = function()
			{
				service.onActivateDeviceSuccess();
			};
			expect(callback).not.toThrow();
		});

		it("calling the success callback with a successful response triggers a success message.", function()
		{
			//toHaveBeenCalled
			eventBus.callback = {};
			eventBus.callback.called = false;
			eventBus.callback.testFunction = function(){
				eventBus.callback.called = true;
			};
			eventBus.on("ActivateDeviceService:success", eventBus.callback.testFunction);
			// [jwarden 9.2.2012] TODO: Figure out why spyOn doesn't work. I can see the function getting called.
			//spyOn(eventBus.callback, "testFunction");
			var json = JSON.parse(successString);
			service.onActivateDeviceSuccess(json);
			//expect(eventBus.callback.testFunction).toHaveBeenCalled();
			expect(eventBus.callback.called).toBe(true);
		});

		it("calling the success callback with a successful response triggers a success message.", function()
		{
			//toHaveBeenCalled
			eventBus.callback = {};
			eventBus.callback.called = false;
			eventBus.callback.testFunction = function(){
				eventBus.callback.called = true;
			};
			eventBus.on("ActivateDeviceService:success", eventBus.callback.testFunction);
			// [jwarden 9.2.2012] TODO: Figure out why spyOn doesn't work. I can see the function getting called.
			//spyOn(eventBus.callback, "testFunction");
			var json = JSON.parse(successString);
			service.onActivateDeviceSuccess(json);
			//expect(eventBus.callback.testFunction).toHaveBeenCalled();
			expect(eventBus.callback.called).toBe(true);
		});

		it("calling the success callback with a successful response results in a non null deviceDTO.", function()
		{
			var json = JSON.parse(successString);
			service.onActivateDeviceSuccess(json);
			expect(service.deviceDTO).not.toBe(null);
		});

		it("before initial call, deviceDTO are null.", function()
		{
			expect(service.deviceDTO).toBe(null);
		});

		it("validated that module creates unique instances.", function()
		{
			var instanceA = new ActivateDeviceService();
			var instanceB = new ActivateDeviceService();
			instanceA.cow = "cheese";
			instanceB.cow = "moo";
			expect(instanceA.cow).not.toBe(instanceB.cow);
		});



	});
});

