function Slides($container,options){
	this.options = options
	this.$container = $container
	this.$viewPort = this.$container.find('.slider-wrap')
	this.$slider = this.$container.find('.slider')
	this.itemsCount = this.$slider.children().length;
	this.width = this.options.width || this.$viewPort.width()
	this.current = 0
	this.time = null
	this.hover = false
	this.init()
}

Slides.prototype.init = function(){
	this.bindEvents()
	this.setSliderCSS()
	if(this.options.auto){
		this.autoPlay()
	}
}
Slides.prototype.setSliderCSS = function(){
	var width = this.width
	this.$slider.css({width: this.itemsCount * this.width})
	this.$slider.children().each(function(){
		$(this).css({width: width})
	})
}
Slides.prototype.bindEvents = function(){
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

}
Slides.prototype.next = function(){
	this.go(this.current +1)
}
Slides.prototype.prev = function(){
	this.go(this.current -1)
}
Slides.prototype.go = function(index){
	var itemsCount = this.itemsCount
	var $slider= this.$slider
	var width = this.width
	var self = this
	var left = index * -width
	var perColsNum = this.$viewPort.width()/width
	if(index<0){
		index = itemsCount - perColsNum
	}
	if(index > itemsCount - perColsNum){
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
Slides.prototype.autoPlay = function(){
	var self = this
	this.timer = setInterval(function(){
		self.next()
	},1500)
}
Slides.prototype.trackNav = function(){

	this.$nav.children().eq(this.current).addClass('active').siblings().removeClass('active')
}
$.fn.slides = function(options){
	this.each(function(){
		var element = this
		var slide = new Slides($(element), options)
	});
}