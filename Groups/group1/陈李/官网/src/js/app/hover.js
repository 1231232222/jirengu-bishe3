function HoverChange($node){
    this.imgSrc = $node.attr('data-img');
    this.gifSrc = $node.attr('data-gif');
    this.bind($node)
}

HoverChange.prototype.bind = function($node){
    var _this = this;
    $node.on('mouseover', function(){
        $node.attr('src', _this.gifSrc)
    });
    $node.on('mouseout', function(){
        $node.attr('src', _this.imgSrc)
    })
};

module.exports = HoverChange;
