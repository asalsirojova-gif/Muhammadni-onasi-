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
    lastActivity:null
  }
}
function loadProgress(){
  try{
    const raw=localStorage.getItem(PKEY);
    if(raw){
      const p=JSON.parse(raw),d=defaultProgress();
      return{...d,...p,streak:{...d.streak,...(p.streak||{})},quiz:{...d.quiz,...(p.quiz||{})},exercises:{...d.exercises,...(p.exercises||{})},lessons:p.lessons||{}};
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
function saveProgress(){localStorage.setItem(PKEY,JSON.stringify(P))}
saveProgress();

let cat=null,lessonIndex=0,items=[],qi=0,qs=0,exerciseItems=[],ei=0,es=0,dp=null,swReg=null;
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
  if(type)P.lastActivity={type,cat:c||null,index:typeof idx==="number"?idx:null};
  saveProgress();
}

function lessonProgress(c){if(!P.lessons[c])P.lessons[c]={viewed:[],lastIndex:0};return P.lessons[c]}
function markLessonViewed(c,idx){
  const lp=lessonProgress(c);lp.lastIndex=idx;
  if(!lp.viewed.includes(idx)){lp.viewed.push(idx);saveProgress();addXP(2)}
  else saveProgress();
}
function lessonStats(c){const lp=lessonProgress(c),total=L[c]?L[c].length:0;return{viewedCount:lp.viewed.length,total,completed:total>0&&lp.viewed.length>=total,lastIndex:lp.lastIndex||0}}
function totalLessonsViewed(){return Object.keys(L).reduce((s,c)=>s+lessonProgress(c).viewed.length,0)}
function totalLessonsDone(){return Object.keys(L).filter(c=>lessonStats(c).completed).length}
function totalLessonsInProgress(){return Object.keys(L).filter(c=>{const s=lessonStats(c);return s.viewedCount>0&&!s.completed}).length}

function speak(t){if(!("speechSynthesis" in window))return toast("Ovoz mavjud emas");speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang="uz-UZ";u.rate=.82;speechSynthesis.speak(u)}
function toast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");clearTimeout(x._t);x._t=setTimeout(()=>x.classList.remove("show"),2300)}
function view(v){document.querySelectorAll(".view").forEach(x=>x.classList.toggle("active",x.id===v));updateAll();window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-v]").forEach(b=>b.onclick=()=>view(b.dataset.v));

function renderCats(){
  for(const id of ["homeCats","lessonCats"]){
    const box=$("#"+id);box.innerHTML="";
    Object.keys(L).forEach(c=>{
      const st=lessonStats(c);
      const b=document.createElement("button");b.className="cat "+c;
      let progressLine=st.completed?"✅ Tugallandi":st.viewedCount>0?`${st.viewedCount}/${st.total} ko'rilgan • ${st.lastIndex+1}-rasmdan davom etish`:"Boshlanmagan";
      b.innerHTML=`<img src="assets/icons/${I[c]}" alt="${N[c]}"><b>${N[c]}</b><small>${L[c].length} ta</small><small class="continue">${progressLine}</small>`;
      b.onclick=()=>open(c);box.appendChild(b)
    });
    const ex=document.createElement("button");ex.className="cat exercises";
    ex.innerHTML=`<img src="${APP_ICONS.exercises.exercise}" alt="Mashqlar"><b>🧩 Mashqlar</b><small>10 ta</small>`;
    ex.onclick=()=>view("exercises");box.appendChild(ex);
  }
}
function open(c){
  if(!L[c])return;cat=c;
  const lp=lessonProgress(c);
  lessonIndex=(typeof lp.lastIndex==="number"&&lp.lastIndex<L[c].length)?lp.lastIndex:0;
  markActivity("lesson",c,lessonIndex);
  $("#menu").hidden=true;$("#lesson").hidden=false;renderLesson();view("lessons")
}
function renderLesson(){
  if(!cat||!L[cat])return;const list=L[cat],f=list[lessonIndex],n=name(f);
  markLessonViewed(cat,lessonIndex);markActivity("lesson",cat,lessonIndex);
  $("#lessonCount").textContent=`${N[cat].toUpperCase()} • ${lessonIndex+1} / ${list.length}`;
  $("#lessonProgressText").textContent=`${lessonIndex+1}-rasm / ${list.length}`;
  $("#lessonProgressBar").style.width=((lessonIndex+1)/list.length*100)+"%";
  $("#singleCard").innerHTML=`<img src="assets/illustrations/${cat}/${encodeURIComponent(f)}" alt="${n}"><h2>${n}</h2><p>🔊 Nomi: <b>${n}</b></p>`;
  $("#singleCard").onclick=()=>speak(n);$("#prev").disabled=lessonIndex===0;$("#next").disabled=lessonIndex===list.length-1;$("#listenOne").onclick=()=>speak(n)
}
$("#prev").onclick=()=>{if(lessonIndex>0){lessonIndex--;renderLesson()}};$("#next").onclick=()=>{if(cat&&lessonIndex<L[cat].length-1){lessonIndex++;renderLesson()}};
$("#back").onclick=()=>{$("#lesson").hidden=true;$("#menu").hidden=false;window.scrollTo({top:0,behavior:"smooth"})};
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
function startExercises(){
  exerciseItems=sh(all()).slice(0,10);ei=0;es=0;
  P.exercises.current={items:exerciseItems,ei:0,es:0};saveProgress();
  $("#exerciseStart").hidden=true;$("#exerciseEnd").hidden=true;$("#exerciseGame").hidden=false;showExercise();markActivity("exercise",null,0)
}
function resumeExerciseSession(){
  const cur=P.exercises.current;if(!cur)return startExercises();
  exerciseItems=cur.items;ei=cur.ei;es=cur.es;
  $("#exerciseStart").hidden=true;$("#exerciseEnd").hidden=true;$("#exerciseGame").hidden=false;showExercise();markActivity("exercise",null,ei)
}
function showExercise(){
  if(ei>=exerciseItems.length)return endExercises();
  const x=exerciseItems[ei];$("#exerciseNum").textContent=`Mashq ${ei+1} / 10`;$("#exerciseScore").textContent=es+" / 10";$("#exerciseXP").textContent=xp();$("#exerciseLiveXP").textContent="XP: "+xp();$("#exerciseBar").style.width=(ei/10*100)+"%";$("#exerciseImg").src=`assets/illustrations/${x.c}/${encodeURIComponent(x.f)}`;$("#exerciseImg").alt=x.n;$("#exerciseFeed").textContent="";
  const opts=sh([x,...sh(all().filter(y=>y.n!==x.n)).slice(0,3)]),box=$("#exerciseOptions");box.innerHTML="";
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
  P.exercises.current=null;saveProgress();
  addXP(20);
  $("#exerciseGame").hidden=true;$("#exerciseEnd").hidden=false;$("#exerciseFinal").textContent=es+" / 10";$("#exerciseMessage").textContent=`Siz +${es*10+20} XP oldingiz! Umumiy XP: ${xp()}`;
  updateAll()
}
$("#exerciseStartBtn").onclick=startExercises;$("#exerciseAgain").onclick=startExercises;$("#exerciseResumeBtn").onclick=resumeExerciseSession;
function backFromExercises(){$("#exerciseStart").hidden=false;$("#exerciseGame").hidden=true;$("#exerciseEnd").hidden=true;view("home")}

/* ===================== STREAK "BOSHLASH" CONTINUE FLOW ===================== */
function goContinue(){
  if(P.quiz.current&&P.quiz.current.qi<10){view("quiz");resumeQuizSession();return}
  if(P.exercises.current&&P.exercises.current.ei<10){view("exercises");resumeExerciseSession();return}
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
  rewards.forEach(([need])=>{const n=+need.split(" ")[0];if(v>=n&&!P.rewardsUnlocked.includes(need)){P.rewardsUnlocked.push(need);changed=true}});
  if(changed)saveProgress();
  $("#rewardXP").textContent=v;
  $("#rewardGrid2").innerHTML=rewards.map(([need,img,t])=>{const n=+need.split(" ")[0],won=P.rewardsUnlocked.includes(need);return`<div class="reward2 ${won?"won":""}"><img src="${img}" alt="${t}"><b>${need}</b><small>${won?"🔓 Ochildi":"🔒 "+Math.max(0,n-v)+" XP qoldi"}</small><small>${t}</small></div>`}).join("")
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
  $("#resLessonsProgress").textContent=totalLessonsInProgress();
}
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
  if(P.quiz.current&&P.quiz.current.qi<10){qBtn.hidden=false;qHint.hidden=false;qHint.textContent=`Yakunlanmagan test bor: ${P.quiz.current.qi} / 10 savol javob berilgan.`}
  else{qBtn.hidden=true;qHint.hidden=true}
  const eBtn=$("#exerciseResumeBtn"),eHint=$("#exerciseResumeHint");
  if(P.exercises.current&&P.exercises.current.ei<10){eBtn.hidden=false;eHint.hidden=false;eHint.textContent=`Yakunlanmagan mashq bor: ${P.exercises.current.ei} / 10 bajarilgan.`}
  else{eBtn.hidden=true;eHint.hidden=true}
}
function updateAll(){rank();updateXP();updateRewards();updateStreak();updateResults();updateParent();updateResumeButtons();$("#exerciseXP").textContent=xp()}
function saveName(){const v=$("#playerName").value.trim();if(!v)return toast("Avval ismingizni yozing 😊");P.name=v;saveProgress();$("#hello").textContent=`Salom, ${v}! O'ynab o'rganamiz! 🌟`;$("#quizWelcome").textContent=`${v}, 10 ta savolga javob bering va sovrinlarni yutib oling!`;toast("Ismingiz saqlandi! 💜");updateAll()}
$("#saveName").onclick=saveName;
function initName(){const n=playerName();if(n){$("#playerName").value=n;$("#hello").textContent=`Salom, ${n}! O'ynab o'rganamiz! 🌟`;$("#quizWelcome").textContent=`${n}, 10 ta savolga javob bering va sovrinlarni yutib oling!`}}
function installApp(){if(dp){dp.prompt();dp.userChoice.then(()=>{dp=null;$("#install").hidden=true})}else toast("Brauzer menyusidan 'Ilovani o'rnatish' ni tanlang")}
addEventListener("beforeinstallprompt",e=>{e.preventDefault();dp=e;$("#install").hidden=false});$("#install").onclick=installApp;$("#installHome").onclick=installApp;
/* ===================== BOLAJON AI ===================== */

const AIKEY = "bolajonAIHistory";

function aiHistory(){
  try{
    const h = JSON.parse(localStorage.getItem(AIKEY) || "[]");
    return Array.isArray(h) ? h : [];
  }catch(e){
    return [];
  }
}

function saveAIHistory(h){
  localStorage.setItem(AIKEY, JSON.stringify(h.slice(-40)));
}

function renderAIHistory(){
  const box = $("#aiMessages");
  if(!box) return;

  const h = aiHistory();

  box.innerHTML = h.map(m => {
    if(m.role === "assistant"){
      return `
        <div class="ai-message">
          <div class="feature-inline">
            <img src="${APP_ICONS.ai.spark}" alt="AI" class="mini-visual">
            <b>Bolajon AI</b>
          </div>
          ${escapeHTML(m.content || "").replace(/\n/g,"<br>")}
        </div>
      `;
    }

    return `
      <div class="ai-message">
        <b>Siz:</b> ${escapeHTML(m.content || "")}
      </div>
    `;
  }).join("");
}

function clearAIHistory(){
  localStorage.removeItem(AIKEY);
  renderAIHistory();
  toast("Bolajon AI suhbatlari tozalandi");
}

function setAISending(on){
  const input = $("#aiInput");
  const send = $("#aiSend");

  if(input) input.disabled = on;
  if(send){
    send.disabled = on;
    send.textContent = on ? "Yozmoqda..." : "Yuborish";
  }

  [
    "#aiAttachBtn",
    "#aiImageBtn",
    "#aiPdfBtn",
    "#aiGenerateBtn"
  ].forEach(id => {
    const btn = $(id);
    if(btn) btn.disabled = on;
  });
}

function escapeHTML(s){
  return String(s).replace(/[&<>"']/g,m => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#039;"
  }[m]));
}

/* ---------- Faylni base64 qilish ---------- */

function fileToBase64(file){
  return new Promise((resolve,reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result || "");
      const base64 = result.includes(",")
        ? result.split(",")[1]
        : result;

      resolve(base64);
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ---------- Fayl preview ---------- */

function showAIFilePreview(file){
  const preview = $("#aiFilePreview");
  if(!preview) return;

  preview.hidden = false;

  if(file.type.startsWith("image/")){
    const url = URL.createObjectURL(file);

    preview.innerHTML = `
      <img src="${url}" alt="Tanlangan rasm">
      <b>${escapeHTML(file.name)}</b>
    `;
  }else{
    preview.innerHTML = `
      📄 <b>${escapeHTML(file.name)}</b>
    `;
  }
}

/* ---------- Rasm/PDF yuborish ---------- */

let selectedAIFile = null;

async function sendAIFile(){
  const input = $("#aiInput");
  const file = selectedAIFile;

  if(!file){
    toast("Avval rasm yoki PDF tanlang");
    return;
  }

  const question =
    input.value.trim() ||
    "Yuborgan materialimni tushuntirib ber.";

  setAISending(true);

  const h = aiHistory();

  h.push({
    role:"user",
    content:`${file.type === "application/pdf" ? "📄 PDF" : "🖼️ Rasm"}: ${file.name}\n${question}`
  });

  saveAIHistory(h);
  renderAIHistory();

  try{
    const fileData = await fileToBase64(file);

    const response = await fetch("/api/bolajon-ai",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        action:"chat",
        message:question,
        history:aiHistory().slice(-12),
        fileData:fileData,
        mimeType:file.type
      })
    });

    const data = await response.json().catch(() => ({}));

    if(!response.ok){
      throw new Error(data.error || "AI javob bera olmadi");
    }

    const answer =
      String(data.answer || "").trim() ||
      "Hozircha javob bera olmadim. Yana urinib ko‘ring 😊";

    const h2 = aiHistory();

    h2.push({
      role:"assistant",
      content:answer
    });

    saveAIHistory(h2);
    renderAIHistory();

    input.value = "";
    selectedAIFile = null;

    const preview = $("#aiFilePreview");
    if(preview){
      preview.hidden = true;
      preview.innerHTML = "";
    }

  }catch(error){
    toast("AI bilan ulanishda xatolik. Internetni tekshiring.");
  }finally{
    setAISending(false);
    input?.focus();
  }
}

/* ---------- Oddiy matn yuborish ---------- */

async function sendAI(){
  const input = $("#aiInput");
  const q = input.value.trim();

  if(!q && !selectedAIFile) return;

  if(selectedAIFile){
    await sendAIFile();
    return;
  }

  const box = $("#aiMessages");

  const h = aiHistory();

  h.push({
    role:"user",
    content:q
  });

  saveAIHistory(h);
  renderAIHistory();

  input.value = "";
  setAISending(true);

  try{
    const response = await fetch("/api/bolajon-ai",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        action:"chat",
        message:q,
        history:aiHistory().slice(-12)
      })
    });

    const data = await response.json().catch(() => ({}));

    if(!response.ok){
      throw new Error(data.error || "AI javob bera olmadi");
    }

    const answer =
      String(data.answer || "").trim() ||
      "Hozircha javob bera olmadim. Yana bir bor urinib ko‘ring 😊";

    const h2 = aiHistory();

    h2.push({
      role:"assistant",
      content:answer
    });

    saveAIHistory(h2);
    renderAIHistory();

    box?.lastElementChild?.scrollIntoView({
      behavior:"smooth",
      block:"nearest"
    });

  }catch(error){
    const h2 = aiHistory();

    if(
      h2.at(-1)?.role === "user" &&
      h2.at(-1)?.content === q
    ){
      h2.pop();
    }

    saveAIHistory(h2);
    renderAIHistory();

    toast("AI bilan ulanishda xatolik. Internetni tekshiring.");

  }finally{
    setAISending(false);
    input.focus();
  }
}

/* ---------- Rasm tanlash ---------- */

function chooseAIImage(){
  const fileInput = $("#aiFileInput");
  if(!fileInput) return;

  fileInput.accept = "image/*";
  fileInput.click();
}

/* ---------- PDF tanlash ---------- */

function chooseAIPDF(){
  const fileInput = $("#aiFileInput");
  if(!fileInput) return;

  fileInput.accept = ".pdf,application/pdf";
  fileInput.click();
}

/* ---------- Tanlangan fayl ---------- */

$("#aiFileInput")?.addEventListener("change", e => {
  const file = e.target.files?.[0];

  if(!file) return;

  const isImage = file.type.startsWith("image/");
  const isPDF = file.type === "application/pdf";

  if(!isImage && !isPDF){
    toast("Faqat rasm yoki PDF tanlang");
    e.target.value = "";
    return;
  }

  selectedAIFile = file;
  showAIFilePreview(file);

  const input = $("#aiInput");

  if(input && !input.value.trim()){
    input.placeholder =
      isPDF
      ? "PDF haqida savolingizni yozing..."
      : "Rasm haqida savolingizni yozing...";
  }
});

/* ---------- Tugmalar ---------- */

$("#aiAttachBtn")?.addEventListener("click",() => {
  $("#aiFileInput")?.click();
});

$("#aiImageBtn")?.addEventListener("click",chooseAIImage);

$("#aiPdfBtn")?.addEventListener("click",chooseAIPDF);

/* ---------- Rasm yasash ---------- */

async function generateAIImage(){

  const input = $("#aiInput");
  const prompt = input.value.trim();

  if(!prompt){
    toast("Avval qanday rasm kerakligini yozing");
    input.focus();
    return;
  }

  setAISending(true);

  try{

    const response = await fetch("/api/bolajon-ai",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        action:"image",
        message:prompt
      })
    });

    const data = await response.json().catch(() => ({}));

    if(!response.ok){
      throw new Error(data.error || "Rasm yaratib bo‘lmadi");
    }

    const box = $("#aiMessages");

    if(data.image?.data){

      const imageSrc =
        `data:${data.image.mimeType || "image/png"};base64,${data.image.data}`;

      box.insertAdjacentHTML("beforeend",`
        <div class="ai-message">
          <div class="feature-inline">
            <img src="${APP_ICONS.ai.spark}" alt="AI" class="mini-visual">
            <b>Bolajon AI</b>
          </div>

          <p>🎨 Rasm tayyor bo‘ldi!</p>

          <img
            src="${imageSrc}"
            alt="Bolajon AI yaratgan rasm"
            style="width:100%;max-width:420px;border-radius:18px;display:block;margin-top:10px;"
          >
        </div>
      `);

    }else{

      const answer =
        String(data.answer || "Rasm tayyor bo‘ldi.").trim();

      box.insertAdjacentHTML("beforeend",`
        <div class="ai-message">
          <div class="feature-inline">
            <img src="${APP_ICONS.ai.spark}" alt="AI" class="mini-visual">
            <b>Bolajon AI</b>
          </div>
          ${escapeHTML(answer).replace(/\n/g,"<br>")}
        </div>
      `);
    }

    input.value = "";

    box?.lastElementChild?.scrollIntoView({
      behavior:"smooth",
      block:"nearest"
    });

  }catch(error){

    toast("Rasm yaratishda xatolik yuz berdi.");

  }finally{

    setAISending(false);
    input.focus();
  }
}

$("#aiGenerateBtn")?.addEventListener(
  "click",
  generateAIImage
);

/* ---------- Yuborish ---------- */

$("#aiSend")?.addEventListener(
  "click",
  sendAI
);

$("#aiInput")?.addEventListener(
  "keydown",
  e => {
    if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      sendAI();
    }
  }
);

renderAIHistory();
/* ===================== PWA: install / offline / update ===================== */
function showUpdateBtn(reg){
  const b=$("#updateApp");if(!b)return;
  b.hidden=false;
  b.onclick=()=>{if(reg.waiting)reg.waiting.postMessage("SKIP_WAITING");toast("Yangilanmoqda...")}
}
function initSW(){
  if(!("serviceWorker" in navigator))return;
  addEventListener("load",async()=>{
    try{
      const reg=await navigator.serviceWorker.register("./service-worker.js");
      swReg=reg;
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

renderCats();initName();updateAll();setTimeout(()=>$("#splash")?.classList.add("hide"),850);addEventListener("load",()=>setTimeout(()=>$("#splash")?.classList.add("hide"),300));
