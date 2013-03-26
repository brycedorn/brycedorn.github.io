function showImage(){
	document.getElementById('loadingImage').style.visibility='visible';
	document.getElementById('loadingImage').style.bottom='0px';
}
function hideImage(){
	document.getElementById('loadingImage').style.visibility='hidden';
	document.getElementById('loadingImage').style.bottom='700px';
}


function timeredirect()
{
    var t = setTimeout("redirect_to('')", 1500);
}
function redirect_to(url)
{
     document.location = url;
}