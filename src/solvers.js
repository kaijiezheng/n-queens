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

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutions = [];
  var solutionCount = 0;

  var columns = Math.pow(2, n) - 1;

  var getNRooksSolutions = function(board, columns, rownum) {
    // can replace rownum with board.length
    if (rownum < n) {
      if (columns === 0) return;
      var binary = columns.toString(2);
      for (var i = binary.length - 1, j = 0; i >= 0; i--, j++) {
        if (binary[i] === '1') {
          board.push(j);
          getNRooksSolutions(board, columns^(1 << j), rownum+1);
          board.pop();
        }
      }
    } else if (board.length === n) {
      // solutions.push(board.slice());
      solutionCount++;
    }
  };

  getNRooksSolutions([], columns, 0);
  // solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var solutions = [];


  var getNRooksSolutions = function(board, columns, rownum) {
    if (rownum < n) {
      if (columns.length === 0) return;
      _.each(columns, function(col, ind, columns) {
        board.push(col);
        var pos = columns.slice();
        if (pos.length === 1) {
          pos = [];
        } else {
          pos.splice(ind, 1);
        }
        getNRooksSolutions(board, pos, rownum + 1);
        board.pop();
      });
    } else {
      solutions.push(board.slice());
    }
  };

  getNRooksSolutions([], _.range(n), 0);

  _.find(solutions, function(sol) {
    var board = new Board({'n': n});
      _.each(sol, function(col, row) {
        board.togglePiece(row, col);
      });
    if (!board.hasAnyQueensConflicts()) {
      solution = board.rows();
      return true;
    }
  });

  solution = solution || (new Board({'n': n})).rows();
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutions = [];
  var boards = [];
  var solutionCount = 0;

  var getNQueensSolutions = function(board, columns, major, minor, rownum) {
    // can replace rownum with board.length
    if (rownum < n) {
      if (columns & major & minor === 0) return;
      var binary = (columns & major & minor).toString(2);
      console.log(binary);
      for (var i = binary.length - 1, j = 0; i >= 0; i--, j++) {
        if (binary[i] === '1') {
          board.push(j);
          var piece = (1 << j);
          getNQueensSolutions(board, columns^(1 << j), columns^piece, major << 1 | 1 & ~(piece << 1), minor >> 1 | farLeftOne & ~(piece >> 1), rownum+1);
          board.pop();
        }
      }
    } else if (board.length === n && n !== 0) {
      // solutions.push(board.slice());
      solutionCount++;
    }
  };

  var columns = Math.pow(2, n) - 1;

  getNQueensSolutions([], columns, columns, columns, 0);

  // _.each(solutions, function(sol) {
  //   var board = new Board({'n': n});
  //   _.each(sol, function(col, row) {
  //     board.togglePiece(row, col);
  //   });
  //   if (!board.hasAnyQueensConflicts()) {
  //     boards.push(board.rows());
  //   }
  // });

  // solutionCount = boards.length;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
