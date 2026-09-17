const CACHE = "bolajonlar-v10";
const FILES = ["./", "./index.html", "./style.css", "./app.js", "./manifest.json", "./service-worker.js", "./assets/icons/harflar.png", "./assets/icons/logo.png", "./assets/icons/mevalar .png", "./assets/icons/quiz.png", "./assets/icons/ranglar.png", "./assets/icons/reyting.png", "./assets/icons/shakllar.png", "./assets/icons/sonlar.png", "./assets/icons/tabiat.png", "./assets/icons/tana azolar.png", "./assets/icons/transport.png", "./assets/icons/vaqt.png", "./assets/illustrations/ai/ai-spark.png", "./assets/illustrations/ai/ai.png", "./assets/illustrations/body/Bosh.jpg", "./assets/illustrations/body/Burun.jpg", "./assets/illustrations/body/D", "./assets/illustrations/body/Ko‘z.jpg", "./assets/illustrations/body/Og‘iz.jpg", "./assets/illustrations/body/Oyoq.jpg", "./assets/illustrations/body/Qo‘l.jpg", "./assets/illustrations/body/Quloq.jpg", "./assets/illustrations/colors/Bejrang .jpg", "./assets/illustrations/colors/Kulrang.jpg", "./assets/illustrations/colors/T", "./assets/illustrations/colors/binafsha.jpg", "./assets/illustrations/colors/havorang.jpg", "./assets/illustrations/colors/jigarrang.jpg", "./assets/illustrations/colors/koralrang.jpg", "./assets/illustrations/colors/ko‘k.jpg", "./assets/illustrations/colors/kumushrang.jpg", "./assets/illustrations/colors/oltinrang.jpg", "./assets/illustrations/colors/oq.jpg", "./assets/illustrations/colors/osmonrang.jpg", "./assets/illustrations/colors/pushti.jpg", "./assets/illustrations/colors/qizil.jpg", "./assets/illustrations/colors/qora.jpg", "./assets/illustrations/colors/sariq.jpg", "./assets/illustrations/colors/to‘q sarie.jpg", "./assets/illustrations/colors/to‘qkok.jpg", "./assets/illustrations/colors/turkuazrang.jpg", "./assets/illustrations/colors/yashil.jpg", "./assets/illustrations/colors/zangori.jpg", "./assets/illustrations/exercises/exercise.png", "./assets/illustrations/exercises/success.png", "./assets/illustrations/exercises/target.png", "./assets/illustrations/exercises/try-again.png", "./assets/illustrations/fruits/O‘rik.jpg", "./assets/illustrations/fruits/S", "./assets/illustrations/fruits/ananas.jpg", "./assets/illustrations/fruits/anor.jpg", "./assets/illustrations/fruits/apilsin.jpg", "./assets/illustrations/fruits/banan.jpg", "./assets/illustrations/fruits/behi.jpg", "./assets/illustrations/fruits/kivi.jpg", "./assets/illustrations/fruits/limon.jpg", "./assets/illustrations/fruits/nok.jpg", "./assets/illustrations/fruits/olcha.jpg", "./assets/illustrations/fruits/olma.jpg", "./assets/illustrations/fruits/olxo‘ri.jpg", "./assets/illustrations/fruits/qovun.jpg", "./assets/illustrations/fruits/qulupnay.jpg", "./assets/illustrations/fruits/tarvuz.jpg", "./assets/illustrations/fruits/uzum.jpg", "./assets/illustrations/fruits/xurmo.jpg", "./assets/illustrations/letters/E", "./assets/illustrations/letters/a.jpg", "./assets/illustrations/letters/b.jpg", "./assets/illustrations/letters/ch.jpg", "./assets/illustrations/letters/d.jpg", "./assets/illustrations/letters/e.jpg", "./assets/illustrations/letters/f.jpg", "./assets/illustrations/letters/g.jpg", "./assets/illustrations/letters/g‘.jpg", "./assets/illustrations/letters/h.jpg", "./assets/illustrations/letters/i1.jpg", "./assets/illustrations/letters/j.jpg", "./assets/illustrations/letters/k.jpg", "./assets/illustrations/letters/l.jpg", "./assets/illustrations/letters/m.jpg", "./assets/illustrations/letters/n.jpg", "./assets/illustrations/letters/ng.jpg", "./assets/illustrations/letters/o.jpg", "./assets/illustrations/letters/o‘.jpg", "./assets/illustrations/letters/p.jpg", "./assets/illustrations/letters/q.jpg", "./assets/illustrations/letters/r.jpg", "./assets/illustrations/letters/s.jpg", "./assets/illustrations/letters/sh.jpg", "./assets/illustrations/letters/t.jpg", "./assets/illustrations/letters/u.jpg", "./assets/illustrations/letters/v.jpg", "./assets/illustrations/letters/x.jpg", "./assets/illustrations/letters/y.jpg", "./assets/illustrations/letters/z.jpg", "./assets/illustrations/nature/Ormon.jpg", "./assets/illustrations/nature/Oyva yulduzlar.jpg", "./assets/illustrations/nature/R", "./assets/illustrations/nature/bulut.jpg", "./assets/illustrations/nature/daraxt.jpg", "./assets/illustrations/nature/daryo.jpg", "./assets/illustrations/nature/dengiz.jpg", "./assets/illustrations/nature/gul.jpg", "./assets/illustrations/nature/kamalak.jpg", "./assets/illustrations/nature/olov.jpg", "./assets/illustrations/nature/o‘tloq.jpg", "./assets/illustrations/nature/qor.jpg", "./assets/illustrations/nature/quyosh.jpg", "./assets/illustrations/nature/shamol.jpg", "./assets/illustrations/nature/tog‘.jpg", "./assets/illustrations/nature/yomgir.jpg", "./assets/illustrations/numbers/1.jpg", "./assets/illustrations/numbers/10.jpg", "./assets/illustrations/numbers/2.jpg", "./assets/illustrations/numbers/3.jpg", "./assets/illustrations/numbers/4.jpg", "./assets/illustrations/numbers/5.jpg", "./assets/illustrations/numbers/6.jpg", "./assets/illustrations/numbers/7.jpg", "./assets/illustrations/numbers/8.jpg", "./assets/illustrations/numbers/9.jpg", "./assets/illustrations/numbers/G", "./assets/illustrations/numbers/R", "./assets/illustrations/progress/chart.png", "./assets/illustrations/progress/progress.png", "./assets/illustrations/progress/statistics.png", "./assets/illustrations/pwa/install-app.png", "./assets/illustrations/pwa/offline.png", "./assets/illustrations/pwa/update.png", "./assets/illustrations/ranking/first-place.png", "./assets/illustrations/ranking/second-place.png", "./assets/illustrations/ranking/third-place.png", "./assets/illustrations/rewards/badge.png", "./assets/illustrations/rewards/crown.png", "./assets/illustrations/rewards/gift.png", "./assets/illustrations/rewards/medal.png", "./assets/illustrations/rewards/trophy.png", "./assets/illustrations/score/ball.png", "./assets/illustrations/score/star-reward.png", "./assets/illustrations/score/xp.png", "./assets/illustrations/shapes/@", "./assets/illustrations/shapes/Doira.jpg", "./assets/illustrations/shapes/Kvadrat.jpg", "./assets/illustrations/shapes/Oval.jpg", "./assets/illustrations/shapes/To'rtburchak.jpg", "./assets/illustrations/shapes/Uchburchak.jpg", "./assets/illustrations/shapes/Yulduz.jpg", "./assets/illustrations/streak/calendar-streak.png", "./assets/illustrations/streak/fire-streak.png", "./assets/illustrations/streak/streak.png", "./assets/illustrations/time/R", "./assets/illustrations/time/chizma soat.jpg", "./assets/illustrations/time/kalendar.jpg", "./assets/illustrations/time/kun va tun.jpg", "./assets/illustrations/time/qum soat.jpg", "./assets/illustrations/time/sana.jpg", "./assets/illustrations/time/sekundomer.jpg", "./assets/illustrations/time/soat.jpg", "./assets/illustrations/time/soat1.jpg", "./assets/illustrations/transport/A", "./assets/illustrations/transport/avtobus.jpg", "./assets/illustrations/transport/avtomobil.jpg", "./assets/illustrations/transport/havoshari.jpg", "./assets/illustrations/transport/kema.jpg", "./assets/illustrations/transport/mototsikl.jpg", "./assets/illustrations/transport/politsiyamashinasi.jpg", "./assets/illustrations/transport/poyezd.jpg", "./assets/illustrations/transport/samalyot.jpg", "./assets/illustrations/transport/samasval.jpg", "./assets/illustrations/transport/tezyordam.jpg", "./assets/illustrations/transport/traktor.jpg", "./assets/illustrations/transport/velosiped.jpg", "./assets/illustrations/transport/vertalyot.jpg", "./assets/illustrations/transport/yaxta.jpg", "./assets/illustrations/transport/yonginmashinasi.jpg", "./assets/pwa/icon-192.png", "./assets/pwa/icon-512.png"];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(FILES.map(async file => {
      try { await cache.add(file); } catch (e) {}
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req);
    if (cached) return cached;
    try {
      const response = await fetch(req);
      if (response && response.ok) cache.put(req, response.clone());
      return response;
    } catch (e) {
      if (req.mode === "navigate") {
        const fallback = await cache.match("./index.html");
        if (fallback) return fallback;
      }
      return new Response("Offline", {status:503,statusText:"Offline"});
    }
  })());
});
