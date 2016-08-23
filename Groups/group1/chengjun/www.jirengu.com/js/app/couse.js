

$.fn.Carousel=function(){
	function Carousel($imgct){
				this.$imgct=$imgct;
				this.$item=$imgct.children();
				this.$carousel=this.$imgct.parent();
				this.$bullet=this.$carousel.find(".bullet");
				this.$imgCount=this.$item.length;
				this.$ctWidth=$(window).width();
				this.$pre=this.$carousel.find(".pre-arrow");
				this.$next=this.$carousel.find(".next-arrow");
				this.cur=0;
				this.islocked=false;
				this.init();
				this.bind();
}
Carousel.prototype={
		init:function(){
			this.$item.css({"width":this.$ctWidth})
			this.$imgct.prepend(this.$item.eq(this.$imgCount-1).clone());
				this.$imgct.append(this.$item.eq(0).clone());
				 this.$imgct.css({"width":this.$ctWidth*(this.$imgCount+2),
							 "left":0-this.$ctWidth
						});
		},
		bind:function(){
			var me=this;
				this.$pre.on("click",function(){
						me.playPre();
				});
				this.$next.on("click",function(){
						me.playNext();
				});
				this.$bullet.on('mouseover',"li" ,function(){
				var idx = $(this).index();
				if(me.cur<idx){
					me.playNext(idx-me.cur);
				}
				if(me.cur>idx){
					me.playPre(me.cur-idx);
				}
				});
		},
		playPre:function(idx){
						var idx=idx || 1;
							var me=this;
						if(me.islocked){return};
						 this.islocked=true;						
					 	me.$imgct.animate({left:"+="+(me.$ctWidth*idx)},function(){
						 		me.cur=(me.$imgCount+me.cur-idx)%me.$imgCount;
						  if(me.cur===(me.$imgCount-1)){
						  me.$imgct.css({"left":0-me.$ctWidth*me.$imgCount});
						 		console.log(me.cur===(me.$imgCount-1))
						 }
						 me.islocked=false;
						 me.setBullte();
						}
						);
					},
		playNext:function(idx){
						var idx=idx || 1;
						var me=this;
					if(me.islocked){return};
					 	me.islocked=true;	
					 	me.$imgct.animate({left:"-="+(this.$ctWidth*idx)},function(){					 		
						 		me.cur=(me.cur+idx)%me.$imgCount;					 	
						  if(me.cur===0){
						 	me.$imgct.css({
						 	 "left":0-me.$ctWidth
						 })
						 }
						me.islocked=false;
						me.setBullte();
						 });
										 
					},
		setBullte:function(){
						this.$bullet.find("a").removeClass("active")
							.eq(this.cur).addClass("active");
						this.$bullet.find("span").removeClass("finger")
							.eq(this.cur).addClass("finger");
						},
		auto:function(){
							var that=this;
							var clock=setInterval(function(){
								that.playNext();
						},5000)
					},
		stop:function(){
				clearInterval(clock)
					}
	}
	$(this).each(function(){
		new Carousel ($(this))
	})
}

 $(".carousel-course").find(".img-ct").Carousel();
















