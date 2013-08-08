function lineup(){
var ranks = 
[
  "first","second","third","fourth"
]
var rank = 0;

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  lfapi=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  lfapi=new ActiveXObject("Microsoft.XMLHTTP");
  }
lfapi.open("GET","http://ws.audioscrobbler.com/2.0/user/BDORN/topartists.xml?period=1month",false);
lfapi.send();
artistchart=lfapi.responseXML; 
var x=artistchart.getElementsByTagName("artist");
for (i=0;i<49;i++)
  {
  if(i<=3)       rank = 0;
  else if(i<=8)  rank = 1;
  else if(i<=20) rank = 2;
  else          rank = 3;

  document.write("<a class='"+ranks[rank]+"' href='");
  document.write(x[i].getElementsByTagName("url")[0].childNodes[0].nodeValue);
  document.write("'>");
  document.write(x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue);
  document.write("</a><p class='"+ranks[rank]+" fittext4'>");
  if(i<48) { document.write("&#9670;</p>"); }
  else { document.write("</p>"); }
  }
}

function month(){
  var d=new Date();
  var month=new Array(12);
    month[0]="January";
    month[1]="February";
    month[2]="March";
    month[3]="April";
    month[4]="May";
    month[5]="June";
    month[6]="July";
    month[7]="August";
    month[8]="September";
    month[9]="October";
    month[10]="November";
    month[11]="December";
  document.write(month[d.getMonth()]);
}