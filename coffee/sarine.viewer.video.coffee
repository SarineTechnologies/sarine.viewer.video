###!
sarine.viewer.video - v0.0.0 -  Sunday, August 16th, 2015, 11:55:27 AM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
###

class Video extends Viewer
	constructor: (options) ->
		super(options)
		
	convertElement : () ->
		@video = $("<video>")				
		@element.append(@video)

	first_init : ()-> 
		defer = $.Deferred()
		
		defer.resolve(@)
		defer

	full_init : ()-> 
		defer = $.Deferred()
		defer.resolve(@)		
		defer  
	play : () -> return
	stop : () -> return

@Video = Video