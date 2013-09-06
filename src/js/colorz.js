$(document).ready(function(){
    var temp = "rgba(148,212,196,0.3)";
    var old = 0;
    var x = 0;
    var names =
    [
        "steve","pablo","terrence","phil"
    ];

    setInterval(function(){
        old = $('#'+names[x]).css("background-color");
        $('#'+names[x]).css('background-color',temp); 
        if(x > 2) { x = 0; }
            else { x++; }
        temp = old;
    },2000);
});