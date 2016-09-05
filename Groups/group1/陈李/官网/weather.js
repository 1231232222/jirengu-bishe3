function weather() {
    $.ajax({
        url: 'http://api.jirengu.com/weather.php',
        type: 'get',
        dataType: 'jsonp',
        jsonpCallback: 'getWeather'
    })
    .done(function(ret) {
        handleWeather(ret)
    })
    .fail(function() {
        console.log("error")
    });

    function handleWeather(ret){
        var $weatherNode = $('.weather'),
            data = ret.results[0].index[0].des;
        $weatherNode.text(data);
        $weatherNode.attr('title', data)
    }
}


module.exports = weather;
