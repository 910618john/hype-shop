// 深色 / 淺色切換：第一次跟隨手機設定，之後記住使用者的選擇
(function(){
  var K="theme",d=document.documentElement,saved=null;
  try{saved=localStorage.getItem(K)}catch(e){}
  var mq=matchMedia("(prefers-color-scheme: dark)");
  function apply(t){d.setAttribute("data-theme",t);paint()}
  function paint(){
    var dark=d.getAttribute("data-theme")==="dark";
    document.querySelectorAll(".themeBtn").forEach(function(b){b.textContent=dark?"☀️":"🌙";b.title=b.ariaLabel=dark?"切換淺色":"切換深色"});
    var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=dark?"#0e0e0e":"#141414";
  }
  apply(saved||(mq.matches?"dark":"light"));
  mq.addEventListener&&mq.addEventListener("change",function(e){if(!saved)apply(e.matches?"dark":"light")});
  document.addEventListener("click",function(e){
    var b=e.target.closest&&e.target.closest(".themeBtn");if(!b)return;
    saved=d.getAttribute("data-theme")==="dark"?"light":"dark";try{localStorage.setItem(K,saved)}catch(e){}apply(saved);
  });
  document.addEventListener("DOMContentLoaded",paint);
})();
