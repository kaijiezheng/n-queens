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

// var getNRooksSolutions = function(board, columns, row, solutions) {
//   if (row < board.length) {
//     if (columns.length === 0) return;
//     var temp = JSON.stringify(board);

//     _.each(columns, function(col, ind) {
//       var b = new Board(JSON.parse(temp));
//       var pos = columns.slice();
//       pos.splice(ind, 1);
//       b.togglePiece(row, col);

//       getNRooksSolutions(b.rows(), pos, row + 1, solutions);
//     });
//   } else {
//     solutions.push(board);
//   }
// };

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutions = [];
  var solutionCount = 0;

  var getNRooksSolutions = function(board, columns, rownum) {
    if (rownum < n) {
      if (columns.length === 0) return;
      var temp = board.slice();
      
      _.each(columns, function(col, ind, columns) {
        var pos = columns.slice();
        if (pos.length === 1) {
          pos = [];
        } else {
          pos.splice(ind, 1);
        }
        temp[rownum] = col;
        getNRooksSolutions(temp, pos, rownum + 1);
      });
    } else {
      // var boardTwo = [];
      // var boardThree = [];
      // var boardFour = [];
      // _.each(board, function(col, row) {
      //   console.log(col, row, n-1-row, n-1-col);
      //   boardTwo[col] = n-1-row;
      //   boardThree[n-1-row] = n-1-col;
      //   boardFour[n-1-col] = row;
      // });
      solutions.push(board);
    }
  };

  getNRooksSolutions([], _.range(n), 0);
  solutionCount = solutions.length;
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
      var temp = board.slice();
      
      _.each(columns, function(col, ind, columns) {
        var pos = columns.slice();
        if (pos.length === 1) {
          pos = [];
        } else {
          pos.splice(ind, 1);
        }
        temp[rownum] = col;
        getNRooksSolutions(temp, pos, rownum + 1);
      });
    } else {
      solutions.push(board);
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

  var getNRooksSolutions = function(board, columns, rownum) {
    if (rownum < n) {
      if (columns.length === 0) return;
      var temp = board.slice();
      
      _.each(columns, function(col, ind, columns) {
        var pos = columns.slice();
        if (pos.length === 1) {
          pos = [];
        } else {
          pos.splice(ind, 1);
        }
        temp[rownum] = col;
        getNRooksSolutions(temp, pos, rownum + 1);
      });
    } else {
      solutions.push(board);
    }
  };

  getNRooksSolutions([], _.range(n), 0);

  _.each(solutions, function(sol) {
    var board = new Board({'n': n});
    _.each(sol, function(col, row) {
      board.togglePiece(row, col);
    });
    if (!board.hasAnyQueensConflicts()) {
      boards.push(board.rows());
    }
  });

  solutionCount = boards.length;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
