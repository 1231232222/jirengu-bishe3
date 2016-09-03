// dialogModel 窗口的模板方法
var dialogModel = (function() {
  var DialogModelFn = function() {};

  DialogModelFn.prototype.show = function() {
    this.$dialogModel.removeClass('hidden');
    this.$dialog.animate({
      top: 30
    },'fast');
  };

  DialogModelFn.prototype.hide = function() {
    this.$dialogModel.addClass('hidden');
    this.$dialog.css('top', 0);
  };

  DialogModelFn.prototype.bindEvent = function() {
    throw new Error('子类必须实现bindEvent方法');
  };

  DialogModelFn.prototype.setOpts = function(opts) {
    var _self = this;

    each(opts, function(val,key) {
      _self[key] = val;
    });

  };

  DialogModelFn.prototype.init = function(opts) {
    this.setOpts(opts);
    this.bindEvent();
  };
  return {
    create: function() {
      var dialog = new DialogModelFn();

      return dialog;
    }
  }
})();

// loginDialog登陆 实现自dialogModel
var loginDialog = (function() {
  var LoginDialogFn = function() {};

  LoginDialogFn.prototype = dialogModel.create();
  LoginDialogFn.prototype.loginSubmit = function(form) {
    var _self = this,
        $form = $(form),
        data;

    if ($form.data('submit')) {
      return;
    }

    $form.data('submit',true);
    data = {
      username: form.username.value,
      password: form.pwd.value
    }

    getHttpData('login', data ,function(result) {
      if (result.state === 0) {
        Event.fire('login',result.data);
        msg.log(result.data.msg);
        _self.hide();

      } else {
        msg.error(result.error);
      }

      $form.removeData('submit');
    })
  }
  LoginDialogFn.prototype.bindEvent = function() {
    var _self = this;

    this.$dialog.find('.header .close').on('click', function() {
      _self.hide();
    });

    this.$dialog.find('form').on('submit', function(e) {
      _self.loginSubmit(this);
      e.preventDefault();
    });

  };

  return {
    create: function(opts) {
      var dialog = new LoginDialogFn();

      dialog.init(opts);
      return dialog;
    }
  };

})();
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
    console.log(errorMsg);
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
}
// 注册
var registerDialog = (function() {
  var RegisterDialogFn = function() {};

  RegisterDialogFn.prototype = dialogModel.create();

  RegisterDialogFn.prototype.registerSubmit = function(form) {
    var $form = $(form),
        data,
        _self = this,
        errorMsg;
    if ($form.data('submit')) {
      return;
    }

    errorMsg = validataFn(form);
    if (errorMsg) {
      return msg.error(errorMsg);
    }


    $form.data('submit',true);

    data = {
      email: form.email.value,
      username: form.username.value,
      password: form.pwd.value
    };
    getHttpData('register',data, function(result) {
      if (result.state === 0) {
        msg.log(result.data);
        _self.hide();
      } else {
        msg.error(result.error);
      }

      $form.removeData('submit')
    });
  };

  RegisterDialogFn.prototype.bindEvent = function() {
    var _self = this;

    this.$dialog.find('.header .close').on('click', function() {
      _self.hide();
    });

    this.$dialog.find('form').on('submit', function(e) {
      _self.registerSubmit(this);
      e.preventDefault();
    });
  };

  return {
    create: function(opts) {
      var dialog = new RegisterDialogFn();

      dialog.init(opts);
      return dialog;
    }
  };

})();

// 调用部分
(function() {
  // 登陆窗口
  var loginInstance = loginDialog.create({
    $dialogModel: $('#login-dialog'),
    $dialog: $('#login-dialog').find('.dialog')
  });

  // 注册窗口
  var registerInstance = registerDialog.create({
    $dialogModel: $('#register-dialog'),
    $dialog: $('#register-dialog').find('.dialog')
  })

  // 游客身份
  var tourist = {
    $node: $('.layer-nav .child-nav.tourist'),
    loginDialog: loginInstance,
    registerDialog: registerInstance,
    bindEvent: function() {
      var _self = this;

      this.$node.find('#login').on('click', function() {
        _self.loginDialog.show();
      });

      this.$node.find('#register').on('click', function() {
        _self.registerDialog.show();
      });

    },

    show: function() {
      this.$node.removeClass('hidden');
    },

    hide: function() {
      this.$node.addClass('hidden')
    }
  }
  // 用户身份
  var user = {
    $node: $('.layer-nav .userinfo'),
    show: function(data) {
        var html = '<img src="' + data.imgsrc + '" class="small">' +
                    '<span>' + data.name + '</span>';
        this.$node.find('.user').append($(html));
        this.$node.removeClass('hidden');
    },

    hide: function() {
      this.$node.find('.user').html('');
      this.$node.addClass('hidden');
    }
  }
  var userSwicth = (function() {
      tourist.bindEvent();
      Event.listen('login',function(data) {
        $('.layer-nav .userSwicth').find('>a').text('我');
        user.show(data);
        tourist.hide();
      });
      $('.layer-nav .userinfo').find('#cancel-login').on('click', function() {
          $('.layer-nav .userSwicth').find('>a').text('登入');
          tourist.show();
          user.hide();
          msg.log('用户已注销');
      });

      // 默认是登入
      $('.layer-nav .userSwicth').find('>a').text('登入');
      tourist.show();
      user.hide();
  })()

})();
