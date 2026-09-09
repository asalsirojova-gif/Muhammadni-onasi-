const L={"letters": ["a.jpg", "b.jpg", "ch.jpg", "d.jpg", "e.jpg", "f.jpg", "g.jpg", "g‘.jpg", "h.jpg", "i1.jpg", "j.jpg", "k.jpg", "l.jpg", "m.jpg", "n.jpg", "ng.jpg", "o.jpg", "o‘.jpg", "p.jpg", "q.jpg", "r.jpg", "s.jpg", "sh.jpg", "t.jpg", "u.jpg", "v.jpg", "x.jpg", "y.jpg", "z.jpg"], "numbers": ["1.jpg", "10.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"], "colors": ["Bejrang .jpg", "binafsha.jpg", "havorang.jpg", "jigarrang.jpg", "koralrang.jpg", "ko‘k.jpg", "Kulrang.jpg", "kumushrang.jpg", "oltinrang.jpg", "oq.jpg", "osmonrang.jpg", "pushti.jpg", "qizil.jpg", "qora.jpg", "sariq.jpg", "to‘q sarie.jpg", "to‘qkok.jpg", "turkuazrang.jpg", "yashil.jpg", "zangori.jpg"], "fruits": ["ananas.jpg", "anor.jpg", "apilsin.jpg", "banan.jpg", "behi.jpg", "kivi.jpg", "limon.jpg", "nok.jpg", "olcha.jpg", "olma.jpg", "olxo‘ri.jpg", "O‘rik.jpg", "qovun.jpg", "qulupnay.jpg", "tarvuz.jpg", "uzum.jpg", "xurmo.jpg"], "body": ["Bosh.jpg", "Burun.jpg", "Ko‘z.jpg", "Og‘iz.jpg", "Oyoq.jpg", "Qo‘l.jpg", "Quloq.jpg"], "shapes": ["Doira.jpg", "Kvadrat.jpg", "Oval.jpg", "To'rtburchak.jpg", "Uchburchak.jpg", "Yulduz.jpg"], "nature": ["bulut.jpg", "daraxt.jpg", "daryo.jpg", "dengiz.jpg", "gul.jpg", "kamalak.jpg", "olov.jpg", "Ormon.jpg", "Oyva yulduzlar.jpg", "o‘tloq.jpg", "qor.jpg", "quyosh.jpg", "shamol.jpg", "tog‘.jpg", "yomgir.jpg"], "time": ["chizma soat.jpg", "kalendar.jpg", "kun va tun.jpg", "qum soat.jpg", "sana.jpg", "sekundomer.jpg", "soat.jpg", "soat1.jpg"], "transport": ["avtobus.jpg", "avtomobil.jpg", "havoshari.jpg", "kema.jpg", "mototsikl.jpg", "politsiyamashinasi.jpg", "poyezd.jpg", "samalyot.jpg", "samasval.jpg", "tezyordam.jpg", "traktor.jpg", "velosiped.jpg", "vertalyot.jpg", "yaxta.jpg", "yonginmashinasi.jpg"]},N={"letters": "Harflar", "numbers": "Sonlar", "colors": "Ranglar", "fruits": "Mevalar", "body": "Tana a'zolari", "shapes": "Shakllar", "nature": "Tabiat", "time": "Vaqt", "transport": "Transport"},I={"letters": "harflar.png", "numbers": "sonlar.png", "colors": "ranglar.png", "fruits": "mevalar .png", "body": "tana azolar.png", "shapes": "shakllar.png", "nature": "tabiat.png", "time": "vaqt.png", "transport": "transport.png"};const $=s=>document.querySelector(s);let cat=null,items=[],qi=0,qs=0,dp=null;
const name=f=>f.replace(/\.[^.]+$/,'').replace(/[_-]+/g,' ').trim();
function speak(t){if(!speechSynthesis)return toast("Ovoz mavjud emas");speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(t);u.lang='uz-UZ';u.rate=.82;speechSynthesis.speak(u)}
function toast(t){let x=$('#toast');x.textContent=t;x.classList.add('show');clearTimeout(x._t);x._t=setTimeout(()=>x.classList.remove('show'),2200)}
function view(v){document.querySelectorAll('.view').forEach(x=>x.classList.toggle('active',x.id===v));if(v==='ranking')rank();scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>view(b.dataset.v));
function render(){for(const id of ['homeCats','lessonCats']){let box=$('#'+id);box.innerHTML='';for(const c of Object.keys(L)){let b=document.createElement('button');b.className='cat';b.innerHTML=`<img src="assets/icons/${I[c]}"><b>${N[c]}</b>`;b.onclick=()=>open(c);box.append(b)}}}
function open(c){cat=c;$('#menu').hidden=true;$('#lesson').hidden=false;$('#lt').textContent=N[c];let box=$('#cards');box.innerHTML='';L[c].forEach(f=>{let n=name(f),a=document.createElement('article');a.className='card';a.innerHTML=`<img src="assets/illustrations/${c}/${f}"><b>${n}</b><small>🔊 Eshitish uchun bosing</small>`;a.onclick=()=>speak(n);box.append(a)});view('lessons')}
$('#back').onclick=()=>{$ ('#lesson').hidden=true;$('#menu').hidden=false;scrollTo(0,0)};$('#allSpeak').onclick=()=>cat&&speak(L[cat].map(name).join('. '));
const all=()=>Object.entries(L).flatMap(([c,fs])=>fs.map(f=>({c,f,n:name(f)})));const sh=a=>{a=[...a];for(let i=a.length-1;i;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
$('#start').onclick=()=>{items=sh(all()).slice(0,10);qi=0;qs=0;$('#qstart').hidden=true;$('#qend').hidden=true;$('#qgame').hidden=false;q()};
function q(){if(qi>=items.length)return end();let x=items[qi];$('#num').textContent=`${qi+1} / 10`;$('#score').textContent=qs+' ball';$('#bar').style.width=((qi+1)*10)+'%';$('#qimg').src=`assets/illustrations/${x.c}/${x.f}`;$('#feed').textContent='';let opts=sh([x,...sh(all().filter(y=>y.n!==x.n)).slice(0,3)]),box=$('#opts');box.innerHTML='';opts.forEach(o=>{let b=document.createElement('button');b.textContent=o.n;b.onclick=()=>ans(b,o.n===x.n,x.n);box.append(b)})}
function ans(b,ok,right){let bs=[...document.querySelectorAll('#opts button')];bs.forEach(x=>x.disabled=true);if(ok){b.classList.add('ok');qs+=10;$('#feed').textContent='🎉 To‘g‘ri! +10 ball'}else{b.classList.add('no');bs.find(x=>x.textContent===right)?.classList.add('ok');$('#feed').textContent='😊 To‘g‘ri javob: '+right}speak(ok?'To‘g‘ri':'To‘g‘ri javob '+right);$('#score').textContent=qs+' ball';setTimeout(()=>{qi++;q()},1100)}
function end(){$('#qgame').hidden=true;$('#qend').hidden=false;$('#final').textContent=qs+' / 100';$('#msg').textContent=qs>=90?'🌟 Ajoyib natija!':qs>=60?'👏 Juda yaxshi!':'💜 Yana urinib ko‘ring!';localStorage.setItem('best',Math.max(+(localStorage.getItem('best')||0),qs));speak('Quiz tugadi. Siz '+qs+' ball oldingiz.')}
$('#again').onclick=()=>$('#start').click();$('#rank').onclick=()=>view('ranking');function rank(){let s=+(localStorage.getItem('best')||0);$('#best').textContent=s;$('#rt').textContent=s?'Eng yaxshi natijangiz shu!':'Quizni ishlab natijangizni ko‘ring!'}
addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  dp = e;
  $('#install').hidden = false;
});
$('#install').onclick = async () => {
  if (dp) {
    dp.prompt();
    await dp.userChoice;
    dp = null;
    $('#install').hidden = true;
  } else {
    toast("Brauzer menyusidan Ilovani o'rnatish ni tanlang");
  }
};if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js'));render();
rank();
const hideSplash = () => $('#splash')?.classList.add('hide');
setTimeout(hideSplash, 700);
window.addEventListener('load', () => setTimeout(hideSplash, 300));