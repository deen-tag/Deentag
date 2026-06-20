/* ============================================================
   LUEUR — contenu des invocations
   Sélection de duas authentiques et largement reconnues.
   Traductions reformulées (texte original, pas de copie d'une
   traduction publiée).
   ============================================================ */

const LR_CATEGORIES = [
  { id: "matin-soir", name: "Matin & Soir", glyph: "☼" },
  { id: "repas",      name: "Repas",        glyph: "◑" },
  { id: "voyage",     name: "Voyage",       glyph: "↗" },
  { id: "sommeil",    name: "Sommeil",      glyph: "☾" },
  { id: "maison",     name: "Maison",       glyph: "⌂" },
  { id: "epreuves",   name: "Épreuves",     glyph: "✦" },
  { id: "mosquee",    name: "Mosquée",      glyph: "▲" },
  { id: "pluie",      name: "Pluie",        glyph: "≈" },
];

const LR_DUAS = [
  {
    id:"matin-1", cat:"matin-soir", name:"Au réveil du matin",
    ar:"اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَحْيَيْنَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
    phon:"Allâhumma bika asbahnâ, wa bika ahyaynâ, wa bika namûtu, wa ilayka-l-masîr",
    fr:"Ô Allah, c'est par Toi que nous entrons dans ce matin, par Toi que nous vivons, par Toi que nous mourrons, et c'est vers Toi que tout retourne.",
    src:"Hadith"
  },
  {
    id:"matin-2", cat:"matin-soir", name:"À la tombée du soir",
    ar:"اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
    phon:"Allâhumma bika amsaynâ, wa bika asbahnâ, wa bika nahyâ, wa bika namûtu, wa ilayka-l-masîr",
    fr:"Ô Allah, c'est par Toi que nous entrons dans ce soir, par Toi que nous vivons et mourrons, et c'est vers Toi que tout retourne.",
    src:"Hadith"
  },
  {
    id:"repas-1", cat:"repas", name:"Avant de manger",
    ar:"بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    phon:"Bismillâhi wa 'alâ barakati-Llâh",
    fr:"Au nom d'Allah, et avec la bénédiction d'Allah.",
    src:"Hadith"
  },
  {
    id:"repas-2", cat:"repas", name:"Après le repas",
    ar:"الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    phon:"Al-hamdu lillâhi-l-ladhî at'amanî hâdhâ, wa razaqanîhi min ghayri hawlin minnî wa lâ qûwwah",
    fr:"Louange à Allah qui m'a nourri de ceci et me l'a accordé sans qu'aucune force ni capacité ne vienne de moi.",
    src:"Hadith"
  },
  {
    id:"voyage-1", cat:"voyage", name:"Au départ d'un voyage",
    ar:"سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    phon:"Subhâna-l-ladhî sakhkhara lanâ hâdhâ wa mâ kunnâ lahu muqrinîn, wa innâ ilâ Rabbinâ lamunqalibûn",
    fr:"Gloire à Celui qui a mis ce moyen à notre service, nous n'aurions pu le maîtriser par nous-mêmes ; c'est vers notre Seigneur que nous retournerons.",
    src:"Coran 43:13-14"
  },
  {
    id:"voyage-2", cat:"voyage", name:"Pendant le trajet",
    ar:"اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ",
    phon:"Allâhumma anta-s-sâhibu fî-s-safar, wa-l-khalîfatu fî-l-ahl",
    fr:"Ô Allah, Tu es mon compagnon durant ce voyage et le gardien de ceux que je laisse derrière moi.",
    src:"Hadith"
  },
  {
    id:"sommeil-1", cat:"sommeil", name:"Avant de dormir",
    ar:"بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    phon:"Bismika Allâhumma amûtu wa ahyâ",
    fr:"C'est en Ton nom, ô Allah, que je meurs et que je vis.",
    src:"Hadith"
  },
  {
    id:"sommeil-2", cat:"sommeil", name:"Au réveil",
    ar:"الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    phon:"Al-hamdu lillâhi-l-ladhî ahyânâ ba'da mâ amâtanâ wa ilayhi-n-nushûr",
    fr:"Louange à Allah qui nous a redonné la vie après cette petite mort qu'est le sommeil ; c'est vers Lui que nous serons ramenés.",
    src:"Hadith"
  },
  {
    id:"maison-1", cat:"maison", name:"En entrant chez soi",
    ar:"بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
    phon:"Bismillâhi walajnâ, wa bismillâhi kharajnâ, wa 'alâ Rabbinâ tawakkalnâ",
    fr:"Au nom d'Allah nous entrons, au nom d'Allah nous sortons, et c'est sur notre Seigneur que nous nous reposons.",
    src:"Hadith"
  },
  {
    id:"maison-2", cat:"maison", name:"En sortant de chez soi",
    ar:"بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    phon:"Bismillâh, tawakkaltu 'ala-Llâh, wa lâ hawla wa lâ qûwwata illâ bi-Llâh",
    fr:"Au nom d'Allah, je place ma confiance en Allah ; il n'y a de force ni de puissance qu'en Allah.",
    src:"Hadith"
  },
  {
    id:"epreuves-1", cat:"epreuves", name:"Face à une difficulté",
    ar:"حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    phon:"Hasbuna-Llâhu wa ni'ma-l-wakîl",
    fr:"Allah nous suffit, Il est le meilleur garant.",
    src:"Coran 3:173"
  },
  {
    id:"epreuves-2", cat:"epreuves", name:"Dans la détresse",
    ar:"لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    phon:"Lâ ilâha illâ anta subhânaka innî kuntu mina-z-zâlimîn",
    fr:"Il n'y a de divinité que Toi, gloire à Toi, j'ai vraiment été injuste envers moi-même.",
    src:"Coran 21:87"
  },
  {
    id:"mosquee-1", cat:"mosquee", name:"En entrant à la mosquée",
    ar:"اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    phon:"Allâhumma-ftah lî abwâba rahmatik",
    fr:"Ô Allah, ouvre-moi les portes de Ta miséricorde.",
    src:"Hadith"
  },
  {
    id:"mosquee-2", cat:"mosquee", name:"En sortant de la mosquée",
    ar:"اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    phon:"Allâhumma innî as'aluka min fadlik",
    fr:"Ô Allah, je Te demande de Ta grâce.",
    src:"Hadith"
  },
  {
    id:"pluie-1", cat:"pluie", name:"À la vue de la pluie",
    ar:"اللَّهُمَّ صَيِّبًا نَافِعًا",
    phon:"Allâhumma sayyiban nâfi'â",
    fr:"Ô Allah, fais que ce soit une pluie bénéfique.",
    src:"Hadith"
  },
  {
    id:"pluie-2", cat:"pluie", name:"Après la pluie",
    ar:"مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ",
    phon:"Mutirnâ bi-fadli-Llâhi wa rahmatih",
    fr:"Nous avons reçu la pluie par la grâce et la miséricorde d'Allah.",
    src:"Hadith"
  },
];

/* dua mise en avant sur l'accueil, selon le moment de la journée */
function lrDuaOfTheMoment(hour){
  if(hour>=5 && hour<11)  return LR_DUAS.find(d=>d.id==="matin-1");
  if(hour>=11 && hour<16) return LR_DUAS.find(d=>d.id==="epreuves-1");
  if(hour>=16 && hour<20) return LR_DUAS.find(d=>d.id==="matin-2");
  return LR_DUAS.find(d=>d.id==="sommeil-1");
}
