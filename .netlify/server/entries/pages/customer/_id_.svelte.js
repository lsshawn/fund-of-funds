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
var import_index_cfaf7702 = require("../../../_app/immutable/chunks/index-cfaf7702.js");
var import_utils_1e640007 = require("../../../_app/immutable/chunks/utils-1e640007.js");
var import_customer_a2cf2775 = require("../../../_app/immutable/chunks/customer-a2cf2775.js");
var import_svelte_forms = require("svelte-forms");
var import_validators = require("svelte-forms/validators");
var import_stores_e0bdf7e0 = require("../../../_app/immutable/chunks/stores-e0bdf7e0.js");
var import_axios = require("axios");
const CustomerTrades = (0, import_index_97c0af33.c)(($$result, $$props, $$bindings, slots) => {
  let $customerTrades, $$unsubscribe_customerTrades;
  $$unsubscribe_customerTrades = (0, import_index_97c0af33.a)(import_trade_a4360014.c, (value) => $customerTrades = value);
  function view(obj) {
    (0, import_navigation_a34523cc.g)(`/trade/${obj ? obj._id : "new"}`);
  }
  let { customerId } = $$props;
  if ($$props.customerId === void 0 && $$bindings.customerId && customerId !== void 0)
    $$bindings.customerId(customerId);
  $$unsubscribe_customerTrades();
  return `<div>${function(__value) {
    if ((0, import_index_97c0af33.i)(__value)) {
      __value.then(null, import_index_97c0af33.n);
      return `
		<p>Loading customer trades...</p>
	`;
    }
    return function() {
      return `
		${(0, import_index_97c0af33.v)(import_navigation_a34523cc.D, "DataTable").$$render(
        $$result,
        {
          headers: import_TradeTableHeader_9c052444.h,
          data: $customerTrades,
          onRowClick: view
        },
        {},
        {}
      )}
	`;
    }();
  }(import_trade_a4360014.c.init(customerId))}</div>`;
});
const responseSchema = `
_id
quantity
createdDate
updatedDate
asset
customer
marketValue
`;
function customerPositionsStore() {
  const { subscribe: subscribe2, set, update } = (0, import_index_cfaf7702.w)([]);
  return {
    subscribe: subscribe2,
    reset: () => set([]),
    init: async (customerId) => {
      if (!customerId)
        return;
      const queryName = "positionGetManyByCustomer";
      const res = await (0, import_utils_1e640007.q)(
        `{
            ${queryName}(customer: "${customerId}") {
              ${responseSchema}
            }
        }`,
        queryName
      );
      if (res.error || res.errors) {
        throw new Error(res);
      }
      set(res.data);
    }
  };
}
const customerPositions = customerPositionsStore();
const headers = [
  {
    name: "Asset",
    value: "asset.ticker"
  },
  {
    name: "Asset Type",
    value: "asset.type"
  },
  {
    name: "Last Price",
    value: "asset.lastPrice",
    "class": "text-right",
    isNumber: true
  },
  {
    name: "Quantity",
    value: "quantity",
    "class": "text-right",
    isNumber: true
  },
  {
    name: "Market Value ($)",
    value: "marketValue",
    "class": "text-right",
    isNumber: true
  },
  {
    name: "Updated Date",
    value: "updatedDate",
    "class": "text-right",
    formatDate: true
  },
  {
    name: "Customer",
    value: "customer.firstName"
  }
];
const CustomerPositions = (0, import_index_97c0af33.c)(($$result, $$props, $$bindings, slots) => {
  let equity;
  let $customerPositions, $$unsubscribe_customerPositions;
  $$unsubscribe_customerPositions = (0, import_index_97c0af33.a)(customerPositions, (value) => $customerPositions = value);
  let { customerId } = $$props;
  let newPortfolioWeights = $customerPositions.reduce(
    (prev, position) => {
      prev[position.asset.ticker] = 0;
      return prev;
    },
    {}
  );
  function calcRebalanceTrade(ticker) {
    const newWeight = newPortfolioWeights[ticker] / 100;
    if (newWeight === 0)
      return "";
    const position = $customerPositions.filter((obj) => obj.asset.ticker === ticker)[0];
    const positionWeight = position.marketValue / equity;
    if (newWeight === positionWeight)
      return "";
    const orderType = newWeight > positionWeight ? "Buy" : "Sell";
    const newMarketValue = (newWeight - positionWeight) * equity;
    const quantityToTrade = newMarketValue / position.asset.lastPrice;
    return `${orderType} ${quantityToTrade.toLocaleString()} unit (market value of $ ${newMarketValue.toLocaleString(0)})`;
  }
  if ($$props.customerId === void 0 && $$bindings.customerId && customerId !== void 0)
    $$bindings.customerId(customerId);
  equity = $customerPositions.reduce(
    (accum, position) => {
      return accum += position.marketValue;
    },
    0
  );
  $customerPositions.reduce(
    (prev, position) => {
      prev[position.asset.ticker] = position.marketValue / equity * 100;
      return prev;
    },
    {}
  );
  $$unsubscribe_customerPositions();
  return `<div>${function(__value) {
    if ((0, import_index_97c0af33.i)(__value)) {
      __value.then(null, import_index_97c0af33.n);
      return `
		<p>Loading customer positions...</p>
	`;
    }
    return function() {
      return `
		
		<div class="${"stats shadow my-6"}"><div class="${"stat"}"><div class="${"stat-title"}">Equity</div>
				<div class="${"stat-value"}">$ ${(0, import_index_97c0af33.b)(equity.toLocaleString("en-US", { minimumFractionDigits: 0 }))}</div></div></div>

		${(0, import_index_97c0af33.v)(import_navigation_a34523cc.D, "DataTable").$$render($$result, { headers, data: $customerPositions }, {}, {})}

		<div class="${"prose my-6"}"><h2>Rebalance Customer Position</h2></div>
		<div class="${"form-control"}"><label class="${"input-group input-group-md mt-2"}"><span class="${"w-[100px]"}">Ticker</span>
				<input type="${"text"}" class="${"input input-ghost"}" disabled value="${"Current Weight %"}">
				<input type="${"text"}" class="${"input input-bordered"}" disabled value="${"New Weight %"}"></label>
			${(0, import_index_97c0af33.e)($customerPositions, (position) => {
        return `<label class="${"input-group input-group-md mt-2"}"><span class="${"w-[100px]"}">${(0, import_index_97c0af33.b)(position.asset.ticker)} (%)</span>
					<input type="${"number"}" class="${"input input-ghost disabled text-right"}"${(0, import_index_97c0af33.d)("value", position.marketValue / equity * 100, 0)} disabled>
					<input type="${"number"}" step="${"0.01"}" class="${"input input-bordered text-right"}"${(0, import_index_97c0af33.d)("value", newPortfolioWeights[position.asset.ticker], 0)}>
				</label>`;
      })}

			<h3>Trades to rebalance</h3>
			${(0, import_index_97c0af33.e)(Object.keys(newPortfolioWeights), (ticker) => {
        return `${ticker !== "USD" ? `<div>${(0, import_index_97c0af33.b)(ticker)}: ${(0, import_index_97c0af33.b)(calcRebalanceTrade(ticker))}
					</div>` : ``}`;
      })}</div>
	`;
    }();
  }(customerPositions.init(customerId))}</div>`;
});
const U5Bidu5D = (0, import_index_97c0af33.c)(($$result, $$props, $$bindings, slots) => {
  let activeTab;
  let $$unsubscribe_customer;
  let $page, $$unsubscribe_page;
  $$unsubscribe_customer = (0, import_index_97c0af33.a)(import_customer_a2cf2775.c, (value) => value);
  $$unsubscribe_page = (0, import_index_97c0af33.a)(import_stores_e0bdf7e0.p, (value) => $page = value);
  const id = $page.params.id;
  const isNew = id === "new";
  const tabs = ["Details", "Open Positions", "Trades"];
  activeTab = tabs[0];
  $$unsubscribe_customer();
  $$unsubscribe_page();
  return `<div class="${"prose flex"}">${(0, import_index_97c0af33.v)(import_BackButton_4d75e523.B, "BackButton").$$render($$result, {}, {}, {})}
	<h1 class="${"mb-0"}">${(0, import_index_97c0af33.b)(isNew ? "Add new " : "Edit ")} customer</h1></div>

${!isNew ? `<div class="${"tabs mb-6"}">${(0, import_index_97c0af33.e)(tabs, (tab) => {
    return `<a class="${["tab tab-lg tab-bordered", activeTab === tab ? "tab-active" : ""].join(" ").trim()}"${(0, import_index_97c0af33.d)("href", `#tab-${tab}`, 0)}>${(0, import_index_97c0af33.b)(tab)}</a>`;
  })}</div>` : ``}

${activeTab === "Details" ? `<div class="${"prose"}"><h1>Details</h1></div>
	${function(__value) {
    if ((0, import_index_97c0af33.i)(__value)) {
      __value.then(null, import_index_97c0af33.n);
      return `
		<p>Loading customer...</p>
	`;
    }
    return function() {
      return `
		${``}
	`;
    }();
  }(import_customer_a2cf2775.c.init(id))}` : ``}

${activeTab === "Open Positions" ? `<div class="${"prose"}"><h1>Open Positions</h1></div>
	${(0, import_index_97c0af33.v)(CustomerPositions, "CustomerPositions").$$render($$result, { customerId: id }, {}, {})}` : ``}

${activeTab === "Trades" ? `<div class="${"prose"}"><h1>Trades</h1></div>
	${(0, import_index_97c0af33.v)(CustomerTrades, "CustomerTrades").$$render($$result, { customerId: id }, {}, {})}` : ``}`;
});
