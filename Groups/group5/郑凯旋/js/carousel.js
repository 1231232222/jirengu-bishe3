


function Carousel($node){
    this.$wrap=$node.find('.list-wrap');
    this.$list=this.$wrap.children();
    this.listNumber=this.$list.size();
    this.$list.css({
        'width':$node.width()/3,
        'height':$node.width() /3
    });
    this.$wrap.css({
        'width':this.listNumber*this.$list.outerWidth(true),
        'height':this.$list.outerHeight(true),
    });
    this.$pre=$node.find('.pre');
    this.$next=$node.find('.next');
    this.isloading=false;
	this.bind();  
    this.cur=0;
}

Carousel.prototype={
    bind:function(){
        var _this=this;
        _this.$next.on('click',function(){
            _this.goNext();
        });
        _this.$pre.on('click',function(){
            _this.goPre();
        })
    },

    goNext:function(){
        var _this=this;
        if(_this.cur !== _this.listNumber-3 && !_this.isloading){
            _this.isloading=true;
            _this.cur++;
            _this.$wrap.animate({left:'-='+_this.$list.outerWidth(true)},500,function(){
                _this.isloading=false;
            });
            _this.$list.eq(_this.cur+1).addClass('scale');
            _this.$list.eq(_this.cur).removeClass('scale');
        }
        if(_this.cur===_this.listNumber-3){
            _this.$next.addClass('disable');
        }
        if(_this.cur===1){
            _this.$pre.removeClass('disable');
        }
    },

    goPre:function(){
        var _this=this;
        if(_this.cur !==0 && !_this.isloading){
            _this.isloading = true;
            _this.cur--;
            _this.$wrap.animate({left:'+='+ _this.$list.outerWidth(true)},500,function(){
                _this.isloading=false;
            });
            _this.$list.eq(_this.cur+1).addClass('scale');
            _this.$list.eq(_this.cur+2).removeClass('scale');
        }
        if(_this.cur===0){
            _this.$pre.addClass('disable');
        }
        if(_this.cur===_this.listNumber-4){
            _this.$next.removeClass('disable');
        }
    }
}

var c1=new Carousel($('#content .carousel'));