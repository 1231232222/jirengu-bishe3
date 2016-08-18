// 事件绑定函数
var Event = (function() {
  var cache = {},
      offlineStack = {};

  var fire = function() {
    var eventName = Array.prototype.shift.call(arguments),
        _self = this,
        _args = arguments;

    if (cache[eventName] && cache[eventName].length > 0) {
      var events = cache[eventName];

      events.forEach(function(fn) {
        fn.apply(_self, _args);
      });
    } else {

      // 如果没有监听则存入离线事件
      if (!offlineStack[eventName]) {
        offlineStack[eventName] = [];
      }

      var _fn = function() {
        return fire.apply(_self, _args);
      };

      offlineStack[eventName].push(_fn);
    }

  };
  var listen = function(eventName,fn) {
    if (!cache[eventName]) {
      cache[eventName] = [];
    }

    cache[eventName].push(fn);

    // 执行离线事件
    if (offlineStack[eventName] && offlineStack[eventName].length > 0) {
        var offline = offlineStack[eventName];

        offline.forEach(function(fn) {
          fn();
        })
    }
  };

  var off = function(eventName, fn) {
    if (cache[eventName] && cache[eventName].length > 0) {
      var events = cache[eventName];

      if(!fn) {
        cache[eventName].length = 0;
        return;
      }

      for(var i = events.length - 1; i >= 0; i--) {
        var _fn = events[i];

        if(_fn === fn) {
          events.splice(i, 1);
        }
      }

    }
  };

  return {
    fire: fire,
    listen: listen,
    off: off
  };

})();

// 节流函数
var throttleFactory = function(fn, time) {
  var clock = null
      time = time || 200;
  return function() {
    var _self = this,
        args = arguments;
    if(clock) {
      clearTimeout(clock);
    }

    clock = setTimeout(function() {
      fn.apply(_self,args);
    }, time);
  };

};
