$(document).ready(function() {
	var ddolby = Dolby.checkDDPlus();

	// Check for browser compatibility for Dolby Audio Enhancement
	if( ddolby === true ){
		// Dolby Digital Plus supported
		// code dependent on Dolby Digital Plus here
		console.log("Browser is supported for Dolby Audio Enhancement.");
	} else {
		console.log("Browser is not supported for Dolby Audio Enhancement.");
	}

	var audio;
	$('.hexagon').hover(function(){
		if (ddolby === true) {
			audio = new Audio("build/audio/" + this.id+ "_Dolby.mp4");	
		} else {
			audio = new Audio("build/audio/" + this.id+ ".mp3");	
		}
		
		audio.loop = true;
		audio.play()
	}, function() {
		audio.pause();
	});

	var stillInHover = true;
	$('#dolby').hover(function() {
		if (ddolby === true) {
			audio = new Audio("build/audio/" + this.id+ "_Dolby.mp4");
		} else {
			audio = new Audio("build/audio/" + this.id+ ".mp3");	
		}
		audio.loop = true;
		audio.play()

		stillInHover = true;
		$('.hexagon').addClass("active");
		setTimeout(function() {
			$('.hexagon').removeClass("active");
			if (stillInHover == true) {
				$('.hexagon').addClass("active2");	
			}
		}, 13000);
	}, function() {
		audio.pause();
		stillInHover = false;
		$('.hexagon').removeClass("active");
		$('.hexagon').removeClass("active2");
	});
});