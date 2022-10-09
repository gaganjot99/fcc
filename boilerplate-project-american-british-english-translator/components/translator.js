const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  americanToBritish(string) {
    const stringArr = string.split(" ");
    return stringArr.join("");
  }
  britishToAmerican(string) {
    const stringArr = string.split(" ");
    return stringArr.join("");
  }
}

module.exports = Translator;
