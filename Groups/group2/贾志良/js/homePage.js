$(function(){

	function Carousel($node){
		this.$node=$node;
		this.$ulItem=this.$node.find(".ulCarousel");
		this.$item=this.$node.find(".carouselItem");
		this.$width=this.$item.width();
		this.$length=this.$item.length;
		this.$cur=0;
		this.$next=this.$node.find(".playNext");
		this.$pre=this.$node.find(".playPre");
		this.bind();
	}
	Carousel.prototype={
	bind:function(){
		var me=this;
		if(me.$cur==0){
			me.$pre.addClass("disabled")
		}
		if(me.$cur==0)
		me.$next.on("click",function(e){
			e.preventDefault();
			me.playNext()
		});
		me.$pre.on("click",function(e){
			e.preventDefault();
			me.playPre()
		})
	},
	playNext:function(){
		var me=this;
		var $ulItem=me.$ulItem;
		if($ulItem.attr("playing")||me.$cur==(me.$length-1))return;
		me.$pre.removeClass("disabled");
			$ulItem.attr("playing",true);
		if(me.$item.hasClass("active")){
			if(me.$cur==me.$length-3){
				$ulItem.attr("playing",null);
				return;
			}
			c2.$item.removeClass("active");
			c2.$item.eq(c2.$cur+2).addClass("active");
		}
		$ulItem.animate({
			"left":"-="+me.$width+"px"
		},function(){
			$ulItem.attr("playing",null);
			me.$cur++;
			if(me.$item.hasClass("active")){
				if(me.$cur==me.$length-3){
					me.$next.addClass("disabled");
				}
			}
			if(me.$cur==me.$length-1){
				me.$next.addClass("disabled");
			}
		})
	},
	playPre:function(){
		var me=this;
		var $ulItem=me.$ulItem;
		if($ulItem.attr("playing")||me.$cur==0)return;
			me.$next.removeClass("disabled");
			$ulItem.attr("playing",true);
		if(me.$item.hasClass("active")){
			c2.$item.removeClass("active");
			c2.$item.eq(c2.$cur).addClass("active");
		}
		$ulItem.animate({
			"left":"+="+me.$width+"px"
		},function(){
			$ulItem.attr("playing",null);
			me.$cur--;
		if(me.$cur==0){
			me.$pre.addClass("disabled");
			}
		})
		}
	}
	var c1=new Carousel($("div.lessonCarousel"));
	var c2=new Carousel($("div.course-carousel"));
})