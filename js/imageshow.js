function showImage(){
	document.getElementById('loadingImage').style.visibility='visible';
	document.getElementById('loadingImage').style.bottom='0px';
}
function hideImage(){
	document.getElementById('loadingImage').style.visibility='hidden';
	document.getElementById('loadingImage').style.bottom='700px';
}

// Wait for window load
$(window).load(function() {
	// Animate loader off screen
	$("#loader").animate({
		top: -200
	}, 1500);
});