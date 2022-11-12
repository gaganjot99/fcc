const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  let tempThreadId = 0;
  let tempReplyId = 0;
  test("Creating a new thread: POST request to /api/threads/{board}", function (done) {
    chai
      .request(server)
      .post("/api/threads/main")
      .send({
        text: "test text",
        delete_password: "1234",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "success");
      });
    chai
      .request(server)
      .post("/api/threads/main")
      .send({
        text: "test text 1",
        delete_password: "1234",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "success");
        done();
      });
  });
  test("Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}", function (done) {
    chai
      .request(server)
      .get("/api/threads/main")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        tempThreadId = res.body[0]._id;
        done();
      });
  });
  test("Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password", function (done) {
    chai
      .request(server)
      .delete("/api/threads/main")
      .send({ thread_id: tempThreadId, delete_password: "3sdf" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "incorrect password");
        done();
      });
  });
  test("Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password", function (done) {
    chai
      .request(server)
      .delete("/api/threads/main")
      .send({ thread_id: tempThreadId, delete_password: "1234" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "success");
        done();
      });
  });
  test("Reporting a thread: PUT request to /api/threads/{board}", function (done) {
    chai
      .request(server)
      .put("/api/threads/main")
      .send({ thread_id: tempThreadId + 1 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });
  test("Creating a new reply: POST request to /api/replies/{board}", function (done) {
    chai
      .request(server)
      .post("/api/replies/main")
      .send({
        thread_id: tempThreadId + 1,
        text: "test text",
        delete_password: "1234",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "success");
        done();
      });
  });
  test("Viewing a single thread with all replies: GET request to /api/replies/{board}", function (done) {
    chai
      .request(server)
      .get("/api/replies/main?thread_id=" + (tempThreadId + 1))
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        tempReplyId = res.body.replies[0]._id;
        done();
      });
  });
  test("Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password", function (done) {
    chai
      .request(server)
      .delete("/api/replies/main")
      .send({
        thread_id: tempThreadId + 1,
        reply_id: tempReplyId,
        delete_password: "12sc",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "incorrect password");
        done();
      });
  });
  test("Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password", function (done) {
    chai
      .request(server)
      .delete("/api/replies/main")
      .send({
        thread_id: tempThreadId + 1,
        reply_id: tempReplyId,
        delete_password: "1234",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "success");
        done();
      });
  });
  test("Reporting a reply: PUT request to /api/replies/{board}", function (done) {
    chai
      .request(server)
      .put("/api/replies/main")
      .send({ thread_id: tempThreadId + 1, reply_id: tempReplyId })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "reported");
        done();
      });
  });
});
