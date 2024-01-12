/* eslint-disable */
// https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)
const shadeBlendConvert = function (p, from, to) {
  if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(to&&typeof(to)!="string"))return null; //ErrorCheck
  const sbcRip=(d)=>{
      let l=d.length,RGB={};
      if(l>9){
          d=d.split(",");
          if(d.length<3||d.length>4)return null;//ErrorCheck
          RGB[0]=i(d[0].split("(")[1]),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
      }else{
          if(l==8||l==6||l<4)return null; //ErrorCheck
          if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 or 4 digit
          d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=-1;
          if(l==9||l==5)RGB[3]=r((RGB[2]/255)*10000)/10000,RGB[2]=RGB[1],RGB[1]=RGB[0],RGB[0]=d>>24&255;
      }return RGB;}
  var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=sbcRip(from),t=sbcRip(to);
  if(!f||!t)return null; //ErrorCheck
  if(h)return "rgb"+(f[3]>-1||t[3]>-1?"a(":"(")+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
  else return "#"+(0x100000000+r((t[0]-f[0])*p+f[0])*0x1000000+r((t[1]-f[1])*p+f[1])*0x10000+r((t[2]-f[2])*p+f[2])*0x100+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)).toString(16).slice(1,f[3]>-1||t[3]>-1?undefined:-2);
}
/* eslint-enable */

const memo = {};

export function darken(color, amt) {
  const amount = amt * 1.5;

  if (memo[`${color}-${amount}`]) {
    return memo[`${color}-${amount}`];
  }

  const ret = shadeBlendConvert(amount*-1, color);
  memo[`${color}-${amount}`] = ret;
  return ret;
}

export function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }

  return a;
}

const randomOrder = shuffleArray([1,2,3,4,5,6,7]);

export function getChunkDelay(index, x, y) {
  const [i,ii,iii,iv,v,vi] = randomOrder;

  // b
  if (index === 0) {
    if (x > 3) {
      return i;
    } else if (y < 2) {
      return ii;
    } else if (x > 1) {
      return iii;
    } else if (y < 5) {
      return iv;
    } else {
      return v;
    }
  }
  // r
  if (index === 1) {
    if (x > 1) {
      return i;
    } else if (y < 2) {
      return ii;
    } else {
      return iii;
    }
  }
  // y
  if (index === 2) {
    if (x > 3) {
      return i;
    } else if (y < 2) {
      return ii;
    } else if (y < 5) {
      return iii;
    } else {
      return iv;
    }
  }
  // c
  if (index === 3) {
    if (y < 2) {
      return i;
    } else if (x > 1) {
      return ii;
    } else {
      return iii;
    }
  }
  // e
  if (index === 4) {
    if (y > 2 && x > 3) {
      return i;
    } else if (y < 2 && x > 1) {
      return ii;
    } else if (x > 1 && y < 4) {
      return iii;
    } else if (y < 4) {
      return iv;
    } else if (y > 4 && x > 0) {
      return v;
    } else {
      return vi;
    }
  }
}
