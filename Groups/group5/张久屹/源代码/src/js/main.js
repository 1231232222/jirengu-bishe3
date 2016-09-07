require.config({
	baseUrl: 'src/js',
	paths: {
		'jquery':"../../lib/jquery.min"		
	}
})


requirejs(['notice']);
requirejs(['mountain']);
requirejs(['scaleCarousle']);
requirejs(['carousle']);
requirejs(['imgHover']);