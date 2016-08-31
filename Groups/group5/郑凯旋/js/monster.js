function Monster($node){
    var _this=this;
    this.$img=$node.find('img');
    this.$img.on('mouseover',function(){
        _this.$img.attr('src',_this.$img.attr('data-hover-img'));
    });
    this.$img.on('mouseleave',function(){
        _this.$img.attr('src',_this.$img.attr('data-img'));
    });
}

var monster1= new Monster($('.monster2'));
var qq2 = new Monster($('.qq2'));
var qq3 = new Monster($('.qq3'));
