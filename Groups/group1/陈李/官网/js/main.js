//hover更换图片
function hoverChange($node){
	this.imgSrc = $node.attr('data-img')
	this.gifSrc = $node.attr('data-gif')
	this.bind($node)
}

hoverChange.prototype.bind = function($node){
	var _this = this
	$node.on('mouseover', function(){
		$node.attr('src', _this.gifSrc)
	})
	$node.on('mouseout', function(){
		$node.attr('src', _this.imgSrc)
	})
}

var $talk = $('.chat img')
var $qq = $('.contact img')
new hoverChange($talk)
$qq.each(function(){
	new hoverChange($(this))
})

//carousel
function Carousel($node){
    this.imgCt = $node.find('ul')
    this.item = this.imgCt.find('li')
    this.itemWidth = this.item.outerWidth(true)
    this.itemCount = this.item.length
    this.pre = $node.find('.tri-right')
    this.next = $node.find('.tri-left')
    this.bullet = $node.find('.bullet')

    this.imgCt.css({
        width: this.itemCount* this.itemWidth
    })

    this.curIdx = 0
    this.isAnimate = false

    this.init()
}

Carousel.prototype = {
    bind: function(){
        var _this = this
        _this.pre.on('click',function(){
            _this.doPre()
        })
        _this.next.on('click',function(){
            _this.doNext()
        })
        _this.bullet.find('li').on('click',function(){
            var idx = $(this).index()
            if(idx<_this.curIdx){
                _this.doPre(_this.curIdx- idx)
            }
            else{
                _this.doNext(idx- _this.curIdx)
            }
        })
    },

    doPre: function(idx){
        var _this = this
        idx = idx || 1
        if(this.curIdx === 0){
        	return
        }
        if(!_this.isAnimate){
            _this.isAnimate = true
            _this.doScaleLeft()
            _this.imgCt.animate({
                left: '+=' + _this.itemWidth* idx
            },function(){
                _this.curIdx--
                _this.setBullet()
                _this.isAnimate = false
            })
        }
    },

    doNext: function(idx){
        var _this = this
        idx = idx || 1
        if(this.curIdx === 3){
        	return
        }
        if(!_this.isAnimate){
            _this.isAnimate = true
            _this.doScaleRight()
            _this.imgCt.animate({
                left: '-=' + _this.itemWidth* idx
            },function(){
                _this.curIdx++
                _this.setBullet()
                _this.isAnimate = false
            })
        }
    },

    doScaleRight: function(){
    	this.item.removeClass('active').eq(this.curIdx+2).addClass('active')
    },

    doScaleLeft: function(){
    	this.item.removeClass('active').eq(this.curIdx).addClass('active')
    },

    setBullet: function(){
        this.bullet.children().removeClass('active').eq(this.curIdx).addClass('active') 
   },

    init: function(){
        this.bind()
    }

}

var $carousel1 = $('.mod-carousel')
new Carousel($carousel1)