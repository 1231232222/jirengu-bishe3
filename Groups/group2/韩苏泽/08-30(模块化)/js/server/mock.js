define(['utils'], function(utils) {
  var getHttpData = function(type, data, callback) {
      var getData = function() {
        if (type === 'register') {
          utils.each(data, function(val, key) {
            window.localStorage['bishe3' + key ] = val;
          })

          return HttpData[type];
        }

        if(type === 'login') {
          if (data.username === window.localStorage.bishe3username || data.username === window.localStorage.bishe3email) {
            if (data.password === window.localStorage.bishe3password) {
              return HttpData[type];
            }
          }

          return {state: 2, error: '用户名或密码错误'};
        }

        return HttpData[type];
      };

      setTimeout(function() {
        var result = getData();

        if(result && typeof callback === 'function') {
          callback(result);
          return;
        }
        callback({state: 1, error: '找不到该请求'});
      }, 500);
  };

  var HttpData = {
    flyMonster:{
      state: 0,
      data: [
        {
          data: '今晚方方老师讲浮动，大家快来围观!',
          type: 'class'
        },

        {
          data: '今晚若愚老师讲ajax,大家快来围观!',
          type: 'class'
        },

        {
          data: '明晚8点半，若愚老师讲如何找工作,大家快来围观!',
          type: 'class'
        },

        {
          data: '明晚8点半，方方老师讲Node.js，大家快来围观!',
          type: 'class'
        }
      ]
    },

    register: {
      state: 0,
      data: '注册成功'
    },

    login: {
      state: 0,
      data: {
          msg: '欢迎回来!' + window.localStorage.bishe3username,
          imgsrc: './images/small.jpg',
          name: window.localStorage.bishe3username
      }
    }
  };

  return {
    getHttpData: getHttpData
  };
});
