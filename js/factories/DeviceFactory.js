define(["dtos/DeviceDTO"], function(DeviceDTO)
{
	"use strict";
	var DeviceFactory;
	DeviceFactory =
	{

		getDeviceDTO: function(json)
		{
			try
			{
				var dto 				= new DeviceDTO();
				var activation 			= json.response.body.activation;
				dto.code 				= activation.code;
				dto.description 		= activation.description;
				dto.serialNumber 		= activation.serialNumber;
				dto.dateActivated 		= activation.dateActivated;
				dto.active 				= activation.active;

				return dto;
			}
			catch(error)
			{
				logger.error("DeviceFactory::getDeviceDTO, failed to parse the response.");
				logger.error(error);
				return null;
			}
		},

		toString:function()
		{
			return "[object DeviceFactory]";
		}
	};

	return DeviceFactory;
});