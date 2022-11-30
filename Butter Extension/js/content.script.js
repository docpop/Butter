var bvar, copyText;
window.addEventListener('load', (event) => {
	chrome.runtime.sendMessage({message: "getSnakbarStyles"});
	if(window.location.href.match("=") != null){
		chrome.runtime.sendMessage({message: "matchedURL"});
	}else{
		chrome.runtime.sendMessage({message: "unmatchedURL"});
	}
});

function getURLStub(){
	if(window.location.href.match(/=/g) != null){
		navigator.clipboard.writeText(window.location.href.split("=")[0]+"=butts");
		var divElement = document.createElement('DIV');
		var p1Element = document.createElement('p');
		var p2Element = document.createElement('p');
		divElement.id = "snackbarDiv";
		p1Element.innerText = "Copied URL: "+window.location.href.split("=")[0]+"=butts";
		p2Element.innerText = "Please test the new URL before sharing.";
		divElement.appendChild(p1Element);
		divElement.appendChild(p2Element);
		document.body.appendChild(divElement);
		snackbarSlide();
	}	
}

function appendSnackbar(){
	var path = chrome.runtime.getURL('./css/snackbar.css');
	$('head').append($('<link>')
	.attr("rel", "stylesheet")
	.attr("type", "text/css")
	.attr("href", path));
}

function snackbarSlide() {
  var x = document.getElementById("snackbarDiv");
  x.className = "show";
  setTimeout( function(){ x.remove(); }, 3500);
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(request.message == "getURLStub"){
			getURLStub();
		}
		if(request.message == "setSnakbarStyles"){
			appendSnackbar();
		}
	}
);
