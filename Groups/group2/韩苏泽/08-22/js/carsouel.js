// 工厂方法 主要用来做轮播
// @method setOpts(param) 用来给新建对象附加属性
// @property CarsouelFn.prototype.properties 默认必须要设置的属性，不设置会抛出异常
// 使用方法 var carsouel = new CarsouelFactory(); carsouel.init(param)
var CarsouelFactory = (function() {
  var CarsouelFn= function() {};

  CarsouelFn.prototype.setOpts = function(param) {
    var _self = this;

    each(param, function(val, idx) {
      _self[idx] = val;
    });
  };

  CarsouelFn.prototype.properties = {
    $screen: '用来定义carsouel的演示框',
    $lists: '存放图片的区域,通过改变left属性实现移动',
    width: '图片的统一宽度',
    curIdx: '计数器,一般从零开始'
  };

  CarsouelFn.prototype.checkOpts = function() {
    var _self = this;

    each(_self.properties, function(msg, key) {
      if(!(key in _self)) {
         throw new Error('子类必须定义' + key + '属性 msg:' + msg);
      }
    });

  };

  CarsouelFn.prototype.initState = function() {
    throw new Error('子类必须实现 initState 方法');
  };

  CarsouelFn.prototype.bindEvent = function() {
    throw new Error('子类必须实现 bindEvent方法');
  };

  CarsouelFn.prototype.playNext = function(num, callback , time) {
    if (this.$screen.data('playing')) {
      return false;
    }

    var num = num || 1,
        _self = this,
        time = time || 'fast';

    this.$screen.data('playing', true);
    this.$container.animate({
      left: '-=' + (_self.width * num)
    }, time, function() {
      _self.$screen.removeData('playing');
      if(typeof callback === 'function') {
        callback();
      }
    });
    _self.curIdx += num;
  };

  CarsouelFn.prototype.playPrev = function(num, callback, time) {
    if (this.$screen.data('playing')) {
      return false;
    }

    var num = num || 1,
        _self = this,
        time = time || 'fast';

    this.$container.animate({
      left: '+=' + (_self.width * num)
    }, time, function() {
      _self.$screen.removeData('playing');
      if (typeof callback === 'function') {
        callback();
      }
    });
    _self.curIdx -= num;
  };

  CarsouelFn.prototype.init = function(param) {
    this.setOpts(param);
    this.checkOpts();
    this.initState();
    this.bindEvent();
  };

  return {
    create: function() {
      return new CarsouelFn();
    }
  };

})();

// 两行模型 和 三行模型 是下面的carsouel的状态
// 两行模型
var TwoColState = function(carsouel) {
  this.carsouel = carsouel;
  this.maxWidth = 768;
  this.minWidth = 100;
  this.col = 2;
}
TwoColState.prototype.initState = function() {
  var itemNum,
      carsouel = this.carsouel,
      $content = $('#content'),
      screenWidth,
      containerLeft;

  // 计算screen lists   和 container的大小 偏移量
  // 同时还要计算 $prev $next 是否可用
  screenWidth = Math.min($content.width(), this.maxWidth);
  screenWidth = Math.max(screenWidth, this.minWidth);
  carsouel.width = screenWidth / this.col;
  carsouel.$screen.width(screenWidth);
  carsouel.$screen.height(carsouel.width);
  itemNum = carsouel.$lists.size();
  carsouel.$container.width(itemNum * carsouel.width);
  carsouel.$container.height(carsouel.width);
  containerLeft = '-' + (carsouel.curIdx * carsouel.width) + 'px';
  carsouel.$container.css('left', containerLeft);
  carsouel.$lists.css('width', carsouel.width);
  carsouel.$lists.css('height', carsouel.width);

  // 两行不需要缩放
  carsouel.$lists.removeClass('scale');
  carsouel.$prev.addClass('disable');
  carsouel.setDisable(this.col);
};

TwoColState.prototype.statePlayPrev = function() {
  var carsouel = this.carsouel;

  if (carsouel.checkPrev()) {
    carsouel.playPrev(undefined, undefined, '0.3s');
    //carsouel.setPrevState();  两行不需要缩放
    carsouel.setDisable(this.col);
  }
};

TwoColState.prototype.statePlayNext = function() {
  var carsouel = this.carsouel;

  if (carsouel.checkNext()) {
    carsouel.playNext(undefined, undefined, '0.3s');
    //carsouel.setNextState(); 两行不需要缩放
    carsouel.setDisable(this.col);
  }
};


// 三行模型
var ThreeColState = function(carsouel) {
  this.carsouel = carsouel;
  this.maxWidth = 1400;
  this.minWidth = 769;
  this.col = 3;
}

ThreeColState.prototype.initState = function() {
  var itemNum,
      carsouel = this.carsouel,
      maxLen  = carsouel.$lists.size() - 1,
      midIdx = carsouel.curIdx + 1,
      $content = $('#content'),
      screenWidth,
      containerLeft;
 // 这里考虑2列情况走到末尾后变3列的时候,往前移动一个图片
 if (midIdx === maxLen) {
   midIdx = midIdx - 1;
   carsouel.curIdx = carsouel.curIdx - 1;
 }

  // 计算screen lists   和 container的大小 偏移量
  // 同时还要计算 $prev $next 是否可用
  screenWidth = Math.min($content.width(), this.maxWidth);
  screenWidth = Math.max(screenWidth, this.minWidth);
  carsouel.width = screenWidth / this.col;
  carsouel.$screen.width(screenWidth);
  carsouel.$screen.height(carsouel.width);
  itemNum = carsouel.$lists.size();
  carsouel.$container.width(itemNum * carsouel.width);
  carsouel.$container.height(carsouel.width);
  containerLeft = '-' + (carsouel.curIdx * carsouel.width) + 'px';
  carsouel.$container.css('left', containerLeft);
  carsouel.$lists.css('width', carsouel.width);
  carsouel.$lists.css('height', carsouel.width);

  carsouel.$lists.eq(midIdx).addClass('scale');
  carsouel.$prev.addClass('disable');
  carsouel.setDisable(this.col);
};



ThreeColState.prototype.statePlayPrev = function() {
  var carsouel = this.carsouel;

  if (carsouel.checkPrev()) {
    carsouel.playPrev(undefined, undefined, '0.3s');
    carsouel.setPrevState();  // 三行需要缩放
    carsouel.setDisable(this.col);
  }
};

ThreeColState.prototype.statePlayNext = function() {
  var carsouel = this.carsouel;

  if (carsouel.checkNext()) {
    carsouel.playNext(undefined, undefined, '0.3s');
    carsouel.setNextState(); // 三行需要缩放
    carsouel.setDisable(this.col);
  }
};

// CarsouelModel继承于工厂方法 CarsouelFactory
// window .onresize 时判断状态 TwoColState ThreeColState
var CarsouelModel = (function() {
  var CarsouelModelFn = function() {
    this.curState = null;
    this.twoColState = new TwoColState(this);
    this.threeColState = new ThreeColState(this);
  };

  CarsouelModelFn.prototype = CarsouelFactory.create();

  CarsouelModelFn.prototype.initState = function() {
    var contentWidth = $('#content').width();

    if( contentWidth > this.twoColState.maxWidth) {
      // 三行模型
      this.curState = this.threeColState;
    } else {
      // 两行模型
      this.curState = this.twoColState;
    }
    this.curState.initState();
  };

  CarsouelModelFn.prototype.bindEvent = function() {
    var _self = this;
    this.$prev.on('click', function() {
      _self.curState.statePlayPrev();
    });

    this.$next.on('click', function() {
      _self.curState.statePlayNext();
    });

    $(window).on('resize', throttleFactory(function() {
      _self.initState();
    }, 100));

  };

  CarsouelModelFn.prototype.checkPrev = function() {
    if (this.$prev.hasClass('disable')) {
      return false;
    }

    return true;
  };

 // showNum 就是界面的显示的图片个数
  CarsouelModelFn.prototype.setDisable = function(showNum) {
    var maxLen = this.$lists.size();

    if(this.curIdx <= 0) {
      this.$prev.addClass('disable');
    } else {
      this.$prev.removeClass('disable');
    }

    if (this.curIdx + showNum >= maxLen) {
      this.$next.addClass('disable');
    } else {
      this.$next.removeClass('disable');
    }

  };

  CarsouelModelFn.prototype.checkNext = function() {
    if (this.$next.hasClass('disable')) {
      return false;
    }

    return true;
  };

  CarsouelModelFn.prototype.setPrevState = function() {
    var midIdx = this.curIdx + 1;

    this.$lists.eq(midIdx + 1).removeClass('scale');
    this.$lists.eq(midIdx).addClass('scale');
  };

  CarsouelModelFn.prototype.setNextState = function() {
    var midIdx = this.curIdx + 1;

    this.$lists.eq(midIdx -1).removeClass('scale');
    this.$lists.eq(midIdx).addClass('scale');
  }

  return {
    create: function() {
      return new CarsouelModelFn();
    }
  }

})();


// 这里开始设置初始属性
(function() {
  var carsouel = CarsouelModel.create(),
      $screen = $('.mod-carousel'),
      $container = $screen.find('.pannel-ct'),
      $lists = $container.find('.pannel'),
      width = $lists.first().outerWidth(),
      $prev = $screen.find('.prev'),
      $next = $screen.find('.next'),
      param = {
        $screen: $screen,
        curIdx: 0,
        $container: $container,
        $lists: $lists,
        width: width,
        $prev: $prev,
        $next: $next,
      };

    carsouel.init(param);
})();
