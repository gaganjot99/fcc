/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!
   */
  test("#example Test GET /api/books", function (done) {
    chai
      .request(server)
      .get("/api/books")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, "response should be an array");
        assert.property(
          res.body[0],
          "commentcount",
          "Books in array should contain commentcount"
        );
        assert.property(
          res.body[0],
          "title",
          "Books in array should contain title"
        );
        assert.property(
          res.body[0],
          "_id",
          "Books in array should contain _id"
        );
        done();
      });
  });
  /*
   * ----[END of EXAMPLE TEST]----
   */

  suite("Routing tests", function () {
    let tempId = "";
    suite(
      "POST /api/books with title => create book object/expect book object",
      function () {
        test("Test POST /api/books with title", function (done) {
          chai
            .request(server)
            .post("/api/books")
            .send({ title: "The Book thief" })
            .end(function (err, doc) {
              assert.property(
                doc.body,
                "_id",
                "object should have an id property"
              );
              assert.property(
                doc.body,
                "title",
                "returned object should have a title"
              );
              tempId = doc.body._id;
              done();
            });
        });

        test("Test POST /api/books with no title given", function (done) {
          chai
            .request(server)
            .post("/api/books")
            .send({})
            .end(function (err, doc) {
              assert.equal(doc.status, 200);
              assert.equal(doc.text, "missing required field title");
              done();
            });
        });
      }
    );

    suite("GET /api/books => array of books", function () {
      test("Test GET /api/books", function (done) {
        chai
          .request(server)
          .get("/api/books")
          .end(function (err, doc) {
            assert.equal(doc.status, 200);
            assert.isArray(doc.body, "response should be an array");
            assert.property(
              doc.body[0],
              "commentcount",
              "Books in array should contain commentcount"
            );
            assert.property(
              doc.body[0],
              "title",
              "Books in array should contain title"
            );
            assert.property(
              doc.body[0],
              "_id",
              "Books in array should contain _id"
            );
            done();
          });
      });
    });

    suite("GET /api/books/[id] => book object with [id]", function () {
      test("Test GET /api/books/[id] with id not in db", function (done) {
        chai
          .request(server)
          .get("/api/books/" + "30489ldsfjal943")
          .end(function (err, doc) {
            assert.equal(doc.status, 200);
            assert.equal(doc.text, "no book exists");
            done();
          });
      });

      test("Test GET /api/books/[id] with valid id in db", function (done) {
        chai
          .request(server)
          .get("/api/books/" + tempId)
          .end(function (err, doc) {
            assert.equal(doc.status, 200);
            assert.property(doc.body, "title");
            assert.property(doc.body, "comments");
            assert.property(doc.body, "_id");
            done();
          });
      });
    });

    suite(
      "POST /api/books/[id] => add comment/expect book object with id",
      function () {
        test("Test POST /api/books/[id] with comment", function (done) {
          chai
            .request(server)
            .post("/api/books/" + tempId)
            .send({ comment: "Great Book!" })
            .end(function (err, doc) {
              assert.equal(doc.status, 200);
              assert.property(doc.body, "title");
              assert.property(doc.body, "comments");
              assert.property(doc.body, "_id");
              done();
            });
        });

        test("Test POST /api/books/[id] without comment field", function (done) {
          chai
            .request(server)
            .post("/api/books/" + tempId)
            .send({})
            .end(function (err, doc) {
              assert.equal(doc.status, 200);
              assert.equal(doc.text, "missing required field comment");
              done();
            });
        });

        test("Test POST /api/books/[id] with comment, id not in db", function (done) {
          chai
            .request(server)
            .post("/api/books/" + "2323i9430lsd4fs4342")
            .send({ comment: "Great Book!" })
            .end(function (err, doc) {
              assert.equal(doc.status, 200);
              assert.equal(doc.text, "no book exists");
              done();
            });
        });
      }
    );

    suite("DELETE /api/books/[id] => delete book object id", function () {
      test("Test DELETE /api/books/[id] with valid id in db", function (done) {
        chai
          .request(server)
          .delete("/api/books/" + tempId)
          .end(function (err, doc) {
            assert.equal(doc.status, 200);
            assert.equal(doc.text, "delete successful");
            done();
          });
      });

      test("Test DELETE /api/books/[id] with  id not in db", function (done) {
        chai
          .request(server)
          .delete("/api/books/" + "34j43k534k345jj345")
          .end(function (err, doc) {
            assert.equal(doc.status, 200);
            assert.equal(doc.text, "no book exists");
            done();
          });
      });
    });
  });
});
