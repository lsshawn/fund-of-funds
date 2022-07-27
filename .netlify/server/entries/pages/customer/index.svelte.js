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
  default: () => Customer
});
module.exports = __toCommonJS(stdin_exports);
var import_index_97c0af33 = require("../../../_app/immutable/chunks/index-97c0af33.js");
var import_navigation_a34523cc = require("../../../_app/immutable/chunks/navigation-a34523cc.js");
var import_customer_a2cf2775 = require("../../../_app/immutable/chunks/customer-a2cf2775.js");
var import_utils_1e640007 = require("../../../_app/immutable/chunks/utils-1e640007.js");
var import_axios = require("axios");
var import_index_cfaf7702 = require("../../../_app/immutable/chunks/index-cfaf7702.js");
const headers = [
  {
    name: "First Name",
    value: "firstName"
  },
  {
    name: "Last Name",
    value: "lastName"
  },
  {
    name: "Email",
    value: "email"
  }
];
const Customer = (0, import_index_97c0af33.c)(($$result, $$props, $$bindings, slots) => {
  let $customers, $$unsubscribe_customers;
  $$unsubscribe_customers = (0, import_index_97c0af33.a)(import_customer_a2cf2775.a, (value) => $customers = value);
  function view(obj) {
    (0, import_navigation_a34523cc.g)(`/customer/${obj ? obj._id : "new"}`);
  }
  $$unsubscribe_customers();
  return `<div><div class="${"prose"}"><h1 class="${"mb-6"}">Customers</h1></div>

	${function(__value) {
    if ((0, import_index_97c0af33.i)(__value)) {
      __value.then(null, import_index_97c0af33.n);
      return `
		<p>Loading customers...</p>
	`;
    }
    return function() {
      return `
		<button class="${"btn btn-primary mb-6"}">Add New Customer</button>

		${(0, import_index_97c0af33.v)(import_navigation_a34523cc.D, "DataTable").$$render(
        $$result,
        {
          headers,
          data: $customers,
          onRowClick: view
        },
        {},
        {}
      )}
	`;
    }();
  }(import_customer_a2cf2775.a.init())}</div>`;
});
