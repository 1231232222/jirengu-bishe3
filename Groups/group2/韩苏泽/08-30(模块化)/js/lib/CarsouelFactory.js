// 工厂方法 主要用来做轮播
// @method setOpts(param) 用来给新建对象附加属性
// @property CarsouelFn.prototype.properties 默认必须要设置的属性，不设置会抛出异常
// 使用方法 var carsouel = new CarsouelFactory(); carsouel.init(param)
define(['jquery','utils'], function($, utils) {

  var CarsouelFactory = (function() {
    var CarsouelFn= function() {};

    CarsouelFn.prototype.setOpts = function(param) {
      var _self = this;

      utils.each(param, function(val, idx) {
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

      utils.each(_self.properties, function(msg, key) {
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

  return CarsouelFactory;
});
