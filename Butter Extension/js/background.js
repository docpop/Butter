chrome.storage.local.set({
  "disableIcon": true 
}, () => {});
chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      "message": 'getURLStub'
    });
  });
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(request.message == "matchedURL"){
			chrome.action.setIcon({path:"../img/enabled_icon-38.png"}, () => {});
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
      });
			chrome.storage.local.set({
			  "disableIcon": false 
			}, () => {});			
		}
		if(request.message == "unmatchedURL"){
			chrome.action.setIcon({path:"../img/disabled_icon-38.png"}, () => {});
			chrome.storage.local.set({
			  "disableIcon": true 
			}, () => {});	
		}
		if(request.message == "getSnakbarStyles"){
		  chrome.tabs.query({
		    active: true,
		    currentWindow: true
		  }, function(tabs) {
		    chrome.tabs.sendMessage(tabs[0].id, {
		      "message": 'setSnakbarStyles'
		    });
		  });			
		}
	}
);

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab){
		if(tab.url.match("=") != null){
			chrome.action.setIcon({path:"../img/enabled_icon-38.png"}, () => {});
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
      });
			chrome.storage.local.set({
			  "disableIcon": false 
			}, () => {});			
		}else{
			chrome.action.setIcon({path:"../img/disabled_icon-38.png"}, () => {});
			chrome.storage.local.set({
			  "disableIcon": true 
			}, () => {});	
		}
  });
}); 