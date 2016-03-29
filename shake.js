(function(){
	var shake = function(opt){
		// 默认对象
		var opt_default = {
			start : false,
			// 回调事件
			callBack : function(){
				alert('您已成功摇一摇！')
			},
			// 不支持事件
			notSupport : function(){
				alert('您好，你目前所用的设置好像不支持摇一摇功能哦！');
			},
			// 摇一摇距离
			distance : 3000
		}
		this.dettach = function(){
			window.removeEventListener('devicemotion', deviceMotionHandler, false);
		}
		opt_default.start = ('start' in opt)?opt.start:opt_default.start;
		opt_default.callBack = ('notSupport' in opt)?opt.callBack:opt_default.callBack;
		opt_default.notSupport = ('notSupport' in opt)?opt.notSupport:opt_default.notSupport;
		opt_default.distance = ('distance' in opt)?opt.distance:opt_default.distance;
		// 先判断设备是否支持HTML5摇一摇功能
		if (opt_default.start&&window.DeviceMotionEvent) {
			// 获取移动速度，得到device移动时相对之前某个时间的差值比
			window.addEventListener('devicemotion', deviceMotionHandler, false);
		}else{
			// 不支持事件
			opt_default.notSupport();
		}
		// 设置临界值
		var shakeThreshold = opt_default.distance;
		// 设置最后更新时间，用于对比
		var lastUpdate = 0;
		// 设置位置速率
		var curShakeX=curShakeY=curShakeZ=lastShakeX=lastShakeY=lastShakeZ=0;
		function deviceMotionHandler(event){
			// 获得重力加速
			var acceleration =event.accelerationIncludingGravity;
			// 获得当前时间戳
			var curTime = new Date().getTime();
			if ((curTime - lastUpdate)> 100) {
				// 时间差
				var diffTime = curTime -lastUpdate;
					lastUpdate = curTime;
				// x轴加速度
				curShakeX = acceleration.x;
				// y轴加速度
				curShakeY = acceleration.y;
				// z轴加速度
				curShakeZ = acceleration.z;
				var speed = Math.abs(curShakeX + curShakeY + curShakeZ - lastShakeX - lastShakeY - lastShakeZ) / diffTime * 10000;
				if (speed > shakeThreshold) {
					// 成功摇一摇后调用函数
					opt_default.callBack();
				}
				lastShakeX = curShakeX;
				lastShakeY = curShakeY;
				lastShakeZ = curShakeZ;
			}
		}
	}
	window.shake = shake;
})();