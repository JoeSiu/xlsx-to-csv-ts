import { it, expect } from "vitest";
import { convertXlsxToCsv } from "../src";

it("output csv", async () => {
  expect(async () => {
    await convertXlsxToCsv({
      inputFile: "./public/source/sample.xlsx",
      outputDir: "./public/",
    });
  }).not.toThrowError();
});

it("output fitered csv (all column)", async () => {
  expect(async () => {
    await convertXlsxToCsv({
      inputFile: "./public/source/sample.xlsx",
      outputFilename: "sample-filtered-all",
      outputDir: "./public/generated/",
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
      inputFile: "./public/source/sample.xlsx",
      outputFilename: "sample-filtered-selected",
      outputDir: "./public/generated/",
      filter: {
        Product: "product",
        Sales: "sales",
      },
    });
  }).not.toThrowError();
});

it("output fitered csv (complex data with commas)", async () => {
  expect(async () => {
    await convertXlsxToCsv({
      inputFile: "./public/source/sample-complex.xlsx",
      outputFilename: "sample-complex-filtered",
      outputDir: "./public/generated/",
      filter: {
        Order: "order",
        Family: "family",
        "IOC_14.1": "scientific",
        English: "en",
        Catalan: "ca",
        Chinese: "zh-hans",
        "Chinese (Traditional)": "zh-hant",
        Croatian: "hr",
        Czech: "cs",
        Danish: "da",
        Dutch: "nl",
        Finnish: "fi",
        French: "fr",
        German: "de",
        Italian: "it",
        Japanese: "ja",
        Lithuanian: "lt",
        Norwegian: "no",
        Polish: "pl",
        "Portuguese (Lusophone)": "pt-lu",
        "Portuguese (Portuguese)": "pt-pt",
        Russian: "ru",
        Serbian: "sr",
        Slovak: "sk",
        Spanish: "es",
        Swedish: "sv",
        Turkish: "tr",
        Ukrainian: "uk",
        Afrikaans: "af",
        Arabic: "ar",
        Belarusian: "be",
        Bulgarian: "bg",
        Estonian: "et",
        Greek: "el",
        Hebrew: "he",
        Hungarian: "hu",
        Icelandic: "is",
        Indonesian: "in",
        Korean: "ko",
        Latvian: "lv",
        Macedonian: "mk",
        Malayalam: "ms",
        "Northern Sami": "se",
        Persian: "fa",
        Romanian: "ro",
        Slovenian: "sl",
        Thai: "th",
      },
    });
  }).not.toThrowError();
});

it("non xlsx file provided", async () => {
  expect(async () => {
    await convertXlsxToCsv({
      inputFile: "./public/source/sample.csv",
      outputDir: "./public/",
    });
  }).rejects.toThrowError();
});
