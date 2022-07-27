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
  h: () => headers
});
module.exports = __toCommonJS(stdin_exports);
const headers = [
  {
    name: "Created date",
    value: "createdDate",
    formatDate: true
  },
  {
    name: "Asset",
    value: "asset.ticker"
  },
  {
    name: "Asset Type",
    value: "asset.type",
    "class": "capitalize"
  },
  {
    name: "Trade Type",
    value: "tradeType",
    "class": "capitalize"
  },
  {
    name: "Currency",
    value: "currency"
  },
  {
    name: "Quantity",
    value: "quantity",
    "class": "text-right",
    isNumber: true
  },
  {
    name: "Price",
    value: "price",
    "class": "text-right",
    isNumber: true
  },
  {
    name: "Value ($)",
    value: "value",
    "class": "text-right",
    isNumber: true
  },
  {
    name: "Trade Date",
    value: "tradeDate",
    "class": "text-right",
    formatDate: true
  },
  {
    name: "Customer",
    value: "customer.firstName"
  }
];
