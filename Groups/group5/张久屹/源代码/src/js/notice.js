define(['jquery'],function(){
	 	// 首页小恶魔通知天气
	(function(){
		var $weather = $('#header>.notice a');
		$.get('http://api.jirengu.com/weather.php',function(data){
			var obj = JSON.parse(data);
			console.log(obj.results[0].index[5].des)
			$weather.text(obj.results[0].index[5].des);
			$weather.attr('title',obj.results[0].index[5].des);
		})
	})()

})

