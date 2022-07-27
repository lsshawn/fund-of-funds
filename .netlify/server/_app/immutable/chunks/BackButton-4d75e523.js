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
  B: () => BackButton
});
module.exports = __toCommonJS(stdin_exports);
var import_index_97c0af33 = require("./index-97c0af33.js");
const ChevronLeft = (0, import_index_97c0af33.c)(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"h-6 w-6"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}" stroke-width="${"2"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" d="${"M15 19l-7-7 7-7"}"></path></svg>`;
});
const BackButton = (0, import_index_97c0af33.c)(($$result, $$props, $$bindings, slots) => {
  return `<button class="${"mb-8 btn btn-circle btn-link text-gray-900 mr-2"}">${(0, import_index_97c0af33.v)(ChevronLeft, "ChevronLeft").$$render($$result, {}, {}, {})}</button>`;
});
