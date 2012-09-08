define(["underscore", "dtos/ResponseDTO", "dtos/ErrorDTO"], function(_, ResponseDTO, ErrorDTO)
{
	"use strict";
	var ResponseFactory;
	ResponseFactory =
	{

		TYPE_ERROR 	: "error",
		TYPE_OK 	: "warning",

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

			type: 				null,
			rawResponse:		null,
			url: 				null,

			isError:			true,
			error:				null, // ErrorDTO

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

				var responseType = json.response.type.toLowerCase();
				if (responseType === this.TYPE_OK)
				{
					return false;
				}
				else if (responseType === this.TYPE_ERROR)
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
			var errorResponse = ErrorDTO;

			if (json === null)
			{
				errorResponse.isNullResponse = true;
				errorResponse.errorCode = null;
				errorResponse.errorMessage = "Failed to parse response.";
				errorResponse.serviceErrorDefinition = null;
				return errorResponse;
			}

			try
			{
				var responseType = json.response.responseType.toLowerCase();

				if(responseType && (responseType === this.RESPONSE_TYPE_ERROR || responseType === this.RESPONSE_TYPE_WARNING))
				{

					// [jwarden 9.5.2012] NOTE: I believe body is deprecated in newer calls.

					/*
					{
						"response":{
						"responseType":"ERROR",
							"returnCode":20,
							"errors":{
							"error":{
								"code":"30-54",
									"message":"Device not found via PIN."
							}
						}
					}
					}
					*/

					/*
					for(var errorNode in json.response.body.errors.errorInfo)
					{
						// [jwarden 8.31.2012] TODO: snag from server error definitions.json; I know it's already in here somewhere.
						//errorDef = ServiceErrorMap.getInstance().getServiceErrorByCode(code);

						errorResponse.errorCode = errorNode.code;
						errorResponse.errorMessage = errorNode.message;
						errorResponse.serviceErrorDefinition = null;
						return errorResponse;
					}
					*/



					errorResponse.errorCode = json.response.errors.error.code;
					errorResponse.errorMessage = json.response.errors.error.message;
					errorResponse.serviceErrorDefinition = null;
					return errorResponse;
				}
				else
				{
					// completely unknown response, log
					logger.warn("ResponseFactory::getErrorDTO, unknown error response from server.");
					errorResponse.isNullResponse = true;
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