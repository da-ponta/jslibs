var TimerControl = {
	timers : {},
	currtntLogging : null,
	startTimer : function(id,category, variable, opt_label) {
		TimerControl.timers[id] = new TrackTiming(category, variable, opt_label).startTime();
		TimerControl.currtntLogging = id;
	},
	endTimer : function (id) {
		if (!id) {
			id=TimerControl.currtntLogging;
		}
		if (TimerControl.timers[id]&&typeof TimerControl.timers[id].endTime == "function") {
			var time=TimerControl.timers[id].endTime().send();
			if (typeof console!="undefined" && console.log) {
				console.log(id,time)
			}
		}
	}
}
function TrackTiming(category, variable, opt_label) {
  this.category = category;
  this.variable = variable;
  this.label = opt_label ? opt_label : undefined;
  this.startTime;
  this.endTime;
  this.closed = false;
  return this;
}

TrackTiming.prototype.startTime = function() {
  this.startTime = new Date().getTime();
  return this;
}

TrackTiming.prototype.endTime = function() {
  this.endTime = new Date().getTime();
  return this;
}

TrackTiming.prototype.send = function() {
  if (closed) return false;
  var timeSpent = this.endTime - this.startTime;
  if(typeof _gaq != "undefined") {
  	_gaq.push(['_trackTiming', this.category, this.variable, timeSpent, this.label]);
  }
  this.closed = true;
  return timeSpent;
}