const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test.skip("", function (done) {
    chai
      .request(server)
      .get()
      .end(function (err, res) {
        done();
      });
  });
});
