const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

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

suite("Unit Tests", () => {
  test("Logic handles a valid puzzle string of 81 characters", () => {
    assert.equal(solver.validate(puzzle), true);
  });
  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
    assert.equal(solver.validate(puzzleWithInvalidChar), "invalid chars found");
  });
  test("Logic handles a puzzle string that is not 81 characters in length", () => {
    assert.equal(solver.validate(puzzleLessChar), "less than 81");

    assert.equal(solver.validate(puzzleMoreChar), "greater than 81");
  });
  test("Logic handles a valid row placement", () => {
    assert.equal(solver.checkRowPlacement(puzzle, "A", 4, 3), true);
    assert.equal(solver.checkRowPlacement(puzzle, "A", 3, 5), true);
  });
  test("Logic handles an invalid row placement", () => {
    assert.equal(solver.checkRowPlacement(puzzle, "A", 4, 5), false);
  });
  test("Logic handles a valid column placement", () => {
    assert.equal(solver.checkColPlacement(puzzle, "B", 1, 5), true);
    assert.equal(solver.checkColPlacement(puzzle, "B", 2, 1), true);
  });
  test("Logic handles an invalid column placement", () => {
    assert.equal(solver.checkColPlacement(puzzle, "B", 2, 2), false);
    assert.equal(solver.checkColPlacement(puzzle, "C", 4, 6), false);
  });
  test("Logic handles a valid region (3x3 grid) placement", () => {
    assert.equal(solver.checkRegionPlacement(puzzle, "A", 4, 7), true);
    assert.equal(solver.checkRegionPlacement(puzzle, "G", 3, 3), true);
    assert.equal(solver.checkRegionPlacement(puzzle, "I", 2, 6), true);
    assert.equal(solver.checkRegionPlacement(puzzle, "I", 9, 5), true);
    assert.equal(solver.checkRegionPlacement(puzzle, "F", 6, 5), true);
    assert.equal(solver.checkRegionPlacement(puzzle, "B", 9, 7), true);
  });
  test("Logic handles an invalid region (3x3 grid) placement", () => {
    assert.equal(solver.checkRegionPlacement(puzzle, "B", 8, 7), false);
    assert.equal(solver.checkRegionPlacement(puzzle, "E", 8, 9), false);
    assert.equal(solver.checkRegionPlacement(puzzle, "F", 6, 3), false);
    assert.equal(solver.checkRegionPlacement(puzzle, "I", 9, 9), false);
    assert.equal(solver.checkRegionPlacement(puzzle, "H", 1, 7), false);
    assert.equal(solver.checkRegionPlacement(puzzle, "D", 8, 7), false);
  });
  test("Valid puzzle strings pass the solver", () => {
    assert.equal(solver.solve(puzzle), solution);
  });
  test("Invalid puzzle strings fail the solver", () => {
    assert.equal(solver.solve(invalidPuzzle), "invalid string");
  });
  test("Solver returns the expected solution for an incomplete puzzle", () => {
    assert.equal(solver.solve(puzzle), solution);
  });
});
