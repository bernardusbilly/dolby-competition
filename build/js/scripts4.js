$(document).ready(function() {
	var ddolby = Dolby.checkDDPlus();
	var audio;

	// Check for browser compatibility for Dolby Audio Enhancement
	if( ddolby === true ){
		// Dolby Digital Plus supported
		// code dependent on Dolby Digital Plus here
		console.log("Browser is supported for Dolby Audio Enhancement.");
		audio = new Audio("build/audio/focus_Dolby.mp4");
	} else {
		console.log("Browser is not supported for Dolby Audio Enhancement.");
		audio = new Audio("build/audio/focus.mp3");
	}
	audio.play();

	$('.slow').hover(function() {
		audio.playbackRate = 0.5;
	});
	$('.normal').hover(function() {
		audio.playbackRate = 1;
	});
	$('.fast').hover(function() {
		audio.playbackRate = 2;
	});
	
});