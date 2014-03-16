$(document).ready(function(){
    var temp = "rgba(168,124,137,0.5)";
    var old = 0;
    var x = 0;

    setInterval(function(){
        old = $('#colors_'+x).css("background-color");
        $('#colors_'+x).css('background-color',temp); 
        // console.log('tryna change color of'+x)
        if(x > 2) { x = 0; }
            else { x++; }
        temp = old;
    },2000);
});