/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// hover
	var HoverChange = __webpack_require__(1);
	var $talk = $(".chat img");
	var $qq = $('.contact img');
	new HoverChange($talk);
	$qq.each(function(){
	    new HoverChange($(this));
	});

	// carousel
	var Carousel = __webpack_require__(2);
	var $carousel1 = $('.mod-carousel');
	new Carousel($carousel1); // 顶部轮播

	// bigevent
	var $carousel2 = $('.notice-carousel');
	new Carousel($carousel2);  // 底部轮播

	// weather
	var weather = __webpack_require__(3);
	weather();

	// mountain
	var TinyShake = __webpack_require__(4);
	var $layer = $('.layer');
	new TinyShake($layer);

	var $tree = $('#tree');
	new TinyShake($tree);


/***/ },
/* 1 */
/***/ function(module, exports) {

	function HoverChange($node){
	    this.imgSrc = $node.attr('data-img');
	    this.gifSrc = $node.attr('data-gif');
	    this.bind($node)
	}

	HoverChange.prototype.bind = function($node){
	    var _this = this;
	    $node.on('mouseover', function(){
	        $node.attr('src', _this.gifSrc)
	    });
	    $node.on('mouseout', function(){
	        $node.attr('src', _this.imgSrc)
	    })
	};

	module.exports = HoverChange;


/***/ },
/* 2 */
/***/ function(module, exports) {

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

	module.exports = Carousel;


/***/ },
/* 3 */
/***/ function(module, exports) {

	function weather() {
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
	}


	module.exports = weather;


/***/ },
/* 4 */
/***/ function(module, exports) {

	function TinyShake($node){
	    this.lm1 = $('.lm1');
	    this.lm2 = $('.lm2');
	    this.lm3 = $('.lm3');
	    this.tb1 = $('.tb1');
	    this.tb2 = $('.tb2');

	    this.bind($node)
	}

	TinyShake.prototype.bind = function ($node){
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

	module.exports = TinyShake;


/***/ }
/******/ ]);