const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

const puzzle =
  "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";

/* representation of above valid sudoku string

        1  2  3  4  5  6  7  8  9
       
    A   1  .  5  .  .  2  .  8  4
    B   .  .  6  3  .  1  2  .  7
    C   .  2  .  .  5  .  .  .  .
    D   .  9  .  .  1  .  .  .  .
    E   8  .  2  .  3  6  7  4  .
    F   3  .  7  .  2  .  .  9  .
    G   4  7  .  .  .  8  .  .  1
    H   .  .  1  6  .  .  .  .  9
    I   2  6  9  1  4  .  3  7  .
  
  */

const solution =
  "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
const puzzleWithInvalidChar =
  "1.5..2.8R..63.12.7.2..5..H..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
const puzzleLessChar =
  "1.5..2.84..63.12.7.2..5....3674.3.7.2..9.47...8..1..16....926914.37.";
const puzzleMoreChar =
  "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....9269.34.2.3423...14.37.";

const invalidPuzzle =
  "155..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";

suite("Functional Tests", function () {
  this.timeout(5000);

  test("Solve a puzzle with valid puzzle string: POST request to /api/solve", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({ puzzle })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { solution });
        done();
      });
  });
  test("Solve a puzzle with missing puzzle string: POST request to /api/solve", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send()
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Required field missing" });
        done();
      });
  });
  test("Solve a puzzle with invalid characters: POST request to /api/solve", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({ puzzle: puzzleWithInvalidChar })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Invalid characters in puzzle" });
        done();
      });
  });
  test("Solve a puzzle with incorrect length: POST request to /api/solve", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({ puzzle: puzzleLessChar })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          error: "Expected puzzle to be 81 characters long",
        });
        done();
      });
  });
  test("Solve a puzzle that cannot be solved: POST request to /api/solve", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({ puzzle: invalidPuzzle })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Puzzle cannot be solved" });
        done();
      });
  });
  test("Check a puzzle placement with all fields: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, coordinate: "A2", value: 3 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { valid: true });
        done();
      });
  });
  test("Check a puzzle placement with single placement conflict: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, coordinate: "B2", value: 3 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { valid: false, conflict: ["row"] });
        done();
      });
  });
  test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, coordinate: "B1", value: 3 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          valid: false,
          conflict: ["row", "column"],
        });
        done();
      });
  });
  test("Check a puzzle placement with all placement conflicts: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, coordinate: "E2", value: 7 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          valid: false,
          conflict: ["row", "column", "region"],
        });
        done();
      });
  });
  test("Check a puzzle placement with missing required fields: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, coordinate: "E2" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Required field(s) missing" });
        done();
      });
  });
  test("Check a puzzle placement with invalid characters: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle: puzzleWithInvalidChar, coordinate: "E2", value: 7 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Invalid characters in puzzle" });
        done();
      });
  });
  test("Check a puzzle placement with incorrect length: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle: puzzleMoreChar, coordinate: "E2", value: 7 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          error: "Expected puzzle to be 81 characters long",
        });
        done();
      });
  });
  test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, coordinate: "E0", value: 7 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Invalid coordinate" });
        done();
      });
  });
  test("Check a puzzle placement with invalid placement value: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, coordinate: "E2", value: 0 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Invalid value" });
        done();
      });
  });
});
