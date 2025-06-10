#!/usr/bin/env node

const countries = require("./src/app/countries.json")
const fs = require("fs")

const tag = "Eastern Europe"
const countryNames = [
    "Belarus",
    "Bosnia and Herzegovina",
    "Bulgaria",
    "Czech Republic",
    "Georgia",
    "Hungary",
    "Moldova",
    "North Macedonia",
    "Poland",
    "Romania",
    "Russia",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Ukraine",
    "Albania",
    "Armenia",
    "Azerbaijan",
    "Kosovo",
    "Montenegro",
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