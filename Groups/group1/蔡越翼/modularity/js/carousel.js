define(function(require,exports){
	var $ = require('jquery');
		function Carousel($node){
		this.$ct = $node;
		this.$carousel = this.$ct.find('ul');
		this.$btnLeft = this.$ct.find('.btn-left');
		this.$btnright = this.$ct.find('.btn-right');
		this.$panels = this.$carousel.find('li');
		this.$panelCount = this.$panels.length;
		this.$curIdx = 1;
		this.$count = 0;
		this.$isAnimate = 0;
		this.init();
	}
	Carousel.prototype = {
		init:function(){
			this.$panelWidth = this.$carousel.width()/3;
			this.$panels.width(this.$panelWidth);
			this.$ctHeight = this.$panelWidth*1.2;
			this.$ct.css({height:this.$ctHeight});
			this.$carousel.css({ left:'0',width:this.$panelCount*this.$panelWidth});
			this.bind();
		},
		bind:function(){
			var cur = this;
			cur.$btnLeft.on('click',function(){
				cur.playPre();
			});
			cur.$btnright.on('click',function(){
				cur.playNext();
			});
		},
		playNext:function(){
			var cur = this;
			console.log(cur.$count);
			if(cur.$isAnimate === 1) return;
			if(cur.$count === 3) {
				return;
			}
			$isAnimate = 1;
			cur.$carousel.animate({left:'-='+cur.$panelWidth},'fast',function(){
				cur.$curIdx++;
				cur.$panels.removeClass('active').eq(cur.$curIdx).addClass('active');
				cur.$count++;
				cur.setBtn();
				cur.$isAnimate = 0;
			});
		},
		playPre:function(){
			var cur = this;
			if(cur.$isAnimate === 1) return;
			if(cur.$count === 0) return;
			$isAnimate = 1;
			cur.$carousel.animate({left:'+='+cur.$panelWidth},'fast',function(){
				cur.$curIdx--;
				cur.$panels.removeClass('active').eq(cur.$curIdx).addClass('active');
				cur.$count--;
				cur.setBtn();
				cur.$isAnimate = 0;
			});
		},
		setBtn:function(){
			var cur = this;
			cur.$curIdx <= 1 ? cur.$btnLeft.addClass("disable") : cur.$btnLeft.removeClass("disable");
			cur.$curIdx >= 4 ? cur.$btnright.addClass("disable") : cur.$btnright.removeClass("disable");
		}
	}
	return Carousel;
})