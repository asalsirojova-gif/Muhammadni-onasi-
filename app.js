const L={
letters:["a.jpg","b.jpg","d.jpg","e.jpg","f.jpg","g.jpg","h.jpg","i1.jpg","j.jpg","k.jpg","l.jpg","m.jpg","n.jpg","o.jpg","p.jpg","q.jpg","r.jpg","s.jpg","t.jpg","u.jpg","v.jpg","x.jpg","y.jpg","z.jpg","o‘.jpg","g‘.jpg","sh.jpg","ch.jpg","ng.jpg"],
numbers:["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg"],
colors:["Bejrang .jpg","binafsha.jpg","havorang.jpg","jigarrang.jpg","koralrang.jpg","ko‘k.jpg","Kulrang.jpg","kumushrang.jpg","oltinrang.jpg","oq.jpg","osmonrang.jpg","pushti.jpg","qizil.jpg","qora.jpg","sariq.jpg","to‘q sarie.jpg","to‘qkok.jpg","turkuazrang.jpg","yashil.jpg","zangori.jpg"],
fruits:["ananas.jpg","anor.jpg","apilsin.jpg","banan.jpg","behi.jpg","kivi.jpg","limon.jpg","nok.jpg","olcha.jpg","olma.jpg","olxo‘ri.jpg","O‘rik.jpg","qovun.jpg","qulupnay.jpg","tarvuz.jpg","uzum.jpg","xurmo.jpg"],
body:["Bosh.jpg","Burun.jpg","Ko‘z.jpg","Og‘iz.jpg","Oyoq.jpg","Qo‘l.jpg","Quloq.jpg"],
shapes:["Doira.jpg","Kvadrat.jpg","Oval.jpg","To'rtburchak.jpg","Uchburchak.jpg","Yulduz.jpg"],
nature:["bulut.jpg","daraxt.jpg","daryo.jpg","dengiz.jpg","gul.jpg","kamalak.jpg","olov.jpg","Ormon.jpg","Oyva yulduzlar.jpg","o‘tloq.jpg","qor.jpg","quyosh.jpg","shamol.jpg","tog‘.jpg","yomgir.jpg"],
time:["chizma soat.jpg","kalendar.jpg","kun va tun.jpg","qum soat.jpg","sana.jpg","sekundomer.jpg","soat.jpg","soat1.jpg"],
transport:["avtobus.jpg","avtomobil.jpg","havoshari.jpg","kema.jpg","mototsikl.jpg","politsiyamashinasi.jpg","poyezd.jpg","samalyot.jpg","samasval.jpg","tezyordam.jpg","traktor.jpg","velosiped.jpg","vertalyot.jpg","yaxta.jpg","yonginmashinasi.jpg"]
};
const N={letters:"Harflar",numbers:"Sonlar",colors:"Ranglar",fruits:"Mevalar",body:"Tana a'zolari",shapes:"Shakllar",nature:"Tabiat",time:"Vaqt",transport:"Transport"};
const I={letters:"harflar.png",numbers:"sonlar.png",colors:"ranglar.png",fruits:"mevalar .png",body:"tana azolar.png",shapes:"shakllar.png",nature:"tabiat.png",time:"vaqt.png",transport:"transport.png"};
const pretty={"a":"A","b":"B","ch":"Ch","d":"D","e":"E","f":"F","g":"G","g‘":"G‘","h":"H","i1":"I","j":"J","k":"K","l":"L","m":"M","n":"N","ng":"Ng","o":"O","o‘":"O‘","p":"P","q":"Q","r":"R","s":"S","sh":"Sh","t":"T","u":"U","v":"V","x":"X","y":"Y","z":"Z","apilsin":"Apelsin","Bosh":"Bosh","Burun":"Burun","Ko‘z":"Ko‘z","Og‘iz":"Og‘iz","Oyoq":"Oyoq","Qo‘l":"Qo‘l","Quloq":"Quloq","Ormon":"O'rmon","Oyva yulduzlar":"Oy va yulduzlar","tog‘":"Tog‘","yomgir":"Yomg‘ir","Bejrang ":"Bej rang","Kulrang":"Kulrang","to‘q sarie":"To‘q sariq","to‘qkok":"To‘q ko‘k","koralrang":"Koral rang","havoshari":"Havo shari","politsiyamashinasi":"Politsiya mashinasi","samalyot":"Samolyot","samasval":"Samosval","tezyordam":"Tez yordam","vertalyot":"Vertolyot","yonginmashinasi":"Yong‘in mashinasi","chizma soat":"Chizma soat","kun va tun":"Kun va tun","qum soat":"Qum soat"};
const $=s=>document.querySelector(s);
let cat=null,lessonIndex=0,items=[],qi=0,qs=0,exerciseItems=[],ei=0,es=0,dp=null;
const playerName=()=>localStorage.getItem("bolajonName")||"";
function name(f){let x=f.replace(/\.[^.]+$/,"").replace(/[_-]+/g," ").trim();return pretty[x]||x.charAt(0).toUpperCase()+x.slice(1)}
function xp(){return +(localStorage.getItem("bolajonXP")||0)}
function addXP(n){localStorage.setItem("bolajonXP",xp()+n);updateAll()}
function streakData(){return JSON.parse(localStorage.getItem("bolajonStreak")||'{"count":0,"last":"","days":[]}')}
function markActivity(){
  const d=new Date(), today=d.toISOString().slice(0,10), z=streakData();
  if(z.last===today)return false;
  const y=new Date(d);y.setDate(d.getDate()-1);const yesterday=y.toISOString().slice(0,10);
  z.count=z.last===yesterday?z.count+1:1;z.last=today;
  z.days=Array.isArray(z.days)?z.days:[];z.days.push(today);z.days=z.days.slice(-30);
  localStorage.setItem("bolajonStreak",JSON.stringify(z));
  if(z.count===7){addXP(50);toast("🔥 7 kunlik seriya! +50 XP");}
  return true
}
function speak(t){if(!("speechSynthesis" in window))return toast("Ovoz mavjud emas");speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang="uz-UZ";u.rate=.82;speechSynthesis.speak(u)}
function toast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");clearTimeout(x._t);x._t=setTimeout(()=>x.classList.remove("show"),2300)}
function view(v){document.querySelectorAll(".view").forEach(x=>x.classList.toggle("active",x.id===v));updateAll();window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-v]").forEach(b=>b.onclick=()=>view(b.dataset.v));

function renderCats(){
  for(const id of ["homeCats","lessonCats"]){
    const box=$("#"+id);box.innerHTML="";
    Object.keys(L).forEach(c=>{
      const b=document.createElement("button");b.className="cat "+c;
      b.innerHTML=`<img src="assets/icons/${I[c]}" alt="${N[c]}"><b>${N[c]}</b><small>${L[c].length} ta</small>`;
      b.onclick=()=>open(c);box.appendChild(b)
    });
    const ex=document.createElement("button");ex.className="cat exercises";
    ex.innerHTML=`<img src="assets/illustrations/exercises/exercise.png" alt="Mashqlar"><b>🧩 Mashqlar</b><small>10 ta</small>`;
    ex.onclick=()=>view("exercises");box.appendChild(ex);
  }
}
function open(c){if(!L[c])return;cat=c;lessonIndex=0;$("#menu").hidden=true;$("#lesson").hidden=false;renderLesson();view("lessons")}
function renderLesson(){
  if(!cat||!L[cat])return;const list=L[cat],f=list[lessonIndex],n=name(f);
  $("#lessonCount").textContent=`${N[cat].toUpperCase()} • ${lessonIndex+1} / ${list.length}`;
  $("#lessonProgressText").textContent=`${lessonIndex+1}-rasm / ${list.length}`;
  $("#lessonProgressBar").style.width=((lessonIndex+1)/list.length*100)+"%";
  $("#singleCard").innerHTML=`<img src="assets/illustrations/${cat}/${encodeURIComponent(f)}" alt="${n}"><h2>${n}</h2><p>🔊 Nomi: <b>${n}</b></p>`;
  $("#singleCard").onclick=()=>speak(n);$("#prev").disabled=lessonIndex===0;$("#next").disabled=lessonIndex===list.length-1;$("#listenOne").onclick=()=>speak(n)
}
$("#prev").onclick=()=>{if(lessonIndex>0){lessonIndex--;renderLesson()}};$("#next").onclick=()=>{if(cat&&lessonIndex<L[cat].length-1){lessonIndex++;renderLesson()}};
$("#back").onclick=()=>{$("#lesson").hidden=true;$("#menu").hidden=false;window.scrollTo({top:0,behavior:"smooth"})};
$("#allSpeak").onclick=()=>cat&&speak(L[cat].map(name).join(". "));
const all=()=>Object.entries(L).flatMap(([c,fs])=>fs.map(f=>({c,f,n:name(f)})));
const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

function startQuiz(){items=sh(all()).slice(0,10);qi=0;qs=0;$("#qstart").hidden=true;$("#qend").hidden=true;$("#qgame").hidden=false;q();markActivity()}
$("#start").onclick=startQuiz;
function q(){
  if(qi>=items.length)return endQuiz();const x=items[qi];$("#num").textContent=`Savol ${qi+1} / 10`;$("#score").textContent=qs+" ball";$("#bar").style.width=(qi/10*100)+"%";$("#qimg").src=`assets/illustrations/${x.c}/${encodeURIComponent(x.f)}`;$("#qimg").alt=x.n;$("#feed").textContent="";
  const opts=sh([x,...sh(all().filter(y=>y.n!==x.n)).slice(0,3)]),box=$("#opts");box.innerHTML="";
  opts.forEach(o=>{const b=document.createElement("button");b.textContent=o.n;b.onclick=()=>ans(b,o.n===x.n,x.n);box.appendChild(b)})
}
function ans(b,ok,right){
  [...document.querySelectorAll("#opts button")].forEach(x=>x.disabled=true);
  if(ok){b.classList.add("ok");qs++;localStorage.setItem("quizXP",+(localStorage.getItem("quizXP")||0)+5);$("#feed").textContent="🎉 To‘g‘ri! +1 ball";addXP(5)}else{b.classList.add("no");document.querySelectorAll("#opts button").forEach(x=>{if(x.textContent===right)x.classList.add("ok")});$("#feed").textContent="😊 To‘g‘ri javob: "+right}
  speak(ok?"To‘g‘ri":"To‘g‘ri javob "+right);$("#score").textContent=qs+" ball";setTimeout(()=>{qi++;q()},900)
}
function prizeFor(s){if(s>=10)return{emoji:"🏆",name:"SUPER SOVRIN",text:"Oltin kubok va katta sovg‘a!"};if(s>=9)return{emoji:"🎁",name:"KATTA SOVG‘A",text:"Ajoyib sovg‘a sizniki!"};if(s>=8)return{emoji:"🚲",name:"VELOSIPED",text:"Chiroyli velosiped sovrini!"};if(s>=7)return{emoji:"🧸",name:"AYIQCHA",text:"Yumshoq ayiqcha sovrini!"};if(s>=6)return{emoji:"🎁",name:"SOVG‘A",text:"Siz sovg‘a yutdingiz!"};if(s>=5)return{emoji:"🚗",name:"MASHINA",text:"O‘yinchoq mashina sovrini!"};return{emoji:"🌟",name:"HARAKATNI DAVOM ETTIRING",text:"Yana o‘ynang va sovrin yuting!"}}
function endQuiz(){
  const p=prizeFor(qs),old=+(localStorage.getItem("best")||0);localStorage.setItem("best",Math.max(old,qs));
  const count=+(localStorage.getItem("quizQuestions")||0)+10;localStorage.setItem("quizQuestions",count);
  $("#qgame").hidden=true;$("#qend").hidden=false;$("#final").textContent=qs+" / 10";$("#prizeEmoji").textContent=p.emoji;$("#msg").textContent=qs>=7?"🌟 Ajoyib natija!":qs>=5?"👏 Juda yaxshi!":"💜 Yana urinib ko‘ring!";
  $("#prize").innerHTML=`<span>${p.emoji}</span><div><b>${p.name}</b><small>${p.text}</small></div>`;
  const nm=playerName();speak(`Quiz tugadi${nm?", "+nm:""}. Siz ${qs} ball oldingiz.`)
}
$("#again").onclick=startQuiz;$("#rank").onclick=()=>view("ranking");

const rewards=[
  ["100 XP","assets/illustrations/rewards/medal.png","Medal"],
  ["250 XP","assets/illustrations/rewards/crown.png","Toj"],
  ["500 XP","assets/illustrations/rewards/trophy.png","Kubok"],
  ["750 XP","assets/illustrations/rewards/gift.png","Sovg‘a"],
  ["1000 XP","assets/illustrations/rewards/badge.png","Maxsus mukofot"]
];

function rank(){
  const s=+(localStorage.getItem("best")||0),nm=playerName();$("#best").textContent=s;$("#rankName").textContent=nm?`👑 ${nm}`:"👑 Bolajon";
  const p=prizeFor(s);$("#rt").innerHTML=s>=5?`<div class="current-prize">${p.emoji}<div><b>${p.name}</b><small>${p.text}</small></div></div>`:"Quizni ishlab birinchi sovriningizni oling!";
}
function startExercises(){
  exerciseItems=sh(all()).slice(0,10);ei=0;es=0;$("#exerciseStart").hidden=true;$("#exerciseEnd").hidden=true;$("#exerciseGame").hidden=false;showExercise();markActivity()
}
function showExercise(){
  if(ei>=exerciseItems.length)return endExercises();
  const x=exerciseItems[ei];$("#exerciseNum").textContent=`Mashq ${ei+1} / 10`;$("#exerciseScore").textContent=es+" / 10";$("#exerciseXP").textContent=xp();$("#exerciseLiveXP").textContent="⭐ "+xp()+" XP";$("#exerciseBar").style.width=(ei/10*100)+"%";$("#exerciseImg").src=`assets/illustrations/${x.c}/${encodeURIComponent(x.f)}`;$("#exerciseImg").alt=x.n;$("#exerciseFeed").textContent="";
  const opts=sh([x,...sh(all().filter(y=>y.n!==x.n)).slice(0,3)]),box=$("#exerciseOptions");box.innerHTML="";
  opts.forEach(o=>{const b=document.createElement("button");b.textContent=o.n;b.onclick=()=>answerExercise(b,o.n===x.n,x.n);box.appendChild(b)})
}
function answerExercise(b,ok,right){
  [...document.querySelectorAll("#exerciseOptions button")].forEach(x=>x.disabled=true);
  if(ok){b.classList.add("ok");es++;addXP(10);$("#exerciseFeed").textContent="🎉 To‘g‘ri! +10 XP"}else{b.classList.add("no");document.querySelectorAll("#exerciseOptions button").forEach(x=>{if(x.textContent===right)x.classList.add("ok")});$("#exerciseFeed").textContent="😊 To‘g‘ri javob: "+right}
  speak(ok?"To‘g‘ri":"To‘g‘ri javob "+right);setTimeout(()=>{ei++;showExercise()},850)
}
function endExercises(){
  addXP(20);localStorage.setItem("exerciseDone",+(localStorage.getItem("exerciseDone")||0)+1);
  $("#exerciseGame").hidden=true;$("#exerciseEnd").hidden=false;$("#exerciseFinal").textContent=es+" / 10";$("#exerciseMessage").textContent=`Siz +${es*10+20} XP oldingiz! Umumiy XP: ${xp()}`;
  updateAll()
}
$("#exerciseStartBtn").onclick=startExercises;$("#exerciseAgain").onclick=startExercises;
function backFromExercises(){$("#exerciseStart").hidden=false;$("#exerciseGame").hidden=true;$("#exerciseEnd").hidden=true;view("home")}

function levelInfo(v){
  if(v<100)return{level:1,start:0,next:100};
  if(v<250)return{level:2,start:100,next:250};
  if(v<500)return{level:3,start:250,next:500};
  return{level:4,start:500,next:1000}
}
function updateXP(){
  const v=xp(),li=levelInfo(v);$("#xpTotal").textContent=v;$("#xpLevel").textContent=li.level+"-daraja";
  const pct=li.next===1000?Math.min(100,((v-li.start)/(li.next-li.start))*100):Math.min(100,((v-li.start)/(li.next-li.start))*100);
  $("#xpProgressBar").style.width=pct+"%";$("#xpProgressText").textContent=li.next===1000?`${v} XP • 4-daraja`:`${v-li.start} / ${li.next-li.start} XP`;
  $("#xpNext").textContent=li.next===1000?"Maxsus mukofotlar davom etadi":`${Math.max(0,li.next-v)} XP qoldi`;
}
function updateRewards(){
  const v=xp();$("#rewardXP").textContent=v;
  $("#rewardGrid2").innerHTML=rewards.map(([need,img,t])=>{const n=+need.split(" ")[0],won=v>=n;return`<div class="reward2 ${won?"won":""}"><img src="${img}" alt="${t}"><b>${need}</b><small>${won?"🔓 Ochildi":"🔒 "+(n-v)+" XP qoldi"}</small><small>${t}</small></div>`}).join("")
}
function updateStreak(){
  const z=streakData();$("#streakCount").textContent=z.count+" kun";$("#streakMessage").textContent=z.count>=7?"🌟 7 kunlik seriya davom etmoqda!":"Har kuni dars yoki mashq bajaring.";
  const now=new Date(),days=[];for(let i=6;i>=0;i--){const d=new Date(now);d.setDate(now.getDate()-i);const s=d.toISOString().slice(0,10);days.push(`<div class="day ${z.days.includes(s)?"on":""}"><b>${z.days.includes(s)?"✓":"·"}</b>${d.toLocaleDateString("uz-UZ",{weekday:"short"})}</div>`)}$("#streakWeek").innerHTML=days.join("")
}
function updateResults(){
  const v=xp(),best=+(localStorage.getItem("best")||0),ed=+(localStorage.getItem("exerciseDone")||0),qq=+(localStorage.getItem("quizQuestions")||0),qxp=+(localStorage.getItem("quizXP")||0),z=streakData();
  $("#resXP").textContent=v;$("#resExercises").textContent=ed;$("#resQuizQuestions").textContent=qq;$("#resStreak").textContent=z.count+" kun";$("#resBest").textContent=best+" / 10";$("#resQuizXP").textContent=qxp
}
function updateParent(){
  const n=playerName()||"Bolajon",v=xp(),li=levelInfo(v),z=streakData(),best=+(localStorage.getItem("best")||0),ed=+(localStorage.getItem("exerciseDone")||0);
  $("#parentName").textContent=n;$("#parentXP").textContent=v;$("#parentLevel").textContent=li.level;$("#parentBest").textContent=best+" / 10";$("#parentExercises").textContent=ed;$("#parentStreak").textContent=z.count+" kun"
}
function updateAll(){rank();updateXP();updateRewards();updateStreak();updateResults();updateParent();$("#exerciseXP").textContent=xp()}
function saveName(){const v=$("#playerName").value.trim();if(!v)return toast("Avval ismingizni yozing 😊");localStorage.setItem("bolajonName",v);$("#hello").textContent=`Salom, ${v}! O'ynab o'rganamiz! 🌟`;$("#quizWelcome").textContent=`${v}, 10 ta savolga javob bering va sovrinlarni yutib oling!`;toast("Ismingiz saqlandi! 💜");updateAll()}
$("#saveName").onclick=saveName;
function initName(){const n=playerName();if(n){$("#playerName").value=n;$("#hello").textContent=`Salom, ${n}! O'ynab o'rganamiz! 🌟`;$("#quizWelcome").textContent=`${n}, 10 ta savolga javob bering va sovrinlarni yutib oling!`}}
function installApp(){if(dp){dp.prompt();dp.userChoice.then(()=>{dp=null;$("#install").hidden=true})}else toast("Brauzer menyusidan 'Ilovani o'rnatish' ni tanlang")}
addEventListener("beforeinstallprompt",e=>{e.preventDefault();dp=e;$("#install").hidden=false});$("#install").onclick=installApp;$("#installHome").onclick=installApp;
$("#aiSend").onclick=sendAI;$("#aiInput").addEventListener("keydown",e=>{if(e.key==="Enter")sendAI()});
function sendAI(){
  const inp=$("#aiInput"),q=inp.value.trim();if(!q)return;
  const box=$("#aiMessages");box.insertAdjacentHTML("beforeend",`<div class="ai-message"><b>Siz:</b> ${escapeHTML(q)}</div>`);
  let a="Bu savolni birga o'rganamiz! Rasmli darslardan birini tanlab ko'ring. 😊";
  if(/salom/i.test(q))a="Va alaykum assalom! 🌟 Men Bolajon AI. Sizga o'rganishda yordam beraman.";
  else if(/harf|alifbo/i.test(q))a="Harflarni o'rganish uchun 📚 Darslar → Harflar bo'limiga kiring.";
  else if(/son|raqam/i.test(q))a="1 dan 10 gacha sonlarni 📚 Darslar → Sonlar bo'limida ketma-ket o'rganing.";
  else if(/rang/i.test(q))a="Ranglarni 📚 Darslar → Ranglar bo'limida rasm va ovoz bilan o'rganishingiz mumkin.";
  box.insertAdjacentHTML("beforeend",`<div class="ai-message"><b>🤖 Bolajon AI:</b> ${a}</div>`);inp.value=""
}
function escapeHTML(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

if("serviceWorker" in navigator)addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js"));
renderCats();initName();updateAll();setTimeout(()=>$("#splash")?.classList.add("hide"),850);addEventListener("load",()=>setTimeout(()=>$("#splash")?.classList.add("hide"),300));
