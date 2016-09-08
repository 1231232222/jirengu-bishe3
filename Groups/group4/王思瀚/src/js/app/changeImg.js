// $('.monster-blue').find('img').on('mouseenter',function(e){
//     $(this).attr('src','./img/talk.gif')
// })
// $('.monster-blue').find('img').on('mouseleave',function(e){
//     $(this).attr('src','./img/talk.png')
// })
// $('.inner-nav-ul').find('img').on('mouseenter',function(){
//     $(this).attr('src','./img/lm.jpg')
// })
// $('.inner-nav-ul').find('img').on('mouseleave',function(){
//     $(this).attr('src','./img/small.jpg')
// })
// $('.contact-img1').find('img').on('mouseenter',function(){
//     $(this).attr('src','./img/footer/qq2-hover.png')
// })
// $('.contact-img1').find('img').on('mouseleave',function(){
//     $(this).attr('src','./img/footer/qq2.png')
// })
// $('.contact-img2').find('img').on('mouseenter',function(){
//     $(this).attr('src','./img/footer/qq3-hover.png')
// })
// $('.contact-img2').find('img').on('mouseleave',function(){
//     $(this).attr('src','./img/footer/qq3.png')
// })
//

define(['jquery'],function($){
  var changeImg = {
    init: function(){
      this.monsterblue = $('.monster-blue');
      this.innernavul = $('.inner-nav-ul');
      this.contactimg1 = $('.contact-img1');
      this.contactimg2 = $('.contact-img2');
    },
    bind: function(){
      this.monsterblue.find('img').on('mouseenter',function(e){
          $(this).attr('src','./img/talk.gif');
      })
      this.monsterblue.find('img').on('mouseleave',function(e){
          $(this).attr('src','./img/talk.png');
      })
      this.innernavul.find('img').on('mouseenter',function(){
          $(this).attr('src','./img/lm.jpg')
      })
      this.innernavul.find('img').on('mouseleave',function(){
          $(this).attr('src','./img/small.jpg')
      })
      this.contactimg1.find('img').on('mouseenter',function(){
          $(this).attr('src','./img/footer/qq2-hover.png')
      })
      this.contactimg1.find('img').on('mouseleave',function(){
          $(this).attr('src','./img/footer/qq2.png')
      })
      this.contactimg2.find('img').on('mouseenter',function(){
          $(this).attr('src','./img/footer/qq3-hover.png')
      })
      this.contactimg2.find('img').on('mouseleave',function(){
          $(this).attr('src','./img/footer/qq3.png')
      })
    },
    open:function(){
      this.init();
      this.bind();
    }
  };
  return changeImg;
});
