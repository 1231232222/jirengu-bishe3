/*  此插件不设置CSS和生成DOM
	默认参数
	{
	  navCtrl:true,
	  pageCtrl:true,
	  auto:true
	}
 	需要自己在轮播中添加控制轮播的元素(左右翻页和导航)
 	使用:需要在CSS中创建这两个类.slider-wrap .slider
 		给.slider-wrap设置定位relative和高度,.slider设置定位absolute和宽度;
 		假设有四个,每个宽10px,.slider的宽度需要设置40px
*/
function Carousel($container,options){
	this.options = options
	this.$container = $container
	this.$viewPort = this.$container.find('.slider-wrap')
	this.$slider = this.$container.find('.slider')
	this.itemsCount = this.$slider.children().length;
	this.width = this.options.width ||this.$viewPort.width()
	this.current = 0
	this.time = null
	this.hover = false
	this.init()
}

Carousel.prototype.init = function(){
	this.bindEvents()
	this.setSliderCSS()
	if(this.options.auto){
		this.autoPlay()
	}
}
Carousel.prototype.setSliderCSS = function(){
	var width = this.width
	this.$slider.css({width: this.itemsCount * this.width})
	this.$slider.children().each(function(){
		$(this).css({width: width})
	})
}
Carousel.prototype.bindEvents = function(){
	var self = this
	if(this.options.pageCtrl){
		this.$prev = this.$container.find('.btn-prev')
		this.$next = this.$container.find('.btn-next')
		this.$prev.on('click', function(){
			self.prev()
		})
		this.$next.on('click', function(){
			self.next()
		})
	}
	if(this.options.navCtrl){
		this.$nav  = this.$container.find('.slider-nav')
		this.$nav.on('mouseover','li',function(){
			var idx = $(this).index()
			self.go(idx)
		})
	}
	this.$slider.on('mouseover', function(){
		window.clearInterval(self.timer)
	}).on('mouseleave', function(){
		if(self.options.auto){
			self.autoPlay()
		}

	})
}
Carousel.prototype.next = function(){
	this.go(this.current +1)
}
Carousel.prototype.prev = function(){
	this.go(this.current -1)
}
Carousel.prototype.go = function(index){
	var itemsCount = this.itemsCount
	var $slider= this.$slider
	var width = this.width
	var self = this
	var left = index * -width
	if(index<0){
		index = itemsCount - 1
	}
	if(index > itemsCount - 1){
		index = 0
	}
	var self = this
	var left = index * -width
	$slider.stop(true,true).animate({
		left: left
	},function(){
		self.current = index
		if(self.options.navCtrl){
			self.trackNav()
		}
	})
}
Carousel.prototype.autoPlay = function(){
	var self = this
	this.timer = setInterval(function(){
		self.next()
	},1500)
}
Carousel.prototype.trackNav = function(){

	this.$nav.children().eq(this.current).addClass('active').siblings().removeClass('active')
}
$.fn.carousel = function(options){
	this.each(function(){
		var element = this
		var slide = new Carousel($(element), options)
	});
}