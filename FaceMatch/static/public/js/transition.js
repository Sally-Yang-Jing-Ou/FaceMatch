var leftImageLeftMargin;
var rightImageLeftMargin;

function transitionToNewMatch(inward) {
  leftImageLeftMargin = $("#left-image-container").css("marginLeft");
  rightImageLeftMargin = $("#right-image-container").css("marginLeft");
  
  $("#heart").animate({opacity: 0}, 1000, function() { $("#heart").css("marginTop", "-500px").css("opacity", 1); });
  $("#crying").animate({opacity: 0},1000, function() { $("#crying").css("marginTop", "-500px").css("opacity", 1); });

  if (inward) {
    $("#left").animate({left: "100px", opacity: 0}, 400, function() {
      $("#left").css({left: "-500px"});
      showNewMatch();
    });
    $("#right").animate({right: "100px", opacity: 0}, 400, function() { $("#right").css({right: "-500px"}); });
  } else {
    $("#left").animate({left: "-500px", opacity: 0}, 400, showNewMatch);
    $("#right").animate({right: "-500px", opacity: 0}, 400);
  }
}

function showNewMatch() {
  updatePair();
  $("#left").animate({left: "0px", opacity: 1}, 500, function(){
    $("#noButton").text("NO").prop("disabled", false);
    $("#yesButton").text("YES").prop("disabled", false);
  });
  $("#right").animate({right: "0px", opacity: 1}, 500);
}

function updatePair() {
  var url = 'http://localhost:5000/pairs';
  $.getJSON(url, function (data) { $('#left-image').attr('src', data.left); });
  $.getJSON(url, function (data) { $('#right-image').attr('src', data.right); });
}