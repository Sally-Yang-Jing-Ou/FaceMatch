var leftImageLeftMargin;
var rightImageLeftMargin;

function transitionToNewMatch(){
	leftImageLeftMargin = $("#left-image-container").css("marginLeft");
	rightImageLeftMargin = $("#right-image-container").css("marginLeft");	
	removeCurrentMatch(function(){
		showNewMatch(function(){
			enableButtons();
		});
	});
}

function removeCurrentMatch(complete){
	$("#heart").animate({
		opacity: 0
	},1000, function(){
		$("#heart").css("marginTop", "-500px");
		$("#heart").css("opacity", 1);
	});
	$("#crying").animate({
		opacity: 0
	},1000, function(){
		$("#crying").css("marginTop", "-500px");
		$("#crying").css("opacity", 1);
	});

	$("#container").animate({marginLeft: "-550px", opacity: 0}, 1000, function() {
      $("#container").css({marginLeft: "550px"});
      complete();
    });
}

function showNewMatch(complete){
	updatePair();
	$("#container").animate({marginLeft: "0px", opacity: 1}, 1000, function(){
		enableButtons();
	});
}

function enableButtons(){
	$("#noButton").text("NO").prop("disabled", false);
    $("#yesButton").text("YES").prop("disabled", false);
}

function updatePair() {
  var url = 'http://localhost:5000/pairs';
  $.getJSON(url, function (data) { $('#left-image').attr('src', data.left); });
  $.getJSON(url, function (data) { $('#right-image').attr('src', data.right); });
}