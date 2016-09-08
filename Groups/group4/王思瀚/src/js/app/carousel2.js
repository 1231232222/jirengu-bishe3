// /**
//  * Created by envy on 2016/8/31.
//  */
// function carousel2($dom){
//     this.$cur = $dom;
//     this.$ul = this.$cur.find('.carousel2-wrap');
//     this.$list = this.$ul.find('.list');
//     console.log(this.$list);
//     this.imgCount = this.$list.size();
//     this.$list.css({
//         'width':$(window).width()
//     });
//     this.$ul.css({
//         'width':this.imgCount * this.$list.width()
//     });
//     this.next = $('.next2');
//     this.pre = $('.pre2');
//     this.tab = $('.tab-wrap');
//     this.li = $('.tab-wrap>li');
//     this.icon = $('.tab-wrap .icon')
//     this.curIdx = 0;
//     this.isAnimate = true;
//     this.bind();
// }
//
// carousel2.prototype = {
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
//         me.tab.find('li').on('mouseenter',function(){
//             var idx = $(this).index();
//             if (idx > me.curIdx) {
//                 me.playNext(idx - me.curIdx);
//             }else if (idx < me.curIdx) {
//                 me.playPre(me.curIdx - idx);
//             }
//         });
//     },
//     playNext:function(num){
//         var num = num || 1;
//         var me = this;
//         if (me.isAnimate && me.curIdx !== 3) {
//             me.isAnimate = false;
//             me.curIdx = me.curIdx + num;
//             me.next.css({'border-left':'16px solid #f78801'});
//             me.$ul.animate({left:'-='+me.$list.width()*num},500,function(){
//                 me.setTab(me.curIdx);
//                 me.isAnimate = true;
//             });
//         }
//         if (me.curIdx == 3) {
//             me.next.css({'border-left':'16px solid #ccc'});
//         }
//         if (me.curIdx !== 0) {
//             me.pre.css({'border-right':'16px solid #f78801'});
//         }
//     },
//     playPre:function(num){
//         var num = num || 1;
//         var me = this;
//         if (me.isAnimate && me.curIdx !== 0) {
//             me.isAnimate = false;
//             me.curIdx = me.curIdx - num;
//             me.pre.css({'border-right':'16px solid #f78801'});
//             me.$ul.animate({left:'+='+me.$list.width()*num},500,function(){
//                 me.setTab(me.curIdx);
//                 me.isAnimate = true;
//             });
//         }
//         if (me.curIdx == 0) {
//             me.pre.css({'border-right':'16px solid #ccc'});
//         }
//         if (me.curIdx !== 3) {
//             me.next.css({'border-left':'16px solid #f78801'});
//         }
//     },
//     setTab:function(idx){
//         var me = this;
//         me.li.eq(idx).addClass('active2').siblings().removeClass('active2');
//         me.li.eq(idx).find('.icon').addClass('bk');
//         me.li.eq(idx).siblings().find('.icon').removeClass('bk');
//     }
// };
// var c2 = new carousel2($('.carousel2'));
//
//

define(['jquery'],function($){
  var carousel2 = {
    init: function($dom){
      this.$cur = $dom;
      this.$ul = this.$cur.find('.carousel2-wrap');
      this.$list = this.$ul.find('.list');
      console.log(this.$list);
      this.imgCount = this.$list.size();
      this.$list.css({
          'width':$(window).width()
      });
      this.$ul.css({
          'width':this.imgCount * this.$list.width()
      });
      this.next = $('.next2');
      this.pre = $('.pre2');
      this.tab = $('.tab-wrap');
      this.li = $('.tab-wrap>li');
      this.icon = $('.tab-wrap .icon');
      this.curIdx = 0;
      this.isAnimate = true;
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
        me.tab.find('li').on('mouseenter',function(){
            var idx = $(this).index();
            if (idx > me.curIdx) {
                me.playNext(idx - me.curIdx);
            }else if (idx < me.curIdx) {
                me.playPre(me.curIdx - idx);
            }
        });
    },
    playNext:function(num){
        var num = num || 1;
        var me = this;
        if (me.isAnimate && me.curIdx !== 3) {
            me.isAnimate = false;
            me.curIdx = me.curIdx + num;
            me.next.css({'border-left':'16px solid #f78801'});
            me.$ul.animate({left:'-='+me.$list.width()*num},500,function(){
                me.setTab(me.curIdx);
                me.isAnimate = true;
            });
        }
        if (me.curIdx == 3) {
            me.next.css({'border-left':'16px solid #ccc'});
        }
        if (me.curIdx !== 0) {
            me.pre.css({'border-right':'16px solid #f78801'});
        }
    },
    playPre:function(num){
        var num = num || 1;
        var me = this;
        if (me.isAnimate && me.curIdx !== 0) {
            me.isAnimate = false;
            me.curIdx = me.curIdx - num;
            me.pre.css({'border-right':'16px solid #f78801'});
            me.$ul.animate({left:'+='+me.$list.width()*num},500,function(){
                me.setTab(me.curIdx);
                me.isAnimate = true;
            });
        }
        if (me.curIdx == 0) {
            me.pre.css({'border-right':'16px solid #ccc'});
        }
        if (me.curIdx !== 3) {
            me.next.css({'border-left':'16px solid #f78801'});
        }
    },
    setTab:function(idx){
        var me = this;
        me.li.eq(idx).addClass('active2').siblings().removeClass('active2');
        me.li.eq(idx).find('.icon').addClass('bk');
        me.li.eq(idx).siblings().find('.icon').removeClass('bk');
    },
    open:function(){
      this.init($('.carousel2'));
      this.bind();
      this.setTab();
    }
  };
  return carousel2;
});
