
class Video extends Viewer
	constructor: (options) ->
		super(options)  
		{@videoFiles} = options
		@videoLoop = @element.data('loop') || true
		@videoAutoPlay = @element.data('autoplay') || true
		@controls = @element.data('controls') || false
		@videoSize = @element.data('size') || false
		
	convertElement : () ->
		@video = $("<video>")						 
		@element.append(@video)

	first_init : ()-> 
		defer = $.Deferred()
		if @videoLoop != "false" then @video.attr {"loop"} 
		if @videoAutoPlay != "false" then @video.attr {"autoplay"}   
		if @controls then @video.attr {controls : true}
		if @videoSize then @video.attr {width : @element.data('size'), height : @element.data('size')}
		
		for videoFile in @videoFiles
			$source = $('<source>')			
			$source.attr {type : "video/" + videoFile.fileType, src : [@src , videoFile.fileName + "." + videoFile.fileType].join("/")}
			@element.find("video").append($source);		
		
		_t = @
		arr = @callbackPic.split('/')
		arr.pop()
		playUrl = arr.join('/') + '/play.png' 
		@loadImage(playUrl).then((img)-> 
			_t.element.find("video").attr {poster : img.src}  
			defer.resolve(@)
		)

		#remove right click menu
		@element.find("video").bind 'contextmenu', () ->
			return false
			
		#for mobile support
		@element.find("video").on 'click', () ->            
			@.play()
		
		defer

	full_init : ()-> 
		defer = $.Deferred()
		defer.resolve(@)		
		defer  
	play : () -> return
	stop : () -> return

@Video = Video