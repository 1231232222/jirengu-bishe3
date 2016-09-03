define(['jquery'],function(){
		// 大山背景移动效果
		//$dom为要移动的元素，移动效果绑定在move元素上。在move元素范围内有效
	function MountainMove($dom,dx,dy,move){
		this.$dom = $dom;
		this.dx = dx;
		this.dy = dy;
		this.move = move;
		this.init();
	}
	MountainMove.prototype = {
		init: function(){
			var me = this;
			me.move.on('mousemove',function(e){
				var winWdh = me.move.width()/2;
				var winHgt = me.move.height()/2;
				var mX = (e.pageX - winWdh)/me.dx;
				var mY = (e.pageY - winHgt)/me.dy;
				console.log(mX)
				me.$dom.css({
					'transform': 'translate('+ mX +'px,'+mY+'px)',
				})	
			})
		}
	}
	//首屏大山调用
	var m1 = new MountainMove($('#header .mountain1'),30,40,$('#header'))
	var m2 = new MountainMove($('#header .mountain2'),50,60,$('#header'))
	var m3 = new MountainMove($('#header .mountain3'),80,80,$('#header'))

	//雪山移动调用

	var m4 = new MountainMove($('.layout .mountain'),80,80,$('.layout'))
	var m5 = new MountainMove($('.layout .mountain1'),40,40,$('.layout'))

	

})

