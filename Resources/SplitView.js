SplitView = function(controller, options) {
	var that = this;

	that.initialized = false;

	that.appController = controller;

	return that;
}

SplitView.prototype.open = function() {
	var that = this;
	if(!that.initialized) {
		that.initialize();
	}

	// WINDOWS
	that.masterWindow = new ( require('MasterWindow').MasterWindow)(that);
	that.detailWindow = new ( require('DetailWindow').DetailWindow)(that);

	// MASTER NAV GROUP
	that.masterNav = Ti.UI.iPhone.createNavigationGroup({
		window : that.masterWindow.window
	});

	// DETAIL NAV GROUP
	that.detailNav = Ti.UI.iPhone.createNavigationGroup({
		window : that.detailWindow.window
	});

	// SPLIT VIEW
	that.splitView = Titanium.UI.iPad.createSplitWindow({
		masterView : that.masterNav,
		detailView : that.detailNav
	});

	Ti.App.addEventListener.addEventListener('app:rowClicked', function(e) {
		Ti.API.log('setMasterPopupVisible');
		// see bug in lighthouse
		// <a href="https://appcelerator.lighthouseapp.com/projects/32238/tickets/2300-hide-master-popover-on-ipad" data-bitly-type="bitly_hover_card">https://appcelerator.lighthouseapp.com/projects/32238/tickets/2300-hide-master-popover-on-ipad</a>
		SplitViewApp.splitView.setMasterPopupVisible(false);
		SplitViewApp.splitView.setMasterPopupVisible(true);
	});

	that.splitView.addEventListener('visible', function(e) {

		//if detail view then show button to display master list
		// the framework does this automagically!!
		if(e.view == 'detail') {
			e.button.title = "Master View List";
			that.detailWindow.window.leftNavButton = e.button;
			Ti.API.log('Set button');
		} else if(e.view == 'master') {
			that.detailWindow.window.leftNavButton = null;
			Ti.API.log('Removed button');
		}
	});

	that.splitView.open();
}

SplitView.prototype.close = function() {
	var that = this;

	that.detailWindow.close();
	that.masterWindow.close();
	that.window.close();
}

SplitView.prototype.initialize = function() {
	var that = this;

}
SplitView.prototype.renderDetailWindow = function(event) {
	var that = this;
	that.detailWindow.render(event);
	that.splitView.setMasterPopupVisible(false);

}

exports.SplitView = SplitView;
