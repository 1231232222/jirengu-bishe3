// hover
var HoverChange = require('./app/hover');
var $talk = $(".chat img");
var $qq = $('.contact img');
new HoverChange($talk);
$qq.each(function(){
    new HoverChange($(this));
});

// carousel
var Carousel = require('./app/carousel');
var $carousel = $('.mod-carousel');
new Carousel($carousel);

// bigevent
var BigEvent = require('./app/bigevent');
var $bigevent = $('.notice-carousel');
new BigEvent($bigevent);

// weather
var weather = require('./app/weather');
weather();

// mountain
var TinyShake = require('./app/mountain');
var $layer = $('.layer');
new TinyShake($layer);

var $tree = $('#tree');
new TinyShake($tree);


