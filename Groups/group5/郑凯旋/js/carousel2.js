function Carousel2($node){
    this.$ct=$node.find('ul.event');
    this.$item=$node.find('ul.event>li');
    this.length=this.$item.size();
    this.$item.css({
        'width':$(window).width()
    });
    this.$ct.css({
        'width':this.$item.outerWidth(true)*this.length
    });
    this.$pre=$node.find('.pre');
    this.$next=$node.find('.next');
    this.timeline=$node.find('.timeline');
    this.$li=$node.find('.timeline>li');
    this.$pointer=$node.find('.timeline .pointer');
    this.curIdx=0;
    this.isloading=false;
    this.bind();
}

Carousel2.prototype.bind=function(){
    var _this=this;
    this.$next.on('click',function(){
        _this.goNext();
    });
    this.$pre.on('click',function(){
        _this.goPre();
    });
    this.$li.on('mouseenter',function(){
        var idx=$(this).index();
        if(idx>_this.curIdx){
            _this.goNext(idx-_this.curIdx);
        }else{
            _this.goPre(_this.curIdx-idx);
        }
    });
}

Carousel2.prototype.goNext=function(num){
    var num=num||1;
    var _this=this;
    if(!this.isloading && this.curIdx !==3){
        this.isloading=true;
        this.curIdx+=num;
        this.$ct.animate({left:'-='+_this.$item.outerWidth(true)*num},function(){
            _this.setBullet(_this.curIdx);
            _this.isloading=false;
        });
    }
    if(this.curIdx===3){
        this.$next.addClass('disable');
    }
    if(this.curIdx===1){
        this.$pre.removeClass('disable');
    }
};

Carousel2.prototype.goPre=function(num){
    var num=num||1;
    var _this=this;
    if(!this.isloading && this.curIdx !==0){
        this.isloading=true;
        this.curIdx-=num;
        this.$ct.animate({'left':'+='+ _this.$item.outerWidth(true)*num},function(){
            _this.setBullet(_this.curIdx);
            _this.isloading=false;
        });
    }
    if(this.curIdx===0){
        this.$pre.addClass('disable');
    }
    if(this.curIdx===2){
        this.$next.removeClass('disable');
    }
};

Carousel2.prototype.setBullet=function(num){
    this.$li.eq(num).addClass('active').siblings().removeClass('active');
    
}

var c3=new Carousel2($('.event-wrap'));