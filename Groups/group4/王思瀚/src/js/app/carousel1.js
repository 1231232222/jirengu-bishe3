// function carousel($dom){
//     this.$cur = $dom;
//     this.$ul = this.$cur.find('.carousel-warp');
//     this.$list = this.$ul.find('.list');
//     this.imgCount = this.$list.size();
//     this.$list.css({
//         'width':this.$cur.outerWidth() / 3,
//         'height':this.$list.width()
//     });
//     this.$ul.css({
//         'width':this.imgCount * this.$list.width()+300,
//         //会宽度不够变成两行，如果不加的话
//         'height':this.$list.height()
//     });
//     this.next = this.$cur.find('.next');
//     this.pre = this.$cur.find('.pre');
//     this.isAnimate = true;
//     this.num = 1;
//     this.bind();
// }
//
// carousel.prototype = {
//     bind: function(){
//         var me = this;
//         me.next.on('click',function(e){
//             e.preventDefault();
//             me.playNext();
//         });
//         me.pre.on('click',function(e){
//             e.preventDefault();
//             me.playPre();
//         });
//         $(window).on('resize',function(){
//             if ($(document).width() < 1400) {
//                 me.$list.css({
//                     'width':me.$cur.width() / 3,
//                     'height': me.$cur.width() / 3
//                 });
//                 me.$cur.css({
//                     'height':me.$ul.height()+200
//                 });
//                 me.$ul.css({
//                     'width':me.imgCount * me.$list.outerWidth(),
//                     'height':me.$list.height(),
//                 });
//             }
//         });
//     },
//     playNext: function(){
//         var me = this;
//         if (me.isAnimate && me.num !== me.imgCount -2) {
//             me.isAnimate = false;
//             me.num++;
//             console.log(me.num);
//             me.$ul.animate({left:'-='+me.$list.outerWidth(true)},500,function(){
//                 me.isAnimate = true;
//             });
//             me.$list.eq(me.num).css({'transform':'scale(1.2)','z-index':'15'});
//             me.$list.eq(me.num).siblings().css({'transform':'scale(1)','z-index':'9'});
//         }
//         if (me.num == 3) {
//             me.next.css({'border-left':'16px solid #ccc'});
//         }
//         if (me.num !== 1) {
//             me.pre.css({'border-right':'16px solid #2E2E4F'});
//         }
//     },
//     playPre: function(){
//         var me = this;
//         if (me.isAnimate && me.num !== 1) {
//             me.isAnimate = false;
//             me.num--;
//             console.log(me.num);
//             me.$ul.animate({left:'+='+me.$list.outerWidth(true)},500,function(){
//                 me.isAnimate = true;
//             });
//             me.$list.eq(me.num).css({'transform':'scale(1.2)','z-index':'15'});
//             me.$list.eq(me.num).siblings().css({'transform':'scale(1)','z-index':'9'});
//         }
//         if (me.num == 1) {
//             me.pre.css({'border-right':'16px solid #ccc'});
//         }
//         if (me.num !== 3) {
//             me.next.css({'border-left':'16px solid #2E2E4F'});
//         }
//     }
// };
// var c1 = new carousel($('.carousel'));


define(['jquery'],function($){
  var carousel1 = {
    init: function($dom){
      this.$cur = $dom;
      this.$ul = this.$cur.find('.carousel-warp');
      this.$list = this.$ul.find('.list');
      this.imgCount = this.$list.size();
      this.$list.css({
          'width':this.$cur.outerWidth() / 3,
          'height':this.$list.width()
      });
      this.$ul.css({
          'width':this.imgCount * this.$list.width()+300,
          //会宽度不够变成两行，如果不加的话
          'height':this.$list.height()
      });
      this.next = this.$cur.find('.next');
      this.pre = this.$cur.find('.pre');
      this.isAnimate = true;
      this.num = 1;
      this.bind();
    },
    bind: function(){
      var me = this;
      me.next.on('click',function(e){
          e.preventDefault();
          me.playNext();
      });
      me.pre.on('click',function(e){
          e.preventDefault();
          me.playPre();
      });
      $(window).on('resize',function(){
          if ($(document).width() < 1400) {
              me.$list.css({
                  'width':me.$cur.width() / 3,
                  'height': me.$cur.width() / 3
              });
              me.$cur.css({
                  'height':me.$ul.height()+200
              });
              me.$ul.css({
                  'width':me.imgCount * me.$list.outerWidth(),
                  'height':me.$list.height(),
              });
          }
      });
    },
    playNext:function(){
        var me = this;
        if (me.isAnimate && me.num !== me.imgCount -2) {
            me.isAnimate = false;
            me.num++;
            console.log(me.num);
            me.$ul.animate({left:'-='+me.$list.outerWidth(true)},500,function(){
                me.isAnimate = true;
            });
            me.$list.eq(me.num).css({'transform':'scale(1.2)','z-index':'15'});
            me.$list.eq(me.num).siblings().css({'transform':'scale(1)','z-index':'9'});
        }
        if (me.num == 3) {
            me.next.css({'border-left':'16px solid #ccc'});
        }
        if (me.num !== 1) {
            me.pre.css({'border-right':'16px solid #2E2E4F'});
        }
    },
    playPre:function(){
        var me = this;
        if (me.isAnimate && me.num !== 1) {
            me.isAnimate = false;
            me.num--;
            console.log(me.num);
            me.$ul.animate({left:'+='+me.$list.outerWidth(true)},500,function(){
                me.isAnimate = true;
            });
            me.$list.eq(me.num).css({'transform':'scale(1.2)','z-index':'15'});
            me.$list.eq(me.num).siblings().css({'transform':'scale(1)','z-index':'9'});
        }
        if (me.num == 1) {
            me.pre.css({'border-right':'16px solid #ccc'});
        }
        if (me.num !== 3) {
            me.next.css({'border-left':'16px solid #2E2E4F'});
        }
    },
    open:function(){
      this.init($('.carousel'));
      this.bind();
    }
  };
  return carousel1;
});
