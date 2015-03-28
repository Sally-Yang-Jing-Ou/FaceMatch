function getMatches(yes_or_no) {
    
}

function yesVotes(id) {
  var result = getMatches(0);
  $("#noButton").text(result[0] + " votes");
  $("#yesButton").text(result[1] + " votes");
  console.log(id);

  $("#heart").animate({
    marginTop: "60px"
  }, 800,"easeOutBounce");

  id.disabled=true;
  noButton.disabled=true;

  updatePair();
}

function noVotes(id) {
  var result = getMatches(0);
  id.innerText =  + " votes";
  var yesButton = document.getElementById("yesButton");
  yesButton.innerText="753 Votes";
  console.log("Yes votes" + id);

  //var crying = document.getElementById("crying");
  $("#crying").animate({marginTop: "60px"}, 800, "easeOutBounce");
  id.disabled=true;
  yesButton.disabled=true;
}

function updatePair() {
  var url = 'http://localhost:5000/pairs';
  $.getJSON(url, function (data) { $('#left-image').attr('src', data.left); });
  $.getJSON(url, function (data) { $('#right-image').attr('src', data.right); });
}

