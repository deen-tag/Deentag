/* ============================================================
   LUEUR — logique partagée
   ============================================================ */

const LR_FALLBACK_TIMINGS = { Fajr:"05:30", Dhuhr:"13:15", Asr:"17:00", Maghrib:"21:30", Isha:"23:15" };
const LR_PRAYER_LABELS = { Fajr:"Fajr", Dhuhr:"Dhuhr", Asr:"Asr", Maghrib:"Maghrib", Isha:"Isha" };

function lrToMinutes(hhmm){
  const [h,m] = hhmm.split(":").map(Number);
  return h*60+m;
}

function lrFormatCountdown(mins){
  const h = Math.floor(mins/60), m = mins%60;
  if(h<=0) return `${m} min`;
  return `${h} h ${String(m).padStart(2,"0")}`;
}

async function lrGetTimings(){
  try{
    const coords = await new Promise((resolve)=>{
      if(!navigator.geolocation) return resolve({lat:48.8566,lng:2.3522});
      navigator.geolocation.getCurrentPosition(
        (pos)=>resolve({lat:pos.coords.latitude,lng:pos.coords.longitude}),
        ()=>resolve({lat:48.8566,lng:2.3522}),
        {timeout:2500}
      );
    });
    const ts = Math.floor(Date.now()/1000);
    const url = `https://api.aladhan.com/v1/timings/${ts}?latitude=${coords.lat}&longitude=${coords.lng}&method=2`;
    const res = await fetch(url);
    const data = await res.json();
    const t = data.data.timings;
    return { Fajr:t.Fajr, Dhuhr:t.Dhuhr, Asr:t.Asr, Maghrib:t.Maghrib, Isha:t.Isha };
  }catch(e){
    return LR_FALLBACK_TIMINGS;
  }
}

async function lrInitHorizon(){
  const wrap = document.getElementById("lrHorizon");
  if(!wrap) return;

  const timings = await lrGetTimings();
  const now = new Date();
  const nowMin = now.getHours()*60 + now.getMinutes();

  const order = ["Fajr","Dhuhr","Asr","Maghrib","Isha"];
  const points = order.map(k=>({ key:k, min:lrToMinutes(timings[k]) }));

  // ticks
  points.forEach(p=>{
    const tick = document.createElement("div");
    tick.className = "lr-horizon-tick";
    tick.style.left = (p.min/1440*100)+"%";
    wrap.appendChild(tick);
  });

  // marker
  const marker = document.createElement("div");
  marker.className = "lr-horizon-marker";
  marker.style.left = (nowMin/1440*100)+"%";
  wrap.appendChild(marker);

  // next prayer
  let next = points.find(p=>p.min > nowMin);
  let countdownMin;
  if(next){
    countdownMin = next.min - nowMin;
  }else{
    next = points[0];
    countdownMin = (1440 - nowMin) + next.min;
  }

  const nameEl = document.getElementById("lrHorizonNext");
  const cdEl = document.getElementById("lrHorizonCountdown");
  if(nameEl) nameEl.textContent = LR_PRAYER_LABELS[next.key];
  if(cdEl) cdEl.textContent = lrFormatCountdown(countdownMin);
}

function lrInitHeroDua(){
  const arEl = document.getElementById("lrHeroArabic");
  const frEl = document.getElementById("lrHeroFr");
  const eyebrowEl = document.getElementById("lrHeroEyebrow");
  if(!arEl || typeof lrDuaOfTheMoment !== "function") return;
  const hour = new Date().getHours();
  const dua = lrDuaOfTheMoment(hour);
  if(!dua) return;
  arEl.textContent = dua.ar;
  if(frEl) frEl.textContent = dua.fr;
  if(eyebrowEl) eyebrowEl.textContent = "Invocation du moment · " + dua.name;
}

function lrInitTabs(){
  const page = document.body.dataset.page;
  document.querySelectorAll(".lr-tab").forEach(tab=>{
    tab.classList.toggle("is-active", tab.dataset.tab === page);
  });
}

function lrInitEntrance(){
  const els = document.querySelectorAll(".lr-anim");
  els.forEach((el,i)=>{
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    setTimeout(()=>{
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 80 + i*70);
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  lrInitHorizon();
  lrInitHeroDua();
  lrInitTabs();
  lrInitEntrance();
});
