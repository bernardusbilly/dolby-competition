$(document).ready(function() {
	var ddolby = Dolby.checkDDPlus();
	var audio;

	// Check for browser compatibility for Dolby Audio Enhancement
	if( ddolby === true ){
		// Dolby Digital Plus supported
		// code dependent on Dolby Digital Plus here
		console.log("Browser is supported for Dolby Audio Enhancement.");
		audio = new Audio("build/audio/granola_Dolby.mp4");
	} else {
		console.log("Browser is not supported for Dolby Audio Enhancement.");
		audio = new Audio("build/audio/granola.m4a");
	}

	var video = $('#vid');
	audio.play();
	audio.loop = true;

	$('.audio-controller').click(function() {
		if (audio.muted === false) {
			audio.muted = true;
			$(this).html("<span class='fa fa-volume-off'></span>");
		} else {
			audio.muted = false;
			$(this).html("<span class='fa fa-volume-up'></span>");
		}
	});

});