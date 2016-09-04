// hover更换图片
function hoverChange($node){
	this.imgSrc = $node.attr('data-img');
	this.gifSrc = $node.attr('data-gif');
	this.bind($node)
}

hoverChange.prototype.bind = function($node){
	var _this = this;
	$node.on('mouseover', function(){
		$node.attr('src', _this.gifSrc)
	});
	$node.on('mouseout', function(){
		$node.attr('src', _this.imgSrc)
	})
};

var $talk = $(".chat img");
var $qq = $('.contact img');
new hoverChange($talk);  // 首屏hover
$qq.each(function(){    
	new hoverChange($(this)); // 底部hover
});


// carousel
function Carousel($node){
    this.imgCt = $node.find('ul');
    this.item = this.imgCt.find('li');
    this.itemWidth = this.item.outerWidth(true);
    this.itemCount = this.item.length;
    this.pre = $node.find('.tri-right');
    this.next = $node.find('.tri-left');
    this.Title = $('.notice-title');

    this.imgCt.css({
        width: this.itemCount* this.itemWidth
    });

    this.curIdx = 0;
    this.isAnimate = false;

    this.bind()
}

Carousel.prototype = {
    bind: function(){
        var _this = this;
        _this.pre.on('click',function(){
            _this.doPre()
        });
        _this.next.on('click',function(){
            _this.doNext()
        });
        _this.Title.find('li').on('mouseenter',function(){
            var idx = $(this).index();
            if(idx<_this.curIdx){
                _this.doPre(_this.curIdx- idx)
            }
            else{
                _this.doNext(idx- _this.curIdx)
            }
        })
    },

    doPre: function(idx){
        var _this = this;
        idx = idx || 1;
        if(this.curIdx === 0){
            _this.pre.addClass('active');
        	return
        }
        if(!_this.isAnimate){
            _this.isAnimate = true;
            _this.doScaleLeft();
            _this.imgCt.animate({
                left: '+=' + _this.itemWidth* idx
            },function(){
                _this.curIdx = (_this.itemCount+ _this.curIdx- idx)% _this.itemCount;
                _this.setTitle();
                _this.isAnimate = false
            })
        }
    },

    doNext: function(idx){
        var _this = this;
        idx = idx || 1;
        if(this.curIdx === 3){
            _this.next.addClass('active');
        	return
        }
        if(!_this.isAnimate){
            _this.isAnimate = true;
            _this.doScaleRight();
            _this.imgCt.animate({
                left: '-=' + _this.itemWidth* idx
            },function(){
                _this.curIdx = (_this.curIdx+ idx)% _this.itemCount;
                _this.setTitle();
                _this.isAnimate = false
            })
        }
    },

    doScaleRight: function(){
    	this.item.removeClass('active').eq(this.curIdx+2).addClass('active');
        this.pre.removeClass('active')
    },

    doScaleLeft: function(){
    	this.item.removeClass('active').eq(this.curIdx).addClass('active');
        this.next.removeClass('active')
    },

    setTitle: function(){
        this.Title.children().removeClass('hover').eq(this.curIdx).addClass('hover') 
   }
};

var $carousel1 = $('.mod-carousel');
new Carousel($carousel1); // 顶部轮播

var $carousel2 = $('.notice-carousel');
new Carousel($carousel2);  // 底部轮播


// weather
$.ajax({
    url: 'http://api.jirengu.com/weather.php',
    type: 'get',
    dataType: 'jsonp',
    jsonpCallback: 'getWeather'
})
.done(function(ret) {
    handleWeather(ret.results[0].index[0].des)
})
.fail(function() {
    console.log("error")
});

function handleWeather(data){
    var $weatherNode = $('.weather');
    $weatherNode.text(data);
    $weatherNode.attr('title', data)
}


// mountain
function tinyShake($node){
    this.lm1 = $('.lm1');
    this.lm2 = $('.lm2');
    this.lm3 = $('.lm3');
    this.tb1 = $('.tb1');
    this.tb2 = $('.tb2');

    this.bind($node)
}

tinyShake.prototype.bind = function ($node){
    var _this = this;
    $node.on('mouseenter', function(e){
        _this.x = e.pageX;
        _this.y = e.pageY
    });
    $node.on('mousemove', function(e){
        var x = e.pageX-_this.x;
        var y = e.pageY-_this.y;
        _this.lm1.css('transform', 'translate('+x/200+'px,'+y/150+'px)');
        _this.lm2.css('transform', 'translate('+x/150+'px,'+y/100+'px)');
        _this.lm3.css('transform', 'translate('+x/100+'px,'+y/50+'px)');

        _this.tb1.css('transform', 'translate('+x/200+'px,'+y/100+'px)');
        _this.tb2.css('transform', 'translate('+x/150+'px,'+y/50+'px)');
    })
};

var $layer = $('.layer');
new tinyShake($layer);

var $tree = $('#tree');
new tinyShake($tree);