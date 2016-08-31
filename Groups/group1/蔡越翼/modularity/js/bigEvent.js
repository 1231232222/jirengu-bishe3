define(function(require,exports){
	var $ = require('jquery');
	function BigEvent($node,$option){
		this.$ct = $node;
		this.$opt = $option.find('li');
		this.$event = this.$ct.find('ul');
		this.$btnleft = this.$ct.find('.btn-left');
		this.$btnright = this.$ct.find('.btn-right');
		this.$panels = this.$event.find('li');
		this.$panelCount = this.$panels.length;
		this.$panelWidth = $(window).width();
		this.$curIdx = 0;
		this.$isAnimate = 0;
		this.$panels.width(this.$panelWidth);
		console.log(this.$panels.find('a'));
		for(var i=0;i<this.$panels.find('a').length;i++){
			this.$panels.find('a').eq(i).css({backgroundImage:'url('+this.$panels.find('a').eq(i).attr('bg-img')+')'});
		}
		this.$panels.first().clone().appendTo(this.$event);
		this.$panels.last().clone().prependTo(this.$event);
		this.$panelCurCount = this.$event.children().length;
		this.$event.css({left:0-this.$panelWidth,width:this.$panelWidth*this.$panelCurCount,height:this.$panels.height()});
		this.init();
	}
	BigEvent.prototype = {
		init:function(){
			this.bind();
		},
		bind:function(){
			var cur = this;
			cur.$btnleft.on('click',function(){
				cur.playPre();
			});
			cur.$btnright.on('click',function(){
				cur.playNext();
			});
			cur.$opt.on('mouseenter',function(e){
				e.preventDefault();
				var idx = $(this).index();
				idx = idx-cur.$curIdx;
				if(idx>0){
					cur.playNext(idx);
				}else{
					cur.playPre(-idx);
				}
			});
		},
		playPre:function(index){
			if(this.$isAnimate === 1) return;
			var cur = this;
			var idx = index || 1;
			cur.$event.animate({left:'+='+cur.$panelWidth*idx},function(){
				cur.$curIdx = (cur.$panelCount+cur.$curIdx-idx)%cur.$panelCount;
				if(cur.$curIdx === (cur.$panelCount-1)){
					cur.$event.css({left:0-cur.$panelWidth*cur.$panelCount});
				}
				cur.setOpts(cur.$curIdx);
				cur.$isAnimate = 0;
			});
		},
		playNext:function(index){
			if(this.$isAnimate === 1) return;
			var cur = this;
			var idx = index || 1;
			cur.$event.animate({left:'-='+cur.$panelWidth*idx},function(){
				cur.$curIdx = (cur.$curIdx+idx)%cur.$panelCount;
				if(cur.$curIdx === 0){
					cur.$event.css({left:0-cur.$panelWidth});
				}
				cur.setOpts(cur.$curIdx)
				cur.$isAnimate = 0;
			});
		},
		setOpts:function(index){
			this.$opt.eq(index).addClass('active').siblings().removeClass('active');
		}
	}
	return BigEvent;
})