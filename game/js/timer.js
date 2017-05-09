setTime = function() {
	this.timers = {};
}

setTime.prototype.startTimer = function(name, duration, callback, callbackContext) {

	if(!!this.timers[name]) {
		game.time.events.remove(this.timers[name].eventTimer);
	}

	if(duration === 0) {
		this.timers[name] = { status: 'done', timerEvent: null };
		return;
	}
	
	this.timers[name] = {};
	this.timers[name].status = 'loading';
	this.timers[name].eventTimer = game.time.events.add(duration, function() { this.timers[name].status = 'done'; }, this);
	this.timers[name].timestamp = game.time.now;
}

setTime.prototype.timerDone = function(name) {
	if(!!this.timers[name]) {
		return this.timers[name].status === 'done' ? true : false;
	} else {
		return true;
	}

};

setTime.prototype.timestamp = function(name) {
	if(!!this.timers[name]) {
		return this.timers[name].status;
	} else {
		return 0;
	}
};
