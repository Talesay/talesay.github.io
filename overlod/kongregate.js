/*global kongregate, kongregateAPI, onComplete*/
window.kongregate = '';
kongregateAPI.loadAPI(onComplete);

// Callback function
function onComplete() {
	// Set the global kongregate API object
	kongregate = kongregateAPI.getAPI();
}