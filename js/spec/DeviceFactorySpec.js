define(["factories/DeviceFactory", "json2", "fakeresponses/FakeResponses"], function(DeviceFactory, json2, FakeResponses)
{
	describe("DeviceFactory ", function()
	{
		"use strict";
		var factory;
		var successString 	= FakeResponses.successResponse;
		var errorString 	= FakeResponses.errorResponse;

		beforeEach(function()
		{
			factory = DeviceFactory;
		});

		afterEach(function()
		{
			factory = null;
		});


		it("not null", function()
		{
			expect(factory).not.toBe(null);
		});
	
		it("parses a valid DeviceDTO from a success response.", function()
		{
			var json = JSON.parse(successString);
			var DeviceDTO = factory.getDeviceDTO(json);
			expect(DeviceDTO).not.toBe(null);
		});

		it("returns null for DeviceDTO if it gets an error response and doesn't explode.", function()
		{
			var json = JSON.parse(errorString);
			var DeviceDTO = factory.getDeviceDTO(json);
			expect(DeviceDTO).toBe(null);
		});

		it("returns null for DeviceDTO if I pass it null.", function()
		{
			var DeviceDTO = factory.getDeviceDTO(null);
			expect(DeviceDTO).toBe(null);
		});
	});
});