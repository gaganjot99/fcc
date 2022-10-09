"use strict";

const Translator = require("../components/translator.js");
const translate = new Translator();

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    let text = req.body.text;
    let locale = req.body.locale;
    if (text == undefined || locale == undefined) {
      return res.status(200).json({ error: "Required field(s) missing" });
    }
    if (text === "") {
      return res.status(200).json({ error: "No text to translate" });
    }
    if (locale === "american-to-british") {
      let newText = translate.americanToBritish(text);
      if (newText == text) {
        return res
          .status(200)
          .json({ text, translation: "Everything looks good to me!" });
      }
      return res
        .status(200)
        .json({ text, translation: translate.americanToBritish(text) });
    }
    if (locale === "british-to-american") {
      let newText = translate.britishToAmerican(text);
      if (newText == text) {
        return res
          .status(200)
          .json({ text, translation: "Everything looks good to me!" });
      }
      return res
        .status(200)
        .json({ text, translation: translate.britishToAmerican(text) });
    }
    res.status(200).json({ error: "Invalid value for locale field" });
  });
};
