function httpGet(){
	var json = null;
    var url = "http://localhost:5000/pairs";
	json = new XMLHttpRequest ();
	json.open("GET", url, false);
}