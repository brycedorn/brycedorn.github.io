/*

~Various API calls to get data~


arrays will ALWAYS be indexed 0-8 for each of these classes respectively:
0. Scout
1. Soldier
2. Pyro
3. Demoman
4. Heavy
5. Engineer
6. Medic
7. Sniper
8. Spy

*/



/*
* fetches accumulative damage dealt
*
* params: {string} steamid - the steamid of player info is fetching for
* return: array of numbers, indexed 0-8 for each class respectively
*/

function getDamageDealt(steamid) {
    var ret = [];
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
        ]
    var key = "4BE286C8B4E8CB5435CC7D68B0E5C169";
    //$.getJSON("http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=" + key + "&appid=440&steamid=" + steamid + si2 + "&format=json", function(data) {
    $.getJSON('stats.json', function(data) {
        if(typeof(data) !== "undefined") {

            //get max
            var c = 0;
            for(var idx=0;idx<500;idx++){
            	if(data.playerstats.stats[idx].name.indexOf(classes[c]+".max.iDamageDealt") !=-1) {
                    ret.push(data.playerstats.stats[idx].value);
                    c++;
                    idx = 0;
                    if(c == 9) break;
                }
            }

            //get accum
            c = 0;
            for(idx=0;idx<500;idx++){
                if(data.playerstats.stats[idx].name.indexOf(classes[c]+".accum.iDamageDealt") !=-1) {
                    ret.push(data.playerstats.stats[idx].value);
                    c++;
                    idx = 0;
                    if(c == 9) break;
                }
            }

            visBarGraph(ret.slice(0,9),damagesmax,Math.max.apply(Math, ret.slice(0,9)),classes);
            visBarGraph(ret.slice(9,18),damagesaccum,Math.max.apply(Math, ret.slice(9,18)),classes);
        }
    });
}

function getMapsPlayed(steamid) {
    var ret = [];
    var mapz = [
            "cp_dustbowl",
            "cp_egypt_final",
            "cp_gravelpit",
            "ctf_2fort",
            "ctf_doublecross",
            "ctf_turbine",
            "cp_well",
            "pl_badwater",
            "pl_frontier_final",
            "pl_goldrush",
            "pl_hoodoo_final",
            "pl_upward",
            "pl_barnblitz",
            "plr_hightower"
        ]
    var key = "4BE286C8B4E8CB5435CC7D68B0E5C169";
    //$.getJSON("http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=" + key + "&appid=440&steamid=" + steamid + si2 + "&format=json", function(data) {
    $.getJSON('stats.json', function(data) {
        if(typeof(data) !== "undefined") {

            //get max
            var m = 0;
            for(var idx=0;idx<500;idx++){
                if(data.playerstats.stats[idx].name.indexOf(mapz[m]+".accum.iPlayTime") != -1) {
                    ret.push(data.playerstats.stats[idx].value);
                    m++;
                    idx = 0;
                    if(m == 14) break;
                }
            }
            horizVis(ret,maps,Math.max.apply(Math,ret));
        }
    });
}

function visBarGraph(ret,id,max,classes) {
    var w = 600;
    var h = max / 100;
        while((h / w) >= 4) h /= 1.5;
    var barPadding = 2;

    //Create SVG element
    var svg = d3.select(id)
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var color =  d3.scale.ordinal()
        .range(["#BA3435", "#385B77"]);

    svg.selectAll("rect")
       .data(ret)
       .enter()
       .append("rect")
       .attr("x", function(d, i) {
            return i * (w / ret.length);
       })
       .attr("y", function(d) {
            return h - (d / h);
       })
       .attr("width", w / ret.length - barPadding)
       .attr("height", function(d) {
            return d * h / 2;
       })
       .style("fill", function(d) {
            return color(d)
        })

    svg.selectAll("text")
       .data(ret)
       .enter()
       .append("text")
       .text(function(d) {
            return d;
       })
       .attr("text-anchor", "middle")
       .attr("x", function(d, i) {
            return i * (w / ret.length) + (w / ret.length - barPadding) / 2;
       })
       .attr("y",function(d){
            return h -3;
        })
       .attr("fill", "white")
       .attr("font-size", "11px");

    svg.selectAll("names")
       .data(classes)
       .enter()
       .append("text")
       .text(function(d) {
            return d;
       })
       .attr("text-anchor", "middle")
       .attr("x", function(d, i) {
            return i * (w / ret.length) + (w / ret.length - barPadding) / 2;
       })
       .attr("y",function(d){
            return h-(max/h+10);
        })
       .attr("fill", "black")
       .attr("font-size", "11px");
}

function horizVis(ret,id,max) {
    var data = ret;
    var mapz = [
            "cp_dustbowl",
            "cp_egypt_final",
            "cp_gravelpit",
            "ctf_2fort",
            "ctf_doublecross",
            "ctf_turbine",
            "cp_well",
            "pl_badwater",
            "pl_frontier_final",
            "pl_goldrush",
            "pl_hoodoo_final",
            "pl_upward",
            "pl_barnblitz",
            "plr_hightower"
        ];
var n = 10, // number of layers
    m = data.length, // number of samples per layer
    stack = d3.layout.stack(),
    labels = data.map(function(d) {return mapz[d];}),
    
    //go through each layer (pop1, pop2 etc, that's the range(n) part)
    //then go through each object in data and pull out that objects's population data
    //and put it into an array where x is the index and y is the number
    layers = stack(d3.range(n).map(function(d) { 
                var a = [];
                for (var i = 0; i < m; ++i) {
                    a[i] = {x: i, y: data[i]};  
                }
                return a;
             })),
    
    //the largest single layer
    yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
    //the largest stack
    yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

var margin = {top: 40, right: 10, bottom: 20, left: 50},
    width = 677 - margin.left - margin.right,
    height = 533 - margin.top - margin.bottom;

var y = d3.scale.ordinal()
    .domain(d3.range(m))
    .rangeRoundBands([2, height], .08);

var x = d3.scale.linear()
    .domain([0, yStackMax])
    .range([0, width]);

var color = d3.scale.ordinal()
    .range(["#BA3435", "#385B77"]);

var svg = d3.select(id)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var layer = svg.selectAll(".layer")
    .data(layers)
  .enter().append("g")
    .attr("class", "layer")
    .style("fill", function(d, i) { return color(i); });

layer.selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("y", function(d) { return y(d.x); })
    .attr("x", function(d) { return x(d.y0); })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x(d.y); });

var yAxis = d3.svg.axis()
    .scale(y)
    .tickSize(1)
    .tickPadding(6)
    .tickValues(labels)
    .orient("left");

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

}
