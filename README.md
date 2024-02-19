# XLSX to CSV

> A simple script to convert .xlsx file to .csv file, with the ability to filter / rename columns.

[![NPM Version](https://img.shields.io/npm/v/xlsx-to-csv-ts)](https://www.npmjs.com/package/xlsx-to-csv-ts) [![GitHub Release](https://img.shields.io/github/v/release/JoeSiu/xlsx-to-csv-ts)](https://github.com/JoeSiu/xlsx-to-csv-ts/releases/latest) [![npm bundle size](https://img.shields.io/bundlephobia/min/xlsx-to-csv-ts)](https://www.npmjs.com/package/xlsx-to-csv-ts) [![MIT License](https://img.shields.io/badge/license-GPL-blue)](https://github.com/JoeSiu/xlsx-to-csv-ts/blob/main/LICENSE) [![Build Status](https://github.com/JoeSiu/xlsx-to-csv-ts/actions/workflows/ci.yaml/badge.svg)](https://github.com/JoeSiu/xlsx-to-csv-ts/actions/workflows/ci.yaml) [![GitHub Repo stars](https://img.shields.io/github/stars/JoeSiu/xlsx-to-csv-ts)](https://github.com/JoeSiu/xlsx-to-csv-ts)

## Introduction

A simple script to convert .xlsx file to .csv file, with the ability to filter / rename columns.

## Install

To install, run the following command in your terminal:

```bash
npm install xlsx-to-csv-ts
```

## Usage

### Import

To use `xlsx-to-csv-ts` in your Node.js project, you need to import it as follows:

```ts
import { convertXlsxToCsv } from "xlsx-to-csv-ts";
```

### Example

```ts
const result = await convertXlsxToCsv({
  inputFile: "./public/sample.xlsx",
  outputFilename: "sample-filtered",
  outputDir: "./public/",
  filter: { Segment: "segment", Country: "" },
});

console.log(result.outputPath)
```
