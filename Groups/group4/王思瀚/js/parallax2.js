/**
 * Created by envy on 2016/8/24.
 */
var $header = $('.header');
var $content = $('.tree');
var $m1 = $('.m1'),
        $m2 = $('.m2'),
        $m3 = $('.m3'),
        $b1 = $('.tree-bg1'),
        $b2 = $('.tree-bg2');

$header.on('mousemove',function(e){
    var winH = $(window).height() / 2;
    var winW = $(window).width() / 2;
    var mX = e.pageX;
    var mY = e.pageY;
        $m1.css({
            'transform': 'translate('+ Math.abs((mX-winW)/60 )+'px,'+Math.abs((mY-winH)/60) +'px)'
        });
        $m2.css({
            'transform': 'translate('+ Math.abs((mX-winW)/50) +'px,'+Math.abs((mY-winH)/50) +'px)'
        });
        $m3.css({
            'transform': 'translate('+Math.abs( (mX-winW)/40) +'px,'+Math.abs((mY-winH)/40) +'px)'
        });
})

$content.on('mousemove',function(e){
    var winH = $(window).height() / 2;
    var winW = $(window).width() / 2;
    var mX = e.pageX;
    var mY = e.pageY;
    $b1.css({
        'transform': 'translate('+ Math.abs((mX-winW)/60 )+'px,'+Math.abs((mY-winH)/60) +'px)'
    });
    $b2.css({
        'transform': 'translate('+ Math.abs((mX-winW)/50) +'px,'+Math.abs((mY-winH)/50) +'px)'
    });
})