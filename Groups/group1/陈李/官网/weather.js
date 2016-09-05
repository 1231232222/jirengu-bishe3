function weather() {
    $.ajax({
        url: 'http://api.jirengu.com/weather.php',
        type: 'get',
        dataType: 'jsonp',
        jsonpCallback: 'getWeather'
    })
    .done(function(ret) {
        handleWeather(ret.results[0].index[0].des)
    })
    .fail(function() {
        console.log("error")
    });

    function handleWeather(data){
        var $weatherNode = $('.weather');
        $weatherNode.text(data);
        $weatherNode.attr('title', data)
    }
}


module.exports = weather;
