describe("Simple Test:", function()
{
	"use strict";

	it("a is in fact 'Hello World!' and b to be not null", function()
	{
		var a = "Hello World!";
		var b = true;
		expect(a).toBe("Hello World!");
		expect(b).not.toBe(null);
	});
});