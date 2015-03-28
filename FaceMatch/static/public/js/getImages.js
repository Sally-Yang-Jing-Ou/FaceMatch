function httpGet() {

	var url = 'http://localhost:5000/pairs';
	$.getJSON(url, function (data) {
		$('#right-image').attr('src', data.right);
	}
}