//keep track of whose turn it is
(function() {
  var currentPlayer = "player1"; //starts with payer one
  var winnerBoard = $("#winner-board");
  var playAgain = $("#play-again");
  winnerBoard.hide();

  $(".column").on("click", function(e) {
    var clickedColumn = $(e.currentTarget);
    var slotsInColumn = clickedColumn.find(".slot"); //finds all elements with .slot class
    var markedSlot;

    var addedInRow = -1;
    for (var i = 5; i >= 0; i--) {
      var slot = slotsInColumn.eq(i);
      if (isSlotEmpty(slot)) {
        addedInRow = i;
        markedSlot = slot;
        slot.addClass(currentPlayer);
        break;
      }
    }
    if (addedInRow == -1) {
      return; // column was full
    }
    var rowName = ".row" + addedInRow; //row0, row1, row2, ...
    var slotsInRow = $(rowName);
    var slotClassNames = markedSlot.attr("class").split(" ");
    var slotsInUpDiagonal; // undefined
    var slotsInDownDiagonal; // undefined

    for (var j = 0; j < slotClassNames.length; j++) {
      var className = slotClassNames[j];
      if (className.startsWith("up")) {
        slotsInUpDiagonal = $("." + className);
      } else if (className.startsWith("down")) {
        slotsInDownDiagonal = $("." + className);
      }
    }
    if (
      checkForVictory(slotsInColumn) ||
      checkForVictory(slotsInRow) ||
      checkForVictory(slotsInUpDiagonal) ||
      checkForVictory(slotsInDownDiagonal)
    ) {
      if (currentPlayer == "player1") {
        winnerBoard.show().css("background-color", "black") &&
          playAgain.css("background-color", "black");
        playAgain
          .mouseenter(function() {
            playAgain.css("background", "white");
            playAgain.css("color", "black");
          })
          .mouseleave(function() {
            playAgain.css("background", "black");
            playAgain.css("color", "white");
          });
      } else if (currentPlayer == "player2") {
        winnerBoard.show().css("background-color", "grey") &&
          playAgain.css("background-color", "grey");
        playAgain
          .mouseenter(function() {
            playAgain.css("background", "white");
            playAgain.css("color", "grey");
          })
          .mouseleave(function() {
            playAgain.css("background", "grey");
            playAgain.css("color", "white");
          });
      }
    } else {
      switchPlayers();
    }

    playAgain.on("click", function() {
      $(".slot").removeClass("player1 player2");
      winnerBoard.hide();
      switchPlayers();
    });
  });

  function isSlotEmpty(slot) {
    var hasPlayer1 = slot.hasClass("player1");
    var hasPlayer2 = slot.hasClass("player2");
    return !(hasPlayer1 || hasPlayer2);
  }

  function checkForVictory(slots) {
    var count = 0;
    if (slots == null) {
      return false;
    }
    for (var i = 0; i < slots.length; i++) {
      if (slots.eq(i).hasClass(currentPlayer)) {
        count++;
        if (count == 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  }

  function switchPlayers() {
    if (currentPlayer == "player1") {
      currentPlayer = "player2";
    } else {
      currentPlayer = "player1";
    }
  }
})();
