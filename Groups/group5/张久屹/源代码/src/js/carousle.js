define(['jquery'],function(){


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
				console.log(1);
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

})