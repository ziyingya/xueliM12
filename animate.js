window.onload = function(){
			var p = document.getElementsByTagName('p')[0];
			function getStyle(obj,style) {
				if(obj.currentStyle) 
				{ 
				return obj.currentStyle[style]; 
				} else 
 				{ 
					return getComputedStyle(obj)[style]; 
				} 
			}
			var a = 2;
			var s = setInterval(function(){
				var now = parseInt(getStyle(p,'left'));
				if(now>=-360){
					p.style.left = now-a+"px";
				}else{
					a=2;
					p.style.left=1000+'px';
					}
			}
			,20);

}
		var box = document.getElementById('box');
		var oNavlist = document.getElementById('nav').children;
		var slider = document.getElementById('slider');
		var left = document.getElementById('left');
		var right = document.getElementById('right');
		var index = 1;
		var isMoving = false;
		//轮播下一张函数
		function next(){
			index++;
			navChange();
			animate(slider,{left:-1200*index},function(){
				if(index===6){
					slider.style.left="-1200px";
					index=1;
				}
			});
		}
		//轮播上一张
		function prev(){
			index--;
			animate(slider,{left:-1200*index},function(){
				if(index===0){
					slider.style.left="-6000px";
					index=5;
				}
			});
		}
		var timer = setInterval(next,3000);

		//定时器
		box.onmouseover = function(){
			animate(left,{opacity:50});
			animate(right,{opacity:50})
			clearInterval(timer)
		}
		box.onmouseout = function(){
			animate(left,{opacity:0})
			animate(right,{opacity:0})
			timer = setInterval(next,3000);
		}
		right.onclick = next;
		left.onclick = prev;

		//小按钮事件
		for(var i=0;i<oNavlist.length;i++){
			oNavlist[i].idx = i;
			oNavlist[i].onclick = function(){
				index = this.idx+1;
				navChange();
				animate(slider,{left:-1200*index});
			}
		}

		//按钮背景
		function navChange(){
			for(var i = 0;i<oNavlist.length;i++){
				oNavlist[i].className = "";
			}
			if(index==6){
				oNavlist[0].className = 'active'; 
			}
			else{
			oNavlist[index-1].className = 'active';
			}
		}

function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
