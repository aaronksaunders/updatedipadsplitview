MasterWindow = function(controller, options) {
	var that = this;
	that.initialized = false;
	that.appController = controller;

	that.open();

	return that;
}

MasterWindow.prototype.getWindow = function() {
	var that = this;
	return that.window;
}

MasterWindow.prototype.open = function() {
	var that = this;
	if(!that.initialized) {
		that.initialize();
		that.initialized = true;
	}

	that.window.open();
}

MasterWindow.prototype.initialize = function() {
	var that = this;

	that.window = Ti.UI.createWindow({
		title : 'Master',
		backgroundColor : '#fff',
		id : "MASTER_WINDOW"
	});

	var tableData = [Ti.UI.createTableViewRow({
		title : 'Monday'
	}), Ti.UI.createTableViewRow({
		title : 'Tuesday'
	}), Ti.UI.createTableViewRow({
		title : 'Wednesday'
	}), Ti.UI.createTableViewRow({
		title : 'Thursday'
	}), Ti.UI.createTableViewRow({
		title : 'Friday'
	}), Ti.UI.createTableViewRow({
		title : 'Saturday'
	}), Ti.UI.createTableViewRow({
		title : 'Sunday'
	})];

	that.tableview = Titanium.UI.createTableView({
		data : tableData
	});
	that.window.add(that.tableview);

	that.tableview.addEventListener('click', function(event) {
		that.appController.renderDetailWindow({
			"row" : event.index,
			"title" : event.row.title
		});
	});

}
exports.MasterWindow = MasterWindow;
exports.window = this.window;
