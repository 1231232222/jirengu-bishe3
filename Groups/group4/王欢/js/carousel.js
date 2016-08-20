(function($){
	$.fn.slide = function(){
		var $this = $(this),
		$imgList = $this.find('ul'),
		$list = $imgList.children(),
		$next = $this.find('.next'),
		$prev = $this.find('.prev')

		$list.outerWidth($(window).width()/3)

		var width = $list.outerWidth(),
			count = $list.size(),
			currIdx = 1,
			isAnimate = false;

		$imgList.css({
			'width':width*count
		});

		$next.on('click',function(e){
			e.preventDefault();
			playNext();
		});
		$prev.on('click',function(e){
			e.preventDefault();
			playPrev();
		});

		function playNext(){
			var isAbled = $next.hasClass('disabled');
			if (isAbled || isAnimate) { return; }
			isAnimate = true;
			$imgList.animate({'left':'-='+width},500,function(){	isAnimate = false; });

			currIdx ++;
			isShowBtn();
		}
		function playPrev(){
			var isAbled = $prev.hasClass('disabled');
			if (isAbled || isAnimate) { return; }
			isAnimate = true;
			$imgList.animate({'left':'+='+width},500,function(){
				
				isAnimate = false;
			})
			currIdx --;
			isShowBtn();
			
		}
		function isShowBtn(){
			$list.removeClass('active').eq(currIdx).addClass('active');
			if (currIdx == count-2) {
				$next.addClass('disabled');
			}else{
				$next.removeClass('disabled');
			}

			if (currIdx == 1) {
				$prev.addClass('disabled');
			}else{
				$prev.removeClass('disabled');
			}
		}

	}

	$.fn.carousel = function(){
		var $this = $(this),
		$imgList = $this.find('ul'),
		$list = $imgList.children(),
		$next = $this.find('.next'),
		$prev = $this.find('.prev'),
		$bullet = $('.timeline');

		$list.width($(window).width());

		var	width = $list.outerWidth(),
		count = $list.size(),
		currIdx = 0,
		clock,
		isAnimate = false;

		$imgList.css({
			'width':width*count
		});


		$next.on('click',function(e){
			e.preventDefault();
			playNext();
		});
		$prev.on('click',function(e){
			e.preventDefault();
			playPrev();
		});
		$bullet.on('mouseover','li',function(e){
			e.preventDefault();
			var idx = $(this).index();
			if (idx > currIdx) {
				playNext(idx - currIdx);
			}
			if (idx < currIdx) {
				playPrev(currIdx - idx);
			}
		});

		function playNext(diff){
			var isAbled = $next.hasClass('disabled');
			if (isAbled || isAnimate) { return; }
			isAnimate = true;

			var diff = diff || 1;

			$imgList.animate({'left':'-='+width*diff},800,function(){	isAnimate = false; });

			currIdx = (currIdx+diff)%count;
			isShowBtn();

			

		}
		function playPrev(diff){
			var isAbled = $prev.hasClass('disabled');
			if (isAbled || isAnimate) { return; }
			isAnimate = true;
			var diff = diff || 1;
			$imgList.animate({'left':'+='+width*diff},800,function(){
				
				isAnimate = false;
			})
			currIdx = (currIdx+count-diff)%count;
			isShowBtn();
		}
		function isShowBtn(){
			$bullet.children().removeClass('active').eq(currIdx).addClass('active');
			$list.removeClass('active').eq(currIdx).addClass('active');
			if (currIdx == count-1) {
				$next.addClass('disabled');
			}else{
				$next.removeClass('disabled');
			}

			if (currIdx == 0) {
				$prev.addClass('disabled');
			}else{
				$prev.removeClass('disabled');
			}
		}
	}
})(jQuery)
