/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var parse = require("../lib/parse");
var should = require("should");

describe("parse", function() {
	var testCases = {
		"simple": {
			loaders: null,
			resource: {
				path: "simple",
				query: null,
				module: true
			}
		},
		"m1/a.js": {
			loaders: null,
			resource: {
				path: "m1/a.js",
				query: null,
				module: true
			}
		},
		"./simple": {
			loaders: null,
			resource: {
				path: "./simple",
				query: null,
				module: false
			}
		},
		"../simple": {
			loaders: null,
			resource: {
				path: "../simple",
				query: null,
				module: false
			}
		},
		"/home/me/simple": {
			loaders: null,
			resource: {
				path: "/home/me/simple",
				query: null,
				module: false
			}
		},
		"C:\\windows\\file.js": {
			loaders: null,
			resource: {
				path: "C:\\windows\\file.js",
				query: null,
				module: false
			}
		},
		"..\\..\\file.js": {
			loaders: null,
			resource: {
				path: "..\\..\\file.js",
				query: null,
				module: false
			}
		},
		"path?query": {
			loaders: null,
			resource: {
				path: "path",
				query: "?query",
				module: true
			}
		},
		"path?query?query": {
			loaders: null,
			resource: {
				path: "path",
				query: "?query?query",
				module: true
			}
		},
		"path?": {
			loaders: null,
			resource: {
				path: "path",
				query: "?",
				module: true
			}
		},
		"..\\path?..\\query?./query": {
			loaders: null,
			resource: {
				path: "..\\path",
				query: "?..\\query?./query",
				module: false
			}
		},
		"!noLoaders": {
			loaders: [],
			resource: {
				path: "noLoaders",
				query: null,
				module: true
			}
		},
		"!noLoaders?query": {
			loaders: [],
			resource: {
				path: "noLoaders",
				query: "?query",
				module: true
			}
		},
		"raw!./file": {
			loaders: [
				{
					path: "raw",
					query: null,
					module: true
				}
			],
			resource: {
				path: "./file",
				query: null,
				module: false
			}
		},
		"raw!val!raw!module/with/file": {
			loaders: [
				{
					path: "raw",
					query: null,
					module: true
				},
				{
					path: "val",
					query: null,
					module: true
				},
				{
					path: "raw",
					query: null,
					module: true
				}
			],
			resource: {
				path: "module/with/file",
				query: null,
				module: true
			}
		},
		"../raw!./val!/home/me/raw!..../doh": {
			loaders: [
				{
					path: "../raw",
					query: null,
					module: false
				},
				{
					path: "./val",
					query: null,
					module: false
				},
				{
					path: "/home/me/raw",
					query: null,
					module: false
				}
			],
			resource: {
				path: "..../doh",
				query: null,
				module: true
			}
		},
		"raw!./loader?qqq!module/lib/file?query": {
			loaders: [
				{
					path: "raw",
					query: null,
					module: true
				},
				{
					path: "./loader",
					query: "?qqq",
					module: false
				}
			],
			resource: {
				path: "module/lib/file",
				query: "?query",
				module: true
			}
		},
		"raw!.scripted": {
			loaders: [
				{
					path: "raw",
					query: null,
					module: true
				}
			],
			resource: {
				path: ".scripted",
				query: null,
				module: true
			}
		},
		"loader!!./file": {
			loaders: [
				{
					path: "loader",
					query: null,
					module: true
				}
			],
			resource: {
				path: "./file",
				query: null,
				module: false
			}
		},
		"!!!loader1!!loader2!!./file": {
			loaders: [
				{
					path: "loader1",
					query: null,
					module: true
				},
				{
					path: "loader2",
					query: null,
					module: true
				}
			],
			resource: {
				path: "./file",
				query: null,
				module: false
			}
		},
		"loader!": {
			loaders: [
				{
					path: "loader",
					query: null,
					module: true
				}
			],
			resource: null
		},
		"": {
			loaders: null,
			resource: null
		},
		"!": {
			loaders: [],
			resource: null
		},
		"!!!loader!!!": {
			loaders: [
				{
					path: "loader",
					query: null,
					module: true
				}
			],
			resource: null
		},
		"!!!loader!!!?query": {
			loaders: [
				{
					path: "loader",
					query: null,
					module: true
				}
			],
			resource: {
				path: null,
				query: "?query",
				module: null
			}
		},
		"./a/loader!": {
			loaders: [
				{
					path: "./a/loader",
					query: null,
					module: false
				}
			],
			resource: null
		},
		"./a/loader!loader!": {
			loaders: [
				{
					path: "./a/loader",
					query: null,
					module: false
				},
				{
					path: "loader",
					query: null,
					module: true
				}
			],
			resource: null
		},
	};
	Object.keys(testCases).forEach(function(identifier) {
		it("should parse \"" + identifier + "\" correctly", function() {
			var result = parse(identifier);
			should.exist(result);
			result.should.be.eql(testCases[identifier]);
		});
	});

});