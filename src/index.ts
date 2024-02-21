import * as xlsx from "xlsx";
import * as fs from "fs";
import path from "path";

export interface Filter {
  [key: string]: string;
}

export interface ConvertOptions {
  inputFile: string;
  outputDir: string;
  outputFilename?: string;
  filter?: Filter;
}

export interface ConvertResult {
  outputPath: string;
}

export async function convertXlsxToCsv({
  inputFile,
  outputDir = "./",
  outputFilename,
  filter,
}: ConvertOptions): Promise<ConvertResult> {
  return new Promise((resolve, reject) => {
    try {
      // check if the file is an XLSX file
      if (!inputFile.endsWith(".xlsx")) {
        throw new Error("The input file must be an XLSX file");
      }

      // read the XLSX file and get the first worksheet
      const workbook = xlsx.readFile(inputFile);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // convert the XLSX to JSON
      let json: Record<string, any>[] = xlsx.utils.sheet_to_json(worksheet);

      // if filter is provided, rename the keys of the JSON objects and remove unwanted rows
      if (filter) {
        // create a new JSON array to store the filtered data
        let filteredJson = [];

        // iterate over the JSON objects
        for (let obj of json) {
          // create a new object to store the filtered data
          let filteredObj: Record<string, any> = {};

          // iterate over the keys of the filter object
          for (let key of Object.keys(filter)) {
            // check if the JSON object has the key
            if (obj.hasOwnProperty(key)) {
              // if yes, copy the value to the new object with the new key
              filteredObj[filter[key]] = obj[key];
            }
          }

          // check if the new object is not empty
          if (Object.keys(filteredObj).length > 0) {
            // if yes, push it to the filtered JSON array
            filteredJson.push(filteredObj);
          }
        }

        // replace the JSON with the filtered JSON
        json = filteredJson;
      }

      // convert the JSON to XLSX
      let filteredWorksheet = xlsx.utils.json_to_sheet(json);

      // convert the XLSX to CSV
      let csv = xlsx.utils.sheet_to_csv(filteredWorksheet);

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
