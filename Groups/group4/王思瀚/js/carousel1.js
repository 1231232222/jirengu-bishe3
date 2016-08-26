function carousel1($cur) {
    this.$cur = $cur;
    this.$ul = $cur.find('.carousel>ul');
    this.$li = $cur.find('.list');
    this.$imgCount = this.$li.size();
    this.$li.css({
            'width':this.$cur.outerWidth() / 3,
            'height':this.$cur.outerWidth() /3
    });
    this.$ul.css({
            'width':this.$imgCount * this.$li.outerWidth(true) + 5,
            'height':this.$li.outerHeight(true)
    })

    this.$pre = $cur.find('.pre');
    this.$next = $curfind('.next');
    this.isAnimate = true;
    this.num = 1;
    this.bind();
}

carousel1.prototype = {
    bind: function(){
            var me = this;
            me.$next.on('click',function(){
                me.toNext()
            })
            me.$pre.on('click',function(){
                me.toPre()
            });
    },
    toNext: function(){
        var me = this;
        if(me.isAnimate){
            me.isAnimate = false;

        }
    }
}