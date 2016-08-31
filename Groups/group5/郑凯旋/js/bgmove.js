function bgmove($node,dx,dy){
    var winW= $(window).width()/2,
        winH= $(window).height()/2;
    this.$ct=$node.parent();

    this.$ct.on('mousemove',function(e){
       	$node.css({
			'transform': 'translate('+ (e.pageX-winW)/dx + 'px,'+ (e.pageY-winH)/dy +'px)',
		});
    })
}

var bg3 = new bgmove($('.mountain3'),30,40),
    bg2 = new bgmove($('.mountain2'),50,60),
    bg1 = new bgmove($('.mountain1'),70,80);

var introbg1= new bgmove($('.intro-bg1'),70,80),
    introbg2= new bgmove($('.intro-bg2'),30,40);

