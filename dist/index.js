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
function convertXlsxToCsv(options) {
  return __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      try {
        const { inputFile, outputDir, outputFilename, filter } = options;
        if (!inputFile.endsWith(".xlsx")) {
          throw new Error("The input file must be an XLSX file");
        }
        const workbook = xlsx.readFile(inputFile);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let csv = xlsx.utils.sheet_to_csv(worksheet);
        if (filter) {
          const lines = csv.split("\n");
          const header = lines[0].split(",");
          let newHeader = "";
          const columnsToKeep = /* @__PURE__ */ new Map();
          for (let col = 0; col < header.length; col++) {
            const key = header[col];
            if (filter.hasOwnProperty(key)) {
              newHeader += `${filter[key]},`;
              columnsToKeep.set(col, true);
              if (key !== filter[key]) {
                console.info(
                  `The column "${key}" has been renamed to "${filter[key]}"`
                );
              }
            } else {
              console.info(
                `The column "${key}" is not listed in the filter object and will be removed`
              );
            }
          }
          newHeader = newHeader.slice(0, -1);
          console.info(`The header has been updated to: ${newHeader}`);
          let newCsv = "";
          for (let row = 0; row < lines.length; row++) {
            if (row === 0) {
              newCsv += `${newHeader}
`;
              continue;
            }
            const values = lines[row].split(",");
            let newLine = "";
            for (let i = 0; i < values.length; i++) {
              if (columnsToKeep.has(i)) {
                newLine += `${values[i]},`;
              }
            }
            newLine = newLine.slice(0, -1);
            newCsv += `${newLine}
`;
          }
          csv = newCsv;
        }
        const outputFile = `${import_path.default.join(
          outputDir,
          outputFilename != null ? outputFilename : import_path.default.basename(inputFile, ".xlsx")
        )}.csv`;
        fs.writeFileSync(outputFile, csv);
        const outputPath = import_path.default.resolve(outputFile);
        console.info(`Output file: ${outputPath}`);
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