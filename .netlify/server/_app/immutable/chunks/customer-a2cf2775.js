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
  a: () => customers,
  b: () => customerAutocomplete,
  c: () => customer
});
module.exports = __toCommonJS(stdin_exports);
var import_index_cfaf7702 = require("./index-cfaf7702.js");
var import_utils_1e640007 = require("./utils-1e640007.js");
const responseSchema = `
_id
firstName
lastName
email
`;
function customersStore() {
  const { subscribe, set, update } = (0, import_index_cfaf7702.w)([]);
  return {
    subscribe,
    reset: () => set([]),
    init: async () => {
      const queryName = "customerGetMany";
      const res = await (0, import_utils_1e640007.q)(
        `{
            ${queryName} {
              ${responseSchema}
            }
        }`,
        queryName
      );
      set(res.data);
    }
  };
}
function customerStore() {
  const { subscribe, set, update } = (0, import_index_cfaf7702.w)({});
  return {
    subscribe,
    reset: () => set({}),
    init: async (_id) => {
      if (!_id || _id === "new") {
        set({});
        return;
      }
      const queryName = "customerGet";
      const res = await (0, import_utils_1e640007.q)(
        `{
            ${queryName}(_id: "${_id}") {
              ${responseSchema}
            }
        }`,
        queryName
      );
      if (res.error || res.errors) {
        throw new Error(res);
      }
      set({ ...res.data });
    },
    update: async (obj) => {
      const queryName = "customerUpdate";
      const res = await (0, import_utils_1e640007.q)(
        `mutation {
            ${queryName}(${(0, import_utils_1e640007.b)({ obj }, true)}) {
              _id
              email
              firstName
              lastName
            }
        }`,
        queryName
      );
      if (res.statusCode === 200 && res.data) {
        set({ ...res.data });
      }
      return res;
    },
    create: async (obj) => {
      const queryName = "customerCreate";
      const res = await (0, import_utils_1e640007.q)(
        `mutation {
            ${queryName}(${(0, import_utils_1e640007.b)({ obj }, true)}) {
              ${responseSchema}
            }
        }`,
        queryName
      );
      if (res.statusCode === 200 && res.data) {
        set({ ...res.data });
      }
      return res;
    }
  };
}
function customerAutocompleteStore() {
  const { subscribe, set, update } = (0, import_index_cfaf7702.w)([]);
  return {
    subscribe,
    reset: () => set([]),
    search: async (firstName) => {
      const queryName = "customerAutocomplete";
      const res = await (0, import_utils_1e640007.q)(
        `{
            ${queryName}(firstName: "${firstName}") {
              _id firstName email
            }
        }`,
        queryName
      );
      set(res.data);
    }
  };
}
const customers = customersStore();
const customer = customerStore();
const customerAutocomplete = customerAutocompleteStore();
