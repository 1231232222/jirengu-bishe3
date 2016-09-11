// $(function(){
// 	$.ajax({
// 		url:"http://apis.baidu.com/geekery/music/query?s='爱上张无忌'&size=10&page=1",
// 		type:"GET",
// 		dataType:"json",    
// 		beforeSend: function(request) {
//                         request.setRequestHeader("apikey", "ee795b2fe2bdc36f4b29f5b548ab2bad");
//                     },
// 		success:function(datas){
// 			console.log(datas)
// 			var hash1=datas.data.data["0"].hash;
// 			console.log(hash1)
// 			$.ajax({
// 				url:"http://apis.baidu.com/geekery/music/playinfo?hash="+hash1,
// 				type:"GET",
// 				dataType:"json",
// 				beforeSend: function(request) {
//                         request.setRequestHeader("apikey", "ee795b2fe2bdc36f4b29f5b548ab2bad");
//                     },
//                 success:function(lrc){
//                 		console.log(lrc.data.url)
//                 		var song=lrc.data.url;
//                 		var mp3=$("<audio></audio>");
//                 		console.log(mp3)
//                 		mp3.attr({
//                 			"src":song,
//                 			"autoplay":"autoplay"
//                 		})
//                 		$("body").append(mp3)
//                 }
// 			})
// 		}
// 	})
// })


$(function(){
	var clock;
	$("div.musicCon").on("mouseover",function(){
		if(clock){
			clearTimeout(clock)//解决鼠标滑入的闪烁问题
		}

		clock=setTimeout(function(){
			$("div.weather").css({
				"-webkit-filter":"blur(10px)"
			})
			$("div.lyricsZone").animate({
				"left":"50px",
				"opacity":"1"
			},300)
	},150)
	})
	$("div.musicCon").on("mouseout",function(){
		if(clock){
			clearTimeout(clock)
		}//解决鼠标滑入的闪烁问题
		clock=setTimeout(function(){
				console.log("哈哈哈哈哈")
			$("div.weather").css({
			"-webkit-filter":"none"
			})
			$("div.lyricsZone").animate({
				"left":"-556px",
				"opacity":"0"
			},300)
	},150)
	})

	$.ajax({
		url:"http://api.jirengu.com/fm/getSong.php?channel=13",
		type:"GET",
		dataType:"json",    
		success:function(datas){
			var $imgSrc=datas.song[0].picture;
			var $sid=datas.song[0].sid;
			var $singer=datas.song[0].artist;
			var $title=datas.song[0].title;
			var $songUrl=datas.song[0].url;
			console.log($songUrl)
			console.log(datas)
			if($imgSrc!==""){
				$("div.music").css({
				"background":"url("+$imgSrc+")"+" center"+" no-repeat",
				"background-size":"cover"
			})
			$("p.songName").text($title);
			$("p.singerName").text($singer);
			$("p.songName").attr({
				"title":$title
			})

			var $musicPlayer=$("<audio></audio>");
			$musicPlayer.attr({
				
				"src":$songUrl,
				"sid":$sid
			})
			$("body").append($musicPlayer)
			$musicPlayer[0].play()
			$.get('http://api.jirengu.com/fm/getLyric.php',{sid:$sid},function(lrc){
				console.log(lrc.lyric.replace("[00:00.01]音乐来自百度FM, by 饥人谷",""))
				var lyricAll=lrc.lyric.replace("[00:00.01]音乐来自百度FM, by 饥人谷","");
				var lyricTimeWord=lyricAll.split("\n")
				for(var i=lyricTimeWord.length;i>=0;i--){
					if(/]$/.test(lyricTimeWord[i])||lyricTimeWord[i]==""){
						lyricTimeWord.splice(i,1)
					}
				}

			console.log(lyricTimeWord)
			finalLyric=[];
			$("div.lyricsZone").empty();
			for(var i=0;i<lyricTimeWord.length;i++){
				finalLyric[i]=[];
				if(lyricTimeWord[5].indexOf("]")==10){
					finalLyric[i].push((lyricTimeWord[i]).slice(1,6));
					finalLyric[i].push(lyricTimeWord[i].slice(11,lyricTimeWord[i].length));
				}else{
					finalLyric[i].push((lyricTimeWord[i]).slice(1,6));
					finalLyric[i].push(lyricTimeWord[i].slice(10,lyricTimeWord[i].length));
				}
			}
			for(var i=0;i<finalLyric.length;i++){
				$("div.lyricsZone").append("<p class='lrcItem'><span>"+finalLyric[i][1]+"</span></p>");
			}
			$("div.lrc").find("p.lrc").eq(0).addClass("nowLyric")
			},"json")
		}
		
		}
	})
	$.ajax({
		url:"http://api.jirengu.com/weather.php",
		type:"GET",
		dataType:"json",  
		success:function(datas){
			console.log(datas.results[0].weather_data);
			var $eachWeather=datas.results[0].weather_data;
			var $city=datas.results[0].currentCity;
			$("span.city").text($city);
			var $eachWeather=datas.results[0].weather_data;
			var $todayTemp=$eachWeather[0].date.substr(10).replace("(实时：","").replace("℃)","").concat("°")
			$("span.temp").text($todayTemp);
			
			var $weekday=$("ul.forecast").find("p.weekday");
			var $tempItem=$("ul.forecast").find("p.temp");
			var $length=$weekday.length;
			var $spanExpress=$("ul.forecast").find("span.font")
			var $weatherPatten=/晴|小雨|中雨|大雨|阵雨|多云|小雪|中雪|大雪|暴雪|雾霾/
			console.log($weatherPatten)
			for(var i=0;i<$length;i++){
				$spanExpress.eq(i).attr({
					"title":$eachWeather[i].weather
				})
				var $day=$eachWeather[i].date.substr(0,2);
				
				var $detailWeather=$weatherPatten.exec($eachWeather[i].weather.substr($eachWeather[i].weather.length-4))[0];
				
				var $todayTemp=$eachWeather[i].temperature;
				$tempItem.eq(i).text($todayTemp)
				switch($day){
					case "周六":
						$today="SAT";
						break;
					case "周日":
						$today="SUN";
						break;
					case "周一":
						$today="MON";
						break;
					case "周二":
						$today="TUE";
						break;
					case "周三":
						$today="WED";
						break;
					case "周四":
						$today="THU";
						break;
					case "周五":
						$today="FRI";
						break;
				}
				switch($detailWeather){
					case "晴":
						$weatherCode='&#xe678';
						break;
					case "多云":
						$weatherCode='&#xe680';
						break;
					case "小雨":
						$weatherCode='&#xe683';
						break;
					case "中雨":
						$weatherCode='&#xe65d';
						break;
					case "大雨":
						$weatherCode='&#xe66e';
						break;
					case "暴雨":
						$weatherCode='&#xe6d0';
						break;
					case "阵雨":
						$weatherCode='&#xe694';
						break;
					case "小雪":
						$weatherCode='&#xe681';
						break;
					case "中雪":
						$weatherCode='&#xe632';
						break;
					case "大雪":
						$weatherCode='&#xe62e';
						break;
					case "暴雪":
						$weatherCode='&#xe678';
						break;
				}
				$weekday.eq(i).text($today);
				$spanExpress.eq(i).html($weatherCode)

			}
			$("span.todayExpress").html($spanExpress.eq(0).html())
			var $newDate=new Date();
			var $nowDay=$weekday.eq(0).text();

			$("p.calender").text($nowDay.replace($nowDay.substr(1),$nowDay.substr(1).toLowerCase())+" "+$newDate.getDate());
			var $month=$newDate.getMonth()+1;
			console.log($month)
				switch($month){
					case 1:
						$nowMonth="January";
						break;
					case 2:
						$nowMonth="February";
						break;
					case 3:
						$nowMonth="March";
						break;
					case 4:
						$nowMonth="April";
						break;
					case 5:
						$nowMonth="May";
						break;
					case 6:
						$nowMonth="June";
						break;
					case 7:
						$nowMonth="July";
						break;
					case 8:
						$nowMonth="August";
						break;
					case 9:
						$nowMonth="September";
						break;
					case 10:
						$nowMonth="October";
						break;
					case 11:
						$nowMonth="November";
						break;
					case 12:
						$nowMonth="December";
						break;
				}
				$("p.month").text($nowMonth)
		}
	})

	function Move($node){
		this.$node=$node;
		this.$moveObj=this.$node.parent().find(".moveBox");
		this.$nodeX=this.$node.width()/2+this.$node.offset().left;
		this.$nodeY=this.$node.height()/2+this.$node.offset().top;
		this.bind();
	}

	Move.prototype={
		bind:function(){
			this.move();
		},
		move:function(){
			var me=this;
			me.$node.on("mousemove",function(e){
				for(var i=0;i<me.$moveObj.length;i++){
				me.$moveObj.eq(i).animate({
				"right":(me.$nodeX-e.pageX)/(50/(i+2))+"px",
				"top":0-(me.$nodeY-e.pageY)/(50/(i+2))+"px"
				},0)	
				}	
			})
		}
	}

	var m1=new Move($("div.operate"))

})