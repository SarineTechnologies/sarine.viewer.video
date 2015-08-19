###!
sarine.viewer.video - v0.0.0 -  Wednesday, August 19th, 2015, 10:13:45 AM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
###

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
		@loadImage(@callbackPic).then((img)-> 
			$image = $("<img>")
			$image.attr {src : img.src, alt : 'No video playback capabilities', class :'no_stone' ,  title : 'No video playback capabilities'}
			_t.element.find("video").append($image)
			defer.resolve(@)
		)

		
		defer

	full_init : ()-> 
		defer = $.Deferred()
		defer.resolve(@)		
		defer  
	play : () -> return
	stop : () -> return

@Video = Video