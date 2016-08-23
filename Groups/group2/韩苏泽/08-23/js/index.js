
// header的moster-talk的动画实现
$('.monster-talk').find('img').on('mouseenter', function() {
  $(this).attr('src','./images/talk.gif');
});

$('.monster-talk').find('img').on('mouseleave', function() {
  $(this).attr('src','./images/talk.png');
});
