define(function() {
  var Validata = function() {
    this.cache = [];
  };

  Validata.prototype.add = function(dom, rules) {
    var value = dom.value.trim(),
        _self = this;

    for (var i = 0, rule; rule = rules[i]; i++) {
      (function(rule) {
        _self.cache.push(function() {
          var args = rule.stragegy.split(':'),
              stragegy = args.shift();

          args.unshift(dom.value);
          args.push(rule.errorMsg);
          return stragegies[stragegy].apply(dom, args);
        });
      })(rule);
    }

  };

  Validata.prototype.start = function() {
    for(var i = 0, fn; fn = this.cache[i]; i++) {
      var errorMsg = fn();
      if (errorMsg) {
        return errorMsg;
      }

    }
  };

  var validataFn = function(form) {
    var validata = new Validata();

    validata.add(form.email, [
      {
        stragegy: 'isEmail',
        errorMsg: '邮箱格式不正确'
      }
    ]);
    validata.add(form.username, [
      {
        stragegy: 'isNoEmpty',
        errorMsg: '用户名不能为空'
      }
    ]);

    validata.add(form.pwd, [
      {
        stragegy: 'isNoEmpty',
        errorMsg: '密码不能为空'
      },

      {
        stragegy: 'minLength:6',
        errorMsg: '密码不能小于6位'
      }
    ]);

    var errorMsg = validata.start();

    if (errorMsg) {
      return errorMsg;
    }

  };

  var stragegies = {
    isNoEmpty: function(value , errorMsg) {
      if(value === '') {
        return errorMsg;
      }

    },

    minLength: function(value, length, errorMsg) {
      if(value.length < length) {
        return errorMsg;
      }

    },

    isEmail: function(value, errorMsg) {
      if(!/^\w+@[A-Za-z0-9]+\.\w{2,3}$/.test(value)) {
        return errorMsg;
      }
    }
  };

  return validataFn;

});
