/* Dependencies
* --------------------------------------------------------
* jQuery
*/


$(function() {
    $("#go").click(function() {
        //var steamid = $("#steamidinput").val();
        var steamid = 76561197999135908;
        /*
        var angle = 0;
        setInterval(function(){
            angle+=4;
            $("#logo").rotate(angle);
        },10);
        */

        var classes = [
            "Scout",
            "Soldier",
            "Pyro",
            "Demoman",
            "Heavy",
            "Engineer",
            "Medic",
            "Sniper",
            "Spy"
        ];

        getDamageDealt(steamid);
        getMapsPlayed(steamid);
        
    });
});

window.onload = function(){
    document.getElementById("go").click();
}