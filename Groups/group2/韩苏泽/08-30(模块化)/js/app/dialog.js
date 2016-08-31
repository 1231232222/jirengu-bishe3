define(['jquery' , 'utils', 'dialogModel'],function($, utils, dialogModel) {
  // 登陆窗口
  var loginInstance = dialogModel.loginDialog.create({
    $dialogModel: $('#login-dialog'),
    $dialog: $('#login-dialog').find('.dialog')
  });

  // 注册窗口
  var registerInstance = dialogModel.registerDialog.create({
    $dialogModel: $('#register-dialog'),
    $dialog: $('#register-dialog').find('.dialog')
  });

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
  };

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
  };



  var init = function() {
    // 游客 和用户的切换
    var userSwicth = (function() {
        tourist.bindEvent();
        utils.Event.listen('login',function(data) {
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
      })();

    // 默认是游客 需要登入
    $('.layer-nav .userSwicth').find('>a').text('登入');
    tourist.show();
    user.hide();
  };

  return {
    init: init
  };

});
