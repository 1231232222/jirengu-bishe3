var $mountains=$('.mountains');
var winH=$(window).height(),
    winW=$(window).width(),
    $mountains=$('.mountain');

function resetBg(x,y){
    x=x||winW/2;
    y=y||winH/2;
    $mountains.each(function(i,value){
        $this=$(this);
        $this.css({
            left:,
            top:
        });
    })
}
resetBg();