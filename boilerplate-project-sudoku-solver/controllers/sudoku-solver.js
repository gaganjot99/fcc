class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.length < 81) {
      return "less than 81";
    }
    if (puzzleString.length > 81) {
      return "greater than 81";
    }
    let puzzlearray = puzzleString.split("");
    if (!puzzlearray.every((element) => /[1-9.]/.test(element))) {
      return "invalid chars found";
    }
    return true;
  }

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

  solve(puzzleString) {
    let puzzlearray = puzzleString.split("");
    for (let i = 0; i < puzzlearray.length; i++) {
      let element = puzzlearray[i];
      if (element == ".") {
        continue;
      }
      let row = "ABCDEFGHI"[Math.floor(i / 9)];
      let col = (i % 9) + 1;
      if (
        this.checkRowPlacement(puzzleString, row, col, element) &&
        this.checkColPlacement(puzzleString, row, col, element) &&
        this.checkRegionPlacement(puzzleString, row, col, element)
      ) {
        continue;
      } else {
        return "invalid string";
      }
    }

    let f1 = this.checkRowPlacement;
    let f2 = this.checkColPlacement;
    let f3 = this.checkRegionPlacement;

    function backtrac(arr) {
      for (let i = 0; i < 81; i++) {
        if (arr[i] == ".") {
          let row = "ABCDEFGHI"[Math.floor(i / 9)];
          let col = (i % 9) + 1;
          for (let j = 1; j <= 9; j++) {
            if (
              f1(arr.join(""), row, col, j) &&
              f2(arr.join(""), row, col, j) &&
              f3(arr.join(""), row, col, j)
            ) {
              arr[i] = j;
              if (backtrac(arr)) {
                return true;
              } else {
                arr[i] = ".";
              }
            }
          }
          return false;
        }
      }
      return true;
    }
    backtrac(puzzlearray);
    return puzzlearray.join("");
  }
}

module.exports = SudokuSolver;
