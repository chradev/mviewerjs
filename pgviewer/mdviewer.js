function getParameterByName(name) {
	var url = window.location.href;
	var regex = new RegExp("[?&]" + name.replace(/[\[\]]/g, "\\$&") + "(=([^&#]*)|&|#|$)");
	var results = regex.exec(url);

	if(!results) { return null; }
	if(results[2] === '') { return null; }
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var xmlHttp = null;
var fileName = getParameterByName('file');
var title = getParameterByName('title');
if(title !== null) { document.title = title; }
if(fileName === null) {
	var path = window.location.pathname;
	fileName = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
	if(fileName === path) {
		fileName = 'index';
	}
}
else { document.title += ": " + fileName + '.md';}
if(window.XMLHttpRequest) {
	// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlHttp = new XMLHttpRequest();
} else {
	// code for IE6, IE5
	xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
}
xmlHttp.onreadystatechange = function() {
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		document.getElementById('content').innerHTML = xmlHttp.responseText;
		var strapDownScriptElement = document.createElement('script');
		strapDownScriptElement.setAttribute('src', '../libs/markdown/strapdown.js?' + new Date().getTime());
		document.head.appendChild(strapDownScriptElement);
		document.getElementById('loading').style.display = 'none';
	}
};
xmlHttp.open('GET', fileName + '.md?' + new Date().getTime(), true);
xmlHttp.send();

