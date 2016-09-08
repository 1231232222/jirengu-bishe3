define(['jquery', 'utils', 'mock', 'app/validataFn', 'msgInfo'], function($, utils, mock, validataFn, msg) {
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

      utils.each(opts, function(val,key) {
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

      mock.getHttpData('login', data ,function(result) {
        if (result.state === 0) {
          utils.Event.fire('login',result.data);
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
      mock.getHttpData('register',data, function(result) {
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

  return {
    loginDialog: loginDialog,
    registerDialog: registerDialog
  }
});
