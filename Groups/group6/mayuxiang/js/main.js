function getWeather(){
    var weatherTxt = "";
    $.ajax({
        url: "http://api.jirengu.com/weather.php",
        methods: "get",
        success: function(res){
            var txt = JSON.parse(res),
                i = Math.floor(Math.random() * 6);
            $(".weather-txt").text("亲爱的hunger，您所在的" + txt.results[0].currentCity + "，实时气温：" + txt.results[0].weather_data[0].temperature + "，" + txt.results[0].index[i].des + "pm2.5指数：" + txt.results[0].pm25);
        },
        error: function(){
            $(".weather-txt").text("sorry,火星的天气小谷不知道呐。");
        }
    })
}
getWeather();

function Mountain(node){
    this.node = node;
    this.mount1 = node.querySelectorAll(".JS_mountain")[0];
    this.mount2 = node.querySelectorAll(".JS_mountain")[1];
    if(node.querySelectorAll(".JS_mountain")[2] !== null){
        this.mount3 = node.querySelectorAll(".JS_mountain")[2];
    }
    this.bindEvents();
}

Mountain.prototype = {
    bindEvents: function(){
            var me = this;
            this.node.addEventListener("mousemove",function(event){
                var clock;
                if(clock){
                    clearTimeout(clock);
                }
                var pageX = event.pageX,
                    halfPageW = 0.5 * this.offsetWidth,
                    moveDis = pageX - halfPageW;
                clock = setTimeout(function(){
                    me.mount1.style.cssText = "transform:translateX(" + 0.05*moveDis + "px);";
                    me.mount2.style.cssText = "transform:translateX(" + -0.15*moveDis + "px);";
                    if(me.mount3 !== undefined){
                        me.mount3.style.cssText = "transform:translateX(" + 0.15*moveDis + "px);";
                    }
                },20);
            })
    }
}

function NormalCarsouel(node){
    this.node = node;
    this.imgCt = node.find(".carsouel-img-ct");
    this.dirLfControl = node.find(".carsouel-lf-control");
    this.dirRtControl = node.find(".carsouel-rt-control");
    this.itemControl = node.find(".carsouel-item-control");
    this.idx = 0;
    this.playLf = false;
    this.playRt = true;
    this.canMove = true;
    this.reset();
    this.bindEvents();
    this.checkCtrl();
}
NormalCarsouel.prototype = {
    bindEvents: function(){
        var _this = this;
        this.dirLfControl.on("click",function(){
            if (_this.playLf&&_this.canMove) {
                _this.canMove = false;
                _this.play(-1);
                _this.idx -= 1;
                _this.checkCtrl();
                _this.itemControl.find("a").removeClass("carsouel-item-active");
                _this.itemControl.find("li").eq(_this.idx).children("a").addClass("carsouel-item-active");
                _this.canMove = true;
            }
        });
        this.dirRtControl.on("click",function(){
            if (_this.playRt&&_this.canMove) {
                _this.canMove = false;
                _this.play(1);
                _this.idx += 1;
                _this.checkCtrl();
                _this.itemControl.find("a").removeClass("carsouel-item-active");
                _this.itemControl.find("li").eq(_this.idx).children("a").addClass("carsouel-item-active");
                _this.canMove = true;
            }
        });    
        this.itemControl.on("mouseenter","li",function(event){
            if(_this.canMove) {
                _this.canMove = false;
                var target = $(event.target),
                oldIdx = _this.idx;
                _this.idx = target.index();
                _this.play(_this.idx - oldIdx);
                _this.itemControl.find("a").removeClass("carsouel-item-active");
                _this.itemControl.find("li").eq(_this.idx).children("a").addClass("carsouel-item-active");
                _this.checkCtrl();
                _this.canMove = true;
            }
        });
        $("body").on("resize",function(){
            _this.reset();
        })
    },
    
    play: function(num){
        this.imgCt.animate({
           left: "-=" + this.node.width() * num 
        })
    },
    
    reset: function(){
        var clintWidth = $(window).width();
        this.imgCt.css({
            width: clintWidth * this.node.find(".carsouel-img").length
        })
        this.imgCt.find(".carsouel-img").css({
            widrh: "25%"
        })
    },
    
    setItemCtrl: function(){
          
    },
    
    checkCtrl: function(){
        if(this.idx === 0){
            this.playLf = false;
            this.dirLfControl.addClass("lock-control");
        }else if(this.idx === this.node.find(".carsouel-img").length - 1){
            this.playRt = false;
            this.dirRtControl.addClass("lock-control");
        }else {
            this.playLf = true;
            this.playRt = true;
            this.dirLfControl.removeClass("lock-control");
            this.dirRtControl.removeClass("lock-control");
        }
    }
}

function ModernCarsouel(node){
    this.node = node;
    this.imgCt = node.find(".mcarsouel-img-ct");
    this.rtCtrl = node.find(".mcarsouel-rtcontrol");
    this.lfCtrl = node.find(".mcarsouel-lfcontrol");
    this.idx = 0;
    this.canMove = true;
    this.lfMove = false;
    this.rtMove = true;
    this.reset();
    this.transform();
    this.bindEvents(); 
}
ModernCarsouel.prototype = {
    bindEvents: function(){
        var _this = this;
        this.lfCtrl.on("click",function(){
            if(_this.canMove&&_this.lfMove){
                _this.canMove = false;
                _this.imgCt.animate({
                    left: "+=" + $("body").innerWidth()/3
                });
                _this.idx -=1;
                _this.transform();
                _this.checkLock();
                _this.canMove = true;
            }
        });
        this.rtCtrl.on("click",function(){
            if(_this.canMove&&_this.rtMove){
                _this.canMove = false;
                _this.imgCt.animate({
                    left: "-=" + $("body").innerWidth()/3
                });
                _this.idx +=1;
                _this.transform();
                _this.checkLock();
                _this.canMove = true;
            }
        });
        $(window).on("resize",function(){
            _this.reset();
        });
    },
    
    reset: function(){
        this.node.css({
            "height": $("body").innerWidth()/3*1.3, 
        })
        this.imgCt.css({
            "box-sizing": "border-box",
            "padding-top": $("body").innerWidth()/3*0.125,
            "padding-bottom": $("body").innerWidth()/3*0.125,
            "height": $("body").innerWidth()/3*1.25,
            "width": $("body").innerWidth()/3 * this.node.find(".mcarsouel-img").length 
        })
        this.node.find(".mcarsouel-img").css({
            "box-sizing": "border-box",
            "width": $("body").innerWidth()/3,
            "height": $("body").innerWidth()/3
        })
    },
    
    transform: function(){
        this.imgCt.find(".mcarsouel-img").removeClass("mcarsouel-scale");
        this.imgCt.find(".mcarsouel-img").eq(this.idx+1).addClass("mcarsouel-scale");  
    },
    
    checkLock: function(){
        if(this.idx === 0){
            this.lfMove = false;
            this.lfCtrl.css({
                "border-color": "transparent #ccc transparent transparent"
            })
        }else if(this.idx === this.node.find(".mcarsouel-img").length - 3){
            this.rtMove = false;
            this.rtCtrl.css({
                "border-color": "transparent transparent transparent #ccc"
            })
        }else{
            this.lfMove = true;
            this.rtMove = true;
            this.lfCtrl.removeAttr("style");
            this.rtCtrl.removeAttr("style");
        }
    }
}


var mountLayer1 = document.getElementsByClassName("JS_mountain-layers1")[0],
    mountLayer2 = document.getElementsByClassName("JS_mountain-layers2")[0],
    mount1 = new Mountain(mountLayer1),
    mount2 = new Mountain(mountLayer2);

var neweventCsl = $(".normal-carsouel"),
    nmlCarsouel1 = new NormalCarsouel(neweventCsl);

var JSModernCarsouel = $(".JS_modern-carsouel"),
    modernCarsouel = new ModernCarsouel(JSModernCarsouel);