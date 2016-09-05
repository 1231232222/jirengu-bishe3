// hover
var HoverChange = require('./hover');
var $talk = $(".chat img");
var $qq = $('.contact img');
new HoverChange($talk);
$qq.each(function(){
    new HoverChange($(this));
});

// carousel
var Carousel = require('./carousel');
var $carousel1 = $('.mod-carousel');
new Carousel($carousel1); // 顶部轮播

// bigevent
var $carousel2 = $('.notice-carousel');
new Carousel($carousel2);  // 底部轮播

// weather
var weather = require('./weather');
weather();

// mountain
var TinyShake = require('./mountain');
var $layer = $('.layer');
new TinyShake($layer);

var $tree = $('#tree');
new TinyShake($tree);

// css
require('./css/style.css');


