
function pushNeutral() {
  $("#left").stop().animate({marginLeft: "0"}, 200);
  $("#right").stop().animate({marginRight: "0"}, 200);
}

function pushIn(yes_or_no) {
  if (yes_or_no) {
    $("#left").stop().animate({marginLeft: "30px"}, 200);
    $("#right").stop().animate({marginRight: "30px"}, 200);
  } else {
    $("#left").stop().animate({marginLeft: "-30px"}, 200);
    $("#right").stop().animate({marginRight: "-30px"}, 200);
  }
}

function transitionToNewMatch(inward) {  
  removeCurrentMatch(inward, function(){
  	updatePair(function(){
		showNewMatch(function(){
			enableButtons();
			switchBackgrounds();
		});
	});
  })
}

function removeCurrentMatch(inward, complete){
  $("#heart").animate({opacity: 0}, 500, function() { $("#heart").css("marginTop", "-500px").css("opacity", 1); });
  $("#crying").animate({opacity: 0},500, function() { $("#crying").css("marginTop", "-500px").css("opacity", 1); });

  if (inward) {
    $("#left").animate({left: "100px", opacity: 0}, 400, function() {
      $("#left").css({left: "-500px"});
    });
    $("#right").animate({right: "100px", opacity: 0}, 400, function() { 
    	$("#right").css({right: "-500px"}); 
    	complete();
    });
  } else {
    $("#left").animate({left: "-500px", opacity: 0}, 400, function(){});
    $("#right").animate({right: "-500px", opacity: 0}, 400, function(){
    	complete();
    });
  }

	$("#left-background-1").animate({
		opacity: 0
	}, 900, function(){});

	$("#right-background-1").animate({
		opacity: 0
	}, 900, function(){});
}

function showNewMatch(complete){
	$("#left-background-2").animate({
		opacity: 1
	}, 500, function(){});

	$("#right-background-2").animate({
		opacity: 1
	}, 500, function(){});

	$("#left").animate({left: "0px", opacity: 1}, 500, function(){
		complete();
	});
  	$("#right").animate({right: "0px", opacity: 1}, 500);
}

function enableButtons(){
	$("#noButton").text("NO").prop("disabled", false);
    $("#yesButton").text("YES").prop("disabled", false);
}

function switchBackgrounds(){
	var leftUrl = $('#left-background-2').css('backgroundImage');
	var rightUrl = $('#right-background-2').css('backgroundImage');
	console.log(leftUrl);
	$('#left-background-1').css('backgroundImage', leftUrl);
    $('#right-background-1').css('backgroundImage', rightUrl);
    $('#left-background-1').css('opacity', 1);
    $('#right-background-1').css('opacity', 1);
    $('#left-background-2').css('opacity', 0);
    $('#right-background-2').css('opacity', 0);
}

function updatePair(complete) {
  $.getJSON("/pairs", function (data) {
    $('#left-image').css('backgroundImage', 'url("'+data.left+'")');
    $('#right-image').css('backgroundImage', 'url("'+data.right+'")');
    $('#left-background-2').css('backgroundImage', 'url("'+data.left+'")');
    $('#right-background-2').css('backgroundImage', 'url("'+data.right+'")');
    complete();
  });
}

function showGameOver(complete) {
	$("#losing-screen").animate({
		top: 0,
		opacity: 1
	}, 1000, "easeOutBounce", function(){
		complete();
	})
}

function removeGameOver(complete) {
	$("#losing-screen").animate({
		top: '-150%',
	}, 1000, function(){
		complete();
	})
}