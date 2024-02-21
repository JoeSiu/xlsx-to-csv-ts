"use strict";
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
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  convertXlsxToCsv: () => convertXlsxToCsv
});
module.exports = __toCommonJS(src_exports);
var xlsx = __toESM(require("xlsx"));
var fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
function convertXlsxToCsv(_0) {
  return __async(this, arguments, function* ({
    inputFile,
    outputDir = "./",
    outputFilename,
    filter
  }) {
    return new Promise((resolve, reject) => {
      try {
        if (!inputFile.endsWith(".xlsx")) {
          throw new Error("The input file must be an XLSX file");
        }
        const workbook = xlsx.readFile(inputFile);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let json = xlsx.utils.sheet_to_json(worksheet);
        if (filter) {
          let filteredJson = [];
          for (let obj of json) {
            let filteredObj = {};
            for (let key of Object.keys(filter)) {
              if (obj.hasOwnProperty(key)) {
                filteredObj[filter[key]] = obj[key];
              }
            }
            if (Object.keys(filteredObj).length > 0) {
              filteredJson.push(filteredObj);
            }
          }
          json = filteredJson;
        }
        let filteredWorksheet = xlsx.utils.json_to_sheet(json);
        let csv = xlsx.utils.sheet_to_csv(filteredWorksheet);
        const outputFile = `${import_path.default.join(
          outputDir,
          outputFilename != null ? outputFilename : import_path.default.basename(inputFile, ".xlsx")
        )}.csv`;
        fs.writeFileSync(outputFile, csv);
        const outputPath = import_path.default.resolve(outputFile);
        resolve({
          outputPath
        });
      } catch (error) {
        reject(error);
      }
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertXlsxToCsv
});
//# sourceMappingURL=index.js.map