// 移动山峰效果
// @param moveBoxs{ $item :'选择器', factor: '移动比例，越远的越小'}
// @param moveFactor 鼠标移动距离缩小比例
define(['jquery'], function($) {
  var moveMountainFactory = function(moveBoxs, moveFactor) {
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

  return moveMountainFactory;
});
