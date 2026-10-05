(function(){
var d=document,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return[].slice.call((c||d).querySelectorAll(s))};
function kr(n){n=Math.round(n);return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")+" kr."}
function rnd(n){return n>20000?Math.round(n/1000)*1000:n>2000?Math.round(n/100)*100:Math.round(n/10)*10}
/* nav */
var bg=$(".burger"),nav=$(".nav");
if(bg)bg.addEventListener("click",function(){var o=nav.classList.toggle("show");bg.setAttribute("aria-expanded",o)});
$$(".nav .top[aria-haspopup]").forEach(function(b){
 var li=b.parentNode;
 b.addEventListener("click",function(e){e.preventDefault();var o=!li.classList.contains("open");$$(".nav li.open").forEach(function(x){x.classList.remove("open");$(".top",x).setAttribute("aria-expanded","false")});if(o){li.classList.add("open");b.setAttribute("aria-expanded","true")}});
 if(matchMedia("(hover:hover) and (min-width:1151px)").matches){li.addEventListener("mouseenter",function(){li.classList.add("open");b.setAttribute("aria-expanded","true")});li.addEventListener("mouseleave",function(){li.classList.remove("open");b.setAttribute("aria-expanded","false")})}
});
d.addEventListener("click",function(e){if(!e.target.closest(".nav"))$$(".nav li.open").forEach(function(x){x.classList.remove("open")})});
d.addEventListener("keydown",function(e){if(e.key==="Escape")$$(".nav li.open").forEach(function(x){x.classList.remove("open")})});
/* progress + toc */
var pr=$(".progress");
if(pr)addEventListener("scroll",function(){var h=d.documentElement,m=h.scrollHeight-h.clientHeight;pr.style.width=(m>0?h.scrollTop/m*100:0)+"%"},{passive:true});
var tl=$$(".toc a");
if(tl.length&&"IntersectionObserver"in window){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){tl.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+en.target.id)})}})},{rootMargin:"-20% 0px -70% 0px"});tl.forEach(function(a){var t=d.getElementById(a.getAttribute("href").slice(1));if(t)io.observe(t)})}
/* price calculator */
$$("[data-calc]").forEach(function(c){
 var lo=+c.dataset.lo,hi=+c.dataset.hi,lab=+c.dataset.labor,fr=c.dataset.fradrag,q=$("[name=qty]",c),qv=$(".qtyv",c),ql=$("[name=quality]",c),rg=$("[name=region]",c),ps=$("[name=persons]",c),o1=$(".big",c),o2=$(".mid",c),ded=$(".ded",c);
 function up(){var n=q?+q.value:1,f=+ql.value*+rg.value;if(qv)qv.textContent=n.toLocaleString("da-DK");var a=rnd(lo*n*f),b=rnd(hi*n*f);o1.textContent=kr(a)+" til "+kr(b);o2.textContent="Midtpunkt ca. "+kr(rnd((a+b)/2))+" inkl. moms";
  if(ded){var p=ps?+ps.value:1,l=(a+b)/2*lab,t="";if(fr==="groen"){t="Håndværkerfradrag: op til ca. "+kr(Math.min(l,9000*p)*.26)+" tilbage i skat"}else if(fr==="service"){t="Servicefradrag: op til ca. "+kr(Math.min(l,18300*p)*.26)+" tilbage i skat"}else if(fr==="delvis"||fr==="tjek"){t="Dele af arbejdslønnen kan give fradrag (maks. ca. "+kr(Math.min(l,9000*p)*.26)+") – se afsnittet om fradrag"}else{t="Ingen håndværkerfradrag for denne opgave i 2026"}ded.textContent=t}}
 $$("input,select",c).forEach(function(i){i.addEventListener("input",up)});up();
});
/* home finder */
var fd=$("#finder-data");
if(fd){var data=JSON.parse(fd.textContent),fs=$("#finder"),res=$(".finder .res");
 function show(){var x=data[fs.value];if(!x){res.classList.remove("show");return}$(".rn",res).textContent=x.n;$(".rp",res).textContent=x.p;$(".rt",res).textContent=x.a;$(".rg",res).href=x.u;$(".rq",res).href=x.q;$(".rq",res).textContent="Få 3 tilbud på "+x.n.toLowerCase();res.classList.add("show")}
 fs.addEventListener("change",show);var fb=$("#finder-go");if(fb)fb.addEventListener("click",function(e){e.preventDefault();if(fs.value)location.href=data[fs.value].u})}
/* table filter + sort */
$$("[data-filter]").forEach(function(inp){var t=d.getElementById(inp.dataset.filter);inp.addEventListener("input",function(){var v=inp.value.toLowerCase().trim();$$("tbody tr",t).forEach(function(r){r.style.display=r.textContent.toLowerCase().indexOf(v)>-1?"":"none"})})});
$$("th[data-sort]").forEach(function(th){th.addEventListener("click",function(){var t=th.closest("table"),i=[].indexOf.call(th.parentNode.children,th),num=th.dataset.sort==="n",dir=th.dataset.dir==="a"?"d":"a";th.dataset.dir=dir;var rows=$$("tbody tr",t);rows.sort(function(a,b){var x=a.children[i].dataset.v||a.children[i].textContent,y=b.children[i].dataset.v||b.children[i].textContent;if(num){x=+x;y=+y}else{x=x.toLowerCase();y=y.toLowerCase()}return(x>y?1:x<y?-1:0)*(dir==="a"?1:-1)});rows.forEach(function(r){t.tBodies[0].appendChild(r)})})});
/* fradrag calculator */
$$("[data-fradrag-calc]").forEach(function(c){var l=$("[name=lon]",c),p=$("[name=pp]",c),k=$("[name=kind]",c),o=$(".big",c),m=$(".mid",c);function up(){var cap=k.value==="service"?18300:9000,ded=Math.min(+l.value||0,cap*+p.value),s=ded*.26;o.textContent=kr(s)+" i skattebesparelse";m.textContent="Fradragsberettiget beløb: "+kr(ded)+" (loft "+kr(cap*+p.value)+")"}$$("input,select",c).forEach(function(i){i.addEventListener("input",up)});up()});
/* mascot helper */
var hp=$(".helper");
if(hp){var tips=JSON.parse(hp.dataset.tips||"[]"),bb=$(".bubble",hp),i=0,closed=false;try{closed=sessionStorage.getItem("klods")==="0"}catch(e){}
 if(closed)hp.classList.add("closed");
 function nx(){i=(i+1)%tips.length;bb.textContent=tips[i]}
 if(tips.length){bb.textContent=tips[0];var iv=setInterval(function(){if(!hp.classList.contains("closed"))nx()},9000)}
 $(".hb",hp).addEventListener("click",function(){if(hp.classList.contains("closed")){hp.classList.remove("closed");try{sessionStorage.setItem("klods","1")}catch(e){}}else nx()});
 $(".x",hp).addEventListener("click",function(){hp.classList.add("closed");try{sessionStorage.setItem("klods","0")}catch(e){}});
}
var hb=$(".hero-m .bubble");
if(hb&&hb.dataset.tips){var ht=JSON.parse(hb.dataset.tips),j=0;setInterval(function(){j=(j+1)%ht.length;hb.textContent=ht[j]},6000);var hk=$(".hero-m .klods");if(hk)hk.addEventListener("click",function(){j=(j+1)%ht.length;hb.textContent=ht[j]})}
})();
