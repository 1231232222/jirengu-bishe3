// 加入飞翔的monster !
// @method add  将飞翔的monster的格式消息加入messagegQueue队列中
// @method init 开始执行
// @startFly 依次取出messagegQueue中的消息,使用append方法加入界面，动画效果是由css部分实现
//
var flyMonsterFactory = (function() {
  var FlyMonsterFn = function($container) {
    this.$container = $container;
    this.messagegQueue = [];
    this.maxLen = 4; //我们只提供4种类型monster样式 [.icon-notice0,1,2,3,] 和 [.notice-top0,1,2,3]
    this.hasExecuteInit = false;
  };

  FlyMonsterFn.prototype.add = function(msg){
    this.messagegQueue.push(msg);
  };

  FlyMonsterFn.prototype.append = function(idx, msg) {
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
    noticeIdx = idx % this.maxLen;
    $node.find('.icon-notice').addClass('icon-notice' + noticeIdx);
    if (msg.type === 'weather') {
      $node.find('.icon-notice').addClass('weather');
    }

    $node.addClass('notice-top' + noticeIdx).addClass('notice-move').addClass('move' + noticeIdx);
    $('.layer-notice').append($node);

  };

  FlyMonsterFn.prototype.startFly = function(){
    var clock,
        idx = 0,
        _self = this;

    this.append(idx, this.messagegQueue[idx++]);
    clock = setInterval(function(){
      if(idx < _self.messagegQueue.length) {
        _self.append(idx, _self.messagegQueue[idx++]);
      } else {
        clearInterval(clock);
      }

    }, 6000);   //  css的 延时时间 / 这个时间 一定要是基数倍 因为我设置了2层 这样就不会撞车...
  }


  FlyMonsterFn.prototype.init = function() {
    if(!this.hasExecuteInit) {
      this.hasExecuteInit = true;
      this.startFly();
    }
  };

  return {
    create: function($container) {
      var instance = new FlyMonsterFn($container);

      return instance;
    }
  }
})();

(function() {

var flyMonster = flyMonsterFactory.create();

  getHttpData('flyMonster', undefined ,function(result) {
    if(result.state === 0) {
      var msgs = result.data;

      msgs.forEach(function(msg) {
        flyMonster.add(msg);
      });
    flyMonster.init();
    }
  })

  $.ajax({
    url:'http://api.jirengu.com/weather.php',
    method: 'GET',
    dataType: 'jsonp',
    callback:'jQuery30004158580127859153_1471508661958',
    data:{
      _: 1471508661959
    }
  }).done(function(data) {
    if (data.status === 'success') {
      var result = data.results[0].index[2].des || '',
          weather = data.results[0].weather_data[0].weather|| '',
          msg = {
            data: result + ' ' + weather,
            type:'weather'
          };

      flyMonster.add(msg);
      flyMonster.init();
    }
  });
})();
