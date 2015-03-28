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

	$("#left-image-container").animate({
		marginLeft: "-420px",
		opacity: 0
	}, 1000, function(){
		$("#left-image-container").css("marginLeft", "1500px");
		$("#left-image-container").css("opacity", 1);
	});

	$("#right-image-container").animate({
		marginLeft: "-840px",
		opacity: 0
	}, 1000, function(){
		$("#right-image-container").css("marginLeft", "1000px");
		$("#right-image-container").css("opacity", 1);
		setTimeout(function(){
			complete();
		}, 100);
	});
}

function showNewMatch(complete){
	updatePair();
	$("#left-image-container").animate({
		marginLeft: leftImageLeftMargin
	}, 1000, function(){
	});

	$("#right-image-container").animate({
		marginLeft: rightImageLeftMargin
	}, 1000, function(){
		complete()
	});
}

function enableButtons(){
	var yesButton = document.getElementById("yesButton");
	var noButton = document.getElementById("noButton");

	yesButton.innerText = "YES";
	noButton.innerText = "NO";
	
	yesButton.disabled = false;
	noButton.disabled = false;
}

function updatePair() {
  var url = 'http://localhost:5000/pairs';
  $.getJSON(url, function (data) { $('#left-image').attr('src', data.left); });
  $.getJSON(url, function (data) { $('#right-image').attr('src', data.right); });
}