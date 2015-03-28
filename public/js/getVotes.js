  function yesVotes(id)
{
    id.innerText= "1234 Votes";
    document.getElementById("noButton").innerText="33 Votes";
    console.log("Yes votes" + id);

    var heart = document.getElementById("heart");
    heart.style.opacity = 1;
}

function noVotes(id)
{
    id.innerText= "453 Votes";
    document.getElementById("yesButton").innerText="753 Votes";
    console.log("Yes votes" + id);
}

