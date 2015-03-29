function startGame() {
    $("#start-game").animate({
      top: '-150%',
      }, 1000, function(){
    })

    $('#start-game').css('display: none');
}

function winner() {
	  $("#highscore").html('10!!!!');
      $('#message').html("Congrats! You're the ultimate K-pop matcher!");
      $('#losing-header').html('YOU MADE IT!');
      showGameOver(function(){});
}