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
  console.log(country)
  if (!country) {
    throw new Error(`Country ${countryName} not found`)
  }

  country.tags = country.tags.filter(tag => tag !== "South America")
  country.tags = country.tags.filter(tag => tag !== "North America")
  country.tags.push(tag)
  country.tags = [...new Set(country.tags)]
}

fs.writeFileSync("src/app/countries.json", JSON.stringify(countries, null, 2))