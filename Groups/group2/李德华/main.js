var itemWidth = $(window).width() / 3;
$('.class-carousel').height(itemWidth);
$('.class-item').outerHeight(itemWidth);
$('.class-carousel').carousel(itemWidth, 1, function (oldItem, newItem) {
  oldItem.removeClass('zoomIn');
  newItem.addClass('zoomIn');
})
itemWidth = $(window).width();
$('.titles>.carousel').carousel(itemWidth, 0,function (oldItem, newItem) {

});
