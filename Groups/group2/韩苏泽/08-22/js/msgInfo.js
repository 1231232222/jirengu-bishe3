var msg = (function() {
  var space = 60,
      len = 0;

  var msgInfo = function(){
    var state = Array.prototype.shift.call(arguments),
        args = arguments;
    each(args, function(val) {
      var $node =$('<div class="msg-info fa"></div>');

      $node.text(' ' + val);
      $node.css('top',(len * 60 + 10) + 'px').addClass(state);
      len++;
      $(document.body).append($node);

      setTimeout(function() {
        $node.remove();
        len--;
      },3000);
    });

  };

  return {
    error: function() {
      Array.prototype.unshift.call(arguments,'error');
      msgInfo.apply(this, arguments);
    },
    log: function() {
      Array.prototype.unshift.call(arguments,'log');
      msgInfo.apply(this, arguments);
    }
  };

})();
