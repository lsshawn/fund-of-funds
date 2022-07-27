var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  b: () => buildArgs,
  q: () => queryAPI,
  u: () => unixToDate
});
module.exports = __toCommonJS(stdin_exports);
var import_axios = __toESM(require("axios"));
const API_URL = "https://097brqmr39.execute-api.ap-southeast-1.amazonaws.com/prod/graphql";
function unixToDate(unix) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(unix).toLocaleDateString("en-SG", options);
}
const queryAPI = async (query, operationName) => {
  const header = {
    headers: {
      Authorization: `Bearer `,
      "Content-Type": "application/json"
    }
  };
  const json = {
    statusCode: 400,
    data: {}
  };
  try {
    const res = await import_axios.default.post(API_URL, { query }, header);
    json.statusCode = res.status;
    json.data = res.data.data[operationName];
    if (res.data.errors) {
      json.statusCode = 422;
      json.errors = res.data.errors.map((obj) => obj.message);
    }
  } catch (err) {
    console.log(`Error in Graph API: ${err}`);
    json.data = err.message;
    json.error = err;
  }
  return json;
};
const buildArgs = (json, withoutSurroundingBrackets) => {
  let str = JSON.stringify(json).replace(/"(\w+)"\s*:/g, "$1:");
  if (withoutSurroundingBrackets)
    str = str.slice(1, -1);
  return str;
};
