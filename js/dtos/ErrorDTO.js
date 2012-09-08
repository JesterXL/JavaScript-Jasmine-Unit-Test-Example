
define([], function()
{
   "use strict";

	var ErrorDTO = function()
	{
		return {

			code:				null,
			message:			null,

		   toString:function()
		   {
			   var str		 				= "";
			   str							+= "[object ErrorDTO ";
			   str							+= "code=" + this.code;
			   str							+= ", message=" + this.message;
			   str 							+= "]";
			   return str;
		   }
	   };
	};

	return ErrorDTO;
});