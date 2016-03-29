var Shake = function(threshold,callback){
	this.SHAKE_THRESHOLD = threshold ? threshold : 2000;	//定义阈值，阈值越大，触发摇晃事件时手机摇晃的程度越剧烈
	this.last_update = 0;
	this.x = this.y = this.z = this.last_x = this.last_y = this.last_z = 0;
	this.init = function(){
		if (window.DeviceMotionEvent) {
			window.addEventListener('devicemotion', this.deviceMotionHandler, false);
		} else {
			alert('您的浏览器不支持摇一摇');
		}
	};
	this.destroy = function(){
		window.removeEventListener('devicemotion', this.deviceMotionHandler);
	}
	var that = this;
	this.deviceMotionHandler = function(eventData) {
		var acceleration = eventData.accelerationIncludingGravity;
		var curTime = new Date().getTime();
		if ((curTime - that.last_update) > 100) {
			var diffTime = curTime - that.last_update;
			that.last_update = curTime;
			that.x = acceleration.x;
			that.y = acceleration.y;
			that.z = acceleration.z;
			var speed = Math.abs(that.x + that.y + that.z - that.last_x - that.last_y - that.last_z) / diffTime * 10000;
			if (speed > that.SHAKE_THRESHOLD) {
				if(window.console && console.log){
					console.log("shaked");
				}
				if(callback != undefined){
					callback(that);
				}            
			}                 
			that.last_x = that.x;     
			that.last_y = that.y;                    
			that.last_z = that.z;       
		}      
	}    
};