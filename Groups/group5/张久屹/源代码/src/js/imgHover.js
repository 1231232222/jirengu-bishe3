define(['jquery'],function(){

	
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




})