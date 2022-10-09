const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

let textAtoB = "I ate yogurt for breakfast.";
let localeAtoB = "american-to-british";
let textNoTrans = "I ate yoghurt for breakfast.";

suite("Functional Tests", () => {
  test.skip("Translation with text and locale fields: POST request to /api/translate", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: textAtoB,
        locale: localeAtoB,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          text: textAtoB,
          translation:
            'I ate <span class="highlight">yoghurt</span> for breakfast.',
        });
        done();
      });
  });

  test.skip("Translation with text and invalid locale field: POST request to /api/translate", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: textAtoB,
        locale: "wrong-locale",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Invalid value for locale field" });
        done();
      });
  });
  test.skip("Translation with missing text field: POST request to /api/translate", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        locale: localeAtoB,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Required field(s) missing" });
        done();
      });
  });
  test.skip("Translation with missing locale field: POST request to /api/translate", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: textAtoB,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Required field(s) missing" });
        done();
      });
  });
  test.skip("Translation with empty text: POST request to /api/translate", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "",
        locale: localeAtoB,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "No text to translate" });
        done();
      });
  });
  test.skip("Translation with text that needs no translation: POST request to /api/translate", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: textNoTrans,
        locale: localeAtoB,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          text: textNoTrans,
          translation: "Everything looks good to me!",
        });
        done();
      });
  });
});
