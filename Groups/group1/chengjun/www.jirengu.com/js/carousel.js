define(['./jquery.js'],function($){
	
	$.fn.Carousel=function(){
function Carousel($imgct){
	this.$ct=$imgct;
	this.$carousel=this.$ct.parent()
	this.$item=$imgct.children();
	this.$count=$imgct.children().length;
	this.bind();
}
Carousel.prototype={
		init:function(){
			this.$itemWidth=this.$carousel.width()/3; //获取子元素宽度
			this.$ct.css({
				"width":this.$itemWidth*this.$count,
				"height":this.$itemWidth,
				"left":0
			})
			this.$item.outerWidth(this.$itemWidth).outerHeight(this.$itemWidth);
		
		},

		bind:function(){
			var me=this;
			this.init();
			window.onresize=function(){
				me.init();
			}
			
			 this.cur=1;
			$(".pre-arrow").on("click",function(){
				me.palyPre();
			})
			$(".next-arrow").on("click",function(){
				me.palyNext();
			})
		},
		palyNext:function(){
			if(this.cur===(this.$count-2)){return}
			this.$ct.animate({left:"-="+this.$itemWidth},500)
				this.cur++
			this.$ct.find("li").eq(this.cur).addClass("scale-big");
			this.$ct.find("li").eq(this.cur).siblings().removeClass("scale-big")
		},
		palyPre:function(){
				var _this=this;
				if(this.cur===1){return}
			this.$ct.animate({left:"+="+this.$itemWidth},500)
					this.cur--;
				this.$ct.find("li").eq(this.cur).addClass("scale-big");
				this.$ct.find("li").eq(this.cur).siblings().removeClass("scale-big")
		}	
	}
	$(this).each(function(){
		new Carousel ($(this))
	})
}

	return $.fn.Carousel
})



















