const lessons = {"letters": ["a.jpg", "b.jpg", "ch.jpg", "d.jpg", "e.jpg", "f.jpg", "g.jpg", "g‘.jpg", "h.jpg", "i1.jpg", "j.jpg", "k.jpg", "l.jpg", "m.jpg", "n.jpg", "ng.jpg", "o.jpg", "o‘.jpg", "p.jpg", "q.jpg", "r.jpg", "s.jpg", "sh.jpg", "t.jpg", "u.jpg", "v.jpg", "x.jpg", "y.jpg", "z.jpg"], "numbers": ["1.jpg", "10.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"], "colors": ["Bejrang .jpg", "binafsha.jpg", "havorang.jpg", "jigarrang.jpg", "koralrang.jpg", "ko‘k.jpg", "Kulrang.jpg", "kumushrang.jpg", "oltinrang.jpg", "oq.jpg", "osmonrang.jpg", "pushti.jpg", "qizil.jpg", "qora.jpg", "sariq.jpg", "to‘q sarie.jpg", "to‘qkok.jpg", "turkuazrang.jpg", "yashil.jpg", "zangori.jpg"], "fruits": ["ananas.jpg", "anor.jpg", "apilsin.jpg", "banan.jpg", "behi.jpg", "kivi.jpg", "limon.jpg", "nok.jpg", "olcha.jpg", "olma.jpg", "olxo‘ri.jpg", "O‘rik.jpg", "qovun.jpg", "qulupnay.jpg", "tarvuz.jpg", "uzum.jpg", "xurmo.jpg"], "body": ["Bosh.jpg", "Burun.jpg", "Ko‘z.jpg", "Og‘iz.jpg", "Oyoq.jpg", "Qo‘l.jpg", "Quloq.jpg"], "shapes": ["Doira.jpg", "Kvadrat.jpg", "Oval.jpg", "To'rtburchak.jpg", "Uchburchak.jpg", "Yulduz.jpg"], "nature": ["bulut.jpg", "daraxt.jpg", "daryo.jpg", "dengiz.jpg", "gul.jpg", "kamalak.jpg", "olov.jpg", "Ormon.jpg", "Oyva yulduzlar.jpg", "o‘tloq.jpg", "qor.jpg", "quyosh.jpg", "shamol.jpg", "tog‘.jpg", "yomgir.jpg"], "time": ["chizma soat.jpg", "kalendar.jpg", "kun va tun.jpg", "qum soat.jpg", "sana.jpg", "sekundomer.jpg", "soat.jpg", "soat1.jpg"], "transport": ["avtobus.jpg", "avtomobil.jpg", "havoshari.jpg", "kema.jpg", "mototsikl.jpg", "politsiyamashinasi.jpg", "poyezd.jpg", "samalyot.jpg", "samasval.jpg", "tezyordam.jpg", "traktor.jpg", "velosiped.jpg", "vertalyot.jpg", "yaxta.jpg", "yonginmashinasi.jpg"]};
const labels = {"letters": "Harflar", "numbers": "Sonlar", "colors": "Ranglar", "fruits": "Mevalar", "body": "Tana a'zolari", "shapes": "Shakllar", "nature": "Tabiat", "time": "Vaqt", "transport": "Transport"};
const icons = {"letters": "harflar.png", "numbers": "sonlar.png", "colors": "ranglar.png", "fruits": "mevalar .png", "body": "tana azolar.png", "shapes": "shakllar.png", "nature": "tabiat.png", "time": "vaqt.png", "transport": "transport.png"};
const state = {score:Number(localStorage.getItem('bolajonlar-score')||0), quiz:[]};
const $ = s => document.querySelector(s);

function labelFromFile(name){
  return name.replace(/\.[^.]+$/,'').replace(/_/g,' ').trim();
}
function categoryCard(key){
  const b=document.createElement('button'); b.className='category';
  b.innerHTML=`<img src="assets/icons/${icons[key]}" alt=""><h3>${labels[key]}</h3>`;
  b.onclick=()=>openLesson(key); return b;
}
function renderCategories(){
  ['categoryGrid','lessonCategories'].forEach(id=>{
    const box=$('#'+id); box.innerHTML='';
    Object.keys(lessons).forEach(k=>box.appendChild(categoryCard(k)));
  });
}
function openLesson(key){
  showView('lessons');
  const panel=$('#lessonPanel');
  panel.innerHTML=`<div class="lesson-box"><h2 class="lesson-title">${labels[key]}</h2><div class="cards"></div></div>`;
  const cards=panel.querySelector('.cards');
  lessons[key].forEach(file=>{
    const c=document.createElement('article'); c.className='learn-card';
    const img=document.createElement('img');
    img.src='assets/illustrations/'+key+'/'+file; img.alt=labelFromFile(file);
    img.onerror=()=>c.style.display='none';
    const b=document.createElement('b'); b.textContent=labelFromFile(file);
    c.append(img,b); cards.appendChild(c);
  });
  window.scrollTo({top:0,behavior:'smooth'});
}
function showView(id){
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));
  if(id==='ranking') updateScore();
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
function updateScore(){ $('#score').textContent=state.score; localStorage.setItem('bolajonlar-score',state.score); }
function makeQuiz(){
  const all=Object.entries(lessons).flatMap(([cat,files])=>files.map(f=>({cat,file:f,label:labelFromFile(f)})));
  if(all.length<4)return;
  const q=all[Math.floor(Math.random()*all.length)];
  const wrong=all.filter(x=>x.label!==q.label).sort(()=>Math.random()-.5).slice(0,3);
  state.quiz=[q,...wrong].sort(()=>Math.random()-.5);
  $('#quizQuestion').innerHTML=`<img src="assets/illustrations/${q.cat}/${q.file}" alt=""><br>Bu nima?`;
  const opts=$('#quizOptions'); opts.innerHTML='';
  state.quiz.forEach(x=>{
    const b=document.createElement('button'); b.textContent=x.label;
    b.onclick=()=>{
      const ok=x.label===q.label;
      $('#quizResult').textContent=ok?'🎉 To‘g‘ri! +10 ball':'😊 Yana urinib ko‘ring!';
      if(ok){state.score+=10;updateScore(); setTimeout(makeQuiz,800);}
    }; opts.appendChild(b);
  });
  $('#startQuiz').textContent='Yangi savol';
}
$('#startQuiz').addEventListener('click',makeQuiz);
renderCategories(); updateScore();
