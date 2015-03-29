var totalWin = 0;
function updateMatches(yes_or_no) {
  $.getJSON("/matches?left=" + encodeURIComponent($('#left-image').attr("src")) +
                    "&right=" + encodeURIComponent($('#right-image').attr("src")) +
                    "&yes_or_no=" + yes_or_no, function (data) {
    $("#noButton").text(data.chose_no + " Votes").prop("disabled", true);
    $("#yesButton").text(data.chose_yes + " Votes").prop("disabled", true);

    if((data.chose_yes >= data.chose_no && yes_or_no == 1) || (data.chose_no >= data.chose_yes && yes_or_no == 0)){
      //Win
      totalWin ++;
      $("#score").html(totalWin);
      if(yes_or_no == 1){
        $("#heart").animate({marginTop: "60px"}, 800, "easeOutBounce", function() {transitionToNewMatch(true);});
      }else{
        $("#crying").animate({marginTop: "60px"}, 800, "easeOutBounce", function() {transitionToNewMatch(false);});
      }
    }else{
      //Lose
      $("#highscore").html(totalWin);
      showGameOver(function(){});
    }
  });
}

function yesVotes() {
  updateMatches(1);
}

function noVotes() {
  updateMatches(0);
}

function playAgain() {
  //window.location.reload();
  totalWin = 0;
  resetPlayingField();
  removeGameOver(function(){});
}

function resetPlayingField() {
  $.getJSON("/pairs", function (data) {
    $('#left-image').attr('src', data.left);
    $('#right-image').attr('src', data.right);
    $('#left-background-1').css('backgroundImage', 'url("'+data.left+'")');
    $('#right-background-1').css('backgroundImage', 'url("'+data.right+'")');
    enableButtons();
    $("#score").html(totalWin);
  });
}