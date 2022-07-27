var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => _layout
});
module.exports = __toCommonJS(stdin_exports);
var import_index_97c0af33 = require("../../_app/immutable/chunks/index-97c0af33.js");
var import_index_cfaf7702 = require("../../_app/immutable/chunks/index-cfaf7702.js");
var import_stores_e0bdf7e0 = require("../../_app/immutable/chunks/stores-e0bdf7e0.js");
const style = "";
const userDocument = {
  _id: "62dff1f3fc01706680fb6a3c",
  email: "l@sshawn.com",
  firstName: "Shawn",
  role: "admin"
};
function createUser() {
  const { subscribe: subscribe2 } = (0, import_index_cfaf7702.w)(userDocument);
  return {
    subscribe: subscribe2
  };
}
const user = createUser();
const UserCircle = (0, import_index_97c0af33.c)(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"h-6 w-6"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}" stroke-width="${"2"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" d="${"M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"}"></path></svg>`;
});
const _layout = (0, import_index_97c0af33.c)(($$result, $$props, $$bindings, slots) => {
  let basePath;
  let $page, $$unsubscribe_page;
  let $user, $$unsubscribe_user;
  $$unsubscribe_page = (0, import_index_97c0af33.a)(import_stores_e0bdf7e0.p, (value) => $page = value);
  $$unsubscribe_user = (0, import_index_97c0af33.a)(user, (value) => $user = value);
  const tabs = [
    { name: "Funds", route: "/fund" },
    { name: "Customers", route: "/customer" },
    { name: "Trades", route: "/trade" }
  ];
  basePath = $page.url.pathname.split("/")[1];
  $$unsubscribe_page();
  $$unsubscribe_user();
  return `<div class="${"drawer"}"><input id="${"my-drawer-3"}" type="${"checkbox"}" class="${"drawer-toggle"}">
	<div class="${"drawer-content flex flex-col"}">
		<div class="${"navbar bg-slate-100"}">
			<div class="${"flex-none lg:hidden"}"><label for="${"my-drawer-3"}" class="${"btn btn-square btn-ghost"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" class="${"inline-block w-6 h-6 stroke-current"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M4 6h16M4 12h16M4 18h16"}"></path></svg></label></div>

			<div class="${"navbar-start"}"><div class="${"text-bold btn btn-ghost normal-case mr-3"}"><a href="${"/"}">ABC Ventures Capital</a></div>

				
				<div class="${"flex-none hidden lg:block"}"><ul class="${"menu menu-horizontal"}">${(0, import_index_97c0af33.e)(tabs, (tab) => {
    return `<li><a${(0, import_index_97c0af33.d)("href", tab.route, 0)}${(0, import_index_97c0af33.f)((basePath === tab.route.replace("/", "") ? "active" : "").trim())}>${(0, import_index_97c0af33.b)(tab.name)}</a>
							</li>`;
  })}</ul></div></div>

			<div class="${"navbar-end"}">${(0, import_index_97c0af33.v)(UserCircle, "UserCircle").$$render($$result, {}, {}, {})}
				<span class="${"ml-1"}">${(0, import_index_97c0af33.b)($user.firstName)}</span></div></div>

		
		<div class="${"p-6 pb-16 w-screen"}">${slots.default ? slots.default({}) : ``}</div></div>
	
	<div class="${"drawer-side"}"><label for="${"my-drawer-3"}" class="${"drawer-overlay"}"></label>
		<ul class="${"menu p-4 overflow-y-auto w-80 bg-base-100"}">${(0, import_index_97c0af33.e)(tabs, (tab) => {
    return `<li><a${(0, import_index_97c0af33.d)("href", tab.route, 0)}${(0, import_index_97c0af33.f)((basePath === tab.route.replace("/", "") ? "active" : "").trim())}>${(0, import_index_97c0af33.b)(tab.name)}</a>
				</li>`;
  })}</ul></div></div>`;
});
