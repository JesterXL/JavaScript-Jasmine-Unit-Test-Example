
define(["dtos/ErrorDTO"], function(ErrorDTO)
{
	"use strict";

	var ResponseDTO = function()
	{
		return {

			type: 				null,
			rawResponse:		null,
			url: 				null,

			isError:			true,
			error:				null, // ErrorDTO



			toString:function ()
			{
					var str							= "";
					str								+= "[object ResponseDTO ";
					str								+= "type=" + this.type;
					str								+= ", code=" + this.code;
					str								+= ", isError=" + this.isError;
					str								+= ", error=" + this.error;
					if(this.isError == true)
					{
						str							+= ", url=" + this.url;
						var responseStr				= "";
						if(this.rawResponse != undefined)
						{
							responseStr				= this.rawResponse.toString();
							if(responseStr.length > 200)
							{
								responseStr			= responseStr.substr(0, 200) + "...";
							}
						}
						str 						+= ", rawResponse=" + responseStr;
					}
					str								+= "]";
					return str;
			}
		};
	};

	return ResponseDTO;
});