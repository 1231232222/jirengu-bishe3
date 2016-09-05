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

	// css
	__webpack_require__(5);




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
	        handleWeather(ret)
	    })
	    .fail(function() {
	        console.log("error")
	    });

	    function handleWeather(ret){
	        var $weatherNode = $('.weather'),
	            data = ret.results[0].index[0].des;
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(29)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "* {\n\tbox-sizing: border-box;\n\tmargin: 0;\n\tpadding: 0;\n}\nbody {\n\tfont-family: serif,Arial,\"Microsoft YaHei\",sans-serif;\n\tfont-size: 14px;\n\tline-height: 1.5;\n\tcolor: #fff;\n}\nul,li {\n\tlist-style: none;\n}\na {\n\ttext-decoration: none;\n\tcolor: #fff;\n}\n.layout  {\n\tmax-width: 1008px;\n\tmargin: 0 auto;\n\ttext-align: center;\n}\n.clearfix:after {\n\tcontent: '';\n\tdisplay: block;\n\tclear: both;\n}\n.tri {\n\tdisplay: inline-block;\n\theight: 0;\n\twidth: 0;\n\tborder: 20px solid;\n}\n.tri-left {\n    border-top-color: transparent;\n    border-right-color: transparent;\n    border-bottom-color: transparent;\n    border-left-color: rgb(41,51,77);\n}\n.tri-right {\n    border-top-color: transparent;\n    border-right-color: rgb(41,51,77);\n    border-bottom-color: transparent;\n    border-left-color: transparent;\n}\n/*公共样式结束*/\n\nhtml,body {\n\theight: 100%;\n}\nheader {\n\theight: 100%;\n\tbackground: radial-gradient(rgba(47,47,82,0.6)0%, rgba(47,47,82,0.8)30%,rgba(47,47,82,1)100%);\n\tposition: relative;\n\toverflow: hidden;\n}\n.nav {\n\tposition: absolute;\n\ttop: 40px;\n\tright: 90px;\n\tz-index: 10;\n}\n.nav>ul {\n\tborder: 1px solid #fff;\n\tborder-radius: 10px;\n}\n.nav>ul>li {\n\tfloat: left;\n\tborder-right: 1px solid #fff;\n\tposition: relative;\n}\n.nav>ul>li>a {\n\tdisplay: block;\n\tpadding: 10px 30px;\n}\n.nav>ul>li:hover {\n\tfont-weight: bold;\n}\n.nav>ul>li:hover .mod-nav {\n\tdisplay: block;\n}\n.nav .mod-nav {\n\tdisplay: none;\n\tposition: absolute;\n\ttop: 100%;\n\tleft: 0;\n\twidth: 100%;\n\tpadding-top: 20px;\n\ttext-align: center;\n}\n.mod-nav ul {\n\tborder: 1px solid #fff;\n\tborder-radius: 10px;\n}\n.mod-nav li {\n\tborder-bottom: 1px solid #fff;\n}\n.mod-nav a {\n\tdisplay: block;\n\tpadding: 10px 5px;\n}\n.layer {\n\theight: 100%;\n\tposition: relative;\n}\n.layer .layer-logo {\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%,-50%);\n\tbackground-size: contain;\n\tbackground: url(" + __webpack_require__(8) + ") no-repeat center center;\n\twidth: 50%;\n\theight: 360px;\n}\n.layer-monster div {\n\twidth: 150px;\n\theight: 150px;\n\tborder-radius: 50%;\n\tposition: absolute;\n\tbottom: -100px;\n\tleft: 30px;\n\ttext-align: center;\n\tbackground-color: rgb(47,47,82);\n\tz-index: 10;\n}\n.layer-monster .chat {\n\tleft: 200px;\n}\n.layer-monster img {\n\theight: 80px;\n\tmargin-top: -25px;\n}\n.layer-mountain {\n\theight: 100%;\n\tposition: relative;\n}\n.layer-mountain div {\n\theight: 100%;\n\twidth: 100%;\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 0;\n\tbackground-size: 100%  500px;\n}\n.lm1 {\n\tbackground: url(" + __webpack_require__(9) + ") center bottom no-repeat;\n\tz-index: 5;\n}\n.lm2 {\n\tbackground: url(" + __webpack_require__(10) + ") center bottom no-repeat;\n\tz-index: 3;\n}\n.lm3 {\n\tbackground: url(" + __webpack_require__(11) + ") center bottom no-repeat;\n\tz-index: 2;\n}\n.layer-star div{\n\twidth: 5px;\n\theight: 5px;\n\tbackground: url(" + __webpack_require__(12) + ") no-repeat;\n\tbackground-size: cover;\n\tposition: absolute;\n\tanimation: blink 3s infinite;\n}\n.ls1 {\n\ttop: 33%;\n\tleft: 16%;\n}\n.layer-star div.ls2 {\n\ttop: 60%;\n\tleft: 13%;\n\tanimation-delay: 1.5s;\n}\n.ls3 {\n\ttop: 41%;\n\tleft: 40%;\n}\n.layer-star div.ls4 {\n\tright: 10%;\n\tbottom: 40%;\n\tanimation-delay: 1.5s;\n}\n.ls5 {\n\tright: 25%;\n\tbottom: 70%;\n}\n@keyframes blink\n{\n\t50% {\n\t\ttransform: scale(5);\n\t}\n}\n.layer-meteor div {\n\twidth: 80px;\n\theight: 80px;\n\tbackground: url(" + __webpack_require__(13) + ") no-repeat;\n\tposition: absolute;\n\tz-index: 2;\n}\n.lmt1 {\n\ttop: 0;\n\tleft: 50%;\n\tanimation: slide1 5s linear  infinite;\n}\n.lmt2 {\n\ttop: 0;\n\tright: 0;\n\tanimation: slide2 5s linear  infinite;\n}\n@keyframes slide1\n{\n\t99.9% {\n\t\ttop: 70%;\n\t\tleft: 0;\n\t}\n\t100% {\n\t\tvisibility: hidden;\n\t}\n}\n@keyframes slide2\n{\n\t99.9% {\n\t\ttop: 100%;\n\t\tright: 40%;\n\t}\n\t100% {\n\t\tvisibility: hidden;\n\t}\n}\n.layer-galaxy div {\n\theight: 600px;\n\twidth: 100%;\n\tposition: absolute;\n\tbottom: 100px;\n\tbackground: url(" + __webpack_require__(14) + ") no-repeat;\n\tbackground-size: cover;\n}\n.lg1 {\n\tleft: 0;\n\tanimation: galaxy1 150s infinite linear;\n}\n.lg2 {\n\tleft: 100%;\n\tanimation: galaxy2 150s infinite linear;\n}\n@keyframes galaxy1\n{\n\t99.9% {\n\t\tleft: -100%;\n\t}\n\t100% {\n\t\tvisibility: hidden;\n\t}\n}\n@keyframes galaxy2\n{\n\t99.9% {\n\t\tleft: 0;\n\t}\n\t100% {\n\t\tvisibility: hidden;\n\t}\n}\n.layer-weather {\n\twidth: 50px;\n\theight: 50px;\n\tbackground: url(" + __webpack_require__(15) + ");\n\tposition: absolute;\n\tright: -100px;\n\ttop: 150px;\n\tz-index: 11;\n\tanimation: weather 20s infinite linear;\n}\n.layer-weather:hover {\n\tanimation-play-state: paused;\n}\n@keyframes weather\n{\n\t90% {\n\t\ttransform: translateX(-1500px);\n\t}\n\t99.9% {\n\t\ttransform: translateX(-1500px);\n\t}\n\t100% {\n\t\tvisibility: hidden;\n\t}\n}\n.layer-weather a {\n\tfont-size: 12px;\n}\n.weather-wrap {\n\twidth: 200px;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden;\n\tborder: 1px solid #fff;\n\tborder-radius: 8px;\n\tposition: absolute;\n\ttop: -26px;\n\tleft: -60px;\n\tpadding: 3px;\n}\n/*header结束*/\n\n#carousel {\n\tbackground-color: rgb(47,47,82);\n}\n#carousel h2 {\n\tfont-size: 32px;\n\tpadding-top: 20px;\n\tpadding-bottom: 20px;\n}\n.mod-carousel li a {\n\tdisplay: block;\n\twidth: 300px;\n\theight: 300px;\n\tpadding: 20px;\n\ttext-align: right;\n\tbackground-size: cover;\n\tbackground-color: rgb(41,57,77);\n}\n.mod-carousel li {\n\tfloat: left;\n\tborder: 18px solid #fff;\n\ttransition: all 0.3s;\n}\n.mod-carousel ul {\n\tposition: relative;\n}\n.mod-carousel {\n\theight: 600px;\n\toverflow: hidden;\n\tposition: relative;\n\tpadding-top: 50px;\n}\n.mod-carousel hr {\n\twidth: 50px;\n\theight: 8px;\n\tbackground-color: rgb(0,189,177);\n\tborder: none;\n}\n.mod-carousel h3 {\n\tfont-size: 30px;\n\tpadding-top: 15px;\n\tpadding-bottom: 10px;\n}\n.mod-carousel p {\n\tfont-size: 20px;\n\tpadding-bottom: 20px;\n}\n.mod-carousel span {\n\tdisplay: block;\n\tpadding-top: 15px;\n\tpadding-bottom: 15px;\n\tfont-size: 20px;\n}\n.mod-carousel .tri {\n\tposition: absolute;\n}\n.mod-carousel .tri-left {\n\ttop: 200px;\n\tright: -22px;\n}\n.mod-carousel .tri-right {\n\ttop: 200px;\n\tleft: -22px;\n}\n.tri-left.active {\n\tborder-left-color: #ccc;\n}\n.tri-right.active {\n\tborder-right-color: #ccc;\n}\n.mod-carousel li:nth-child(1)>a {\n\tbackground-image: url(" + __webpack_require__(16) + ");\n}\n.mod-carousel li:nth-child(2)>a {\n\tbackground-image: url(" + __webpack_require__(17) + ");\n}\n.mod-carousel li:nth-child(3)>a {\n\tbackground-image: url(" + __webpack_require__(18) + ");\n}\n.mod-carousel li:nth-child(4)>a {\n\tbackground-image: url(" + __webpack_require__(19) + ");\n}\n.mod-carousel li:nth-child(5)>a {\n\tbackground-image: url(" + __webpack_require__(20) + ");\n}\n.mod-carousel li:nth-child(6)>a{\n\tbackground-image: url(" + __webpack_require__(20) + ");\n}\n.mod-carousel li.active {\n\ttransform: scale(1.2);\n\tz-index: 9;\n}\n.mod-carousel li a:hover {\n\tcolor: #000;\n\tbackground-color: #fff;\n\tborder: 10px solid #000;\n}\n/*carousel结束*/\n\n#tree {\n\tbackground-color: rgb(47,47,82);\n\tpadding-top: 50px;\n\tposition: relative;\n\toverflow: hidden;\n}\n#tree h2 {\n\tfont-size: 32px;\n\tpadding-bottom: 30px;\n}\n#tree p {\n\tfont-size: 16px;\n\tpadding-bottom: 10px;\n}\n.mod-tree {\n\twidth: 500px;\n\theight: 500px;\n\tmargin: 0 auto;\n\tbackground: url(" + __webpack_require__(21) + ") center center no-repeat;\n\tbackground-size: cover;\n\tposition: relative;\n\tz-index: 2;\n}\n.mod-tree img {\n\tposition: absolute;\n\twidth: 55px;\n\theight: 45px;\n}\n.mod-tree h3 {\n\tfont-size: 24px;\n\tposition: absolute;\n}\n.mod-tree p {\n\tborder: 1px solid #fff;\n\twidth: 250px;\n\theight: 100px;\n\tborder-radius: 8px;\n\tposition: absolute;\n}\n.mod-tree h3.m1 {\n\ttop: 27px;\n\tright: -8px;\n}\n.mod-tree img.m1 {\n\ttop: 80px;\n\tright: 140px;\n}\n.mod-tree p.m1 {\n\ttop: 86px;\n\tright: -160px;\n}\n.mod-tree h3.m2 {\n\ttop: 90px;\n\tleft: 20px;\n}\n.mod-tree img.m2 {\n\ttop: 127px;\n\tleft: 192px;\n}\n.mod-tree p.m2 {\n\ttop: 147px;\n\tleft: -141px;\n}\n.mod-tree h3.m3 {\n\ttop: 307px;\n\tleft: -8px;\n}\n.mod-tree img.m3 {\n\ttop: 315px;\n\tleft: 170px;\n}\n.mod-tree p.m3 {\n\ttop: 355px;\n\tleft: -210px;\n}\n.mod-tree h3.m4 {\n\tbottom: 200px;\n\tright: -70px;\n}\n.mod-tree img.m4 {\n\tbottom: 200px;\n\tright: 95px;\n}\n.mod-tree p.m4 {\n\tbottom: 70px;\n\tright: -230px;\n}\n.mod-paper {\n\twidth: 650px;\n\tmargin: 0 auto;\n\tpadding-top: 50px;\n\tpadding-bottom: 50px;\n\ttext-align: left;\n\tposition: relative;\n\tz-index: 2;\n}\n.mod-paper img {\n\tfloat: left;\n\twidth: 270px;\n\theight: 200px;\n\tleft: 220px;\n}\n#tree .mod-paper h2 {\n\tpadding-bottom: 10px;\n}\n.paper li {\n\tlist-style-type: disc;\n}\n.paper ul {\n\tfloat: left;\n}\n.paper ul.p2 {\n\tfloat: right;\n}\n.paper a {\n\tdisplay: inline-block;\n\tbackground-color: #e36265;\n\tborder-radius: 10px;\n\tpadding: 5px 10px ;\n\tposition: absolute;\n\tright: 305px;\n\tbottom: 70px;\n}\n.tree-bg div {\n\theight: 1000px;\n\twidth: 100%;\n\tbackground-size: contain;\n\tposition: absolute;\n}\n.tb1 {\n\tbackground: url(" + __webpack_require__(22) + ");\n\ttop: 197px;\n}\n.tb2 {\n\tbackground: url(" + __webpack_require__(23) + ");\n\ttop: 250px;\n}\n.tb3 {\n\tbackground: url(" + __webpack_require__(24) + ") no-repeat;\n\ttop: 200px;\n}\n/*tree结束*/\n\n#notice {\n\tbackground-color: rgb(47,47,82);\n\ttext-align: center;\n}\n#notice h2 {\n\tfont-size: 32px;\n\tpadding-top: 30px;\n\tpadding-bottom: 20px;\n}\n.notice-carousel {\n\toverflow: hidden;\n\tbackground-color: rgb(37,37,69);\n\tposition: relative;\n}\n.notice-carousel .layout {\n\twidth: 1200px;\n\tmargin: 0 auto;\n\toverflow: hidden;\n}\n.notice-carousel>a {\n\tposition: absolute;\n\ttop: 50%;\n}\n.notice-carousel .tri-left {\n\tborder-left-color: rgb(247,136,1);\n\tright: 0;\n}\n.notice-carousel .tri-right {\n\tborder-right-color: rgb(247,136,1);\n\tleft: 0;\n}\n.notice-carousel .tri-left.active {\n\tborder-left-color: #ccc;\n}\n.notice-carousel .tri-right.active {\n\tborder-right-color: #ccc;\n}\n.notice-carousel ul {\n\tposition: relative;\n}\n.notice-carousel li {\n\twidth: 1200px;\n\theight: 400px;\n\tfloat: left;\n}\n.notice-carousel li:nth-child(1) {\n\tbackground: url(" + __webpack_require__(25) + ") no-repeat;\n\tbackground-size: cover;\n}\n.notice-carousel li:nth-child(2) {\n\tbackground: url(" + __webpack_require__(26) + ") no-repeat;\n\tbackground-size: contain;\n}\n.notice-carousel li:nth-child(3) {\n\tbackground: url(" + __webpack_require__(27) + ") no-repeat;\n\tbackground-size: contain;\n}\n.notice-carousel li:nth-child(4) {\n\tbackground: url(" + __webpack_require__(28) + ") no-repeat;\n\tbackground-size: contain;\n}\n.notice-title {\n\tbackground-color: rgb(142,147,165);\n\tposition: relative;\n\tz-index: 2;\n}\n.notice-title li {\n\tfont-size: 16px;\n\tfloat: left;\n\tpadding-top: 40px;\n\tmargin-bottom: 60px;\n\tpadding-right: 100px;\n}\n.notice-title li:first-child {\n\tpadding-left: 200px;\n}\n.notice-title li.hover a {\n\tcolor: rgb(37,37,69);\n\tfont-weight: bold;\n    border-top-color: rgb(41,51,77);\n    border-left-color: rgb(41,51,77);\n}\n.arrow {\n\tdisplay: inline-block;\n\theight: 0;\n\twidth: 0;\n\tborder: 15px solid rgb(142, 147, 165);\n\tborder-right-color: transparent;\n\tborder-bottom-color: transparent;\n\tposition: absolute;\n}\n.arrow.a1 {\n\ttop: 0;\n\tleft: 238px;\n}\n.arrow.a2 {\n\ttop: 0;\n\tleft: 441px;\n}\n.arrow.a3 {\n\ttop: 0;\n\tleft: 634px;\n}\n.arrow.a4 {\n\ttop: 0;\n\tleft: 822px;\n}\n.contact {\n\tbackground-color: rgb(142,147,165);\n\tposition: relative;\n}\n.contact p {\n\tfont-size: 20px;\n\tcolor: #000;\n\tpadding-bottom: 15px;\n\tpadding-top: 80px;\n}\n.contact div {\n\twidth: 100px;\n\theight: 100px;\n\tborder-radius: 50%;\n\tposition: absolute;\n\tbackground-color: rgb(47,47,82);\n\tz-index: 5;\n}\n.contact img {\n\twidth: 70px;\n\theight: 70px;\n}\n.contact .mc1 {\n\tbottom: -28px;\n\tleft: 20px;\n}\n.contact .mc2 {\n\tbottom: -28px;\n\tleft: 150px;\n}\n.contact .weibo {\n\tbottom: -28px;\n\tright: 150px;\n\twidth: 60px;\n\theight: 60px;\n}\n.contact .weibo img {\n\tposition: absolute;\n\ttop: -28px;\n\tright: -4px;\n}\n/*notice结束*/\n\nfooter {\n\tbackground-color: rgb(47,47,82);\n\ttext-align: center;\n\tpadding-bottom: 30px;\n\tpadding-top: 20px;\n}\nfooter a {\n\tfont-size: 12px;\n}\nfooter li {\n\tdisplay: inline-block;\n}\n/*footer结束*/", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/b7bba005.jirengu_logo.png";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/c4456edb.mountain1.png";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/4d59993a.mountain2.png";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/86152ac7.mountain3.png";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/57ab48d6.star.png";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/efdf6e93.meteor.png";

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/a4607c5f.shadow.png";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/e221ed79.notice3.gif";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/f657fc0d.bg0.png";

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/fc06da81.bg1.png";

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/dbe511d4.bg2.png";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/5603f651.bg3.png";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/ce5efcd6.bg4.png";

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/2bf54c66.intro-mountain.png";

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/27549838.intro-bg1.png";

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/b3f8d3c7.intro-bg2.png";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/8d30e9cf.intro-star.png";

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/38f60e2a.n1.png";

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/490b4ce7.n2.png";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/7c6c5c03.n3.png";

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/85edce06.n4.png";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);