var Weather=(function(){
	function init(){
		$.ajax({
     	url:"http://api.jirengu.com/weather.php",
     	type:"get",
     	dataType:"jsonp",
     	jsonpCallback: 'getWeather',
     	success:function(ret){
     	if(ret.status=="success"){
     		creatNote(ret.results[0])
     	}
     	if(ret.status=="error"){
     		alert("没有数据")
     	}
		} 
     	,
     	error:function(){
     		console.log("请求失败")
     	}
		})

	};
	function creatNote (data){
		var node='<a href="javascript:void(0)">今天'+data.index[0].des+'</a>';
			$nodes=$(node);
			$("#header").find(".weather").prepend($nodes);
		}
	
	return {
		init:init
	}
})();
 Weather.init();
 $(".weather").find("a").on("click",function(){
		console.log("ok")
		})