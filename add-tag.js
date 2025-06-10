#!/usr/bin/env node

const countries = require("./src/app/countries.json")
const fs = require("fs")

const tag = "Western Europe"
const countryNames = [
    "Belgium",
    "France",
    "Germany",
    "Netherlands",
    "Switzerland",
    "United Kingdom",
    "Portugal",
    "Spain",
    "Italy",
    "Iceland",
]

for (const countryName of countryNames) {
  const country = countries.find(country => country.name === countryName);
  if (!country) {
    console.warn(`Country ${countryName} not found`)
    continue
  }

  country.tags.push(tag)
  country.tags = [...new Set(country.tags)]
}

fs.writeFileSync("src/app/countries.json", JSON.stringify(countries, null, 2))