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
  default: () => Fund
});
module.exports = __toCommonJS(stdin_exports);
var import_index_97c0af33 = require("../../../_app/immutable/chunks/index-97c0af33.js");
var import_navigation_a34523cc = require("../../../_app/immutable/chunks/navigation-a34523cc.js");
var import_asset_b071e6c3 = require("../../../_app/immutable/chunks/asset-b071e6c3.js");
var import_utils_1e640007 = require("../../../_app/immutable/chunks/utils-1e640007.js");
var import_axios = require("axios");
var import_index_cfaf7702 = require("../../../_app/immutable/chunks/index-cfaf7702.js");
const headers = [
  {
    name: "Ticker",
    value: "ticker"
  },
  {
    name: "Name",
    value: "name"
  },
  {
    name: "Last Price",
    value: "lastPrice",
    "class": "text-right",
    isNumber: true
  },
  {
    name: "Manager",
    value: "manager"
  },
  {
    name: "Management Fee %",
    value: "managementFee",
    "class": "text-right",
    isNumber: true,
    decimal: 2
  },
  {
    name: "Performance Fee %",
    value: "performanceFee",
    "class": "text-right",
    isNumber: true,
    decimal: 2
  },
  {
    name: "Max Investable Amount ($)",
    value: "maxInvestableAmount",
    "class": "text-right",
    isNumber: true
  },
  {
    name: "Created Date",
    value: "createdDate",
    formatDate: true,
    "class": "text-right"
  }
];
const Fund = (0, import_index_97c0af33.c)(($$result, $$props, $$bindings, slots) => {
  let $funds, $$unsubscribe_funds;
  $$unsubscribe_funds = (0, import_index_97c0af33.a)(import_asset_b071e6c3.f, (value) => $funds = value);
  function view(obj) {
    (0, import_navigation_a34523cc.g)(`/fund/${obj ? obj._id : "new"}`);
  }
  $$unsubscribe_funds();
  return `<div><div class="${"prose"}"><h1 class="${"mb-6"}">Funds</h1></div>
	${function(__value) {
    if ((0, import_index_97c0af33.i)(__value)) {
      __value.then(null, import_index_97c0af33.n);
      return `
		<p>Loading funds...</p>
	`;
    }
    return function() {
      return `
		<button class="${"btn btn-primary mb-6"}">Add New Fund</button>

		${(0, import_index_97c0af33.v)(import_navigation_a34523cc.D, "DataTable").$$render($$result, { headers, data: $funds, onRowClick: view }, {}, {})}
	`;
    }();
  }(import_asset_b071e6c3.f.init())}</div>`;
});
