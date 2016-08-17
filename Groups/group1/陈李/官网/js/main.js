//首屏 和我聊聊
var $chat = $('.chat img'),
	chatImg = $chat.attr('data-img'),
	chatGif = $chat.attr('data-gif')
$chat.on('mouseover', function(){
	$chat.attr('src', chatGif)
})
$chat.on('mouseout', function(){
	$chat.attr('src', chatImg)
})

//carousel
var $crsCt = $('.mod-carousel ul'),
	$items = $crsCt.find('li'),
	itemsWidth = $items.width(),
	itemsCount = $items.length

$crsCt.css({
	width: itemsWidth* itemsCount,
	left: 0
})