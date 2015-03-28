function startGame() {
    $("#start-game").animate({
      top: '-150%',
      }, 1000, function(){
      complete();
    })

    $('#start-game').css('display: none');
}