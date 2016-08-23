// bingEvents的实现
// 继承于工厂方法 CarsouelFactory
// 和timeline通讯使用 事件监听Event方法,动画播放使用命令队列
var bigEvent = (function() {
  var bigEventFn = function() {
    this.prevQueue = [];
    this.nextQueue = [];
  };

  bigEventFn.prototype = CarsouelFactory.create();

  bigEventFn.prototype.initState = function(){
    var itemNum;

    this.$prev.addClass('disable');
    this.$lists.width($(window).width());
    itemNum = this.$lists.size();
    this.$container.width(itemNum * this.width);
  };

  bigEventFn.prototype.checkPrev = function() {
    if (this.$prev.hasClass('disable')) {
      return false;
    }

    return true;
  }

  bigEventFn.prototype.checkNext = function() {
    if (this.$next.hasClass('disable')) {
      return false;
    }

    return true;
  };

  bigEventFn.prototype.setDisable = function() {
    var maxLen = this.$lists.size();

    if (this.curIdx <= 0) {
      this.$prev.addClass('disable');
    } else {
      this.$prev.removeClass('disable');
    }

    if (this.curIdx + 1 >= maxLen) {
      this.$next.addClass('disable');
    } else {
      this.$next.removeClass('disable');
    }
  }

  // 我们使用命令队列的方式解决多次触发timelineMove的问题
  bigEventFn.prototype.playPrevQueue = function(idx) {
    var _self = this,
        step = idx ? idx - this.curIdx : undefined,
        ret;

    if(step >= 0) {
      return;
    }

    if (this.checkPrev()) {
      ret = this.playPrev(Math.abs(step), function() {
        Event.fire('carsouelMove',_self.curIdx);
        _self.executePrevQueue();
      });
      if (ret !== false) {
        this.setDisable();
        return;
      }

      // 将命令函数存入命令队列 控制命令队列长度为2
      if(this.prevQueue.length > 2) {
        this.prevQueue.shift();
      }

      // 这边使用闭包来保存idx
      var clusor = (function(idx) {
        return function(){
          _self.playPrevQueue(idx);
        }
      })(idx);
      this.prevQueue.push(clusor);
    }

  };

  bigEventFn.prototype.playNextQueue = function(idx) {
    var _self = this,
        step = idx ? idx - this.curIdx : undefined,
        ret;

    if (step <= 0) {
      return;
    }

    if (this.checkNext()) {
      ret = this.playNext(step, function() {
        Event.fire('carsouelMove',_self.curIdx);
        _self.executeNextQueue();
      });
      if (ret !== false) {
        this.setDisable();
        return;
      }

      // 将命令函数存入命令队列 控制命令队列长度为2
      if (this.nextQueue.length >2) {
        this.nextQueue.shift();
      }

      // 这边使用闭包来保存idx
      var clusor = (function(idx) {
        return function(){
          _self.playNextQueue(idx);
        }
      })(idx);

      this.nextQueue.push(clusor);
    }

  };

  bigEventFn.prototype.executePrevQueue = function() {
    this.prevQueue.length && this.prevQueue.shift()();
  };

  bigEventFn.prototype.executeNextQueue = function() {
    this.nextQueue.length && this.nextQueue.shift()();
  };

  bigEventFn.prototype.bindEvent = function() {
    var _self = this;

    this.$prev.on('click', function() {
      // _self.playPrevQueue(); 这里不用这个方法避免点击多次走多步
      if (_self.checkPrev()) {
        ret = _self.playPrev(undefined, function() {
          Event.fire('carsouelMove',_self.curIdx);
        });
        if (ret !== false) {
          _self.setDisable();
          return;
        }
      }

    });

    this.$next.on('click', function() {
      // _self.playNextQueue(); 这里不用这个方法避免点击多次走多步
      if (_self.checkNext()) {
        ret = _self.playNext(undefined, function() {
          Event.fire('carsouelMove',_self.curIdx);
        });
        if (ret !== false) {
          _self.setDisable();
          return;
        }
      }

    });

    $(window).on('resize',throttleFactory(function() {
      var curContainerLeft,
          size = _self.$lists.size();

          // 重新定义container的宽度 偏移量 left 和图片的宽度
        _self.width = $(window).width();
        _self.$lists.outerWidth(_self.width);
        _self.$container.width(size * _self.width);
        curContainerLeft = '-' + (_self.curIdx * _self.width) + 'px';
        _self.$container.css('left', curContainerLeft);
      }, 10)
    );

    Event.listen('timelineMove', function(idx) {
      var step = idx - _self.curIdx;

      // 我们为什么只传入idx而不传入 step 原因是我们是使用命令队列来实现动画效果的，不是立即执行的
      // 现在传入step 等到执行的时候this.curIdx变了,就会多走
      if (step > 0) {
        _self.playNextQueue(idx);
      }

      if (step < 0) {
        _self.playPrevQueue(idx);
      }

    });

  }

  return {
    create: function() {
        return new bigEventFn();
    }
  }
})();

// 这里是调用部分
(function() {
  var eventCarsoule = bigEvent.create(),
      $screen = $('.event-ct'),
      $container = $screen.find('.events'),
      $prev = $screen.find('.prev'),
      $next = $screen.find('.next'),
      $lists = $container.find('li'),
      width = $(window).width(),
      param = {
        $screen: $screen,
        $container: $container,
        $prev:$prev,
        $next:$next,
        $lists: $lists,
        width: width,
        curIdx: 0
      };

    eventCarsoule.init(param);

    // timeline 触发上面的eventCarsoule的滚动
    var $timeline = $('.timeline'),
        $lists =$timeline.find('li'),
        bindtimelineMove;

    $timeline.on('mouseenter', 'li',function() {
      var idx = $(this).index();

      Event.fire('timelineMove',idx);
    });
    Event.listen('carsouelMove', function(idx) {
      $lists.removeClass('active');
      $lists.eq(idx).addClass('active');
    });
})();
