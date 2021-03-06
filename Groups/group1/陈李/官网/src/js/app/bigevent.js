function BigEvent($node){
    this.imgCt = $node.find('ul');
    this.item = this.imgCt.find('li');
    this.itemWidth = this.item.outerWidth(true);
    this.itemCount = this.item.length;
    this.pre = $node.find('.tri-right');
    this.next = $node.find('.tri-left');
    this.Title = $('.notice-title');

    this.imgCt.css({
        width: this.itemCount* this.itemWidth
    });

    this.curIdx = 0;
    this.isAnimate = false;

    this.bind()
}

BigEvent.prototype = {
    bind: function(){
        var _this = this;
        _this.pre.on('click',function(){
            _this.doPre()
        });
        _this.next.on('click',function(){
            _this.doNext()
        });
        _this.Title.find('li').on('mouseenter',function(){
            var idx = $(this).index();
            if(idx<_this.curIdx){
                _this.doPre(_this.curIdx- idx)
            }
            else{
                _this.doNext(idx- _this.curIdx)
            }
        })
    },

    doPre: function(idx){
        var _this = this;
        idx = idx || 1;
        if(this.curIdx === 0){
            _this.pre.addClass('active');
            return
        }
        if(!_this.isAnimate){
            _this.isAnimate = true;
            _this.doScaleLeft();
            _this.imgCt.animate({
                left: '+=' + _this.itemWidth* idx
            },function(){
                _this.curIdx = (_this.itemCount+ _this.curIdx- idx)% _this.itemCount;
                _this.setTitle();
                _this.isAnimate = false
            })
        }
    },

    doNext: function(idx){
        var _this = this;
        idx = idx || 1;
        if(this.curIdx === 3){
            _this.next.addClass('active');
            return
        }
        if(!_this.isAnimate){
            _this.isAnimate = true;
            _this.doScaleRight();
            _this.imgCt.animate({
                left: '-=' + _this.itemWidth* idx
            },function(){
                _this.curIdx = (_this.curIdx+ idx)% _this.itemCount;
                _this.setTitle();
                _this.isAnimate = false
            })
        }
    },

    doScaleRight: function(){
        this.item.removeClass('active').eq(this.curIdx+2).addClass('active');
        this.pre.removeClass('active')
    },

    doScaleLeft: function(){
        this.item.removeClass('active').eq(this.curIdx).addClass('active');
        this.next.removeClass('active')
    },

    setTitle: function(){
        this.Title.children().removeClass('hover').eq(this.curIdx).addClass('hover')
   }
};

module.exports = BigEvent;
