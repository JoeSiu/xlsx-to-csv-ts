import { it, expect } from "vitest";
import { convertXlsxToCsv } from "../src";

it("output csv", async () => {
  expect(async () => {
    await convertXlsxToCsv({
      inputFile: "./public/sample.xlsx",
      outputFilename: "sample",
      outputDir: "./public/",
    });
  }).not.toThrowError();
});

it("output fitered csv", async () => {
  expect(async () => {
    const result = await convertXlsxToCsv({
      inputFile: "./public/sample.xlsx",
      outputFilename: "sample-filtered",
      outputDir: "./public/",
      filter: { Segment: "segment" },
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
