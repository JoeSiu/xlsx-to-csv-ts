import { it, expect } from "vitest";
import { convertXlsxToCsv } from "../src";

it("output csv", async () => {
  expect(async () => {
    await convertXlsxToCsv({
      inputFile: "./public/sample.xlsx",
      outputDir: "./public/",
    });
  }).not.toThrowError();
});

it("output fitered csv (all column)", async () => {
  expect(async () => {
    await convertXlsxToCsv({
      inputFile: "./public/sample.xlsx",
      outputFilename: "sample-filtered-all",
      outputDir: "./public/",
      filter: {
        Segment: "segment",
        Country: "country",
        Product: "product",
        "Discount Band": "discount-band",
        "Units Sold": "units-sold",
        "Manufacturing Price": "manufacturing-price",
        "Sale Price": "sale-price",
        "Gross Sales": "gross-sale",
        Discounts: "discounts",
        Sales: "sales",
        COGS: "cogs",
        Profit: "profit",
        Date: "date",
        "Month Number": "month-number",
        "Month Name": "month-name",
        Year: "year",
      },
    });
  }).not.toThrowError();
});

it("output fitered csv (selected column)", async () => {
  expect(async () => {
    await convertXlsxToCsv({
      inputFile: "./public/sample.xlsx",
      outputFilename: "sample-filtered-selected",
      outputDir: "./public/",
      filter: {
        Product: "product",
        Sales: "sales",
      },
    });
  }).not.toThrowError();
});

it("non xlsx file provided", async () => {
  expect(async () => {
    await convertXlsxToCsv({
      inputFile: "./public/sample.csv",
      outputDir: "./public/",
    });
  }).rejects.toThrowError();
});
