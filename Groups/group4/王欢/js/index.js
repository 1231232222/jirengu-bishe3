!(function($){
	var $notice_text = $('.notice p');
	$.get('http://api.jirengu.com/weather.php',function(data){
		var obj = JSON.parse(data);
		if (obj.status == 'success') {
		}
		$notice_text.text(obj.results[0].index[3].des);
		$notice_text.attr('title',obj.results[0].index[3].des);
	});
})(jQuery)

!(function(){

	var $ct = $('.header'),
		$m1 = $ct.find('.mountains .m1'),
		$m2 = $ct.find('.mountains .m2'),
		$m3 = $ct.find('.mountains .m3'),
		array = [$m1,$m2,$m3];
	mountainsLayer($ct,array);

	var $ct = $('.community'),
		$m1 = $ct.find('.shan1'),
		$m2 = $ct.find('.shan2'),
		array = [$m1,$m2]
	mountainsLayer($ct,array);

	function mountainsLayer($ct,array){
		$ct.on('mousemove',function(e){
			var winWdh = $(window).width()/2;
			var winHgt = $(window).height()/2;
			var mX = e.pageX;
			var mY = e.pageY-$(window).scrollTop();
		
			if( mX > winWdh && mY > winHgt ){
				array.forEach(function($value){
					$value.css({'transform': 'translate('+ (mX-winWdh)/20 +'px,'+(mY-winHgt)/30 +'px)'})
				});			
			}else if( mX > winWdh && mY < winHgt ){
				array.forEach(function($value){
					$value.css({'transform': 'translate('+ (mX-winWdh)/20 +'px,'+ -(winHgt-mY)/30 +'px)'})
				});								
			}else if( mX < winWdh && mY > winHgt ){
				array.forEach(function($value){
					$value.css({'transform': 'translate('+ -(winWdh-mX)/20 +'px,'+(mY-winHgt)/30 +'px)',
				})
				});			
			}else if( mX < winWdh && mY < winHgt ){
				array.forEach(function($value){
					$value.css({'transform': 'translate('+ -(winWdh-mX)/20 +'px,'+ -(winHgt-mY)/30 +'px)',})	
				});	
				
								
			}
		});
	}
})()