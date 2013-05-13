/* Dependencies
* --------------------------------------------------------
* jQuery
*/


$(function() {
    $("#go").click(function() {
        var input = $("#idinput").val();
        var steamid = getSteamId(input);
        //var steamid = 76561197999135908;
        var classname = $("#classselect").val();

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

        Story(steamid,classname);

    });
});

function getSteamId(input){
    var retval;
    $.getJSON('http://steamcommunity.com/id/'+input+'/?xml=1', function(data) {
        if(typeof(data) !== "undefined") {
            retval = data.profile.steamID64;
        }
        return retval;
    });
}

function Story(steamid,classname) {
    var userstats = [];
    var key = "4BE286C8B4E8CB5435CC7D68B0E5C169";
    $.getJSON("http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=" + key + "&appid=440&steamid=" + steamid + "&format=json", function(data) {
    //$.getJSON('stats.json', function(data) {
        if(typeof(data) !== "undefined") {

            for(var idx=0;idx<200;idx++){

                if(data.playerstats.stats[idx].name.indexOf(classname+".accum.iPlayTime") != -1) {
                    userstats[0] = (data.playerstats.stats[idx].value);
                }
                if(data.playerstats.stats[idx].name.indexOf(classname+".accum.iDominations") != -1) {
                    userstats[1] = (data.playerstats.stats[idx].value);
                }
                if(data.playerstats.stats[idx].name.indexOf(classname+".accum.iNumberOfKills") != -1) {
                    userstats[2] = (data.playerstats.stats[idx].value);
                }
                if(data.playerstats.stats[idx].name.indexOf(classname+".accum.iKillAssists") != -1) {
                    userstats[3] = (data.playerstats.stats[idx].value);
                }
                if(data.playerstats.stats[idx].name.indexOf(classname+".accum.iPointCaptures") != -1) {
                    userstats[4] = (data.playerstats.stats[idx].value);
                }
                if(data.playerstats.stats[idx].name.indexOf(classname+".max.iNumberOfKills") != -1) {
                    userstats[5] = (data.playerstats.stats[idx].value);
                }
                if(data.playerstats.stats[idx].name.indexOf(classname+".max.iKillAssists") != -1) {
                    userstats[6] = (data.playerstats.stats[idx].value);
                }
                if(data.playerstats.stats[idx].name.indexOf(classname+".max.iDominations") != -1) {
                    userstats[7] = (data.playerstats.stats[idx].value);
                }
            }
        }

        writeStory(userstats,classname);

    });
}

function writeStory(userstats,classname) {
    var text = document.getElementById('story').innerHTML = 
        //put an inline img of avatar here
        "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" +
        "It's rumored that if you ever see this <a>"
            + classname +
        "</a>, you'd better hope that he's on your team. Otherwise you're likely to join the <a>" 
            + Math.floor(userstats[2]/10) * 10 +
        "</a> poor souls that have been slain by this fellow over the course of his career. " +
        "He's spent more than <a>"
            + Math.floor(userstats[0] / 3600) +
        "</a> hours on the battlefield, and if you're inexperienced like the <a>"
            + userstats[1] +
        "</a> enemies that he's dominated, or the <a>" 
            + userstats[3] +
        "</a> he assisted in killing, then you better start running now. You've been warned; this <a>"
            + classname + 
        "</a> is a force to be reckoned with." +
        "</br>" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + 
        "It's rumored that in a single life, he once managed to achieve <a>"
            + userstats[5] +
        "</a> kills and <a>"
            + userstats[7] +
        "</a> dominations, which is, to say the least, pretty darn impressive. And equally frightening."


        ;

}






