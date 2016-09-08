// 页面中部轮播 可以按照屏幕宽度自适应列数
define(['jquery', 'utils', 'CarsouelFactory'],
function($, utils, CarsouelFactory) {



  // 两行模型
  var TwoColState = function(carsouel) {
    this.carsouel = carsouel;
    this.maxWidth = 768;
    this.minWidth = 320;
    this.col = 2;
  }
  TwoColState.prototype.initState = function() {
    var itemNum,
        carsouel = this.carsouel,
        $content = $('#content'),
        screenWidth,
        containerLeft;
    console.log($content.width(), this.maxWidth, screenWidth);
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

      $(window).on('resize', utils.throttleFactory(function() {
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
    };

    return {
      create: function() {
        return new CarsouelModelFn();
      }
    }

  })();

  return CarsouelModel;
});
