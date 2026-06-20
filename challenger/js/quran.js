/* ============================================================
   LUEUR — lecteur du Coran
   Données récupérées en direct depuis l'API publique alquran.cloud
   (texte ar.uthmani + traduction fr.hamidullah). Aucune clé requise.
   ============================================================ */

const LR_REV_FR = { "Meccan":"Mecquoise", "Medinan":"Médinoise" };

let lrSurahList = [];
let lrArSize = 22;

async function lrLoadSurahList(){
  const listEl = document.getElementById("lrSurahList");
  listEl.innerHTML = '<div class="lr-loading">Chargement des sourates…</div>';
  try{
    const res = await fetch("https://api.alquran.cloud/v1/surah");
    const data = await res.json();
    lrSurahList = data.data;
    renderSurahList(lrSurahList);
  }catch(e){
    listEl.innerHTML = '<div class="lr-empty">Impossible de charger la liste des sourates pour le moment. Vérifie la connexion puis recharge la page.</div>';
  }
}

function renderSurahList(items){
  const listEl = document.getElementById("lrSurahList");
  if(!items.length){
    listEl.innerHTML = '<div class="lr-empty">Aucune sourate ne correspond à ta recherche.</div>';
    return;
  }
  listEl.innerHTML = "";
  items.forEach(s=>{
    const row = document.createElement("a");
    row.href = `quran.html?surah=${s.number}`;
    row.className = "lr-surah-row";
    row.innerHTML = `
      <div class="lr-surah-num">${s.number}</div>
      <div class="lr-surah-names">
        <div class="lr-surah-fr">${s.englishName}</div>
        <div class="lr-surah-meta">${s.numberOfAyahs} versets · ${LR_REV_FR[s.revelationType] || s.revelationType}</div>
      </div>
      <div class="lr-surah-ar">${s.name}</div>
    `;
    listEl.appendChild(row);
  });
}

function lrFilterSurahs(query){
  const q = query.trim().toLowerCase();
  if(!q) return renderSurahList(lrSurahList);
  const filtered = lrSurahList.filter(s=>
    s.englishName.toLowerCase().includes(q) ||
    String(s.number).includes(q)
  );
  renderSurahList(filtered);
}

async function lrLoadReader(num){
  document.getElementById("lrSurahListView").style.display = "none";
  const readerView = document.getElementById("lrReaderView");
  readerView.style.display = "block";
  const versesEl = document.getElementById("lrVerses");
  versesEl.innerHTML = '<div class="lr-loading">Chargement de la sourate…</div>';

  try{
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${num}/editions/quran-uthmani,fr.hamidullah`);
    const data = await res.json();
    const arEdition = data.data.find(e=>e.edition.identifier === "quran-uthmani");
    const frEdition = data.data.find(e=>e.edition.identifier === "fr.hamidullah");

    document.getElementById("lrReaderTitle").textContent = `${arEdition.englishName} · ${arEdition.name}`;

    versesEl.innerHTML = "";
    arEdition.ayahs.forEach((ayah, i)=>{
      const frText = frEdition ? frEdition.ayahs[i].text : "";
      const block = document.createElement("div");
      block.className = "lr-verse";
      block.innerHTML = `
        <p class="lr-verse-ar" style="font-size:${lrArSize}px">${ayah.text}<span class="lr-vnum">${ayah.numberInSurah}</span></p>
        <p class="lr-verse-fr">${frText}</p>
      `;
      versesEl.appendChild(block);
    });
  }catch(e){
    versesEl.innerHTML = '<div class="lr-empty">Impossible de charger cette sourate pour le moment. Vérifie la connexion puis réessaie.</div>';
  }
}

function lrCloseReader(){
  document.getElementById("lrReaderView").style.display = "none";
  document.getElementById("lrSurahListView").style.display = "block";
  history.pushState({}, "", "quran.html");
}

function lrAdjustFont(delta){
  lrArSize = Math.max(16, Math.min(34, lrArSize + delta));
  document.querySelectorAll(".lr-verse-ar").forEach(el=>{
    el.style.fontSize = lrArSize + "px";
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  lrLoadSurahList();

  const params = new URLSearchParams(location.search);
  const surahNum = params.get("surah");
  if(surahNum) lrLoadReader(surahNum);

  document.getElementById("lrSearchInput").addEventListener("input", (e)=>{
    lrFilterSurahs(e.target.value);
  });
  document.getElementById("lrFontMinus").addEventListener("click", ()=>lrAdjustFont(-2));
  document.getElementById("lrFontPlus").addEventListener("click", ()=>lrAdjustFont(2));
  document.getElementById("lrBackBtn").addEventListener("click", lrCloseReader);
});
