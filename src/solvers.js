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
  var solution = new Board({'n': n});
  for (var i = 0; i < n; i++) {
    solution.togglePiece(i, i);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

var getNRooksSolutions = function(board, columns, row, solutions) {
  if (row < board.length) {
    if (columns.length === 0) return;
    var temp = JSON.stringify(board);

    _.each(columns, function(col, ind) {
      var b = new Board(JSON.parse(temp));
      var pos = columns.slice();
      pos.splice(ind, 1);
      b.togglePiece(row, col);

      getNRooksSolutions(b.rows(), pos, row + 1, solutions);
    });
  } else {
    solutions.push(board);
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutions = [];
  var solutionCount = 0;

  

  getNRooksSolutions((new Board({'n': n})).rows(), _.range(n), 0, solutions);
  solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var solutions = [];
  getNRooksSolutions((new Board({'n': n})).rows(), _.range(n), 0, solutions);

  solution = _.find(solutions, function(solution) {
    var board = new Board(solution);
    if (!board.hasAnyQueensConflicts()) return board.rows();
  });

  solution = solution || (new Board({'n': n})).rows();
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutions = [];
  var rooks = [];
  getNRooksSolutions((new Board({'n': n})).rows(), _.range(n), 0, rooks);

  _.each(rooks, function(solution) {
    var board = new Board(solution);
    if (!board.hasAnyQueensConflicts()) solutions.push(board.rows());
  });

  solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
