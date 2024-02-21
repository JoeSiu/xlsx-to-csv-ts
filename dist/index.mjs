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
import * as xlsx from "xlsx";
import * as fs from "fs";
import path from "path";
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
        const outputFile = `${path.join(
          outputDir,
          outputFilename != null ? outputFilename : path.basename(inputFile, ".xlsx")
        )}.csv`;
        fs.writeFileSync(outputFile, csv);
        const outputPath = path.resolve(outputFile);
        resolve({
          outputPath
        });
      } catch (error) {
        reject(error);
      }
    });
  });
}
export {
  convertXlsxToCsv
};
//# sourceMappingURL=index.mjs.map