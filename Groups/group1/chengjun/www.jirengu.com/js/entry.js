 var Weather=require('./Weather'),
 	Carousel=require('./carousel'),
 	Couse=require('./couse'),
 	Move=require('./move'),
 	$=require('./jquery')


 Weather.init();
 $(".imgct").Carousel();
  $(".carousel-course").find(".img-ct").Couse();
 $('.mountain-one').Move(10,0,$("#header"));
$('.mountain-two').Move(5,0,$("#header"));
$('.mountain-thr').Move(15,0,$("#header"));
$('.moun-bg1').Move(3,1,$(".info"));
$('.moun-bg2').Move(7,1,$(".info"));