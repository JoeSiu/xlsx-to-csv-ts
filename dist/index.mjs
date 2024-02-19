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
            }
          }
          newHeader = newHeader.slice(0, -1);
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