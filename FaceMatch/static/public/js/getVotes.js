function updateMatches(yes_or_no) {
  $.getJSON("/matches?left=" + encodeURIComponent($('#left-image').attr("src")) +
                    "&right=" + encodeURIComponent($('#right-image').attr("src")) +
                    "&yes_or_no=" + yes_or_no, function (data) {
    $("#noButton").text(data.chose_no + " votes").prop("disabled", true);
    $("#yesButton").text(data.chose_yes + " votes").prop("disabled", true);
    updatePair();
  });
}

function yesVotes() {
  $("#heart").animate({marginTop: "60px"}, 800, "easeOutBounce", function() { updateMatches(1); });
}

function noVotes() {
  $("#crying").animate({marginTop: "60px"}, 800, "easeOutBounce", function() { updateMatches(0); });
}

function updatePair() {
  $.getJSON("/pairs", function (data) {
    $('#left-image').attr('src', data.left);
    $('#right-image').attr('src', data.right);
    $("#noButton").text("NO").enable();
    $("#yesButton").text("YES").enable();
  });
}
