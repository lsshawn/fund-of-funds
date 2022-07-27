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
  default: () => U5Bidu5D
});
module.exports = __toCommonJS(stdin_exports);
var import_index_97c0af33 = require("../../../_app/immutable/chunks/index-97c0af33.js");
var import_BackButton_4d75e523 = require("../../../_app/immutable/chunks/BackButton-4d75e523.js");
var import_trade_a4360014 = require("../../../_app/immutable/chunks/trade-a4360014.js");
var import_asset_b071e6c3 = require("../../../_app/immutable/chunks/asset-b071e6c3.js");
var import_customer_a2cf2775 = require("../../../_app/immutable/chunks/customer-a2cf2775.js");
var import_svelte_forms = require("svelte-forms");
var import_validators = require("svelte-forms/validators");
var import_stores_e0bdf7e0 = require("../../../_app/immutable/chunks/stores-e0bdf7e0.js");
var import_index_cfaf7702 = require("../../../_app/immutable/chunks/index-cfaf7702.js");
var import_utils_1e640007 = require("../../../_app/immutable/chunks/utils-1e640007.js");
var import_axios = require("axios");
const U5Bidu5D = (0, import_index_97c0af33.c)(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_trade;
  let $page, $$unsubscribe_page;
  let $$unsubscribe_customerAutocomplete;
  let $$unsubscribe_assetAutocomplete;
  $$unsubscribe_trade = (0, import_index_97c0af33.a)(import_trade_a4360014.t, (value) => value);
  $$unsubscribe_page = (0, import_index_97c0af33.a)(import_stores_e0bdf7e0.p, (value) => $page = value);
  $$unsubscribe_customerAutocomplete = (0, import_index_97c0af33.a)(import_customer_a2cf2775.b, (value) => value);
  $$unsubscribe_assetAutocomplete = (0, import_index_97c0af33.a)(import_asset_b071e6c3.b, (value) => value);
  const id = $page.params.id;
  const isNew = id === "new";
  $$unsubscribe_trade();
  $$unsubscribe_page();
  $$unsubscribe_customerAutocomplete();
  $$unsubscribe_assetAutocomplete();
  return `<div class="${"prose flex"}">${(0, import_index_97c0af33.v)(import_BackButton_4d75e523.B, "BackButton").$$render($$result, {}, {}, {})}
	<h1 class="${"mb-0"}">${(0, import_index_97c0af33.b)(isNew ? "Add new " : "Edit ")} trade</h1></div>

${function(__value) {
    if ((0, import_index_97c0af33.i)(__value)) {
      __value.then(null, import_index_97c0af33.n);
      return `
	<p>Loading trade...</p>
`;
    }
    return function() {
      return `
	${``}
`;
    }();
  }(import_trade_a4360014.t.init(id))}`;
});
