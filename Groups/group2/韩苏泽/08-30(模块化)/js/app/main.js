requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app',
        jquery: 'http://apps.bdimg.com/libs/jquery/1.9.1/jquery',
        mock: '../server/mock'
    }
});

// jquery实现的一些小效果
requirejs (['jquery'],
function($) {
  // header的moster-talk的动画实现
  $('.monster-talk').find('img').on('mouseenter', function() {
    $(this).attr('src','./images/talk.gif');
  });

  $('.monster-talk').find('img').on('mouseleave', function() {
    $(this).attr('src','./images/talk.png');
  });
});

// 飞翔的Monster消息 接收天气信息 和 mock的课程预告
requirejs (['jquery', 'mock', 'flyMonster'],
function($, mock, flyMonsterFactory) {

  var flyMonster = flyMonsterFactory.create();

    mock.getHttpData('flyMonster', undefined ,function(result) {
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
});

// 山峰移动效果
requirejs(['jquery', 'moveMountainFactory'],
function($, mountain) {
  var layerMountains = [
    {
      $item: $('.layer-mountain1'),
      factor: 5
    },

    {
      $item: $('.layer-mountain2'),
      factor: 2
    },

    {
      $item: $('.layer-mountain3'),
      factor: 1
    }
  ];
  var layerMountainsMove = mountain(layerMountains, 100);

  layerMountainsMove.init();

  var introMountains = [
    {
      $item:$('.intro-layers .intro-bg1'),
      factor: 5
    },

    {
      $item:$('.intro-layers .intro-bg2'),
      factor: 2
    }
  ];

  var introMountains = mountain(introMountains, 200);

  introMountains.init();
});

// 页面中部轮播 可以按照屏幕宽度自适应列数
requirejs (['jquery', 'CarsouelModel'],
function($, CarsouelModel) {

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
});

// 页面底部的轮播
requirejs(['jquery', 'utils', 'bigEventModel'],
function($, utils, bigEvent) {
  var eventCarsoule = bigEvent.create(),
      $screen = $('.event-ct'),
      $container = $screen.find('.events'),
      $prev = $screen.find('.prev'),
      $next = $screen.find('.next'),
      $lists = $container.find('li'),
      width = $(window).width(),
      param = {
        $screen: $screen,
        $container: $container,
        $prev:$prev,
        $next:$next,
        $lists: $lists,
        width: width,
        curIdx: 0
      };

    eventCarsoule.init(param);

    // timeline 触发上面的eventCarsoule的滚动
    var $timeline = $('.timeline'),
        $lists =$timeline.find('li'),
        bindtimelineMove;

    $timeline.on('mouseenter', 'li',function() {
      var idx = $(this).index();

      utils.Event.fire('timelineMove',idx);
    });
    utils.Event.listen('carsouelMove', function(idx) {
      $lists.removeClass('active');
      $lists.eq(idx).addClass('active');
    });
});

// 登陆窗口 已登陆 和注册窗口的相互切换
// 要先注册 注册后会在localstorage里面存上用户名和密码。
requirejs(['app/dialog'],function(dialog){
   dialog.init();
})
