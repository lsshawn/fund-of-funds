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
  D: () => DataTable,
  g: () => goto
});
module.exports = __toCommonJS(stdin_exports);
var import_index_97c0af33 = require("./index-97c0af33.js");
var import_utils_1e640007 = require("./utils-1e640007.js");
const DataTable = (0, import_index_97c0af33.c)(($$result, $$props, $$bindings, slots) => {
  let { headers = [] } = $$props;
  let { data = [] } = $$props;
  let { onRowClick = () => {
  } } = $$props;
  function formatValue(obj, header) {
    let value;
    if (header.value.includes(".")) {
      const splitted = header.value.split(".");
      if (!splitted)
        return "-";
      let tempValue = obj;
      for (let i = 0; i < splitted.length; i++) {
        const key = splitted[i];
        if (!tempValue[key]) {
          tempValue = "-";
          break;
        }
        tempValue = tempValue[key];
      }
      value = tempValue;
    } else {
      value = obj[header.value];
    }
    if (!value)
      return "-";
    if (header.formatDate) {
      return (0, import_utils_1e640007.u)(value);
    }
    if (header.isNumber) {
      const options = {
        minimumFractionDigits: header.decimal || 0
      };
      return value.toLocaleString("en-US", options);
    }
    return value;
  }
  if ($$props.headers === void 0 && $$bindings.headers && headers !== void 0)
    $$bindings.headers(headers);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.onRowClick === void 0 && $$bindings.onRowClick && onRowClick !== void 0)
    $$bindings.onRowClick(onRowClick);
  return `<div class="${"overflow-x-auto"}"><table class="${"table w-full table-compact"}"><thead class="${"border-none bg-base-100"}"><tr><th></th>
				${(0, import_index_97c0af33.e)(headers, (header) => {
    return `<th${(0, import_index_97c0af33.d)("class", `normal-case ${header.class || ""}`, 0)}>${(0, import_index_97c0af33.b)(header.name)}</th>`;
  })}</tr></thead>
		<tbody>${(0, import_index_97c0af33.e)(data, (obj, i) => {
    return `<tr class="${"hover"}"><th>${(0, import_index_97c0af33.b)(i + 1)}</th>
					${(0, import_index_97c0af33.e)(headers, (header) => {
      return `<td${(0, import_index_97c0af33.d)("class", header.class || "", 0)}>${(0, import_index_97c0af33.b)(formatValue(obj, header))} </td>`;
    })}
				</tr>`;
  })}</tbody></table>

	${!data.length ? `<p class="${"text-center mt-6 text-base-400"}">No data</p>` : ``}</div>`;
});
function guard(name) {
  return () => {
    throw new Error(`Cannot call ${name}(...) on the server`);
  };
}
const goto = guard("goto");
