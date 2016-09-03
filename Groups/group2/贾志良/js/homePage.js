$(function(){

	$.ajax({
		type:"GET",
		url:"http://api.jirengu.com/weather.php",
		datatype:"jsonp",
		success:function(data){
			// console.log(JSON.parse(data).results[0])
			// console.log(JSON.parse(data).results[0].index[2].des)
			$("div.weather a").text(JSON.parse(data).results[0].index[2].des).attr("title",JSON.parse(data).results[0].index[2].des)
		}
	})

	function Carousel($node){
		this.$node=$node;
		this.$ulItem=this.$node.find(".ulCarousel");
		this.$item=this.$node.find(".carouselItem");
		this.$width=this.$item.width();
		this.$length=this.$item.length;
		this.$cur=0;
		this.$next=this.$node.find(".playNext");
		this.$pre=this.$node.find(".playPre");
		this.$nav=this.$node.next().find("span.nowNav");
		this.$navWord=this.$node.next().find("a.navWord");
		this.bind();
	}
	Carousel.prototype={
		bind:function(){
			var me=this;
			if(me.$cur==0){
				me.$pre.addClass("disabled");
			}
			me.$next.on("click",function(e){
				e.preventDefault();
				me.playNext();
			});
			me.$pre.on("click",function(e){
				e.preventDefault();
				me.playPre();
			})
			me.$navWord.on("mouseover",function(){
				var $des=$(this).parents("ul.nowItems").find("a.navWord").index($(this));
				var $dis=$des-me.$cur;
				if($dis<0){
					me.playPre($dis);
				}else if($dis>0){
					me.playNext($dis);
				}else{
					return
				}
			})
		},
		playNext:function(idx){
			var me=this;
			var idx=parseInt(idx)||1;
			var $ulItem=me.$ulItem;
			if($ulItem.attr("playing")||(me.$cur==me.$length-3 && me.$item.hasClass("active"))||(me.$cur==me.$length-1))return;
			me.$pre.removeClass("disabled");
				$ulItem.attr("playing",true);
			if(me.$item.hasClass("active")){
				if(me.$cur==me.$length-2){
					$ulItem.attr("playing",null);
					return;
				}
				c2.$item.removeClass("active");
				c2.$item.eq(c2.$cur+2).addClass("active");
			}
			$ulItem.animate({
				"left":"-="+me.$width*idx+"px"
			},function(){
				$ulItem.attr("playing",null);
				if(me.$item.hasClass("active")){
					if(me.$cur==me.$length-3){
						me.$next.addClass("disabled");
					}
				}
				if(me.$cur==me.$length-1){
					me.$next.addClass("disabled");
				}
			})
			me.$cur+=idx;
			me.setNav();
		},
		playPre:function(idx){
			var me=this;
			var idx=Math.abs(idx)||1;
			var $ulItem=me.$ulItem;
			if($ulItem.attr("playing")||me.$cur==0)return;
				me.$next.removeClass("disabled");
				$ulItem.attr("playing",true);
			if(me.$item.hasClass("active")){
				c2.$item.removeClass("active");
				c2.$item.eq(c2.$cur).addClass("active");
			}
			$ulItem.animate({
				"left":"+="+me.$width*idx+"px"
			},function(){
				$ulItem.attr("playing",null);
		
			if(me.$cur==0){
				me.$pre.addClass("disabled");
				}
			})
			me.$cur-=idx;
			me.setNav();
			},
		setNav:function(){
			this.$node.next().find("span.nowNav").addClass("hidden");
			this.$node.next().find("span.nowNav").eq(this.$cur).removeClass("hidden");
			this.$node.next().find("a.navWord").removeClass("nowColor");
			this.$node.next().find("a.navWord").eq(this.$cur).addClass("nowColor");
		}
	}

	function Move($node){
		this.$node=$node;
		this.$moveObj=this.$node.find(".moveBox");
		this.$nodeX=this.$node.width()/2+this.$node.offset().left;
		this.$nodeY=this.$node.height()/2+this.$node.offset().top;
		this.bind();
	}

	Move.prototype={
		bind:function(){
			this.move();
		},
		move:function(){
			var me=this;
			me.$node.on("mousemove",function(e){
				if(me.$moveObj.locked)return;
				me.$moveObj.locked=true;
				for(var i=0;i<me.$moveObj.length;i++){
				me.$moveObj.eq(i).animate({
				"left":0-(me.$nodeX-e.pageX)/(120/(i+2))+"px",
				"bottom":(me.$nodeY-e.pageY)/(120/(i+2))+"px"
				},0,function(){
				me.$moveObj.locked=false;
				})	
				}	
			})
		},
	}

	$("li.cBg a").on("mouseover",function(){
		$(this).parent("li").find("div.bg").css({
			"border":"10px solid #29394D",
			"background":"#fff"
		})
	}).on("mouseleave",function(){
		$(this).parent("li").find("div.bg").css({
			"border":"none",
			"background":"#29394D"
		})
	})

	var m1=new Move($("div.info"))
	var m2=new Move($("div.mountains"))

	var c1=new Carousel($("div.lessonCarousel"));
	var c2=new Carousel($("div.course-carousel"));
})