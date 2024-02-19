import * as xlsx from "xlsx";
import * as fs from "fs";
import path from "path";

interface Filter {
  [key: string]: string;
}

interface ConvertOptions {
  inputFile: string;
  outputDir: string;
  outputFilename?: string;
  filter?: Filter;
}

interface ConvertResult {
  outputPath: string;
}

export async function convertXlsxToCsv(
  options: ConvertOptions,
): Promise<ConvertResult> {
  return new Promise((resolve, reject) => {
    try {
      const { inputFile, outputDir, outputFilename, filter } = options;

      // check if the file is an XLSX file
      if (!inputFile.endsWith(".xlsx")) {
        reject(new Error("The input file must be an XLSX file"));
      }

      // read the XLSX file and get the first worksheet
      const workbook = xlsx.readFile(inputFile);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // convert the XLSX to CSV
      let csv = xlsx.utils.sheet_to_csv(worksheet);

      // if filter is provided, rename the header row and remove unwanted columns
      if (filter) {
        // split the CSV by line
        const lines = csv.split("\n");

        // get the original header row and split by comma
        const header = lines[0].split(",");

        // create a new header row and a map of column indices to keep
        let newHeader = "";
        const columnsToKeep = new Map<number, boolean>();

        // iterate over the original header and check if it matches any key in the filter object
        for (let col = 0; col < header.length; col++) {
          const key = header[col];
          if (filter.hasOwnProperty(key)) {
            // if yes, append the corresponding value to the new header and mark the column index to keep
            newHeader += `${filter[key]},`;
            columnsToKeep.set(col, true);
          }
        }

        // remove the trailing comma from the new header
        newHeader = newHeader.slice(0, -1);

        // create a new CSV with only the columns to keep
        let newCsv = "";

        // iterate over the lines and split by comma
        for (let row = 0; row < lines.length; row++) {
          // replace the first line of the CSV with the new header
          if (row === 0) {
            newCsv += `${newHeader}\n`;
            continue;
          }

          const values = lines[row].split(",");

          // create a new line with only the values from the columns to keep
          let newLine = "";

          // iterate over the values and check the column index
          for (let i = 0; i < values.length; i++) {
            if (columnsToKeep.has(i)) {
              // if the column index is marked to keep, append the value to the new line
              newLine += `${values[i]},`;
            }
          }

          // remove the trailing comma from the new line
          newLine = newLine.slice(0, -1);

          // append the new line to the new CSV
          newCsv += `${newLine}\n`;
        }

        // replace the CSV with the new CSV
        csv = newCsv;
      }

      // create a new file
      const outputFile = `${path.join(
        outputDir,
        outputFilename ?? path.basename(inputFile, ".xlsx"),
      )}.csv`;

      // write the CSV content to the new file
      fs.writeFileSync(outputFile, csv);

      // get the output path of the new file
      const outputPath = path.resolve(outputFile);

      resolve({
        outputPath: outputPath,
      });
    } catch (error) {
      reject(error);
    }
  });
}
