	
	 	// 首页小恶魔通知天气API
	(function(){
		var $weather = $('#header>.notice a');
		$.get('http://api.jirengu.com/weather.php',function(data){
			var obj = JSON.parse(data);
			console.log(obj.results[0].index[5].des)
			$weather.text(obj.results[0].index[5].des);
			$weather.attr('title',obj.results[0].index[5].des);
		})
	})()


		// 首屏大山背景移动效果
	var $header = $('#header');
	var $mountain1 = $('#header .mountain1');
	var $mountain2 = $('#header .mountain2');
	var $mountain3 = $('#header .mountain3');

	$header.on('mousemove',function(e){
		var winWdh = $(window).width()/2;
		var winHgt = $(window).height()/2;
		var mX = e.pageX;
		var mY = e.pageY;
		if( mX > winWdh && mY > winHgt ){
			$mountain1.css({
				'transform': 'translate('+ (mX-winWdh)/40 +'px,'+(mY-winHgt)/50 +'px)',
			})	
			$mountain2.css({
				'transform': 'translate('+ (mX-winWdh)/30 +'px,'+(mY-winHgt)/40 +'px)',
			})	
			$mountain3.css({
				'transform': 'translate('+ (mX-winWdh)/20 +'px,'+(mY-winHgt)/30 +'px)',
			})			
		}else if( mX > winWdh && mY < winHgt ){
			$mountain1.css({
				'transform': 'translate('+ (mX-winWdh)/40 +'px,'+ -(winHgt-mY)/50 +'px)',
			})
			$mountain2.css({
				'transform': 'translate('+ (mX-winWdh)/30 +'px,'+ -(winHgt-mY)/40 +'px)',
			})	
			$mountain3.css({
				'transform': 'translate('+ (mX-winWdh)/20 +'px,'+ -(winHgt-mY)/30 +'px)',
			})						
		}else if( mX < winWdh && mY > winHgt ){
			$mountain1.css({
				'transform': 'translate('+ -(winWdh-mX)/40 +'px,'+(mY-winHgt)/50 +'px)',
			})	
			$mountain2.css({
				'transform': 'translate('+ -(winWdh-mX)/30 +'px,'+(mY-winHgt)/40 +'px)',
			})	
			$mountain3.css({
				'transform': 'translate('+ -(winWdh-mX)/20 +'px,'+(mY-winHgt)/30 +'px)',
			})	
		}else if( mX < winWdh && mY < winHgt ){
			$mountain1.css({
				'transform': 'translate('+ -(winWdh-mX)/40 +'px,'+ -(winHgt-mY)/50 +'px)',
			})	
			$mountain2.css({
				'transform': 'translate('+ -(winWdh-mX)/30 +'px,'+ -(winHgt-mY)/40 +'px)',
			})
			$mountain3.css({
				'transform': 'translate('+ -(winWdh-mX)/20 +'px,'+ -(winHgt-mY)/30 +'px)',
			})			
		}
		
	})
			

		// 雪山背景移动效果
	var $layout = $('#content .layout');
	var $mountainUp = $('#content .layout .mountain')
	var $mountainDown = $('#content .layout .mountain1')

	$layout.on('mousemove',function(e){
		var winWdh = $(window).width()/2;
		var winHgt = $(window).height()/2;
		var mX = e.pageX;
		var mY = e.pageY;
		if( mX > winWdh && mY > winHgt ){
			$mountainUp.css({
				'transform': 'translate('+ (mX-winWdh)/30 +'px,'+(mY-winHgt)/50 +'px)',
			})	
			$mountainDown.css({
				'transform': 'translate('+ (mX-winWdh)/50 +'px,'+(mY-winHgt)/40 +'px)',
			})	
		}else if( mX > winWdh && mY < winHgt ){
			$mountainUp.css({
				'transform': 'translate('+ (mX-winWdh)/30 +'px,'+ -(winHgt-mY)/50 +'px)',
			})
			$mountainDown.css({
				'transform': 'translate('+ (mX-winWdh)/50 +'px,'+ -(winHgt-mY)/40 +'px)',
			})	
					
		}else if( mX < winWdh && mY > winHgt ){
			$mountainUp.css({
				'transform': 'translate('+ -(winWdh-mX)/30 +'px,'+(mY-winHgt)/50 +'px)',
			})	
			$mountainDown.css({
				'transform': 'translate('+ -(winWdh-mX)/50 +'px,'+(mY-winHgt)/40 +'px)',
			})	

		}else if( mX < winWdh && mY < winHgt ){
			$mountainUp.css({
				'transform': 'translate('+ -(winWdh-mX)/30 +'px,'+ -(winHgt-mY)/50 +'px)',
			})	
			$mountainDown.css({
				'transform': 'translate('+ -(winWdh-mX)/50 +'px,'+ -(winHgt-mY)/40 +'px)',
			})
		}
		
	})

/*
	function MountainMove($dom){
		var me = this;
		me.$dom = $dom;
		me.$header = me.$dom.parents('#header');
		this.bind();
	}

	MountainMove.prototype = {
		bind:function(){
			var me = this;
			me.$header .on('mousemove',function(e){
				var winWdh = $(window).width()/2;
				var winHgt = $(window).height()/2;
				var mX = e.pageX;
				var mY = e.pageY;

				if( mX > winWdh && mY > winHgt ){
					me.$dom.css({
						'transform': 'translate('+ (mX-winWdh)/20 +'px,'+(mY-winHgt)/30 +'px)',
					})			
				}else if( mX > winWdh && mY < winHgt ){
					me.$dom.css({
						'transform': 'translate('+ (mX-winWdh)/20 +'px,'+ -(winHgt-mY)/30 +'px)',
					})					
				}else if( mX < winWdh && mY > winHgt ){
					me.$dom.css({
						'transform': 'translate('+ -(winWdh-mX)/20 +'px,'+(mY-winHgt)/30 +'px)',
					})	
				}else if( mX < winWdh && mY < winHgt ){
					me.$dom.css({
						'transform': 'translate('+ -(winWdh-mX)/20 +'px,'+ -(winHgt-mY)/30 +'px)',
					})				
				}
				
			})			
		}			
	}
	var m1 = new MountainMove($('#header .mountain1'))
	var m2 = new MountainMove($('#header .mountain2'))
	var m3 = new MountainMove($('#header .mountain3'))
*/	



	
		//小恶魔联系人图片封装
	function GifImg($dom){
		var me = this;
		me.$dom = $dom;
		me.$img = $dom.find('img');
		me.$dom.on('mouseenter',function(){
			me.$img.attr('src', me.$img.attr('data-hover-img'))
		})
		me.$img.on('mouseleave',function(){
			me.$img.attr('src',me.$img.attr('data-img'));
		})
	}

	var h1 = new GifImg($('#header>.with.right'));      //首页（和我聊聊）小恶魔 调用



		// 尾部QQ群小恶魔hover封装
	function ImgEnter($dom){
		var me = this;
		me.$dom = $dom;
		me.$qq1 = $dom.find('.qq1');
		me.$qq2 = $dom.find('.qq2');
		me.$dom.on('mouseenter',function(){
			me.$qq1.hide();
			me.$qq2.show();

		});
		me.$dom.on('mouseleave',function(){
			me.$qq2.hide();
			me.$qq1.show();
		})
	}

	var qq1 = new ImgEnter($('#panels>.contact>.round.left')) //尾部qq2群小恶魔调用
	var qq2 = new ImgEnter($('#panels>.contact>.round.right'))  //尾部qq3群小恶魔调用




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
			'width': this.leng * this.$list.outerWidth(true),
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



		// 课程预告 半全屏 -轮播封装
	function Panels($dom){
		this.$dom = $dom;
		this.$ct = $dom.find('.img-ct');     //获取ul元素
		this.$list = $dom.find('.list');
		this.$list.css({
			"width": $(window).width()    //设置li宽度为窗口自适应宽度
		});
		this.leng = this.$list.size();   //获取li数量
		this.$ct.css({
			'width':  this.$list.outerWidth(true) * this.leng  //设置ul宽度为
		});
		this.$pre = $dom.find('.pre');
		this.$next = $dom.find('.next');
		this.$bullet = $dom.find('.bullet');   //获取下方按钮元素
		this.$li = $dom.find('.bullet>li');
		this.$icon = $dom.find('.bullet .icon');
		this.curIdx = 0;  
		this.ready = true; //设置状态锁
		this.bind();
	}

	Panels.prototype = {
		bind: function(){
			var me = this;
			me.$next.on('click',function(){
				me.toNext();
			});
			me.$pre.on('click',function(){
				me.toPre();
			});	
			me.$bullet.find('li').on('mouseenter',function(){
				var idx = $(this).index();
				if(idx > me.curIdx){
					me.toNext(idx - me.curIdx);
				}else if(idx < me.curIdx){
					me.toPre(me.curIdx - idx)
				}				
			})
		},

		toNext: function(num){
			var num = num || 1;
			var me = this;
			if(me.ready && me.curIdx !== 3){
				me.ready = false;
				me.$pre.addClass('lock1');  //设置轮播按钮锁样式
				me.curIdx = me.curIdx + num;
		 		console.log(num);
		 		console.log(me.curIdx);
		 		me.$ct.animate({left:"-=" + me.$list.outerWidth(true)* num},function(){	
					me.setBullet(me.curIdx);
					me.ready = true;
		 		});	
			}
			if(me.curIdx === 3){
				me.$next.addClass('lock');	//设置轮播按钮锁样式
			}		
		},

		toPre: function(num){
			var num = num || 1;
			var me = this;
			if(me.ready && me.curIdx !== 0){
				me.ready = false;
				me.$next.removeClass('lock');  //设置轮播按钮锁样式
				me.curIdx = me.curIdx - num;
				me.$ct.animate({left:"+=" + me.$list.outerWidth(true)* num},500,function(){
					me.setBullet(me.curIdx);
					me.ready = true;
				});					
			}
			if(me.curIdx === 0){
				me.$pre.removeClass('lock1'); //设置轮播按钮锁样式
			}
		},

		setBullet: function(num){    //  num 为传入的curIdx参数
			var me = this;
			me.$li.eq(num).addClass('active').siblings().removeClass('active');
			me.$li.eq(num).find('.icon').addClass('bk');
			me.$li.eq(num).siblings().find('.icon').removeClass('bk');
			//因为icon不为兄弟元素，这里使用li找到icon添加删除样式
		}
	}
		
	var p1 = new Panels($('#panels .img-wrap'));    //半全屏轮播调用
