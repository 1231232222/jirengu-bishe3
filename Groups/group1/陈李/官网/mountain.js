function TinyShake($node){
    this.lm1 = $('.lm1');
    this.lm2 = $('.lm2');
    this.lm3 = $('.lm3');
    this.tb1 = $('.tb1');
    this.tb2 = $('.tb2');

    this.bind($node)
}

TinyShake.prototype.bind = function ($node){
    var _this = this;
    $node.on('mouseenter', function(e){
        _this.x = e.pageX;
        _this.y = e.pageY
    });
    $node.on('mousemove', function(e){
        var x = e.pageX-_this.x;
        var y = e.pageY-_this.y;
        _this.lm1.css('transform', 'translate('+x/200+'px,'+y/150+'px)');
        _this.lm2.css('transform', 'translate('+x/150+'px,'+y/100+'px)');
        _this.lm3.css('transform', 'translate('+x/100+'px,'+y/50+'px)');

        _this.tb1.css('transform', 'translate('+x/200+'px,'+y/100+'px)');
        _this.tb2.css('transform', 'translate('+x/150+'px,'+y/50+'px)');
    })
};

module.exports = TinyShake;
