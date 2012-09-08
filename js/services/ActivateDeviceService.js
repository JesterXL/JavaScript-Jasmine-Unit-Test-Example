define(["jquery",
	"underscore",
	"backbone",
	"factories/ResponseFactory",
		"factories/DeviceFactory",
		"dtos/DeviceDTO"],
		function($,
				 _,
				 Backbone,
				 ResponseFactory,
				 DeviceFactory,
				 DeviceDTO)
{
   "use strict";

   var ActivateDeviceService = function() {
	   return {
		   deviceDTO:null, // DeviceDTO

		   url:"./activateDevice.json?",

		   activateDevice: function(serviceCode, devicePin)
		   {
			   logger.debug("ActivateDeviceService::activateDevice");
			   // [jwarden 9.4.2012] KLUDGE: Yeah.... global variables... weeeee
			   this.eventBus = Backbone.Model.prototype.eventBus;
			   this.onActivateDeviceSuccess = _.bind(this.onActivateDeviceSuccess, this);
			   this.onActivateDeviceError = _.bind(this.onActivateDeviceError, this);

			   this.deviceDTO = null;

			   var newURL = this.url + "serviceCode=" + serviceCode + "&devicePin=" + devicePin;

			   logger.debug("newURL: " + newURL);
			   this.request = $.ajax({url:newURL,
										 success:this.onActivateDeviceSuccess,
										 error:this.onActivateDeviceError});
		   },

		   onActivateDeviceSuccess:function(data, textStatus)
		   {
			   logger.debug("ActivateDeviceService::onActivateDeviceSuccess");
			   logger.debug(data);
			   logger.debug(textStatus);
			   var responseDTO;

			   try
			   {
				   responseDTO = ResponseFactory.getResponseDTO(data);
				   if(responseDTO.isError === false)
				   {
					   try
					   {
						   this.deviceDTO = DeviceFactory.getDeviceDTO(data);
						   if(this.deviceDTO !== undefined)
						   {
							   this.sendSuccess(responseDTO);
						   }
						   else
						   {
							   this.sendError(responseDTO);
						   }
					   }
					   catch(parseError)
					   {
						   logger.error("ActivateDeviceService::onActivateDeviceSuccess, got a successful response, but cannot successfully parse it.");
						   logger.error(parseError);
						   this.sendError(responseDTO);
					   }
				   }
				   else
				   {
					   this.sendError(responseDTO);
				   }
			   }
			   catch(parseError)
			   {
				   logger.error("ActivateDeviceService::onActivateDeviceSuccess, couldn't parse a ResponseDTO.");
				   logger.error(parseError);
				   this.sendError(responseDTO);
			   }
		   },

		   onActivateDeviceError: function(errorResponse)
		   {
			   logger.error("ActivateDeviceService::onActivateDeviceError");
			   logger.error(errorResponse);
			   this.eventBus.trigger("ActivateDeviceService:error");
		   },

		   sendError: function(responseDTO)
		   {
			   logger.error("ActivateDeviceService::sendError");
			   this.eventBus.trigger("ActivateDeviceService:error", responseDTO);
		   },

		   sendSuccess: function(responseDTO)
		   {
			   logger.debug("ActivateDeviceService::sendSuccess");
			   this.eventBus.trigger("ActivateDeviceService:success", responseDTO);
		   },

		   toString:function()
		   {
			   return "[object ActivateDeviceService]";
		   }
	   };
	};

	return ActivateDeviceService;
});