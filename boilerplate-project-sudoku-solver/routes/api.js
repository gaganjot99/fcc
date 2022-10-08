"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    let puzzle = req.body.puzzle;
    let cord = req.body.coordinate;
    let value = req.body.value;
    if (puzzle == undefined || cord == undefined || value == undefined) {
      return res.status(200).json({ error: "Required field(s) missing" });
    }
    if (solver.validate(puzzle) !== true) {
      return res.status(200).json({ error: solver.validate(puzzle) });
    }
    if (!/^[A-I][1-9]$/.test(cord)) {
      return res.status(200).json({ error: "Invalid coordinate" });
    }
    if (!/^[1-9]$/.test(value)) {
      return res.status(200).json({ error: "Invalid value" });
    }
    let conflict = [];
    if (!solver.checkRowPlacement(puzzle, cord[0], cord[1], value)) {
      conflict.push("row");
    }
    if (!solver.checkColPlacement(puzzle, cord[0], cord[1], value)) {
      conflict.push("column");
    }
    if (!solver.checkRegionPlacement(puzzle, cord[0], cord[1], value)) {
      conflict.push("region");
    }

    if (conflict.length < 1) {
      return res.status(200).json({ valid: true });
    } else {
      res.status(200).json({ valid: false, conflict });
    }
  });

  app.route("/api/solve").post((req, res) => {
    let puzzle = req.body.puzzle;
    if (!puzzle) {
      return res.status(200).json({ error: "Required field missing" });
    }
    if (solver.validate(puzzle) !== true) {
      return res.status(200).json({ error: solver.validate(puzzle) });
    }
    let solvedPuzzle = solver.solve(puzzle);
    if (solvedPuzzle == "Puzzle cannot be solved") {
      return res.status(200).json({ error: solvedPuzzle });
    }
    res.status(200).json({ solution: solvedPuzzle });
  });
};
