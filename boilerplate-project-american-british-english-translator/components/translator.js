const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  americanToBritish(string) {
    let stringArr = string;
    for (let spell in americanOnly) {
      let re = new RegExp(`${spell}([. ])`, "gi");
      stringArr = stringArr.replace(
        re,
        `<span class="highlight">${americanOnly[spell]}</span>$1`
      );
    }
    for (let spell in americanToBritishSpelling) {
      let re = new RegExp(`${spell}([. ])`, "gi");
      stringArr = stringArr.replace(
        re,
        `<span class="highlight">${americanToBritishSpelling[spell]}</span>$1`
      );
    }
    for (let spell in americanToBritishTitles) {
      let re = new RegExp(`${spell}([. ])`, "gi");
      stringArr = stringArr.replace(
        re,
        `<span class="highlight">${americanToBritishTitles[spell]}</span>$1`
      );
    }
    let newArr = stringArr.split(" ").map((element) => {
      if (/^[0-9]+:[0-9]+$/.test(element)) {
        return `<span class="highlight">${element.replace(":", ".")}</span>`;
      }
      return element;
    });

    return newArr.join(" ");
  }
  britishToAmerican(string) {
    let stringArr = string;
    for (let spell in britishOnly) {
      let re = new RegExp(`${spell}([. ])`, "gi");
      stringArr = stringArr.replace(
        re,
        `<span class="highlight">${britishOnly[spell]}</span>$1`
      );
    }
    for (let spell in americanToBritishSpelling) {
      let re = new RegExp(`${americanToBritishSpelling[spell]}([. ])`, "gi");
      stringArr = stringArr.replace(
        re,
        `<span class="highlight">${spell}</span>$1`
      );
    }
    for (let spell in americanToBritishTitles) {
      let re = new RegExp(`${americanToBritishTitles[spell]}([. ])`, "gi");
      stringArr = stringArr.replace(
        re,
        `<span class="highlight">${spell}</span>$1`
      );
    }
    let newArr = stringArr.split(" ").map((element) => {
      if (/^[0-9]+.[0-9]+[.]*$/.test(element)) {
        if (element[element.length - 1] == ".") {
          return `<span class="highlight">${element
            .replace(".", ":")
            .replace(".", "")}</span>.`;
        }
        return `<span class="highlight">${element.replace(".", ":")}</span>`;
      }
      return element;
    });

    return newArr.join(" ");
  }
}

module.exports = Translator;
