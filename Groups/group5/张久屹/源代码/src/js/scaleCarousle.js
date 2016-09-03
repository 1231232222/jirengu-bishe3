define(['jquery'],function(){

		// 首页缩放轮播封装
	function Carousles($dom){
		this.$dom = $dom;
		this.$cw = $dom.find('.carsou-wrap');     //获取ul元素
		this.$list = $dom.find('.list');
		this.leng = this.$list.size();   //获取list数量
		this.$list.css({
			'width': this.$dom.outerWidth() /3,  //设置list宽度为适应父元素
			'height': this.$dom.outerWidth() /3   //设置高度等于宽度
		}); 
		
		this.$cw.css({
			//这里宽度 + this.leng是为了防止li元素宽度的小数会撑破ul元素 
			'width': this.leng * this.$list.outerWidth(true) +this.leng, 
			'height':  this.$list.outerHeight(true),
			'top': '50%',
			'transform': 'translateY(-50%)'
		})

		this.$pre = $dom.find('.pre');
		this.$next = $dom.find('.next');
		this.num = 1;  //设置一个缩放指针
		this.ready = true; //设置状态锁
		this.bind();   
	}

	Carousles.prototype = {
		bind: function(){
			var me = this;
			me.$next.on('click',function(){
				me.toNext();
			});
			me.$pre.on('click',function(){
				me.toPre();
			});

					//根据窗口调整轮播宽度
			$(window).on('resize',function(){
				if($(document).width() <1400 ){
					me.$list.css({
						'width': me.$dom.outerWidth() / 3,
						'height': me.$dom.outerWidth() / 3
					});
					me.$dom.css({
						'height': me.$cw.outerHeight(true)+100
					});
					me.$cw.css({
						'width': me.$list.outerWidth(true) * me.leng + 6,
						'height': me.$list.outerHeight(true),
					})					
				}
			}) 
		},

		toNext: function(){
			var me = this;
	 		if(me.num !== me.leng-2 && me.ready){
	 			me.ready = false;
	 			me.num++;
	 			console.log(me.num);
		 		me.$cw.animate({left: "-=" + me.$list.outerWidth(true)},500,function(){
		 			me.ready = true;
		 		});
		 		me.$list.eq(me.num).css({'transform':'scale(1.2)','z-index':'15'});
		 		me.$list.eq(me.num).siblings().css({'transform':'scale(1)','z-index':'9'});
	 		}
	 		if( me.num === me.leng-2){
	 			me.$next.css({'border-left-color': '#ccc'});  //设置按钮颜色
	 		} 
	 		if(me.num !== 1){
	 			me.$pre.css({'border-right-color': '#2E2E4F'});  //设置按钮颜色
	 		}

		},

		toPre: function(){
			var me = this;
		 	if(me.num !== 1 && me.ready){
		 		me.ready = false;
		 		me.num--;
	 			console.log(me.num);
		 		me.$cw.animate({left:"+=" + me.$list.outerWidth(true)},500,function(){
		 			me.ready = true;
		 		});
		 		me.$list.eq(me.num).css({'transform':'scale(1.2)','z-index':'15'});
		 		me.$list.eq(me.num).siblings().css({'transform':'scale(1)','z-index':'9'});	
		 	}
		 	if(me.num === 1){
		 		me.$pre.css({'border-right-color': '#ccc'});   //设置按钮颜色
		 	}
		 	if(me.num !== 4){
		 		me.$next.css({'border-left-color': '#2E2E4F'}); //设置按钮颜色
		 	}
		}
	}
		// 缩放轮播调用
	var c1 = new Carousles($('#content .carousles'));

})