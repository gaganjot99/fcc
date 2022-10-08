class SudokuSolver {
  validate(puzzleString) {}

  checkRowPlacement(puzzleString, row, column, value) {
    let rowCord = [
      "ABCDEFGHI".indexOf(row) * 9,
      "ABCDEFGHI".indexOf(row) * 9 + 9,
    ];
    let tempString = puzzleString.substring(rowCord[0], rowCord[1]);
    if (tempString.includes(value)) {
      if (tempString[column - 1] == value) {
        return true;
      }
      return false;
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let rowCord = [
      "ABCDEFGHI".indexOf(row) * 9,
      "ABCDEFGHI".indexOf(row) * 9 + 9,
    ];
    for (let i = column - 1; i < puzzleString.length; i = i + 9) {
      if (puzzleString[i] == value) {
        if (i >= rowCord[0] && i < rowCord[1]) {
          return true;
        }
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let rowCord = [
      "ABCDEFGHI".indexOf(row) * 9,
      "ABCDEFGHI".indexOf(row) * 9 + 9,
    ];
    let region =
      Math.ceil(column / 3) +
      (Math.ceil(("ABCDEFGHI".indexOf(row) + 1) / 3) - 1) * 3;
    let startIndex = Math.floor((region - 1) / 3) * 3;
    for (let i = startIndex; i < startIndex + 3; i++) {
      for (
        let j = i * 9 + ((region - 1) % 3) * 3;
        j < i * 9 + ((region - 1) % 3) * 3 + 3;
        j++
      ) {
        if (puzzleString[j] == value) {
          if (j % 9 == column - 1 && j >= rowCord[0] && j < rowCord[1]) {
            return true;
          }
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
