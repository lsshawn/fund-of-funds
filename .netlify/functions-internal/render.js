const { init } = require('../serverless.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["favicon.png","fonts/poppins-v20-latin-700.woff","fonts/poppins-v20-latin-700.woff2","fonts/poppins-v20-latin-regular.woff","fonts/poppins-v20-latin-regular.woff2"]),
	mimeTypes: {".png":"image/png",".woff":"font/woff",".woff2":"font/woff2"},
	_: {
		entry: {"file":"_app/immutable/start-14f9a1a5.js","imports":["_app/immutable/start-14f9a1a5.js","_app/immutable/chunks/index-927633e0.js","_app/immutable/chunks/index-73ded85a.js","_app/immutable/chunks/singletons-eca981c1.js"],"stylesheets":[]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/6.js')),
			() => Promise.resolve().then(() => require('../server/nodes/3.js')),
			() => Promise.resolve().then(() => require('../server/nodes/5.js')),
			() => Promise.resolve().then(() => require('../server/nodes/8.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js')),
			() => Promise.resolve().then(() => require('../server/nodes/4.js')),
			() => Promise.resolve().then(() => require('../server/nodes/7.js'))
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "customer",
				pattern: /^\/customer\/?$/,
				names: [],
				types: [],
				path: "/customer",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "fund",
				pattern: /^\/fund\/?$/,
				names: [],
				types: [],
				path: "/fund",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				id: "trade",
				pattern: /^\/trade\/?$/,
				names: [],
				types: [],
				path: "/trade",
				shadow: null,
				a: [0,5],
				b: [1]
			},
			{
				type: 'page',
				id: "customer/[id]",
				pattern: /^\/customer\/([^/]+?)\/?$/,
				names: ["id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,6],
				b: [1]
			},
			{
				type: 'page',
				id: "fund/[id]",
				pattern: /^\/fund\/([^/]+?)\/?$/,
				names: ["id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,7],
				b: [1]
			},
			{
				type: 'page',
				id: "trade/[id]",
				pattern: /^\/trade\/([^/]+?)\/?$/,
				names: ["id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,8],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
