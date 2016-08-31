$(function(){
	//header monster
	var monster = $('.talk img');
	monster.on('mouseover',function(){
		monster.attr('src',monster.attr('data-hover-img'));
	});
	monster.on('mouseleave',function(){
		monster.attr('src',monster.attr('data-img'));
	});




	// 免费公开课
	var freeCarousel = $('.free-carousel'),
	fNext = $('.carousel-wrap a.t-right'),
	fPre = $('.carousel-wrap .t-left'),
	fPanel = freeCarousel.find('li'),
	fCurIdx = 1,
	fPanelCount = fPanel.length;
	fPanelW = $(window).width()/3;
	fPanel.outerWidth(fPanelW);
	freeCarousel.css({width:fPanelW*fPanelCount});

	fNext.on('click',function(e){
		e.preventDefault();
		freeNext();
	});
	fPre.on('click',function(e){
		e.preventDefault();
		freePre();
	});
	function freeNext(){
		if(fCurIdx === 1){
			fPre.css({borderRight:'16px solid #2E2E4F'});
		}
		if(fCurIdx === 4){
			
			return;
		}
		freeCarousel.animate({left:'-='+fPanelW});
		fCurIdx++;
		fPanel.removeClass('active').eq(fCurIdx).addClass('active');
		if(fCurIdx === 4){
			fNext.css({borderLeft:'16px solid #ccc'});
		}

	}
	function freePre(){
		if(fCurIdx === 4){
			fNext.css({borderRight:'16px solid #2E2E4F'});
		}
		if(fCurIdx === 1) return;
		freeCarousel.animate({left:'+='+fPanelW});
		fCurIdx--;
		fPanel.removeClass('active').eq(fCurIdx).addClass('active');
		if(fCurIdx === 1){
			fPre.css({borderRight:'16px solid #ccc'});
		}
	}


	// 课程预告轮播
	var trailerCarousel = $('.trailer-detail'),
		tPanel = trailerCarousel.find('li'),
		tPanelW = $(window).width(),
		tPanelCount = tPanel.length,
		tNext = $('.trailer .t-right'),
		tPre = $('.trailer .t-left'),
		tCurIdx = 0;
		tPanel.css({width:tPanelW});
		for(var i=0;i<tPanel.find('a').length;i++){
			tPanel.find('a').eq(i).css({backgroundImage:'url('+tPanel.find('a').eq(i).attr('bg-img')+')'});
		}
		trailerCarousel.css({width:tPanelW*tPanelCount+'px',height:tPanel.height()});
		setOpts(0);
		tPre.css({borderRight:'16px solid #ccc'});
		tNext.on('click',function(e){
			e.preventDefault();
			trailerNext();
		});
		tPre.on('click',function(e){
			e.preventDefault();
			trailerPre();
		});
		function setOpts(idx){
			console.log(idx);
			$('.trailer-title li').eq(idx).addClass('active').siblings().removeClass('active');
		}
		function trailerNext(idx){
			var idx = idx || 1;
			if(tCurIdx === 3){
				return;
			}
			trailerCarousel.animate({left:'-='+tPanelW*idx},function(){
				tCurIdx++;
				setOpts(tCurIdx);
				if(tCurIdx === 1){
					tPre.css({borderRight:'16px solid #F78801'});
				}
				if(tCurIdx ===3 ){
					tNext.css({borderLeft:'16px solid #ccc'});
				}
			});
		}
		function trailerPre(idx){
			var idx = idx || 1;
			if(tCurIdx === 0){
				return;
			}
			trailerCarousel.animate({left:'+='+tPanelW*idx},function(){
				tCurIdx--;
				setOpts(tCurIdx);
				if(tCurIdx === 2 ){
					tNext.css({borderLeft:'16px solid #F78801'});
				}
				if(tCurIdx ===0 ){
					tPre.css({borderRight:'16px solid #ccc'});
				}
			});
		}

		// 动态的山
		var winX = $('.header').width()/2,
			winY = $('.header').height()/2;
			console.log(winX);
			console.log(winY);
		var moun1 = $('.mountain1'),
			moun2 = $('.mountain2'),
			moun3 = $('.mountain3');
		$('.header').on('mousemove',function(e){
			var moveX = e.pageX - winX,
				moveY = e.pageY - winY;
			moun1.css({'transform':'translate('+moveX/40+'px,'+moveY/40+'px)'});
			moun2.css({'transform':'translate('+moveX/80+'px,'+moveY/80+'px)'});
			moun3.css({'transform':'translate('+moveX/120+'px,'+moveY/120+'px)'});
		});

		var moun4 = $('.intro-bg1'),
			moun5 = $('.intro-bg2');
		$('.intro').on('mousemove',function(e){
			var moveX = e.pageX - winX,
				moveY = e.pageY - winY;
			moun4.css({'transform':'translate('+moveX/40+'px,'+moveY/40+'px)'});
			moun5.css({'transform':'translate('+moveX/80+'px,'+moveY/80+'px)'});
		});
			
});