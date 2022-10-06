const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  let project = "project1";
  let tempId = ""; //will be updated on adding issue and used in deletion in the end

  test("Create an issue with every field: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/" + project)
      .send({
        issue_title: "Faux Issue Title",
        issue_text: "Functional Test - All Fields",
        created_by: "josh",
        assigned_to: "dolly",
        status_text: "hanji",
      })
      .end(function (err, doc) {
        if (err) {
          assert.fail("some error occured while posting data");
        }
        assert.equal(doc.status, 200);
        assert.property(doc.body, "_id");
        assert.property(doc.body, "issue_title");
        assert.property(doc.body, "issue_text");
        assert.property(doc.body, "created_by");
        assert.property(doc.body, "assigned_to");
        assert.property(doc.body, "open");
        tempId = doc.body._id;
        done();
      });
  });

  test("Create an issue with only required fields: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/" + project)
      .send({
        issue_title: "Faux Issue Title",
        issue_text: "Functional Test - All Fields",
        created_by: "josh",
      })
      .end(function (err, doc) {
        if (err) {
          assert.fail("could connect to server");
        }
        assert.equal(doc.status, 200);
        assert.property(doc.body, "_id");
        assert.property(doc.body, "issue_title");
        assert.property(doc.body, "issue_text");
        assert.property(doc.body, "created_by");
        assert.property(doc.body, "assigned_to");
        assert.property(doc.body, "open");
        done();
      });
  });

  test("Create an issue with missing required fields: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/" + project)
      .send({
        issue_title: "Faux Issue Title",
        issue_text: "Functional Test - All Fields",
      })
      .end(function (err, doc) {
        if (err) {
          assert.fail("could connect to server");
        }

        assert.deepEqual(doc.body, { error: "required field(s) missing" });
        done();
      });
  });

  test("View issues on a project: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/" + project)
      .end(function (err, doc) {
        if (err) {
          assert.fail("could connect to server");
        }
        assert.equal(doc.status, 200);
        assert.typeOf(doc.body, "array");
        for (let prop in doc.body) {
          assert.property(doc.body[prop], "_id");
          assert.property(doc.body[prop], "issue_title");
          assert.property(doc.body[prop], "issue_text");
          assert.property(doc.body[prop], "created_by");
          assert.property(doc.body[prop], "assigned_to");
          assert.property(doc.body[prop], "open");
        }
        done();
      });
  });

  test("View issues on a project with one filter: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/" + project + "?open=true")
      .end(function (err, doc) {
        if (err) {
          assert.fail("could connect to server");
        }
        assert.equal(doc.status, 200);
        assert.typeOf(doc.body, "array");
        for (let prop in doc.body) {
          assert.property(doc.body[prop], "_id");
          assert.property(doc.body[prop], "issue_title");
          assert.property(doc.body[prop], "issue_text");
          assert.property(doc.body[prop], "created_by");
          assert.property(doc.body[prop], "assigned_to");
          assert.equal(doc.body[prop]["open"], true);
        }
        done();
      });
  });
  test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/" + project + "?open=true&created_by=josh")
      .end(function (err, doc) {
        if (err) {
          assert.fail("could connect to server");
        }
        assert.equal(doc.status, 200);
        assert.typeOf(doc.body, "array");
        for (let prop in doc.body) {
          assert.property(doc.body[prop], "_id");
          assert.property(doc.body[prop], "issue_title");
          assert.property(doc.body[prop], "issue_text");
          assert.property(doc.body[prop], "assigned_to");
          assert.equal(doc.body[prop]["created_by"], "josh");
          assert.equal(doc.body[prop]["open"], true);
        }
        done();
      });
  });
  test("Update one field on an issue: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/" + project)
      .send({
        _id: "633e89731c69dece81daa706",
        assigned_to: "solver",
      })
      .end(function (err, doc) {
        if (err) {
          assert.fail("could connect to server");
        }
        assert.equal(doc.status, 200);
        assert.deepEqual(doc.body, {
          result: "successfully updated",
          _id: "633e89731c69dece81daa706",
        });
        done();
      });
  });
  test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/" + project)
      .send({
        _id: "633e89731c69dece81daa706",
        assigned_to: "solver",
        issue_text: "update text for the issue",
        open: false,
      })
      .end(function (err, doc) {
        if (err) {
          assert.fail("could connect to server");
        }
        assert.equal(doc.status, 200);
        assert.deepEqual(doc.body, {
          result: "successfully updated",
          _id: "633e89731c69dece81daa706",
        });
        done();
      });
  });
  test("Update an issue with missing _id: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/" + project)
      .send({
        assigned_to: "solver",
      })
      .end(function (err, doc) {
        if (err) {
          assert.fail("could connect to server");
        }
        assert.equal(doc.status, 200);
        assert.deepEqual(doc.body, { error: "missing _id" });
        done();
      });
  });
  test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/" + project)
      .send({
        _id: "633e89731c69dece81daa706",
      })
      .end(function (err, doc) {
        if (err) {
          assert.fail("could connect to server");
        }
        assert.equal(doc.status, 200);
        assert.deepEqual(doc.body, {
          error: "no update field(s) sent",
          _id: "633e89731c69dece81daa706",
        });
        done();
      });
  });
  test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/" + project)
      .send({
        _id: "633e89731c69dcce81daa706",
        assigned_to: "Bogsolver",
      })
      .end(function (err, doc) {
        if (err) {
          assert.fail("could connect to server");
        }
        assert.equal(doc.status, 200);
        assert.deepEqual(doc.body, {
          error: "could not update",
          _id: "633e89731c69dcce81daa706",
        });
        done();
      });
  });
  test("Delete an issue: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/" + project)
      .send({
        _id: tempId,
      })
      .end(function (err, doc) {
        if (err) {
          assert.fail("could connect to server");
        }
        assert.equal(doc.status, 200);
        assert.deepEqual(doc.body, {
          result: "successfully deleted",
          _id: tempId,
        });
        done();
      });
  });
  test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/" + project)
      .send({
        _id: "633e83431c69dcce81daa706",
      })
      .end(function (err, doc) {
        if (err) {
          assert.fail("could connect to server");
        }
        assert.equal(doc.status, 200);
        assert.deepEqual(doc.body, {
          error: "could not delete",
          _id: "633e83431c69dcce81daa706",
        });
        done();
      });
  });
  test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/" + project)
      .send()
      .end(function (err, doc) {
        if (err) {
          assert.fail("could connect to server");
        }
        assert.equal(doc.status, 200);
        assert.deepEqual(doc.body, { error: "missing _id" });
        done();
      });
  });
});
