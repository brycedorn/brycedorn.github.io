function n(){const n=document.getElementById("collection"),t=window.innerWidth,e=Math.min(1,t/1800);n.style.transform=`scale(${e})`}window.addEventListener("resize",n),window.addEventListener("load",(function(){n(),function(){const n=document.createElement("style"),t=function(n){for(let t=n.length-1;t>0;t--){let e=Math.floor(Math.random()*(t+1)),o=n[t];n[t]=n[e],n[e]=o}return n}(["#46be56","#ff3636","#1978ff","#ffc533","#ccc"]).map(((n,t)=>`--color-${t}: ${n};`)).join(" ");n.textContent=`*{${t}}`,document.head.appendChild(n)}()}));