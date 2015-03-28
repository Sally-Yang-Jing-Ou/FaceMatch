  function yesVotes(id)
{
    id.innerText= "1234 Votes";
    var noButton = document.getElementById("noButton");
    noButton.innerText="33 Votes";
    console.log(id);

    //var heart = document.getElementById("heart");
    $("#heart").animate({
    	marginTop: "60px"
    }, 800,"easeOutBounce", function(){

    });

    id.disabled=true;
    noButton.disabled=true;

    httpGet();

}

function noVotes(id)
{
    id.innerText= "453 Votes";
    var yesButton = document.getElementById("yesButton");
    yesButton.innerText="753 Votes";
    console.log("Yes votes" + id);

    //var crying = document.getElementById("crying");
     $("#crying").animate({
    	marginTop: "60px"
    }, 800, "easeOutBounce", function(){

    });
    id.disabled=true;
    yesButton.disabled=true;
}

function httpGet() {

	var url = 'http://localhost:5000/pairs';
	$.getJSON(url, function (data) {
		$('#right-image').attr('src', data.right);
	});
}

