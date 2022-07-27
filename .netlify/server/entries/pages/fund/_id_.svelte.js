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
var import_navigation_a34523cc = require("../../../_app/immutable/chunks/navigation-a34523cc.js");
var import_trade_a4360014 = require("../../../_app/immutable/chunks/trade-a4360014.js");
var import_TradeTableHeader_9c052444 = require("../../../_app/immutable/chunks/TradeTableHeader-9c052444.js");
var import_asset_b071e6c3 = require("../../../_app/immutable/chunks/asset-b071e6c3.js");
var import_svelte_forms = require("svelte-forms");
var import_validators = require("svelte-forms/validators");
var import_stores_e0bdf7e0 = require("../../../_app/immutable/chunks/stores-e0bdf7e0.js");
var import_utils_1e640007 = require("../../../_app/immutable/chunks/utils-1e640007.js");
var import_axios = require("axios");
var import_index_cfaf7702 = require("../../../_app/immutable/chunks/index-cfaf7702.js");
const AssetTrades = (0, import_index_97c0af33.c)(($$result, $$props, $$bindings, slots) => {
  let $assetTrades, $$unsubscribe_assetTrades;
  $$unsubscribe_assetTrades = (0, import_index_97c0af33.a)(import_trade_a4360014.a, (value) => $assetTrades = value);
  function view(obj) {
    (0, import_navigation_a34523cc.g)(`/trade/${obj ? obj._id : "new"}`);
  }
  let { assetId } = $$props;
  if ($$props.assetId === void 0 && $$bindings.assetId && assetId !== void 0)
    $$bindings.assetId(assetId);
  $$unsubscribe_assetTrades();
  return `<div>${function(__value) {
    if ((0, import_index_97c0af33.i)(__value)) {
      __value.then(null, import_index_97c0af33.n);
      return `
		<p>Loading fund trades...</p>
	`;
    }
    return function() {
      return `
		${(0, import_index_97c0af33.v)(import_navigation_a34523cc.D, "DataTable").$$render(
        $$result,
        {
          headers: import_TradeTableHeader_9c052444.h,
          data: $assetTrades,
          onRowClick: view
        },
        {},
        {}
      )}
	`;
    }();
  }(import_trade_a4360014.a.init(assetId))}</div>`;
});
const U5Bidu5D = (0, import_index_97c0af33.c)(($$result, $$props, $$bindings, slots) => {
  let activeTab;
  let $$unsubscribe_asset;
  let $page, $$unsubscribe_page;
  $$unsubscribe_asset = (0, import_index_97c0af33.a)(import_asset_b071e6c3.a, (value) => value);
  $$unsubscribe_page = (0, import_index_97c0af33.a)(import_stores_e0bdf7e0.p, (value) => $page = value);
  const id = $page.params.id;
  const isNew = id === "new";
  const tabs = ["Fund details", "Trades", "Prices"];
  activeTab = tabs[0];
  $$unsubscribe_asset();
  $$unsubscribe_page();
  return `<div class="${"prose flex"}">${(0, import_index_97c0af33.v)(import_BackButton_4d75e523.B, "BackButton").$$render($$result, {}, {}, {})}
	<h1 class="${"mb-0"}">${(0, import_index_97c0af33.b)(isNew ? "Add new " : "Edit ")} fund</h1></div>

${!isNew ? `<div class="${"tabs mb-6"}">${(0, import_index_97c0af33.e)(tabs, (tab) => {
    return `<a class="${["tab tab-lg tab-bordered", activeTab === tab ? "tab-active" : ""].join(" ").trim()}">${(0, import_index_97c0af33.b)(tab)}</a>`;
  })}</div>` : ``}

${activeTab === "Fund details" ? `<div class="${"prose"}"><h1>Fund details</h1></div>

	${function(__value) {
    if ((0, import_index_97c0af33.i)(__value)) {
      __value.then(null, import_index_97c0af33.n);
      return `
		<p>Loading fund...</p>
	`;
    }
    return function() {
      return `
		${``}
	`;
    }();
  }(import_asset_b071e6c3.a.init(id))}` : ``}

${activeTab === "Prices" ? `<div class="${"prose"}"><h1>Prices</h1></div>
	<div class="${"prose"}">TODO: This contains fund historical daily prices. Ideally prices should be updated via a daily
		cron job. We can also build a UI to edit historical prices.
	</div>` : ``}

${activeTab === "Trades" ? `<div class="${"prose"}"><h1>Trades</h1></div>
	${(0, import_index_97c0af33.v)(AssetTrades, "AssetTrades").$$render($$result, { assetId: id }, {}, {})}` : ``}`;
});
