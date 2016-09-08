// /**
//  * Created by envy on 2016/8/24.
//  */
// var $header = $('.header');
// var $content = $('.tree');
// var $m1 = $('.m1'),
//         $m2 = $('.m2'),
//         $m3 = $('.m3'),
//         $b1 = $('.tree-bg1'),
//         $b2 = $('.tree-bg2');
//
// $header.on('mousemove',function(e){
//     var winH = $(window).height() / 2;
//     var winW = $(window).width() / 2;
//     var mX = e.pageX;
//     var mY = e.pageY;
//         $m1.css({
//             'transform': 'translate('+ Math.abs((mX-winW)/60 )+'px,'+Math.abs((mY-winH)/60) +'px)'
//         });
//         $m2.css({
//             'transform': 'translate('+ Math.abs((mX-winW)/50) +'px,'+Math.abs((mY-winH)/50) +'px)'
//         });
//         $m3.css({
//             'transform': 'translate('+Math.abs( (mX-winW)/40) +'px,'+Math.abs((mY-winH)/40) +'px)'
//         });
// })
//
// $content.on('mousemove',function(e){
//     var winH = $(window).height() / 2;
//     var winW = $(window).width() / 2;
//     var mX = e.pageX;
//     var mY = e.pageY;
//     $b1.css({
//         'transform': 'translate('+ Math.abs((mX-winW)/60 )+'px,'+Math.abs((mY-winH)/60) +'px)'
//     });
//     $b2.css({
//         'transform': 'translate('+ Math.abs((mX-winW)/50) +'px,'+Math.abs((mY-winH)/50) +'px)'
//     });
// })
//

define(['jquery'],function($){
  var parallax2 = {
    init: function(){
      this.$header = $('.header');
      this.$content = $('.tree');
      this.$m1 = $('.m1');
      this.$m2 = $('.m2');
      this.$m3 = $('.m3');
      this.$b1 = $('.tree-bg1');
      this.$b2 = $('.tree-bg2');
    },
    bind:function(){
      var me = this;
      me.$header.on('mousemove',function(e){

          me.winH = $(window).height() / 2;
          me.winW = $(window).width() / 2;
          me.mX = e.pageX;
          me.mY = e.pageY;
              me.$m1.css({
                  'transform': 'translate('+ Math.abs((me.mX-me.winW)/60 )+'px,'+Math.abs((me.mY-me.winH)/60) +'px)'
              });
              me.$m2.css({
                  'transform': 'translate('+ Math.abs((me.mX-me.winW)/50) +'px,'+Math.abs((me.mY-me.winH)/50) +'px)'
              });
              me.$m3.css({
                  'transform': 'translate('+Math.abs((me.mX-me.winW)/40) +'px,'+Math.abs((me.mY-me.winH)/40) +'px)'
              });
      });
      me.$content.on('mousemove',function(e){
        
          me.winH = $(window).height() / 2;
          me.winW = $(window).width() / 2;
          me.mX = e.pageX;
          me.mY = e.pageY;
          me.$b1.css({
              'transform': 'translate('+ Math.abs((me.mX-me.winW)/60 )+'px,'+Math.abs((me.mY-me.winH)/60) +'px)'
          });
          me.$b2.css({
              'transform': 'translate('+ Math.abs((me.mX-me.winW)/50) +'px,'+Math.abs((me.mY-me.winH)/50) +'px)'
          });
      });

    },
    open:function(){
      this.init();
      this.bind();
    }
  };
  return parallax2;
});
