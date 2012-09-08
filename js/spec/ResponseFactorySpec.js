define(["factories/ResponseFactory", "json2", "fakeresponses/FakeResponses"], function(ResponseFactory, json2, FakeResponses)
{
	describe("ResponseFactory ", function()
	{
		"use strict";
		var factory;
		var successString 		= FakeResponses.successResponse;
		var errorString 		= FakeResponses.errorResponse;

		beforeEach(function()
	   {
		   factory = ResponseFactory;
	   });

		afterEach(function()
	  {
		  factory = null;
	  });


		it("returns a valid ResponseDTO when passed null.", function()
		{
			var responseDTO = factory.getResponseDTO(null);
			expect(responseDTO).not.toBe(null);
		});

		it("returns a valid ResponseDTO when passed error JSON.", function()
		{
			try
			{
				var json = JSON.parse(errorString);
				var responseDTO = factory.getResponseDTO(json);
				expect(responseDTO).not.toBe(null);
			}
			catch(error)
			{
				logger.error("ResponseFactorySpec::failed to parse error JSON string:");
				logger.error(error);
			}
		});

		it("returns a valid ResponseDTO when passed success JSON.", function()
		{
			try
			{
				var json = JSON.parse(successString);
				var responseDTO = factory.getResponseDTO(json);
				expect(responseDTO).not.toBe(null);
			}
			catch(error)
			{
				logger.error("ResponseFactorySpec::failed to parse success JSON string:");
				logger.error(error);
			}
		});

		it("has a non null type on the ResponseDTO for a success.", function()
		{
			var json = JSON.parse(successString);
			var responseDTO = factory.getResponseDTO(json);
			expect(responseDTO.type).not.toBe(null);
		});

		it("has a non null type on the ResponseDTO for an error.", function()
		{
			var json = JSON.parse(errorString);
			var responseDTO = factory.getResponseDTO(json);
			expect(responseDTO.type).not.toBe(null);
		});

		it("has an error ResponseDTO.type of ResponseFactory.TYPE_ERROR", function()
	   {
		   var json = JSON.parse(errorString);
		   var responseDTO = factory.getResponseDTO(json);
		   expect(responseDTO.type).toBe(ResponseFactory.TYPE_ERROR);
		   expect(responseDTO.type).not.toBe(ResponseFactory.TYPE_OK);
	   });

		it("has a success ResponseDTO.type of ResponseFactory.TYPE_OK", function()
		{
			var json = JSON.parse(successString);
			var responseDTO = factory.getResponseDTO(json);
			expect(responseDTO.type).toBe(ResponseFactory.TYPE_OK);
			expect(responseDTO.type).not.toBe(ResponseFactory.TYPE_ERROR);
		});

		it("has a ResponseDTO that is not an error for a successful response.", function()
		{
			var json = JSON.parse(successString);
			var responseDTO = factory.getResponseDTO(json);
			expect(responseDTO.isError).toBe(false);
		});

		it("has a ResponseDTO that is an error for an error response.", function()
		{
			var json = JSON.parse(errorString);
			var responseDTO = factory.getResponseDTO(json);
			expect(responseDTO.isError).toBe(true);
		});

		it("has an error code of 300-700 for our fixture on an error response on the ResponseDTO", function()
		{
			var json = JSON.parse(errorString);
			var responseDTO = factory.getResponseDTO(json);
			expect(responseDTO.error).not.toBe(null);
			expect(responseDTO.error.code).toBe("300-700");
		});

		it("has an error message that matches our fixture in ResponseDTO", function()
		{
			var json = JSON.parse(errorString);
			var responseDTO = factory.getResponseDTO(json);
			expect(responseDTO.error).not.toBe(null);
			expect(responseDTO.error.message).toBe("Could not find that device based on the PIN you entered.");
		});

	});
});