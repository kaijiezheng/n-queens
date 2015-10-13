/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting
// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // naive solution to pass spec
  var solution = new Board({'n': n});
  for (var i = 0; i < n; i++) {
    solution.togglePiece(i, i);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutions = [];
  var solutionCount = 0;

  var full = Math.pow(2, n) - 1;

  var getNRooksSolutions = function(board, columns) {
    if (board.length < n) {
      var binary = columns.toString(2);
      if (binary === '0') return;
      for (var i = binary.length - 1, j = 0; i >= 0; i--, j++) {
        if (binary[i] === '1') {
          board.push(j);
          getNRooksSolutions(board, columns^(1 << j));
          board.pop();
        }
      }
    } else if (board.length === n) {
      solutionCount++;
    }
  };

  getNRooksSolutions([], full);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutions = [];
  var solution;
  var farLeftOne = (1 << n-1);
  var full = Math.pow(2, n) - 1;

  var getNQueensSolutions = function(board, columns, major, minor) {
    if (board.length < n) {
      var binary = (columns & major & minor).toString(2);
      if (columns & major & minor === '0') return;
      for (var i = binary.length - 1, j = 0; i >= 0; i--, j++) {
        if (binary[i] === '1') {
          board.push(j);
          var piece = (1 << j);
          getNQueensSolutions(board, columns^piece, (major^piece) << 1 & full | 1, (minor^piece) >> 1 | farLeftOne);
          board.pop();
        }
      }
    } else if (board.length === n) {
      solutions.push(board.slice());
    }
  };

  getNQueensSolutions([], full, full, full);

  var board = new Board({'n': n});
  _.each(solutions[0], function(col, row) {
    board.togglePiece(row, col);
  });

  solution = board.rows();
  solution = solution || (new Board({'n': n})).rows();
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var farLeftOne = (1 << n-1);
  var full = Math.pow(2, n) - 1;

  var getNQueensSolutions = function(board, columns, major, minor) {
    if (board.length < n) {
      var binary = (columns & major & minor).toString(2);
      if (columns & major & minor === '0') return;
      for (var i = binary.length - 1, j = 0; i >= 0; i--, j++) {
        if (binary[i] === '1') {
          board.push(j);
          var piece = (1 << j);
          getNQueensSolutions(board, columns^piece, (major^piece) << 1 & full | 1, (minor^piece) >> 1 | farLeftOne);
          board.pop();
        }
      }
    } else if (board.length === n) {
      solutionCount++;
    }
  };

  getNQueensSolutions([], full, full, full);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
