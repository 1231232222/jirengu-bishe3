function getweather(){
    var $weather=$('#header .notice a');
    $.ajax({
        url:'http://api.jirengu.com/weather.php',
        type:'get',
        dataType:'jsonp'
    }).done(function(ret){
        $weather.text(ret.results[0].index[0].des);
        $weather.attr('title',ret.results[0].index[0].des);
    })
}

getweather();