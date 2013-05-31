$(document).ready(
            function(){
                $('img').toggle(
                function() { $(this).animate({width: "100%"}, 500)},
                function() { $(this).animate({width: "50px"}, 500);}
            }); 
    );