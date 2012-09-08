define(["underscore", "dtos/ResponseDTO", "dtos/ErrorDTO"], function(_, ResponseDTO, ErrorDTO)
{
	"use strict";
	var ResponseFactory;
	ResponseFactory =
	{

		TYPE_ERROR 	: "error",
		TYPE_OK 	: "ok",

		// NOTE: This function should NEVER return null.  All services should get a valid,
		// non-null ResponseDTO that gives helpful info on why things failed, even if null XML response.

		getResponseDTO: function(json)
		{
			var responseDTO = ResponseDTO;
			if (json === null)
			{
				responseDTO = this.getGenericErrorResponseDTO();
				return responseDTO;
			}

			try
			{

				responseDTO.type 			= json.response.type.toLowerCase();
				responseDTO.code 			= json.response.code;
				responseDTO.rawResponse 	= json;
				responseDTO.isError 		= this.isErrorJSON(json);
				if (responseDTO.isError)
				{
					responseDTO.error = this.getErrorDTO(json);
				}

				return responseDTO;
			}
			catch(secondParseError)
			{
				logger.error("ResponseFactory::getResponseDTO, secondary json parsing error");
				logger.error(secondParseError);
				responseDTO = this.getGenericErrorResponseDTO();
				return responseDTO;
			}
		},

		getGenericErrorResponseDTO: function()
		{
			var responseDTO 		= ResponseDTO;
			responseDTO.isError 	= true;
			responseDTO.error 		= this.getErrorDTO(null);
			return responseDTO;
		},

		isErrorJSON: function(json)
		{
			try
			{
				if (json === null)
					return true;

				if (json.response.type === undefined)
					return true;

				var type = json.response.type.toLowerCase();
				if (type === this.TYPE_OK)
				{
					return false;
				}
				else if (type === this.TYPE_ERROR)
				{
					return true;
				}
			}
			catch(parseError)
			{
				logger.error("ResponseFactory::isErrorJSON, parsing error, assuming it's an error.");
				logger.error(parseError);
				return true;
			}
		},

		// NOTE: Like getResponseDTO, this method too should always return a valid DTO so we know what went wrong.
		getErrorDTO: function(json) // ErrorDTO
		{
			var errorResponse = new ErrorDTO();

			if (json === null)
			{
				errorResponse.code = null;
				errorResponse.message = "Failed to parse response.";
				return errorResponse;
			}

			try
			{
				var type = json.response.type.toLowerCase();

				if(type && (type === this.TYPE_ERROR))
				{
					errorResponse.code = json.response.errors.error.code;
					errorResponse.message = json.response.errors.error.message;
					return errorResponse;
				}
				else
				{
					// completely unknown response, log
					logger.warn("ResponseFactory::getErrorDTO, unknown error response from server.");
					return errorResponse;
				}
			}
			catch(errorDTOParsingError)
			{
				logger.error("ResponseFactory::getErrorDTO, parsing error");
				logger.error(errorDTOParsingError);
				return errorResponse;
			}
		},

		toString:function()
		{
			return "[object ResponseFactory]";
		}
	};

	return ResponseFactory;
});