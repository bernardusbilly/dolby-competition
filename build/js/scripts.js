$(document).ready(function() {

	var explanation = 0;
	$('.close-introduction').click(function() {
		if (explanation == 0) {
			$('.intro-1').hide();
			$('.intro-2').show();
			explanation++;
		} else if (explanation == 1) {
			$('.intro-2').hide();
			$('.intro-3').show();
			$('.close-introduction').html("Got it!");
			explanation++;
		} else if (explanation == 2) {
			$('.introduction').hide();
			explanation++;
		}
	})

	var ddolby = Dolby.checkDDPlus();
	var audio = new Audio('build/audio/branch.mp3');
	var bufferSong = 1;
	var timer = 0;
	var pianoType = 0;
	var intervalID = 0;

	var songDict = {
		1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,5,5,5,3,3,3,3,1,1,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,15,15,15,16,16,16,16,15,15,15,15,13,13,13,13,12,12,12,12,12,12,12,12,11,11,11,11,12,12,12,12,13,13,13,13,15,15,15,15,13,13,13,13,5,
			5,5,5,12,12,12,12,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,3,3,2,2,2,2,15,15,15,15,21,21,21,21,15,15,15,15,13,13,13,13,15,15,15,15,13,13,13,13,15,15,15,15,21,21,21,21,13,13,13,13,15,15,15,15,13,13,13,13,13,13,13,13,23,23,23,23,25,25,25,25,23,23,23,23,25,25,25,25,23,23,23,23,25,25,25,25,23,23,23,23,25,25,25,25,23,23,23,23,25,25,25,25,24,24,24,24,23,23,23,23,23,23,23,23,25,25,25,25,23,23,23,23,25,25,25,25,23,23,23,23,24,24,24,24,23,23,23,23,25,25,
			25,25,23,23,23,23,25,25,25,25,24,24,24,24,25,25,25,25,26,26,26,26,25,25,25,25,23,23,23,23,22,22,22,22,22,22,22,22,21,21,21,21,22,22,22,22,23,23,23,23,25,25,25,25,23,23,23,23,15,15,15,15,22,22,22,22,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,0,0,0,0,16,16,16,16,15,15,15,15,15,15,15,15,15,15,15,15,14,14,14,14,13,13,13,13,12,12,12,12,3,3,3,3,5,5,5,5,3,3,3,3,5,5,5,5,3,3,3,3,4,4,4,4,3,3,3,3,5,5,5,5,3,3,3,3,5,5,5,5,3,3,3,3,4,4,4,4,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,22,22,23,23,
			23,23,23,23,23,23,23,23,23,23,23,23,23,23,25,25,25,25,26,26,26,26,25,25,25,25,23,23,23,23,21,21,21,21,21,21,21,21,16,16,16,16,15,15,15,15,15,15,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,15,15,15,16,16,16,16,23,23,23,23,23,23,23,23,15,15,15,15,16,16,16,16,23,23,23,23,23,23,23,23,15,15,15,15,16,16,16,16,0,0,0,0,21,21,21,21,22,23,23,23,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,23,23,23,23,17,17,17,17,17,17,17,17,17,17,17,17,21,21,21,21,27,27,27,27,23,23,23,23,21,21,21,21,21,21,21,21,23,23,23,23,21,21,21,21,21,21,21,21,23,23,23,23,23,23,25,25,21,21,21,21,21,21,21,21,21,21,21,21],
		2: [0,0,0,0,0,0,0,1,5,5,5,5,5,5,5,5,4,4,4,4,4,4,4,1,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,3,3,3,3,3,3,3,1,4,4,4,4,4,4,3,3,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,15,15,15,15,15,15,21,21,15,15,11,11,11,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,11,11,21,21,17,17,11,11,11,11,15,15,14,14,15,15,0,0,11,11,7,7,21,21,11,0,0,0,0,0], 
	} 

	var songSource = {
		1: "build/audio/branch.mp3",
		2: "build/audio/ideal.mp3",
	}

	var songSourceDolby = {
		1: "build/audio/branch_Dolby.mp4",
		2: "build/audio/ideal_Dolby.mp4",
	}

	var tempoSource = {
		1: 2580/24,
		2: 2670/8,
	}

	var composerSource = {
		1: " by Keith Kenniff",
		2: " by Hans Zimmer",
	}

	var pianoSource = {
		0: "piano1/",
		1: "piano2/"
	}

	// Check for browser compatibility for Dolby Audio Enhancement
	if( ddolby === true ){
		// Dolby Digital Plus supported
		// code dependent on Dolby Digital Plus here
		audio = new Audio(songSourceDolby[bufferSong]);
		console.log("Browser is supported for Dolby Audio Enhancement.");
	} else {
		audio = new Audio(songSource[bufferSong]);
		console.log("Browser is not supported for Dolby Audio Enhancement.");
	}

	$('.play-button').click(function() {
		triggerPlayMusic();
	});

	// spacebar for play/stop music
	$(window).keypress(function (e) {
		if (e.keyCode === 0 || e.keyCode === 32) {
			e.preventDefault();
			if (explanation < 3) {
				$('.close-introduction').click();
			} else {
				triggerPlayMusic();	
			}
		}
	})

	function triggerPlayMusic() {
		if (audio.paused == true) {
			console.log("Audio is now played.");
			$('.play-button').html("<span class='fa fa-pause'></span>");
			audio.play();
			startMusic();
		} else {
			console.log("Audio is now paused.");
			$('.play-button').html("<span class='fa fa-play'></span>");
			audio.pause();
			clearInterval(intervalID);
		}
	}		

	$('.song-list').hide();
	$('.shrink-button').hide();
	$('.copyright').hide();
	$('.expand-button').click(function() {
		$('.controller').addClass("controller-expand");
		$(this).hide();
		$('.shrink-button').show();
		setTimeout(function() {
			$('.song-list').show();
			$('.copyright').show();
		}, 300);
		$('.song-ticker').removeClass("song-ticker-vertical");
	});

	$('.shrink-button').click(function() {
		$('.controller').removeClass("controller-expand");
		$(this).hide();
		$('.expand-button').show();
		$('.song-list').hide();
		$('.copyright').hide();
		$('.song-ticker').addClass("song-ticker-vertical");
	});

	$(".song-option").click(function() {
		$('.song-list').children().removeClass("song-active");
		$(this).addClass("song-active");
		bufferSong = parseInt($(this).attr("id"));
		var str = $(this).html();
		$('.song-ticker').html(str.substring(2,str.length) + composerSource[bufferSong]);
		$('.photo-container').attr("src", "build/img/" + pianoSource[pianoType] + "/0.jpg");
		pauseMusic();
		clearInterval(intervalID);

		if( ddolby === true ){
			audio = new Audio(songSourceDolby[bufferSong]);
		} else {
			audio = new Audio(songSource[bufferSong]);
		}

		timer = 0;
	});

	$(".piano-type").click(function() {
		if (pianoType == 0) {
			pianoType = 1;
			$('.photo-container').attr("src", "build/img/" + pianoSource[pianoType] + "/0.jpg");
		} else {
			pianoType = 0;
			$('.photo-container').attr("src", "build/img/" + pianoSource[pianoType] + "/0.jpg");
		}
	});

	// listener for audio 
	audio.addEventListener("ended", function(){
		audio.currentTime = 0;
		console.log("Audio is paused.");
		$('.play-button').html("<span class='fa fa-play'></span>");
		timer = 0;
	});

	function startMusic() {
		notes = songDict[bufferSong];
		intervalID = setInterval(function() {
			if (audio.paused == false) {
				timer = timer + 1;
				/*updateSlider(timer);*/
				if (timer == notes.length - 1) {
					clearInterval(intervalID);
					$('.photo-container').attr("src", "build/img/" + pianoSource[pianoType] + "/0.jpg");
				} else {
					$('.photo-container').attr("src", "build/img/" + pianoSource[pianoType] + notes[timer] + ".jpg");
				}
			}
		}, tempoSource[bufferSong]);
	}

	function pauseMusic() {
		console.log("Audio is now paused.");
		$('.play-button').html("<span class='fa fa-play'></span>");
		audio.pause();
	}

	// Custom Audio Controller

	var seeking = false;
	seekslider = document.getElementById("seekslider");
	seekslider.addEventListener("mousedown", function(event){ seeking = true; seek(event); });
	seekslider.addEventListener("mousemove", function(event){ seek(event); });
	seekslider.addEventListener("mouseup", function(){ seeking = false; });
	
	function seek(event){
	    if(seeking){
	        seekto = audio.duration * (seekslider.value / 100);
	        audio.currentTime = seekto;
	        timer = parseInt(seekto * 1000 / 2580 * 24);
	        console.log(seekslider.value);
	        updateSlider(timer);
	    }
    }

    function updateSlider(timer) {
    	console.log(parseInt(audio.currentTime/audio.duration*100));
    	$('#seekslider').val(parseInt(audio.currentTime/audio.duration*100));
    }
	
});