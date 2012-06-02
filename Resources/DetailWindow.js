DetailWindow = function(controller, options) {
	var that = this;
	that.initialized = false;
	that.appController = controller;
	
	
	that.open();

	return that;
}

DetailWindow.prototype.open = function() {
	var that = this;
	if(!that.initialized) {
		that.initialize();
		that.initialized = true;
	}

	that.window.open();
}

DetailWindow.prototype.getWindow = function() {
	var that = this;

	return that.window;
}

DetailWindow.prototype.render = function(options) {
	var that = this;
	that.webView.url = "http://en.wikipedia.org/wiki/" + options.title;
}

DetailWindow.prototype.initialize = function() {
	var that = this;

	that.window = Ti.UI.createWindow({
		title : 'Detail',
		backgroundColor : '#fff',
		id : "DETAIL_WINDOW"
	});

	that.webView = Ti.UI.createWebView({
		autoDetect : [Ti.UI.AUTODETECT_NONE]
	});

	that.window.add(that.webView);

}

exports.DetailWindow = DetailWindow;
exports.window = this.window;
