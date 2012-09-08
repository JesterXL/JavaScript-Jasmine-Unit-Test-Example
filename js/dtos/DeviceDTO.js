
define([], function()
{
	"use strict";

	var DeviceDTO = function()
	{
		return {
			code: null,
			description: null,
			serialNumber: null,
			dateActivated: null,
			active: false,

			toString:function()
			{
				return "[object DeviceDTO]";
			}
		};
	};
	return DeviceDTO;
});