// 加入飞翔的monster !
// @method add  将飞翔的monster的格式消息加入messagegQueue队列中
// @method init 开始执行
// @startFly 依次取出messagegQueue中的消息,使用append方法加入界面，动画效果是由css部分实现
define(['jquery', 'utils'],
function($, utils) {
  var FlyMonsterFn = function($container) {
    this.$container = $container;
    this.messagegQueue = [];
    this.maxLen = 4; //我们只提供4种类型monster样式 [.icon-notice0,1,2,3,] 和 [.notice-top0,1,2,3]
    this.clock = null;
    this.num = 0;
  };

  FlyMonsterFn.prototype.add = function(msg){
    this.messagegQueue.push(msg);
  };

  FlyMonsterFn.prototype.append = function(msg) {
    var html ='',
    $node,
    $notice,
    noticeIdx;

    html += '<div class="notice">';
    html += '<a class="notice-ct" href="javascript:void(0)"></a>';
    html +='<div class="icon-notice"></div>';
    html += '</div>';
    $node = $(html);
    $node.find('.notice-ct').text(msg.data).attr('title', msg.data);
    noticeIdx = this.num++ % this.maxLen;
    $node.find('.icon-notice').addClass('icon-notice' + noticeIdx);
    if (msg.type === 'weather') {
      $node.find('.icon-notice').addClass('weather');
    }

    $node.addClass('notice-top' + noticeIdx).addClass('notice-move').addClass('move' + noticeIdx);
    $('.layer-notice').append($node);

  };

  FlyMonsterFn.prototype.startFly = function(){
    var _self = this;

    if (this.clock) {  // 如果存在clock,说明有定时器执行加入元素
      return;
    }
    this.append(this.messagegQueue.shift());
    this.clock = setInterval(function(){
      if ( _self.messagegQueue.length > 0 ) {
        _self.append(_self.messagegQueue.shift());
      } else {
        clearInterval(_self.clock);
      }

    }, 6000);   //  css的 延时时间 / 这个时间 一定要是基数倍 因为我设置了2层 这样就不会撞车...
  }


  FlyMonsterFn.prototype.init = function() {
      this.startFly();
  };

  return {
    create: function($container) {
      var instance = new FlyMonsterFn($container);

      return instance;
    }
  };

});
