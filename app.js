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
const APP_ICONS={
  score:{xp:"assets/illustrations/score/xp.png",ball:"assets/illustrations/score/ball.png",star:"assets/illustrations/score/star-reward.png"},
  rewards:{medal:"assets/illustrations/rewards/medal.png",crown:"assets/illustrations/rewards/crown.png",trophy:"assets/illustrations/rewards/trophy.png",gift:"assets/illustrations/rewards/gift.png",badge:"assets/illustrations/rewards/badge.png"},
  exercises:{exercise:"assets/illustrations/exercises/exercise.png",target:"assets/illustrations/exercises/target.png",success:"assets/illustrations/exercises/success.png",tryAgain:"assets/illustrations/exercises/try-again.png"},
  streak:{streak:"assets/illustrations/streak/streak.png",fire:"assets/illustrations/streak/fire-streak.png",calendar:"assets/illustrations/streak/calendar-streak.png"},
  ai:{ai:"assets/illustrations/ai/ai.png",spark:"assets/illustrations/ai/ai-spark.png"},
  progress:{progress:"assets/illustrations/progress/progress.png",statistics:"assets/illustrations/progress/statistics.png",chart:"assets/illustrations/progress/chart.png"},
  ranking:{first:"assets/illustrations/ranking/first-place.png",second:"assets/illustrations/ranking/second-place.png",third:"assets/illustrations/ranking/third-place.png"},
  pwa:{install:"assets/illustrations/pwa/install-app.png",offline:"assets/illustrations/pwa/offline.png",update:"assets/illustrations/pwa/update.png"}
};
const pretty={"a":"A","b":"B","ch":"Ch","d":"D","e":"E","f":"F","g":"G","g‘":"G‘","h":"H","i1":"I","j":"J","k":"K","l":"L","m":"M","n":"N","ng":"Ng","o":"O","o‘":"O‘","p":"P","q":"Q","r":"R","s":"S","sh":"Sh","t":"T","u":"U","v":"V","x":"X","y":"Y","z":"Z","apilsin":"Apelsin","Bosh":"Bosh","Burun":"Burun","Ko‘z":"Ko‘z","Og‘iz":"Og‘iz","Oyoq":"Oyoq","Qo‘l":"Qo‘l","Quloq":"Quloq","Ormon":"O'rmon","Oyva yulduzlar":"Oy va yulduzlar","tog‘":"Tog‘","yomgir":"Yomg‘ir","Bejrang ":"Bej rang","Kulrang":"Kulrang","to‘q sarie":"To‘q sariq","to‘qkok":"To‘q ko‘k","koralrang":"Koral rang","havoshari":"Havo shari","politsiyamashinasi":"Politsiya mashinasi","samalyot":"Samolyot","samasval":"Samosval","tezyordam":"Tez yordam","vertalyot":"Vertolyot","yonginmashinasi":"Yong‘in mashinasi","chizma soat":"Chizma soat","kun va tun":"Kun va tun","qum soat":"Qum soat"};
const $=s=>document.querySelector(s);

/* ===================== PROGRESS STORE (single source of truth) ===================== */
const PKEY="bolajonProgress";
function defaultProgress(){
  return{
    name:"",
    xp:0,
    streak:{count:0,last:"",days:[],longest:0},
    lessons:{},
    quiz:{sessions:0,bestScore:0,totalScore:0,totalQuestions:0,totalXP:0,current:null},
    exercises:{sessions:0,completedSessions:0,totalCorrect:0,totalQuestions:0,totalXP:0,current:null},
    rewardsUnlocked:[],
    rewardHistory:[],
    activityHistory:[],
    lastActivity:null
  }
}
function loadProgress(){
  try{
    const raw=localStorage.getItem(PKEY);
    if(raw){
      const p=JSON.parse(raw),d=defaultProgress();
      return{...d,...p,streak:{...d.streak,...(p.streak||{})},quiz:{...d.quiz,...(p.quiz||{})},exercises:{...d.exercises,...(p.exercises||{})},lessons:p.lessons||{},rewardHistory:Array.isArray(p.rewardHistory)?p.rewardHistory:[],activityHistory:Array.isArray(p.activityHistory)?p.activityHistory:[]};
    }
  }catch(e){}
  return migrateOld(defaultProgress());
}
function migrateOld(p){
  try{
    const oldXP=+(localStorage.getItem("bolajonXP")||0);if(oldXP)p.xp=oldXP;
    const oldName=localStorage.getItem("bolajonName");if(oldName)p.name=oldName;
    const s=JSON.parse(localStorage.getItem("bolajonStreak")||"null");
    if(s)p.streak={count:s.count||0,last:s.last||"",days:Array.isArray(s.days)?s.days:[],longest:s.count||0};
    const best=+(localStorage.getItem("best")||0);if(best)p.quiz.bestScore=best;
    const qq=+(localStorage.getItem("quizQuestions")||0);if(qq)p.quiz.totalQuestions=qq;
    const qxp=+(localStorage.getItem("quizXP")||0);if(qxp)p.quiz.totalXP=qxp;
    const ed=+(localStorage.getItem("exerciseDone")||0);if(ed)p.exercises.completedSessions=ed;
  }catch(e){}
  return p
}
let P=loadProgress();
P.quiz.bestScore=Math.min(10,Math.max(0,Number(P.quiz.bestScore)||0));
function saveProgress(){localStorage.setItem(PKEY,JSON.stringify(P))}
saveProgress();

let cat=null,lessonIndex=0,items=[],qi=0,qs=0,exerciseItems=[],ei=0,es=0,exerciseCat=null,dp=null,swReg=null;
const playerName=()=>P.name||"";
function name(f){let x=f.replace(/\.[^.]+$/,"").replace(/[_-]+/g," ").trim();return pretty[x]||x.charAt(0).toUpperCase()+x.slice(1)}
function xp(){return P.xp||0}
function addXP(n){P.xp=(P.xp||0)+n;saveProgress();updateAll()}
function localDay(d=new Date()){const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,"0"),day=String(d.getDate()).padStart(2,"0");return `${y}-${m}-${day}`}

function markActivity(type,c,idx){
  const d=new Date(),today=localDay(d),z=P.streak;
  if(z.last!==today){
    const y=new Date(d);y.setDate(d.getDate()-1);const yesterday=localDay(y);
    z.count=z.last===yesterday?z.count+1:1;z.last=today;
    z.days=Array.isArray(z.days)?z.days:[];z.days.push(today);z.days=z.days.slice(-30);
    if(z.count>(z.longest||0))z.longest=z.count;
    if(z.count===7){addXP(50);toast("7 kunlik seriya! +50 XP")}
  }
  if(type){P.lastActivity={type,cat:c||null,index:typeof idx==="number"?idx:null};P.activityHistory=Array.isArray(P.activityHistory)?P.activityHistory:[];const rec={type,cat:c||null,index:typeof idx==="number"?idx:null,at:Date.now()};const prev=P.activityHistory[0];if(!prev||prev.type!==rec.type||prev.cat!==rec.cat||prev.index!==rec.index)P.activityHistory.unshift(rec);P.activityHistory=P.activityHistory.slice(0,40);}
  saveProgress();
}

function lessonProgress(c){if(!P.lessons[c])P.lessons[c]={viewed:[],lastIndex:0,completed:false};if(typeof P.lessons[c].completed!=="boolean")P.lessons[c].completed=false;return P.lessons[c]}
function markLessonViewed(c,idx){
  const lp=lessonProgress(c);lp.lastIndex=idx;
  if(!lp.viewed.includes(idx)){lp.viewed.push(idx);saveProgress();addXP(2)}
  else saveProgress();
}
function lessonStats(c){const lp=lessonProgress(c),total=L[c]?L[c].length:0;return{viewedCount:lp.viewed.length,total,completed:!!lp.completed,lastIndex:lp.lastIndex||0}}
function totalLessonsViewed(){return Object.keys(L).reduce((s,c)=>s+lessonProgress(c).viewed.length,0)}
function totalLessonsDone(){return Object.keys(L).filter(c=>lessonStats(c).completed).length}
function totalLessonsInProgress(){return Object.keys(L).filter(c=>{const s=lessonStats(c);return s.viewedCount>0&&!s.completed}).length}

let uzVoice=null,voiceReady=false;
function loadUzVoice(){
  if(!("speechSynthesis" in window))return null;
  const voices=speechSynthesis.getVoices()||[];
  uzVoice=voices.find(v=>/^uz(-|_)/i.test(v.lang))||voices.find(v=>/uzbek|oʻzbek|ozbek/i.test((v.name||"")+" "+(v.lang||"")))||null;
  voiceReady=voices.length>0;
  return uzVoice;
}
if("speechSynthesis" in window){loadUzVoice();speechSynthesis.addEventListener("voiceschanged",loadUzVoice)}
function speak(t){
  if(!("speechSynthesis" in window))return toast("Bu telefonda ovoz xizmati mavjud emas");
  const v=loadUzVoice();
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(String(t));
  if(v){u.voice=v;u.lang=v.lang||"uz-UZ";u.rate=.82;u.pitch=1}
  else{u.lang="uz-UZ";u.rate=.82;u.pitch=1;toast("O‘zbekcha ovoz topilmadi. Telefoningizda O‘zbekcha TTS ovozini yoqing.")}
  speechSynthesis.speak(u);
}
function toast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");clearTimeout(x._t);x._t=setTimeout(()=>x.classList.remove("show"),2300)}
function view(v){
  document.querySelectorAll(".view").forEach(x=>x.classList.toggle("active",x.id===v));
  if(v==="lessons"&&!cat){
    const menu=$("#menu"),lesson=$("#lesson");
    if(menu)menu.hidden=false;if(lesson)lesson.hidden=true;
  }
  updateAll();
  window.scrollTo({top:0,behavior:"smooth"})
}
document.querySelectorAll("[data-v]").forEach(b=>b.onclick=()=>{if(b.dataset.v==="lessons")cat=null;view(b.dataset.v)});

function renderCats(){
  const lessonKeys=Object.keys(L);
  const makeLesson=(c)=>{
    const st=lessonStats(c),btn=document.createElement("button");btn.className="cat "+c;
    const progressLine=st.completed?"✅ Tugallandi":st.viewedCount>0?`${st.viewedCount}/${st.total} ko'rilgan • ${st.lastIndex+1}-rasmdan davom etish}`:"Boshlanmagan";
    btn.innerHTML=`<img src="assets/icons/${I[c]}" alt="${N[c]}"><b>${N[c]}</b><small>${L[c].length} ta</small><small class="continue">${progressLine}</small>`;
    btn.onclick=()=>open(c);return btn;
  };
  const home=$("#homeCats"),lessons=$("#lessonCats");
  if(home){home.innerHTML="";lessonKeys.forEach(c=>home.appendChild(makeLesson(c)));
    const sep=document.createElement("div");sep.className="menu-divider";sep.innerHTML=`<span>10. MASHQLAR • 11. QUIZ • 12. REYTING</span>`;home.appendChild(sep);
    const ex=document.createElement("button");ex.className="cat exercises";ex.innerHTML=`<img src="${APP_ICONS.exercises.exercise}" alt="Mashqlar"><b>🎮 Mashqlar</b><small>Mavzuli mashqlar</small>`;ex.onclick=()=>view("exercises");home.appendChild(ex);
    const q=document.createElement("button");q.className="cat quiz-menu-card";q.innerHTML=`<img src="${APP_ICONS.score.ball}" alt="Quiz"><b>🧩 Quiz</b><small>10 ta savol</small><small class="continue">Bilimingizni sinang</small>`;q.onclick=()=>view("quiz");home.appendChild(q);
    const r=document.createElement("button");r.className="cat ranking-menu-card";r.innerHTML=`<img src="assets/illustrations/rewards/trophy.png" alt="Reyting"><b>🏆 Reyting</b><small>Eng yaxshi natija</small><small class="continue">Quiz natijalari</small>`;r.onclick=()=>view("ranking");home.appendChild(r);
  }
  if(lessons){lessons.innerHTML="";lessonKeys.forEach(c=>lessons.appendChild(makeLesson(c)));}
}
function open(c){
  if(!L[c])return;cat=c;
  const lp=lessonProgress(c);
  // Tugallangan mavzu qayta ochilganda yangi urinish sifatida boshidan boshlanadi.
  if(lp.completed){
    lp.completed=false;
    lp.viewed=[];
    lp.lastIndex=0;
    saveProgress();
  }
  lessonIndex=(typeof lp.lastIndex==="number"&&lp.lastIndex<L[c].length)?lp.lastIndex:0;
  markActivity("lesson",c,lessonIndex);
  view("lessons");
  $("#menu").hidden=true;$("#lesson").hidden=false;
  renderLesson();
}
function renderLesson(){
  if(!cat||!L[cat])return;const list=L[cat],f=list[lessonIndex],n=name(f);
  markLessonViewed(cat,lessonIndex);markActivity("lesson",cat,lessonIndex);
  $("#lessonCount").textContent=`${N[cat].toUpperCase()} • ${lessonIndex+1} / ${list.length}`;
  $("#lessonProgressText").textContent=`${lessonIndex+1}-rasm / ${list.length}`;
  $("#lessonProgressBar").style.width=((lessonIndex+1)/list.length*100)+"%";
  $("#singleCard").innerHTML=`<img src="assets/illustrations/${cat}/${encodeURIComponent(f)}" alt="${n}"><h2>${n}</h2><p>🔊 Nomi: <b>${n}</b></p>`;
  $("#singleCard").onclick=()=>speak(n);
  $("#prev").disabled=lessonIndex===0;
  const atEnd=lessonIndex===list.length-1;
  $("#next").disabled=atEnd;
  $("#finishLesson").hidden=!atEnd;
  $("#listenOne").onclick=()=>speak(n);
}
function celebrateLesson(){
  const box=$("#lessonCelebration");if(!box)return;box.innerHTML="";box.setAttribute("aria-hidden","false");
  const flowers=["🌸","🌼","🌺","🌷","💐","✨"];
  for(let i=0;i<30;i++){const f=document.createElement("span");f.className="flower";f.textContent=flowers[Math.floor(Math.random()*flowers.length)];f.style.left=Math.random()*100+"%";f.style.setProperty("--dx",(Math.random()*180-90)+"px");f.style.animationDelay=(Math.random()*.35)+"s";box.appendChild(f)}
  setTimeout(()=>{box.innerHTML="";box.setAttribute("aria-hidden","true");},1800);
}
function finishLesson(){
  if(!cat||!L[cat])return;
  const lp=lessonProgress(cat);lp.completed=true;lp.lastIndex=L[cat].length-1;P.lastActivity={type:"lesson",cat,index:L[cat].length-1};saveProgress();cat=null;
  celebrateLesson();toast("🎉 Mavzu yakunlandi!");
  setTimeout(()=>{ $("#lesson").hidden=true; $("#menu").hidden=false; view("home"); },1900);
}
$("#prev").onclick=()=>{if(lessonIndex>0){lessonIndex--;renderLesson()}};$("#next").onclick=()=>{if(cat&&lessonIndex<L[cat].length-1){lessonIndex++;renderLesson()}};$("#finishLesson").onclick=finishLesson;
$("#back").onclick=()=>{cat=null;$("#lesson").hidden=true;$("#menu").hidden=false;view("lessons")};
$("#allSpeak").onclick=()=>cat&&speak(L[cat].map(name).join(". "));
const all=()=>Object.entries(L).flatMap(([c,fs])=>fs.map((f,idx)=>({c,f,n:name(f),idx})));
const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

/* ===================== QUIZ (with resume support) ===================== */
function startQuiz(){
  items=sh(all()).slice(0,10);qi=0;qs=0;
  P.quiz.current={items,qi:0,qs:0};saveProgress();
  $("#qstart").hidden=true;$("#qend").hidden=true;$("#qgame").hidden=false;q();markActivity("quiz",null,0)
}
function resumeQuizSession(){
  const cur=P.quiz.current;if(!cur)return startQuiz();
  items=cur.items;qi=cur.qi;qs=cur.qs;
  $("#qstart").hidden=true;$("#qend").hidden=true;$("#qgame").hidden=false;q();markActivity("quiz",null,qi)
}
$("#start").onclick=startQuiz;$("#quizResumeBtn").onclick=resumeQuizSession;
function q(){
  if(qi>=items.length)return endQuiz();const x=items[qi];$("#num").textContent=`Savol ${qi+1} / 10`;$("#score").textContent=qs+" ball";$("#bar").style.width=(qi/10*100)+"%";$("#qimg").src=`assets/illustrations/${x.c}/${encodeURIComponent(x.f)}`;$("#qimg").alt=x.n;$("#feed").textContent="";
  const opts=sh([x,...sh(all().filter(y=>y.n!==x.n)).slice(0,3)]),box=$("#opts");box.innerHTML="";
  opts.forEach(o=>{const b=document.createElement("button");b.textContent=o.n;b.onclick=()=>ans(b,o.n===x.n,x.n);box.appendChild(b)})
}
function ans(b,ok,right){
  [...document.querySelectorAll("#opts button")].forEach(x=>x.disabled=true);
  if(ok){b.classList.add("ok");qs++;P.quiz.totalXP=(P.quiz.totalXP||0)+5;$("#feed").textContent="🎉 To‘g‘ri! +1 ball";addXP(5)}else{b.classList.add("no");document.querySelectorAll("#opts button").forEach(x=>{if(x.textContent===right)x.classList.add("ok")});$("#feed").textContent="😊 To‘g‘ri javob: "+right}
  speak(ok?"To‘g‘ri":"To‘g‘ri javob "+right);$("#score").textContent=qs+" ball";
  qi++;if(P.quiz.current){P.quiz.current.qi=qi;P.quiz.current.qs=qs}saveProgress();
  setTimeout(()=>q(),900)
}
function prizeFor(s){if(s>=10)return{icon:APP_ICONS.rewards.trophy,name:"SUPER SOVRIN",text:"Oltin kubok va katta sovg‘a!"};if(s>=9)return{icon:APP_ICONS.rewards.gift,name:"KATTA SOVG‘A",text:"Ajoyib sovg‘a sizniki!"};if(s>=8)return{icon:APP_ICONS.ranking.first,name:"VELOSIPED",text:"Chiroyli velosiped sovrini!"};if(s>=7)return{icon:APP_ICONS.rewards.crown,name:"AYIQCHA",text:"Yumshoq ayiqcha sovrini!"};if(s>=6)return{icon:APP_ICONS.rewards.badge,name:"SOVG‘A",text:"Siz sovg‘a yutdingiz!"};if(s>=5)return{icon:APP_ICONS.score.ball,name:"MASHINA",text:"O‘yinchoq mashina sovrini!"};return{icon:APP_ICONS.score.star,name:"HARAKATNI DAVOM ETTIRING",text:"Yana o‘ynang va sovrin yuting!"}}
function endQuiz(){
  const p=prizeFor(qs);
  P.quiz.sessions=(P.quiz.sessions||0)+1;
  P.quiz.bestScore=Math.max(P.quiz.bestScore||0,qs);
  P.quiz.totalScore=(P.quiz.totalScore||0)+qs;
  P.quiz.totalQuestions=(P.quiz.totalQuestions||0)+10;
  P.quiz.current=null;saveProgress();
  $("#qgame").hidden=true;$("#qend").hidden=false;$("#final").textContent=qs+" / 10";$("#prizeEmoji").innerHTML=`<img src="${p.icon}" alt="${p.name}" class="mini-visual" style="margin:auto">`;$("#msg").textContent=qs>=7?"🌟 Ajoyib natija!":qs>=5?"👏 Juda yaxshi!":"💜 Yana urinib ko‘ring!";
  $("#prize").innerHTML=`<img src="${p.icon}" alt="${p.name}" class="mini-visual"><div><b>${p.name}</b><small>${p.text}</small></div>`;
  const nm=playerName();speak(`Quiz tugadi${nm?", "+nm:""}. Siz ${qs} ball oldingiz.`);
  updateAll()
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
  const s=P.quiz.bestScore||0,nm=playerName();$("#best").textContent=s;$("#rankName").textContent=nm?`👑 ${nm}`:"👑 Bolajon";
  const p=prizeFor(s);$("#rt").innerHTML=s>=5?`<div class="current-prize"><img src="${p.icon}" alt="${p.name}" class="mini-visual"><div><b>${p.name}</b><small>${p.text}</small></div></div>`:"Quizni ishlab birinchi sovriningizni oling!";
}

/* ===================== EXERCISES (with resume support) ===================== */
const exerciseTopics=[
  ["letters","🔤","Harflar"],["numbers","🔢","Sonlar"],["colors","🎨","Ranglar"],["fruits","🍎","Mevalar"],["body","👂","Tana a'zolari"],["shapes","🔷","Shakllar"],["nature","🌳","Tabiat"],["time","⏰","Vaqt"],["transport","🚗","Transport"]
];
function renderExerciseTopics(){
  const box=$("#exerciseTopics");if(!box)return;
  box.innerHTML=exerciseTopics.map(([id,icon,title])=>`<button type="button" class="exercise-topic ${exerciseCat===id?"selected":""}" data-excat="${id}">${icon} ${title}<small>${Math.min(10,L[id].length)} ta savol</small></button>`).join("");
  box.querySelectorAll("[data-excat]").forEach(b=>b.addEventListener("click",()=>{
    exerciseCat=b.dataset.excat;
    box.querySelectorAll(".exercise-topic").forEach(x=>x.classList.toggle("selected",x===b));
    const start=$("#exerciseStartBtn");if(start){start.disabled=false;start.textContent="▶️ Mashqni boshlash"}
    const hint=$("#exerciseResumeHint");if(hint){hint.hidden=true;hint.textContent=""}
  }));
}
function startExercises(selectedCat=exerciseCat){
  if(!selectedCat||!L[selectedCat])return toast("Avval mavzuni tanlang 😊");
  exerciseCat=selectedCat;exerciseItems=sh(L[exerciseCat].map((f,idx)=>({c:exerciseCat,f,n:name(f),idx}))).slice(0,10);ei=0;es=0;
  P.exercises.current={items:exerciseItems,ei:0,es:0,cat:exerciseCat};saveProgress();
  $("#exerciseStart").hidden=true;$("#exerciseEnd").hidden=true;$("#exerciseGame").hidden=false;showExercise();markActivity("exercise",exerciseCat,0)
}
function resumeExerciseSession(){
  const cur=P.exercises.current;if(!cur)return startExercises();
  exerciseItems=cur.items;ei=cur.ei;es=cur.es;exerciseCat=cur.cat||((cur.items[0]||{}).c)||null;
  $("#exerciseStart").hidden=true;$("#exerciseEnd").hidden=true;$("#exerciseGame").hidden=false;showExercise();markActivity("exercise",exerciseCat,ei)
}
function showExercise(){
  if(ei>=exerciseItems.length)return endExercises();
  const total=exerciseItems.length;const x=exerciseItems[ei];$("#exerciseNum").textContent=`Mashq ${ei+1} / ${total}`;$("#exerciseScore").textContent=es+" / "+total;$("#exerciseXP").textContent=xp();$("#exerciseLiveXP").textContent="XP: "+xp();$("#exerciseBar").style.width=(ei/total*100)+"%";$("#exerciseImg").src=`assets/illustrations/${x.c}/${encodeURIComponent(x.f)}`;$("#exerciseImg").alt=x.n;$("#exerciseFeed").textContent="";
  const pool=(exerciseCat&&L[exerciseCat])?L[exerciseCat].map((f,idx)=>({c:exerciseCat,f,n:name(f),idx})):all();const opts=sh([x,...sh(pool.filter(y=>y.n!==x.n)).slice(0,3)]),box=$("#exerciseOptions");box.innerHTML="";
  opts.forEach(o=>{const b=document.createElement("button");b.textContent=o.n;b.onclick=()=>answerExercise(b,o.n===x.n,x.n);box.appendChild(b)})
}
function answerExercise(b,ok,right){
  [...document.querySelectorAll("#exerciseOptions button")].forEach(x=>x.disabled=true);
  P.exercises.totalQuestions=(P.exercises.totalQuestions||0)+1;
  if(ok){b.classList.add("ok");es++;P.exercises.totalCorrect=(P.exercises.totalCorrect||0)+1;P.exercises.totalXP=(P.exercises.totalXP||0)+10;$("#exerciseFeed").textContent="🎉 To‘g‘ri! +10 XP";addXP(10)}else{b.classList.add("no");document.querySelectorAll("#exerciseOptions button").forEach(x=>{if(x.textContent===right)x.classList.add("ok")});$("#exerciseFeed").textContent="😊 To‘g‘ri javob: "+right}
  speak(ok?"To‘g‘ri":"To‘g‘ri javob "+right);
  ei++;if(P.exercises.current){P.exercises.current.ei=ei;P.exercises.current.es=es}saveProgress();
  setTimeout(()=>{showExercise()},850)
}
function endExercises(){
  P.exercises.sessions=(P.exercises.sessions||0)+1;
  P.exercises.completedSessions=(P.exercises.completedSessions||0)+1;
  P.exercises.totalXP=(P.exercises.totalXP||0)+20;
  const total=exerciseItems.length||10;
  const finishedCat=exerciseCat;
  P.exercises.current=null;
  saveProgress();
  addXP(20);
  $("#exerciseGame").hidden=true;$("#exerciseEnd").hidden=false;
  $("#exerciseFinal").textContent=es+" / "+total;
  $("#exerciseMessage").textContent=`Siz +${es*10+20} XP oldingiz! Umumiy XP: ${xp()}`;
  $("#exerciseAgain").textContent="🔄 Yana mashq qilish";
  updateAll();
  // Qayta kirganda aynan shu mavzu tugagan holatda qolmaydi: yangi urinish uchun mavzu tanlanadi.
  exerciseCat=null;
  if(finishedCat) renderExerciseTopics();
}
$("#exerciseStartBtn").onclick=()=>startExercises(exerciseCat);
$("#exerciseAgain").onclick=()=>{
  $("#exerciseEnd").hidden=true;
  $("#exerciseGame").hidden=true;
  $("#exerciseStart").hidden=false;
  exerciseCat=null;
  const b=$("#exerciseStartBtn");if(b){b.disabled=true;b.textContent="▶️ Mashqni boshlash"}
  renderExerciseTopics();
  window.scrollTo({top:0,behavior:"smooth"});
};
$("#exerciseResumeBtn").onclick=resumeExerciseSession;
function backFromExercises(){
  $("#exerciseStart").hidden=false;$("#exerciseGame").hidden=true;$("#exerciseEnd").hidden=true;
  exerciseCat=null;
  const b=$("#exerciseStartBtn");if(b){b.disabled=true;b.textContent="▶️ Mashqni boshlash"}
  renderExerciseTopics();view("home")
}

/* ===================== STREAK "BOSHLASH" CONTINUE FLOW ===================== */
function goContinue(){
  if(P.quiz.current&&P.quiz.current.qi<10){view("quiz");resumeQuizSession();return}
  if(P.exercises.current&&P.exercises.current.ei<(P.exercises.current.items||[]).length){view("exercises");resumeExerciseSession();return}
  const la=P.lastActivity;
  if(la&&la.type==="lesson"&&la.cat&&L[la.cat]){open(la.cat);return}
  const next=Object.keys(L).find(c=>lessonStats(c).viewedCount<L[c].length);
  if(next){open(next);return}
  view("lessons")
}
$("#streakGoBtn").onclick=goContinue;

/* ===================== XP / LEVELS ===================== */
function levelInfo(v){
  if(v<100)return{level:1,start:0,next:100};
  if(v<250)return{level:2,start:100,next:250};
  if(v<500)return{level:3,start:250,next:500};
  return{level:4,start:500,next:1000}
}
function updateXP(){
  const v=xp(),li=levelInfo(v);$("#xpTotal").textContent=v;$("#xpLevel").textContent=li.level+"-daraja";
  const pct=Math.min(100,((v-li.start)/(li.next-li.start))*100);
  $("#xpProgressBar").style.width=pct+"%";$("#xpProgressText").textContent=li.next===1000&&v>=1000?`${v} XP • 4-daraja`:`${v-li.start} / ${li.next-li.start} XP`;
  $("#xpNext").textContent=li.next===1000&&v>=1000?"Maxsus mukofotlar davom etadi":`${Math.max(0,li.next-v)} XP qoldi`;
}
function updateRewards(){
  const v=xp();
  let changed=false;
  rewards.forEach(([need])=>{const n=+need.split(" ")[0];if(v>=n&&!P.rewardsUnlocked.includes(need)){P.rewardsUnlocked.push(need);P.rewardHistory=Array.isArray(P.rewardHistory)?P.rewardHistory:[];P.rewardHistory.unshift({need,title:t,at:Date.now()});changed=true}});
  if(changed)saveProgress();
  $("#rewardXP").textContent=v;
  $("#rewardGrid2").innerHTML=rewards.map(([need,img,t])=>{const n=+need.split(" ")[0],won=P.rewardsUnlocked.includes(need);return`<div class="reward2 ${won?"won":""}"><img src="${img}" alt="${t}"><b>${need}</b><small>${won?"🔓 Ochildi":"🔒 "+Math.max(0,n-v)+" XP qoldi"}</small><small>${t}</small></div>`}).join("");const rh=$("#rewardHistory");if(rh){const h=Array.isArray(P.rewardHistory)?P.rewardHistory:[];rh.innerHTML=h.length?h.slice(0,8).map(x=>`<div class="history-row"><span>🏅 ${x.title||"Mukofot"}</span><small>${x.need||""} • ${new Date(x.at).toLocaleDateString("uz-UZ")}</small></div>`).join(""):'<div class=\"history-empty\">Hali ochilgan mukofot yo‘q.</div>'}
}
function updateStreak(){
  const z=P.streak;$("#streakCount").textContent=z.count+" kun";$("#streakMessage").textContent=z.count>=7?"🌟 7 kunlik seriya davom etmoqda!":"Har kuni dars yoki mashq bajaring.";
  const now=new Date(),days=[];for(let i=6;i>=0;i--){const d=new Date(now);d.setDate(now.getDate()-i);const s=localDay(d);days.push(`<div class="day ${z.days.includes(s)?"on":""}"><b>${z.days.includes(s)?"✓":"·"}</b>${d.toLocaleDateString("uz-UZ",{weekday:"short"})}</div>`)}$("#streakWeek").innerHTML=days.join("");
  const hasQuiz=P.quiz.current&&P.quiz.current.qi<10,hasEx=P.exercises.current&&P.exercises.current.ei<10;
  $("#streakGoBtn").textContent=hasQuiz||hasEx?"▶️ Testni davom ettirish":(P.lastActivity&&P.lastActivity.type==="lesson")?"▶️ Darsdan davom etish":"Boshlash";
}
function updateResults(){
  const v=xp(),z=P.streak,qz=P.quiz,ex=P.exercises;
  $("#resXP").textContent=v;$("#resStreak").textContent=z.count+" kun";
  $("#resExSessions").textContent=ex.sessions||0;
  $("#resExCorrect").textContent=ex.totalCorrect||0;
  $("#resExTotal").textContent=`${ex.totalCorrect||0} / ${ex.totalQuestions||0}`;
  $("#resExXP").textContent=ex.totalXP||0;
  $("#resQuizSessions").textContent=qz.sessions||0;
  $("#resBest").textContent=(qz.bestScore||0)+" / 10";
  $("#resQuizAvg").textContent=(qz.sessions?(qz.totalScore/qz.sessions).toFixed(1):"0")+" / 10";
  $("#resQuizXP").textContent=qz.totalXP||0;
  $("#resLessonsViewed").textContent=totalLessonsViewed();
  $("#resLessonsDone").textContent=totalLessonsDone();
  $("#resLessonsProgress").textContent=totalLessonsInProgress();const ah=$("#activityHistory");if(ah){const h=Array.isArray(P.activityHistory)?P.activityHistory:[];const label={lesson:"📚 Dars",exercise:"🎮 Mashq",quiz:"🧩 Quiz"};ah.innerHTML=h.slice(0,10).map(x=>`<div class="history-row"><span>${label[x.type]||"Faoliyat"}${x.cat&&N[x.cat]?" • "+N[x.cat]:""}</span><small>${new Date(x.at).toLocaleDateString("uz-UZ")}</small></div>`).join("")||'<div class="history-empty">Hali faoliyat tarixi yo‘q.</div>'}}

function updateParent(){
  const n=playerName()||"Bolajon",v=xp(),li=levelInfo(v),z=P.streak,qz=P.quiz,ex=P.exercises;
  $("#parentName").textContent=n;$("#parentXP").textContent=v;$("#parentLevel").textContent=li.level;
  $("#parentLessonsViewed").textContent=totalLessonsViewed();
  $("#parentLessonsDone").textContent=totalLessonsDone();
  $("#parentExSessions").textContent=ex.sessions||0;
  $("#parentExScore").textContent=`${ex.totalCorrect||0} / ${ex.totalQuestions||0}`;
  $("#parentQuizSessions").textContent=qz.sessions||0;
  $("#parentBest").textContent=(qz.bestScore||0)+" / 10";
  $("#parentQuizXP").textContent=qz.totalXP||0;
  $("#parentStreak").textContent=z.count+" kun";
  $("#parentLongestStreak").textContent=(z.longest||0)+" kun";
}
function updateResumeButtons(){
  const qBtn=$("#quizResumeBtn"),qHint=$("#quizResumeHint");
  const eBtn=$("#exerciseResumeBtn"),eHint=$("#exerciseResumeHint");
  if(P.exercises.current&&P.exercises.current.ei<(P.exercises.current.items||[]).length){const total=(P.exercises.current.items||[]).length;eBtn.hidden=false;eHint.hidden=false;eHint.textContent=`Yakunlanmagan mashq bor: ${P.exercises.current.ei} / ${total} bajarilgan.`}
  else{eBtn.hidden=true;eHint.hidden=true}
}
function updateAll(){rank();updateXP();updateRewards();updateStreak();updateResults();updateParent();updateResumeButtons();$("#exerciseXP").textContent=xp()}
function saveName(){const input=$("#playerName"),btn=$("#saveName"),v=(input?.value||"").trim();if(!v)return toast("Avval ismingizni yozing 😊");P.name=v;saveProgress();if(input)input.value=v;if(btn)btn.textContent="✏️ Ismni o‘zgartirish";$("#hello").textContent=`✓ Saqlandi: ${v} • Endi darsni boshlashingiz mumkin`;$("#nameBox")?.classList.add("saved");$("#quizWelcome").textContent=`${v}, 10 ta savolga javob bering va sovrinlarni yutib oling!`;toast("Ismingiz saqlandi! 💜");updateAll()}
$("#saveName").onclick=saveName;
function initName(){const input=$("#playerName");const n=playerName();if(input&&n){input.value=n;$("#hello").textContent=`🌟 Salom, ${n}! Bugun nimani o'rganamiz?`;$("#nameBox")?.classList.add("saved");$("#saveName").textContent="✏️ Ismni o'zgartirish";$("#quizWelcome").textContent=`${n}, 10 ta savolga javob bering va sovrinlarni yutib oling!`}input?.addEventListener("keydown",e=>{if(e.key==="Enter")saveName()})}
function isInstalled(){return window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===true}
function updateHomePWA(){
  const ins=$("#installStatus"),off=$("#offlineStatus"),offTitle=$("#offlineTitle"),up=$("#updateStatus"),upTitle=$("#updateTitle");
  if(isInstalled()){if(ins)ins.textContent="Ilova o'rnatilgan ✓";$("#installCard")?.classList.add("done")}else if(ins)ins.textContent=dp?"O'rnatish uchun bosing":"Telefonda qulay foydalaning";
  const online=navigator.onLine;if(offTitle)offTitle.textContent=online?"Offline tayyor":"Offline rejim";if(off)off.textContent=online?"Internet uzilsa ham ochiladi":"Internet yo'q — ilova ishlashda davom etadi";
  if(upTitle&&up) {const waiting=swReg&&swReg.waiting;upTitle.textContent=waiting?"Yangilanish tayyor":"Yangilanadi";up.textContent=waiting?"Yangi versiya tayyor — bosing":"Yangi versiya chiqsa xabar beramiz"}
}
function installApp(){if(isInstalled())return toast("Ilova allaqachon o'rnatilgan ✓");if(dp){dp.prompt();dp.userChoice.then(()=>{dp=null;$("#install").hidden=true;updateHomePWA()})}else toast("Brauzer menyusidan 'Ilovani o'rnatish' ni tanlang")}
addEventListener("beforeinstallprompt",e=>{e.preventDefault();dp=e;$("#install").hidden=false;updateHomePWA()});$("#install").onclick=installApp;$("#installHome").onclick=installApp;$("#installCard").onclick=installApp;$("#installFeature").onclick=installApp;$("#sideInstall").onclick=()=>{installApp();};
addEventListener("online",updateHomePWA);addEventListener("offline",updateHomePWA);
$("#aiSend").onclick=sendAI;$("#aiInput").addEventListener("keydown",e=>{if(e.key==="Enter")sendAI()});
function sendAI(){
  const inp=$("#aiInput"),q=inp.value.trim();if(!q)return;
  const box=$("#aiMessages");box.insertAdjacentHTML("beforeend",`<div class="ai-message"><b>Siz:</b> ${escapeHTML(q)}</div>`);
  let a="Bu savolni birga o'rganamiz! Rasmli darslardan birini tanlab ko'ring. 😊";
  if(/salom/i.test(q))a="Va alaykum assalom! 🌟 Men Bolajon AI. Sizga o'rganishda yordam beraman.";
  else if(/harf|alifbo/i.test(q))a="Harflarni o'rganish uchun 📚 Darslar → Harflar bo'limiga kiring.";
  else if(/son|raqam/i.test(q))a="1 dan 10 gacha sonlarni 📚 Darslar → Sonlar bo'limida ketma-ket o'rganing.";
  else if(/rang/i.test(q))a="Ranglarni 📚 Darslar → Ranglar bo'limida rasm va ovoz bilan o'rganishingiz mumkin.";
  box.insertAdjacentHTML("beforeend",`<div class="ai-message"><div class="feature-inline"><img src="${APP_ICONS.ai.spark}" alt="AI" class="mini-visual"><b>Bolajon AI</b></div>${a}</div>`);inp.value=""
}
function escapeHTML(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

/* ===================== PWA: install / offline / update ===================== */
function showUpdateBtn(reg){
  const b=$("#updateApp");if(b){b.hidden=false;b.onclick=()=>{if(reg.waiting)reg.waiting.postMessage("SKIP_WAITING");toast("Yangilanmoqda...")}}
  const card=$("#updateCard");if(card)card.onclick=()=>{if(reg.waiting){reg.waiting.postMessage("SKIP_WAITING");toast("Yangilanmoqda...")}else{reg.update().then(()=>toast("Yangilanish tekshirildi ✓")).catch(()=>{})}};updateHomePWA();
}
function initSW(){
  if(!("serviceWorker" in navigator))return;
  addEventListener("load",async()=>{
    try{
      const reg=await navigator.serviceWorker.register("./service-worker.js");
      swReg=reg;
      reg.update().catch(()=>{});
      if(reg.waiting&&navigator.serviceWorker.controller)showUpdateBtn(reg);
      reg.addEventListener("updatefound",()=>{
        const nw=reg.installing;if(!nw)return;
        nw.addEventListener("statechange",()=>{
          if(nw.state==="installed"&&navigator.serviceWorker.controller)showUpdateBtn(reg)
        })
      });
      let refreshing=false;
      navigator.serviceWorker.addEventListener("controllerchange",()=>{if(refreshing)return;refreshing=true;location.reload()})
    }catch(e){}
  })
}
initSW();

function initTheme(){const b=$("#themeBtn"),saved=localStorage.getItem("bolajonTheme");if(saved==="night")document.body.classList.add("night");const sync=()=>{if(b)b.textContent=document.body.classList.contains("night")?"☀️":"🌙";if(b)b.setAttribute("aria-label",document.body.classList.contains("night")?"Kunduzgi rejim":"Kechki rejim")};b?.addEventListener("click",()=>{document.body.classList.toggle("night");localStorage.setItem("bolajonTheme",document.body.classList.contains("night")?"night":"day");sync()});sync()}
function initDrawer(){
  const btn=$("#menuBtn"),menu=$("#sideMenu"),shade=$("#menuShade"),close=$("#menuClose");
  const hide=()=>{if(menu)menu.hidden=true;if(shade)shade.hidden=true;if(btn)btn.setAttribute("aria-expanded","false")};
  const show=()=>{if(menu)menu.hidden=false;if(shade)shade.hidden=false;if(btn)btn.setAttribute("aria-expanded","true")};
  btn?.addEventListener("click",show);close?.addEventListener("click",hide);shade?.addEventListener("click",hide);
  document.querySelectorAll(".side-link").forEach(b=>b.addEventListener("click",()=>{hide();if(b.dataset.v)view(b.dataset.v)}));
}
renderCats();renderExerciseTopics();initName();initTheme();initDrawer();updateAll();updateHomePWA();setTimeout(()=>$("#splash")?.classList.add("hide"),850);addEventListener("load",()=>setTimeout(()=>$("#splash")?.classList.add("hide"),300));
