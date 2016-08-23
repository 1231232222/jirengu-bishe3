
$.fn.Move=function(dx,dy,$ct){
	function Move($nodes,dx,dy,$ct){   //$nodes为要移动的,dx,dy在水平与垂直方向鼠标每200px,元素移动的距离;$ct为鼠标移动的区域;
		this.$nodes=$nodes;
		this.$parent=this.$nodes.parent();
		this.$ct=$ct;
		this.$dx=dx;
		this.$dy=dy;
		this.init();
		this.$width=this.$ct.width()/2;
		this.$height=this.$ct.height()
	}
	Move.prototype={
		init:function(){
			var clock=false;
			var me=this;
			this.$ct.on("mousemove",function(e){
				var setTime=setTimeout(function(){
					var $left=(e.pageX-me.$width)*dx/200;
					var $top=(e.pageY-me.$height)*dy/200;
					me.$nodes.css({"transform":"translate("+$left+"px,"+$top+"px)"});
				clock=false
				},100)
			if(clock){clearTimeout(setTime)};
					clock=true;
			})
		}
		}
	$(this).each(function(){
		new Move ($(this),dx,dy,$ct)
	})
}
$('.mountain-one').Move(10,0,$("#header"));
$('.mountain-two').Move(5,0,$("#header"));
$('.mountain-thr').Move(15,0,$("#header"));
$('.moun-bg1').Move(3,1,$(".info"));
$('.moun-bg2').Move(7,1,$(".info"));


















