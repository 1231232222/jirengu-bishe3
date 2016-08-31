define(function(require,exports){
	var $ = require('jquery');
	$.fn.change = function(){
		var cur = $(this);
		cur.on('mouseover',function(){
			cur.attr('src',cur.attr('data-hover-img'));
		});
		cur.on('mouseleave',function(){
			cur.attr('src',cur.attr('data-img'));
		});
	}
	return $.fn.change;
})