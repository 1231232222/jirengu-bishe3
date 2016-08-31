$.fn.carousel = function(width, active, fn) {
  var $container = this;
  var items = $container.find('ul>li');
  var itemTag = active;
  fn(items.eq(-1), items.eq(itemTag));
  var itemCount = items.length;
  var $ul = $container.find('ul');
  items.outerWidth(width);
  $container.find('ul').css({'width': itemCount * width});
  $container.find('.pre-btn').on('click',function (e) {
    e.preventDefault();
    action(1);
  });
  $container.find('.next-btn').on('click', function (e) {
    e.preventDefault();
    action(-1);
  });
  function action(index) {
    var x = index * width + $ul.offset().left;
    if (x > 0 || x < $container.width() - $ul.width()) {
      return;
    }
    fn(items.eq(itemTag), items.eq(itemTag - index));
    itemTag -= index;
    $ul.animate({'left': x}, 800);
  }
}
