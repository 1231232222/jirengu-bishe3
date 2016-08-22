var carsouel = (function() {
  var carsouel ={},
      midIdx = 1;

  var init = function() {
    var itemNum;

    carsouel.$window = $('.mod-carousel');
    carsouel.$prev =  carsouel.$window.find('.prev');
    carsouel.$next =  carsouel.$window.find('.next');
    carsouel.$ct =  carsouel.$window.find('.pannel-ct');
    carsouel.$lists = carsouel.$ct.find('.pannel');
    carsouel.width = carsouel.$lists.first().outerWidth();
    carsouel.$lists.eq(midIdx).addClass('scale');
    carsouel.$prev.addClass('disable');
    itemNum = carsouel.$lists.size();
    carsouel.$ct.width(itemNum*carsouel.width);
    bindEvent();
  };

  var bindEvent = function() {
    carsouel.$prev.on('click', function() {
      playPrev();
      setDisable();
    });
    carsouel.$next.on('click', function() {
      playNext();
      setDisable();
    })
  };

  var playNext = function() {
      if (carsouel.$next.hasClass('disable')) {
        return;
      }

      if (carsouel.$window.data('playing')) {
        return;
      }

      carsouel.$window.data('playing', true);
      carsouel.$ct.animate({
        left: '-=' + carsouel.width
      }, '0.3s', function() {
        carsouel.$window.removeData('playing');
      });
      carsouel.$lists.eq(midIdx).removeClass('scale');
      carsouel.$lists.eq(++midIdx).addClass('scale');
  };

  var playPrev = function() {
    if (carsouel.$prev.hasClass('disable')) {
      return;
    }
    if (carsouel.$window.data('playing')) {
      return;
    }

    carsouel.$window.data('playing', true);
    carsouel.$ct.animate({
      left: '+=' + carsouel.width
    }, '0.3s', function() {
      carsouel.$window.removeData('playing');
    });
    carsouel.$lists.eq(midIdx).removeClass('scale');
    carsouel.$lists.eq(--midIdx).addClass('scale');

  }

  var setDisable = function() {
    var maxIdx = carsouel.$lists.size()-1;
    if(midIdx - 1 <= 0) {
      carsouel.$prev.addClass('disable');
    } else {
      carsouel.$prev.removeClass('disable');
    }

    if(midIdx + 1 >= maxIdx) {
      carsouel.$next.addClass('disable');
    } else {
      carsouel.$next.removeClass('disable');
    }

  };

  return {
    init: init
  };
})();

carsouel.init();

var bigEvent = (function() {
  var carsouel = {};
      curIdx = 0;
  var init = function() {
    var itemNum;

    carsouel.$window = $('.event-ct');
    carsouel.$prev = carsouel.$window.find('.prev');
    carsouel.$prev.addClass('disable');
    carsouel.$next = carsouel.$window.find('.next');
    carsouel.$ct = carsouel.$window.find('.events');
    carsouel.$lists = carsouel.$ct.find('li');
    carsouel.$lists.width($(window).width());
    carsouel.width = carsouel.$lists.first().outerWidth();
    itemNum = carsouel.$lists.size();
    carsouel.$ct.width(itemNum * carsouel.width);
    bindEvent();
  };

  var bindEvent = function() {
    carsouel.$prev.on('click', function() {
        playPrev();
        setDisable();
    });
    carsouel.$next.on('click', function() {
      playNext();
      setDisable();

    });
    $(window).on('resize', function() {
      carsouel.$lists.width($(window).width());
    });
    Event.listen('timelineMove', function(idx) {
      var step = idx - curIdx;
      if (step > 0) {
        playNext(step);
        setDisable()
      }

      if (step < 0) {
        playPrev(Math.abs(step));
        setDisable();
      }
    })
  };

  var playNext = function(num) {
      var num = num || 1;

      if (carsouel.$next.hasClass('disable')) {
        return;
      }

      if (carsouel.$window.data('playing')) {
        return;
      }

      carsouel.$window.data('playing', true);
      curIdx = curIdx + num;
      carsouel.$ct.animate({
        left: '-=' + (carsouel.width * num)
      }, 'slow', function() {
        Event.fire('carsouelMove',curIdx);
        carsouel.$window.removeData('playing');
      });
  };

  var playPrev = function(num) {
    var num = num || 1;

    if (carsouel.$prev.hasClass('disable')) {
      return;
    }
    if (carsouel.$window.data('playing')) {
      return;
    }

    carsouel.$window.data('playing', true);
    curIdx = curIdx - num;
    carsouel.$ct.animate({
      left: '+=' + (carsouel.width * num)
    }, 'slow', function() {
      Event.fire('carsouelMove',curIdx);
      carsouel.$window.removeData('playing');
    });


  };

  var setDisable = function() {
    var maxIdx = carsouel.$lists.size()-1;
    if(curIdx <= 0) {
      carsouel.$prev.addClass('disable');
    } else {
      carsouel.$prev.removeClass('disable');
    }

    if(curIdx >= maxIdx) {
      carsouel.$next.addClass('disable');
    } else {
      carsouel.$next.removeClass('disable');
    }

  };

return {
  init: init
}
})();

bigEvent.init();

var $timeline = $('.timeline'),
    $pointers =$timeline.find('.pointer'),
    $lists = $timeline.find('li'),
    bindtimelineMove;

$timeline.on('mouseenter', 'li',function() {
  var idx = $(this).index();

  Event.fire('timelineMove',idx);
});
Event.listen('carsouelMove', function(idx) {
  $pointers.removeClass('active');
  $pointers.eq(idx).addClass('active');
  $lists.removeClass('.active');
  $lists.eq(idx).addClass('active');
});

var moveModel = function(moveBoxs, moveFactor) {
  var moveModel = {};

  moveModel.moveBoxs = moveBoxs|| [];
  moveModel.moveFactor = moveFactor || 100;
  var init = function() {
    bindEvent();
  };

  var getMiddlePoint = function() {
    var $window = $(window),
        middlePoint;

    middlePoint = {
      x: $window.width() / 2,
      y: ($window.scrollTop() + $window.height()) / 2
    };
    return middlePoint;
  };

  var bindEvent = function() {
    $(window).on('mousemove' , function(e) {
      bindMousemove(e)
    });
  };

  var each = function(arr,fn) {
    for (var i = 0, len = arr.length; i < len; i++) {
      var ret = fn.call(arr[i], arr[i], i);
      if(ret === false) {
        break;
      }
    }

  };

  var bindMousemove = function(evt) {
    var middlePoint = getMiddlePoint(),
        moveX = (evt.pageX - middlePoint.x) / moveModel.moveFactor,
        moveY = (evt.pageY - middlePoint.y) / moveModel.moveFactor;

    each(moveModel.moveBoxs, function(box) {
      var boxmoveX,
          boxmoveY,
          move,
          $item = box.$item,
          boxFactor = box.factor;

      // 超出底部 或者顶部 就不动了
      if (($item.offset().top + $item.outerHeight() < evt.pageY) || ($item.offset().top > evt.pageY)) {
        return false;
      }

      boxmoveX = (boxFactor || 1) * moveX,
      boxmoveY = (boxFactor || 1) * moveY,
      move = 'translate(' + boxmoveX +'px,' + boxmoveY + 'px)' ;
      $item.css('transform', move);
    });

  };

  return {
    init: init
  };

};

var layerMountains = [
  {
    $item: $('.layer-mountain1'),
    factor: 5
  },

  {
    $item: $('.layer-mountain2'),
    factor: 2
  },

  {
    $item: $('.layer-mountain3'),
    factor: 1
  }
];
var layerMountainsMove = moveModel(layerMountains, 100);

layerMountainsMove.init();

var introMountains = [
  {
    $item:$('.intro-layers .intro-bg1'),
    factor: 5
  },

  {
    $item:$('.intro-layers .intro-bg2'),
    factor: 2
  }
];

var introMountains = moveModel(introMountains, 200);

introMountains.init();

$('.layer-nav').on('mouseenter', '.parent-link', function() {
  $(this).find('.child-nav').addClass('hover');
});

$('.layer-nav').on('mouseleave', '.parent-link', function() {
  $(this).find('.child-nav').removeClass('hover');
});

$('.monster-talk').find('img').on('mouseenter', function() {
  $(this).attr('src','./images/talk.gif');
});

$('.monster-talk').find('img').on('mouseleave', function() {
  $(this).attr('src','./images/talk.png');
});
var flyMonster = (function() {
  var flyStack = [],
      maxNum = 3;

  var add = function(msg){
    var html ='',
        $node;
    html += '<div class="notice notice-move">';
    html += '<a class="notice-ct" href="javascript:void(0)" title="' + msg.data +'">'+ msg.data +'</a>';
    html +='<div class="icon-notice3"></div>';
    $node =$(html);
    flyStack.push($node);
    $('.layer-notice').append($node);
  };
  return {
    add: add
  }
})();
$.ajax({
  url:'http://api.jirengu.com/weather.php',
  method: 'GET',
  dataType: 'jsonp',
  callback:'jQuery30004158580127859153_1471508661958',
  data:{
    _: 1471508661959
  }
}).done(function(data) {
  if (data.status === 'success') {
    var message = '',
        result = data.results[0].index[2].des || '',
        weather = data.results[0].weather_data[0].weather|| '';
        Event.fire('putWeather',result+' '+weather);
  }
});

Event.listen('putWeather', function(data) {
  var msg = {
    data: data,
    type:'weather'
  };
  flyMonster.add(msg);
});
