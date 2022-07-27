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
  default: () => Routes
});
module.exports = __toCommonJS(stdin_exports);
var import_index_97c0af33 = require("../../_app/immutable/chunks/index-97c0af33.js");
const Routes = (0, import_index_97c0af33.c)(($$result, $$props, $$bindings, slots) => {
  return `<div><div class="${"prose"}"><h1 class="${"mb-6"}">Dashboard</h1></div>
	<div class="${"stats shadow"}"><div class="${"stat"}"><div class="${"stat-title"}">Asset Under Management</div>
			<div class="${"stat-value"}">$ 510,000</div>
			<div class="${"stat-desc"}">Monthly change: 21%</div></div>

		<div class="${"stat"}"><div class="${"stat-title"}">Customers</div>
			<div class="${"stat-value"}">4,200</div>
			<div class="${"stat-desc"}">\u2197\uFE0E 40 (2%)</div></div>

		<div class="${"stat"}"><div class="${"stat-title"}">New Sign-ups This Month</div>
			<div class="${"stat-value"}">1,200</div>
			<div class="${"stat-desc"}">\u2197\uFE0E 90 (14%)</div></div></div></div>`;
});
