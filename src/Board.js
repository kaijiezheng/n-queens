// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // If more than one square in the row is occupied, returns true
      var num = _.reduce(this.get(rowIndex), function(memo, item) {
        return memo + item;
      }, 0);

      return num > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // Uses hasRowConflictAt for every row on the board
      // Returns true if any row has a conflict
      var result = false;
      for (var i = 0, len = this.rows().length; i < len; i++) {
        result = result || this.hasRowConflictAt(i);
      }
      return result;
      // implementation below may require to save a reference to the board
      // return _.any(this.rows(), function(row, ind) {
      //   return hasRowConflictAt(ind) === true;
      // });
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // Iterate through all columns, check colIndex in each row
      var num = _.reduce(this.rows(), function(memo, row) {
        return memo + row[colIndex];
      }, 0);

      return num > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var result = false;
      for (var i = 0, len = this.rows().length; i < len; i++) {
        result = result ||this.hasColConflictAt(i);
      }
      return result;
      // implementation below may require to save a reference to the board
      // return _.any(this.rows(), function() {
      //   return hasColConflictAt(colIndex);
      // })
      // return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // majorDiagonalColumnIndexAtFirstRow ranges from -n+1 to n-1
      // number of items to check equals n - math.abs(MDCIAFR)

      // MDCIAFR >= 0
        // start search at row = 0, col = MDCIAFR
      // MDCIAFR < 0
        // start search at row = math.abs(MDCIAFR) col = 0

      // want to increase col and row indices by 1 each time
      // check this.get(row)[col] and this.get(row+1)[col+1]
      var num = 0;
      var size = this.rows().length;

      var colnum = majorDiagonalColumnIndexAtFirstRow < 0 ? 0 : majorDiagonalColumnIndexAtFirstRow;
      var rownum = majorDiagonalColumnIndexAtFirstRow < 0 ? Math.abs(majorDiagonalColumnIndexAtFirstRow) : 0;

      for (; rownum < size && colnum < size; rownum++, colnum++) {
        num += this.get(rownum)[colnum];
      }

      return num > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // should check with indices -n+1 to n-1
      var result = false;
      for (var i = 0, len = this.rows().length; i < len; i++) {
        result = result || this.hasMajorDiagonalConflictAt(i)|| this.hasMajorDiagonalConflictAt(-i);
      }

      return result;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // minorDiagonalColumnIndexAtFirstRow ranges from 0 to 2(n-1)
      // number of items to check equals n - math.abs(MDCIAFR)

      // MDCIAFR >= 0
        // start search at row = 0, col = MDCIAFR
      // MDCIAFR < 0
        // start search at row = math.abs(MDCIAFR) col = 0

      // want to decrease col and increase row indices by 1 each time
      // check this.get(row)[col] and this.get(row+1)[col-1]

      var num = 0;
      var size = this.rows().length;

      var colnum = minorDiagonalColumnIndexAtFirstRow >= size ? size - 1 : minorDiagonalColumnIndexAtFirstRow;
      var rownum = minorDiagonalColumnIndexAtFirstRow >= size ? minorDiagonalColumnIndexAtFirstRow - size + 1 : 0;

      for (; rownum < size && colnum >= 0; rownum++, colnum--) {
        num += this.get(rownum)[colnum];
      }

      return num > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // should check with indices 0 to 2(n-1)
      var result = false;
      for (var i = 0, len = 2*(this.rows().length - 1); i < len; i++) {
        result = result || this.hasMinorDiagonalConflictAt(i);
      }
      return result;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
