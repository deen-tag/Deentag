// ===== DEENTAG — DUAS.JS — SOURCE UNIQUE DE VÉRITÉ =====
// Toute modification de contenu se fait ICI uniquement.
// Structure : DUAS[page][accId] = { titre, arabe, phonetique, traduction, hadith, audio }
// Pour les sunnahs : { titre, sunnah: true, items: [...] }

var DUAS = {

  // ===========================
  // REPAS
  // ===========================
  repas: {
    meta: {
      icon: 'images/repas.webp',
      titre:       { fr: 'Repas',   en: 'Meals',  es: 'Comidas' , de: 'Mahlzeiten', it: 'Pasti', nl: 'Maaltijden', pt: 'Refeições', tr: 'Yemekler'},
      closingDua:  { fr: 'Que ton repas soit béni', en: 'May your meal be blessed', es: 'Que tu comida sea bendecida' , de: 'Möge deine Mahlzeit gesegnet sein', it: 'Che il tuo pasto sia benedetto', nl: 'Moge je maaltijd gezegend zijn', pt: 'Que a sua refeição seja abençoada', tr: 'Yemeğin bereketli olsun'}
    },
    acc1: {
      titre: {
        fr: 'AVANT DE COMMENCER À MANGER',
        en: 'BEFORE EATING',
        es: 'ANTES DE COMER'
      , de: 'VOR DEM ESSEN', it: 'PRIMA DI MANGIARE', nl: 'VOOR HET ETEN', pt: 'ANTES DE COMER', tr: 'YEMEKTEN ÖNCE'},
      arabe: 'بِسْمِ اللَّهِ',
      phonetique: { fr: 'Bismillâh', en: 'Bismillaah', es: 'Bismilláh', de: 'Bismillâh', it: 'Bismillāh', nl: 'Bismillâh', pt: 'Bismillāh', tr: 'Besmele' },
      traduction: {
        fr: 'Au nom d\'Allah',
        en: 'In the name of Allah',
        es: 'En el nombre de Allah',
        de: 'Im Namen Allahs',
        it: 'Nel nome di Allah',
        nl: 'In de naam van Allah',
        pt: 'Em nome de Allah',
        tr: 'Allah\'ın adıyla'
      },
      hadith: {
        fr: 'D\'après \'Umar ibn Abî Salamah (qu\'Allah l\'agrée) : « Le Messager d\'Allah ﷺ m\'a dit : "Prononce le nom d\'Allah, mange avec ta main droite et mange de ce qui est devant toi." »\nSource : Sahih al-Bukhârî (5376) · Sahih Muslim (2022)',
        en: 'Narrated \'Umar ibn Abi Salama (may Allah be pleased with him): \"The Messenger of Allah ﷺ said to me: \'Mention the name of Allah, eat with your right hand, and eat from what is in front of you.\'\"\nSource: Sahih al-Bukhari (5376) · Sahih Muslim (2022)',
        es: 'Narrado por \'Umar ibn Abî Salamah (que Allah esté complacido con él): «El Mensajero de Allah ﷺ me dijo: "Menciona el nombre de Allah, come con tu mano derecha y come de lo que tienes delante."»\nFuente: Sahih al-Bujari (5376) · Sahih Muslim (2022)'
      , de: 'Überliefert von \'Umar ibn Abî Salamah (möge Allah mit ihm zufrieden sein): „Der Gesandte Allahs ﷺ sagte zu mir: \'Nenn den Namen Allahs, iss mit deiner rechten Hand und iss von dem, was vor dir ist.\'“\nQuelle: Sahih al-Bukhârî (5376) · Sahih Muslim (2022)', it: 'Riportato da \'Umar ibn Abî Salamah (che Allah sia soddisfatto di lui): «Il Messaggero di Allah ﷺ mi disse: "Menziona il nome di Allah, mangia con la mano destra e mangia da ciò che hai davanti."»\nFonte: Sahih al-Bukhârî (5376) · Sahih Muslim (2022)', nl: 'Overgeleverd door \'Umar ibn Abî Salamah (moge Allah tevreden met hem zijn): "De Boodschapper van Allah ﷺ zei: \'Noem de naam van Allah, eet met je rechterhand en eet van wat voor je staat.\'"\nBron: Sahih al-Bukhârî (5376) · Sahih Muslim (2022)', pt: 'Narrado por \'Umar ibn Abî Salamah (que Allah esteja satisfeito com ele): «O Mensageiro de Allah ﷺ disse-me: "Menciona o nome de Allah, come com a mão direita e come do que está à tua frente."»\nFonte: Sahih al-Bukhârî (5376) · Sahih Muslim (2022)', tr: '\'Ömer b. Ebî Seleme\'den (Allah ondan razı olsun) rivayet edilmiştir: "Allah\'ın Rasûlü ﷺ bana: \'Allah\'ın adını zikret, sağ elinle ye ve önündekinden ye.\' dedi."\nKaynak: Sahihu\'l-Buhârî (5376) · Sahih Muslim (2022)'},
      audio: 'repas1.mp3',
      sheet: { sub_fr: 'Bismillah', sub_en: 'Bismillah', sub_es: 'Bismillah', sub_de: 'Bismillah', sub_it: 'Bismillah', sub_nl: 'Bismillaah', sub_pt: 'Bismillah', sub_tr: 'Bismillah' }
    },
    acc2: {
      titre: {
        fr: 'SI OUBLI DE DIRE BISMILLAH AU DÉBUT',
        en: 'IF YOU FORGET BISMILLAH AT THE START',
        es: 'SI OLVIDAS DECIR BISMILLAH AL INICIO'
      , de: 'WENN DU BISMILLAH AM ANFANG VERGISST', it: 'SE DIMENTICHI IL BISMILLAH ALL\'INIZIO', nl: 'ALS JE BISMILLAH AAN HET BEGIN VERGEET', pt: 'SE ESQUECERES O BISMILLAH NO INÍCIO', tr: 'BAŞTA BİSMİLLAH SÖYLEMEYI UNUTURSAN'},
      arabe: 'بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ',
      phonetique: {
        fr: 'Bismillâhi awwalahû wa âkhirahû',
        en: 'Bismillaahi awwalahu wa aakhirahu',
        es: 'Bismilláhi awwalahu wa ájirah'
      , de: 'Bismillâhi awwalahu wa âkhirahu', it: 'Bismillāhi awwalahu wa ākhirahu', nl: 'Bismillaahi awwalahu wa aakhirahu', pt: 'Bismillāhi awwalahu wa ākhirahu', tr: 'Bismillâhi evvelehû ve âhirahu'},
      traduction: {
        fr: 'Au nom d\'Allah au début et à la fin',
        en: 'In the name of Allah, at the beginning and at the end',
        es: 'En el nombre de Allah, al principio y al final'
      , de: 'Im Namen Allahs, am Anfang und am Ende', it: 'Nel nome di Allah, all\'inizio e alla fine', nl: 'In de naam van Allah, aan het begin en aan het einde', pt: 'Em nome de Allah, no início e no fim', tr: 'Allah\'ın adıyla, başında ve sonunda'},
      hadith: {
        fr: 'D\'après \'Â\'ishah (qu\'Allah l\'agrée), le Prophète ﷺ a dit : « Lorsque l\'un de vous mange, qu\'il mentionne le nom d\'Allah au début. S\'il oublie, qu\'il dise : Bismillâhi awwalahu wa âkhirahu. »\nSource : Sunan Abu Daoud (3767) · Tirmidhi (1858)',
        en: 'Narrated \'A\'ishah (may Allah be pleased with her), the Prophet ﷺ said: \"When one of you eats, let him mention the name of Allah at the beginning. If he forgets, let him say: Bismillaahi awwalahu wa aakhirahu.\"\nSource: Sunan Abu Dawud (3767) · Tirmidhi (1858)',
        es: 'Narrado por \'Â\'ishah (que Allah esté complacida con ella), el Profeta ﷺ dijo: «Cuando alguno de vosotros coma, que mencione el nombre de Allah al principio. Si olvida, que diga: Bismilláhi awwalahu wa ájirah.»\nFuente: Sunan Abu Daoud (3767) · Tirmidhi (1858)'
      , de: 'Überliefert von \'Â\'isha (möge Allah mit ihr zufrieden sein), der Prophet ﷺ sagte: „Wenn einer von euch isst, soll er am Anfang den Namen Allahs nennen. Vergisst er es, soll er sagen: Bismillâhi awwalahu wa âkhirahu.“\nQuelle: Sunan Abî Dâwûd (3767) · Tirmidhi (1858)', it: 'Riportato da \'Â\'isha (che Allah sia soddisfatta di lei), il Profeta ﷺ disse: «Quando uno di voi mangia, menzioni il nome di Allah all\'inizio. Se lo dimentica, dica: Bismillāhi awwalahu wa ākhirahu.»\nFonte: Sunan Abî Dâwûd (3767) · Tirmidhi (1858)', nl: 'Overgeleverd door \'Â\'isha (moge Allah tevreden met haar zijn), de Profeet ﷺ zei: "Wanneer een van jullie eet, laat hem de naam van Allah noemen aan het begin. Als hij het vergeet: Bismillaahi awwalahu wa aakhirahu."\nBron: Sunan Abî Dâwûd (3767) · Tirmidhi (1858)', pt: 'Narrado por \'Â\'isha (que Allah esteja satisfeito com ela), o Profeta ﷺ disse: «Quando um de vós comer, que mencione o nome de Allah no início. Se esquecer: Bismillāhi awwalahu wa ākhirahu.»\nFonte: Sunan Abî Dâwûd (3767) · Tirmidhi (1858)', tr: '\'Âişe\'den (Allah ondan razı olsun) rivayet edilmiştir; Peygamber ﷺ şöyle buyurdu: "Biriniz yemek yediğinde başında Allah\'ın adını zikretsin. Unutursa: Bismillâhi evvelehû ve âhirahu desin."\nKaynak: Sünen-i Ebî Dâvûd (3767) · Tirmizî (1858)'},
      audio: 'repas2.mp3',
      sheet: { sub_fr: 'Si tu oublies', sub_en: 'If forgotten', sub_es: 'Si olvidaste', sub_de: 'Falls vergessen', sub_it: 'Se dimenticato', sub_nl: 'Als vergeten', sub_pt: 'Se esquecido', sub_tr: 'Unutulursa' }
    },
    acc3: {
      titre: {
        fr: 'APRÈS AVOIR FINI DE MANGER',
        en: 'AFTER FINISHING THE MEAL',
        es: 'DESPUÉS DE TERMINAR DE COMER'
      , de: 'NACH DEM ESSEN', it: 'DOPO AVER MANGIATO', nl: 'NA HET ETEN', pt: 'DEPOIS DE COMER', tr: 'YEMEKTEN SONRA'},
      arabe: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
      phonetique: {
        fr: 'Al-hamdu lil-lâhi lladhî at\'amanî hâdhâ wa razaqanîhi min ghayri hawlin minnî wa lâ quwwatin',
        en: 'Al-hamdu lillaahil-lathee at-\'amanee haathaa wa razaqaneehi min ghayri hawlin minnee wa laa quwwatin',
        es: 'Al-hamdu lilláhil-lathí at-\'amaní hátha wa razaqaníhi min gáiri hawlin minní wa lá qúwwatin'
      , de: 'Al-hamdu lil-lâhi lladhî at\'amanî hâdhâ wa razaqanîhi min ghayri hawlin minnî wa lâ quwwatin', it: 'Al-ḥamdu lillāhi lladhī at\'amanī hādhā wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwatin', nl: 'Al-hamdu lillaahil-lathee at-\'amanee haathaa wa razaqaneehi min ghayri hawlin minnee wa laa quwwatin', pt: 'Al-hamdu lillāhi lladhī at\'amanī hādhā wa razaqanīhi min ghayri hawlin minnī wa lā quwwatin', tr: 'Elhamdü lillâhillezî et\'amenî hâzâ ve razakanîhi min gayri havlin minnî ve lâ kuvvetin'},
      traduction: {
        fr: 'Louange à Allah qui m\'a nourri de ceci et me l\'a accordé sans force ni puissance de ma part.',
        en: 'Praise be to Allah Who has fed me this and provided it for me without any strength or power on my part.',
        es: 'Alabado sea Allah que me alimentó con esto y me lo proveyó sin fuerza ni poder de mi parte.'
      , de: 'Lob sei Allah, Der mich hiermit gespeist und es mir versorgt hat ohne Kraft oder Macht meinerseits.', it: 'Lode ad Allah che mi ha nutrito con questo e me lo ha provveduto senza forza né potere da parte mia.', nl: 'Lof zij Allah Die mij hiermee gevoed heeft en het mij heeft verschaft zonder kracht of macht van mijn kant.', pt: 'Louvor a Allah que me alimentou com isto e mo proporcionou sem força nem poder da minha parte.', tr: 'Beni bununla doyuran ve bana hiçbir güç ve kuvvetim olmaksızın bu rızkı veren Allah\'a hamd olsun.'},
      hadith: {
        fr: 'D\'après Mu\'âdh ibn Anas (qu\'Allah l\'agrée), le Prophète ﷺ a dit : « Celui qui mange un repas et dit cette invocation, ses péchés précédents lui seront pardonnés. »\nSource : Sunan Abu Daoud (4023) · Tirmidhi (3458)',
        en: 'Narrated Mu\'adh ibn Anas (may Allah be pleased with him), the Prophet ﷺ said: \"Whoever eats a meal and says this supplication, his former sins will be forgiven.\"\nSource: Sunan Abu Dawud (4023) · Tirmidhi (3458)',
        es: 'Narrado por Mu\'âdh ibn Anas (que Allah esté complacido con él), el Profeta ﷺ dijo: «Quien coma una comida y diga esta invocación, sus pecados anteriores le serán perdonados.»\nFuente: Sunan Abu Daoud (4023) · Tirmidhi (3458)'
      , de: 'Überliefert von Mu\'âdh ibn Anas (möge Allah mit ihm zufrieden sein), der Prophet ﷺ sagte: „Wer eine Mahlzeit isst und dieses Bittgebet spricht, dem werden seine früheren Sünden vergeben.“\nQuelle: Sunan Abî Dâwûd (4023) · Tirmidhi (3458)', it: 'Riportato da Mu\'âdh ibn Anas (che Allah sia soddisfatto di lui), il Profeta ﷺ disse: «Chi mangia un pasto e dice questa invocazione, i suoi peccati precedenti gli saranno perdonati.»\nFonte: Sunan Abî Dâwûd (4023) · Tirmidhi (3458)', nl: 'Overgeleverd door Mu\'âdh ibn Anas (moge Allah tevreden met hem zijn), de Profeet ﷺ zei: "Wie een maaltijd eet en dit smeekgebed zegt, zijn vroegere zonden zullen hem vergeven worden."\nBron: Sunan Abî Dâwûd (4023) · Tirmidhi (3458)', pt: 'Narrado por Mu\'âdh ibn Anas (que Allah esteja satisfeito com ele), o Profeta ﷺ disse: «Quem comer uma refeição e disser esta invocação, os seus pecados anteriores ser-lhe-ão perdoados.»\nFonte: Sunan Abî Dâwûd (4023) · Tirmidhi (3458)', tr: 'Muâz b. Enes\'ten (Allah ondan razı olsun) rivayet edilmiştir; Peygamber ﷺ şöyle buyurdu: "Bir yemek yiyen kimse bu duayı okursa geçmiş günahları bağışlanır."\nKaynak: Sünen-i Ebî Dâvûd (4023) · Tirmizî (3458)'},
      audio: 'repas3.mp3',
      sheet: { sub_fr: 'Al-hamdulillah', sub_en: 'Al-hamdulillah', sub_es: 'Al-hamdulillah', sub_de: 'Al-hamdulillah', sub_it: 'Al-hamdulillah', sub_nl: 'Al-hamdulillah', sub_pt: 'Al-hamdulillah', sub_tr: 'Elhamdülillah' }
    },
    acc4: {
      titre: {
        fr: 'SUNNAHS DU PROPHÈTE ﷺ',
        en: 'PROPHET\'S ﷺ SUNNAH',
        es: 'SUNNAH DEL PROFETA ﷺ'
      , de: 'SUNNA DES PROPHETEN ﷺ', it: 'SUNNAH DEL PROFETA ﷺ', nl: 'SOENNA VAN DE PROFEET ﷺ', pt: 'SUNNAH DO PROFETA ﷺ', tr: 'PEYGAMBERİN ﷺ SÜNNETİ'},
      sunnah: true,
      items: {
        fr: [
          { titre: 'MANGER ET BOIRE AVEC LA MAIN DROITE', texte: 'D\'après Oumaysa bint Milhan (qu\'Allah l\'agrée), le Prophète ﷺ a dit : « Quand l\'un de vous mange, qu\'il mange avec sa main droite ; quand il boit, qu\'il boive avec sa main droite, car Shaytan mange et boit avec sa main gauche. » [Sahih Muslim 2020]' },
          { titre: 'MANGER CE QUI EST DEVANT SOI', texte: 'D\'après Abu Hurayra (qu\'Allah l\'agrée), le Prophète ﷺ a dit : « Mange de ce qui est devant toi. » [Sahih Muslim 2033]' },
          { titre: 'NE PAS CRITIQUER LA NOURRITURE', texte: 'D\'après Abu Hurayra (qu\'Allah l\'agrée), le Prophète ﷺ ne critiquait jamais la nourriture : s\'il aimait, il mangeait ; sinon, il la laissait. [Sahih al-Bukhari 5409]' },
          { titre: 'MANGER MODÉRÉMENT', texte: 'D\'après Miqdam ibn Ma\'dikarib (qu\'Allah l\'agrée), le Prophète ﷺ a dit : « L\'être humain ne remplit pas un récipient pire que son ventre. Il suffit au fils d\'Adam de quelques bouchées pour redresser son dos. S\'il doit absolument le remplir, alors qu\'il réserve un tiers pour sa nourriture, un tiers pour sa boisson et un tiers pour sa respiration. » [Sunan at-Tirmidhi 2380]' },
          { titre: 'NE MANGE PAS DEBOUT', texte: 'D\'après Abu Hurayra (qu\'Allah l\'agrée), le Prophète ﷺ interdisait de manger debout sauf si on ne peut pas s\'asseoir. [Sahih Muslim 2016]' }
        ],
        en: [
          { titre: 'EAT AND DRINK WITH THE RIGHT HAND', texte: 'According to Umaysa bint Milhan (may Allah be pleased with her), the Prophet ﷺ said: "When one of you eats, let him eat with his right hand; when he drinks, let him drink with his right hand, for Satan eats and drinks with his left hand." [Sahih Muslim 2020]' },
          { titre: 'EAT WHAT IS IN FRONT OF YOU', texte: 'According to Abu Hurairah (may Allah be pleased with him), the Prophet ﷺ said: "Eat from what is in front of you." [Sahih Muslim 2033]' },
          { titre: 'DO NOT CRITICIZE FOOD', texte: 'According to Abu Hurairah (may Allah be pleased with him), the Prophet ﷺ never criticized food: if he liked it, he ate it; if not, he left it. [Sahih al-Bukhari 5409]' },
          { titre: 'EAT IN MODERATION', texte: 'According to Miqdam ibn Ma\'dikarib (may Allah be pleased with him), the Prophet ﷺ said: "No human ever filled a vessel worse than the stomach. It is sufficient for the son of Adam to have a few bites to keep his back straight. If he must fill it, then one third for his food, one third for his drink and one third for his breath." [Sunan at-Tirmidhi 2380]' },
          { titre: 'DO NOT EAT STANDING UP', texte: 'According to Abu Hurairah (may Allah be pleased with him), the Prophet ﷺ forbade eating while standing unless one cannot sit. [Sahih Muslim 2016]' }
        ],
        es: [
          { titre: 'COMER Y BEBER CON LA MANO DERECHA', texte: 'Según Umaysa bint Milhan (que Allah esté complacido con ella), el Profeta ﷺ dijo: "Cuando alguno de vosotros coma, que coma con su mano derecha; cuando beba, que beba con su mano derecha, pues Satanás come y bebe con su mano izquierda." [Sahih Muslim 2020]' },
          { titre: 'COMER LO QUE TIENES DELANTE', texte: 'Según Abu Hurairah (que Allah esté complacido con él), el Profeta ﷺ dijo: "Come de lo que tienes delante." [Sahih Muslim 2033]' },
          { titre: 'NO CRITICAR LA COMIDA', texte: 'Según Abu Hurairah (que Allah esté complacido con él), el Profeta ﷺ nunca criticaba la comida: si le gustaba, comía; si no, la dejaba. [Sahih al-Bukhari 5409]' },
          { titre: 'COMER CON MODERACIÓN', texte: 'Según Miqdam ibn Ma\'dikarib (que Allah esté complacido con él), el Profeta ﷺ dijo: "Ningún ser humano llena un recipiente peor que su estómago. Le bastan al hijo de Adán unos pocos bocados para mantener su espalda recta. Si debe llenarlo, entonces un tercio para su comida, un tercio para su bebida y un tercio para su respiración." [Sunan at-Tirmidhi 2380]' },
          { titre: 'NO COMER DE PIE', texte: 'Según Abu Hurairah (que Allah esté complacido con él), el Profeta ﷺ prohibía comer de pie salvo si no se puede sentar. [Sahih Muslim 2016]' }
        ],
        de: [
          { titre: 'MIT DER RECHTEN HAND ESSEN UND TRINKEN', texte: 'Gemäß Umaysa bint Milhan sagte der Prophet ﷺ: „Wenn einer von euch isst, soll er mit der rechten Hand essen; wenn er trinkt, mit der rechten Hand trinken, denn Satan isst und trinkt mit der linken Hand.“ [Sahih Muslim 2020]' },
          { titre: 'VON DEM ESSEN, WAS VOR DIR IST', texte: 'Gemäß Abu Hurayra sagte der Prophet ﷺ: „Iss von dem, was vor dir ist.“ [Sahih Muslim 2033]' },
          { titre: 'ESSEN NICHT KRITISIEREN', texte: 'Gemäß Abu Hurayra kritisierte der Prophet ﷺ niemals Essen: Wenn er es mochte, aß er es; wenn nicht, ließ er es. [Sahih al-Bukhârî 5409]' },
          { titre: 'MÄSSIG ESSEN', texte: 'Gemäß Miqdam ibn Ma\'dikarib sagte der Prophet ﷺ: „Kein Mensch hat je ein schlechteres Gefäß gefüllt als seinen Magen. Falls er ihn füllen muss: ein Drittel für Speise, ein Drittel für Getränk, ein Drittel für Atem.“ [Tirmidhi 2380]' },
          { titre: 'NICHT IM STEHEN ESSEN', texte: 'Gemäß Abu Hurayra verbot der Prophet ﷺ das Essen im Stehen. [Sahih Muslim 2016]' }
        ],
        it: [
          { titre: 'MANGIARE E BERE CON LA MANO DESTRA', texte: 'Secondo Umaysa bint Milhan il Profeta ﷺ disse: «Quando uno di voi mangia, mangi con la mano destra; quando beve, beva con la mano destra, poiché Satana mangia e beve con la mano sinistra.» [Sahih Muslim 2020]' },
          { titre: 'MANGIARE CIÒ CHE HAI DAVANTI', texte: 'Secondo Abu Hurayra il Profeta ﷺ disse: «Mangia da ciò che hai davanti.» [Sahih Muslim 2033]' },
          { titre: 'NON CRITICARE IL CIBO', texte: 'Secondo Abu Hurayra il Profeta ﷺ non criticava mai il cibo. [Sahih al-Bukhārī 5409]' },
          { titre: 'MANGIARE CON MODERAZIONE', texte: 'Secondo Miqdam ibn Ma\'dikarib il Profeta ﷺ disse: «Al figlio di Adamo bastano pochi bocconi. Se deve riempire lo stomaco: un terzo per il cibo, un terzo per la bevanda, un terzo per il respiro.» [Tirmidhi 2380]' },
          { titre: 'NON MANGIARE IN PIEDI', texte: 'Secondo Abu Hurayra il Profeta ﷺ proibiva di mangiare in piedi. [Sahih Muslim 2016]' }
        ],
        nl: [
          { titre: 'ETEN EN DRINKEN MET DE RECHTERHAND', texte: 'Volgens Umaysa bint Milhan zei de Profeet ﷺ: "Wanneer een van jullie eet, laat hem eten met zijn rechterhand; wanneer hij drinkt met zijn rechterhand, want Satan eet en drinkt met zijn linkerhand." [Sahih Muslim 2020]' },
          { titre: 'ETEN WAT VOOR JE STAAT', texte: 'Volgens Abu Hurairah zei de Profeet ﷺ: "Eet van wat voor je staat." [Sahih Muslim 2033]' },
          { titre: 'ETEN NIET BEKRITISEREN', texte: 'Volgens Abu Hurairah bekritiseerde de Profeet ﷺ nooit eten. [Sahih al-Bukhârî 5409]' },
          { titre: 'MATIG ETEN', texte: 'Volgens Miqdam ibn Ma\'dikarib zei de Profeet ﷺ: "De zoon van Adam heeft slechts een paar happen nodig. Als hij moet vullen: een derde voor voedsel, een derde voor drank, een derde voor ademhaling." [Tirmidhi 2380]' },
          { titre: 'NIET STAAND ETEN', texte: 'Volgens Abu Hurairah verbood de Profeet ﷺ het eten in staande positie. [Sahih Muslim 2016]' }
        ],
        pt: [
          { titre: 'COMER E BEBER COM A MÃO DIREITA', texte: 'Segundo Umaysa bint Milhan o Profeta ﷺ disse: «Quando um de vós comer, que coma com a mão direita; quando beber com a mão direita, pois Satanás come e bebe com a mão esquerda.» [Sahih Muslim 2020]' },
          { titre: 'COMER O QUE ESTÁ À TUA FRENTE', texte: 'Segundo Abu Hurayra o Profeta ﷺ disse: «Come do que está à tua frente.» [Sahih Muslim 2033]' },
          { titre: 'NÃO CRITICAR A COMIDA', texte: 'Segundo Abu Hurayra o Profeta ﷺ nunca criticava a comida. [Sahih al-Bukhārī 5409]' },
          { titre: 'COMER COM MODERAÇÃO', texte: 'Segundo Miqdam ibn Ma\'dikarib o Profeta ﷺ disse: «Ao filho de Adão bastam algumas bocas. Se tiver de encher: um terço para comida, um terço para bebida, um terço para respiração.» [Tirmidhi 2380]' },
          { titre: 'NÃO COMER DE PÉ', texte: 'Segundo Abu Hurayra o Profeta ﷺ proibia comer de pé. [Sahih Muslim 2016]' }
        ],
        tr: [
          { titre: 'SAĞ ELLE YEMEK VE İÇMEK', texte: 'Ümeyme binti Milhan\'dan rivayet edilmiştir; Peygamber ﷺ şöyle buyurdu: "Biriniz yemek yediğinde sağ eliyle yesin, içtiğinde sağ eliyle içsin. Zira şeytan sol eliyle yer ve içer." [Sahih Muslim 2020]' },
          { titre: 'ÖNÜNDEKINDEN YE', texte: 'Ebû Hüreyre\'den rivayet edilmiştir; Peygamber ﷺ: "Önündekinden ye." [Sahih Muslim 2033]' },
          { titre: 'YEMEĞİ ELEŞTİRME', texte: 'Ebû Hüreyre\'den rivayet edilmiştir; Peygamber ﷺ hiçbir zaman yemeği eleştirmezdi. [Sahihu\'l-Buhârî 5409]' },
          { titre: 'İTİDALLİ YE', texte: 'Mikdâm b. Ma\'dikerib\'den rivayet edilmiştir; Peygamber ﷺ: "Ademoğluna birkaç lokma yeterlidir. Doldurması gerekiyorsa: üçte biri yemeğe, üçte biri içeceğe, üçte biri nefesine." [Tirmizî 2380]' },
          { titre: 'AYAKTA YEME', texte: 'Ebû Hüreyre\'den rivayet edilmiştir; Peygamber ﷺ oturma imkânı varken ayakta yemeyi yasaklamıştır. [Sahih Muslim 2016]' }
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas' , sub_de: 'Empfohlene Praktiken', sub_it: 'Pratiche raccomandate', sub_nl: 'Aanbevolen praktijken', sub_pt: 'Práticas recomendadas', sub_tr: 'Tavsiye edilen uygulamalar', sub_de: 'Empfohlene Praktiken', sub_it: 'Pratiche raccomandate', sub_nl: 'Aanbevolen praktijken', sub_pt: 'Práticas recomendadas', sub_tr: 'Tavsiye edilen uygulamalar', sub_de: 'Empfohlene Praktiken', sub_it: 'Pratiche raccomandate', sub_nl: 'Aanbevolen praktijken', sub_pt: 'Práticas recomendadas', sub_tr: 'Tavsiye edilen uygulamalar', sub_de: 'Empfohlene Praktiken', sub_it: 'Pratiche raccomandate', sub_nl: 'Aanbevolen praktijken', sub_pt: 'Práticas recomendadas', sub_tr: 'Tavsiye edilen uygulamalar', sub_de: 'Empfohlene Praktiken', sub_it: 'Pratiche raccomandate', sub_nl: 'Aanbevolen praktijken', sub_pt: 'Práticas recomendadas', sub_tr: 'Tavsiye edilen uygulamalar', sub_de: 'Empfohlene Praktiken', sub_it: 'Pratiche raccomandate', sub_nl: 'Aanbevolen praktijken', sub_pt: 'Práticas recomendadas', sub_tr: 'Tavsiye edilen uygulamalar', sub_de: 'Empfohlene Praktiken', sub_it: 'Pratiche raccomandate', sub_nl: 'Aanbevolen praktijken', sub_pt: 'Práticas recomendadas', sub_tr: 'Tavsiye edilen uygulamalar', sub_de: 'Empfohlene Praktiken', sub_it: 'Pratiche raccomandate', sub_nl: 'Aanbevolen praktijken', sub_pt: 'Práticas recomendadas', sub_tr: 'Tavsiye edilen uygulamalar'}
    }
  },

  // ===========================
  // ABLUTION
  // ===========================
  ablution: {
    meta: {
      icon: 'images/ablution.webp',
      titre: { fr: 'Ablution', en: 'Ablution', es: 'Ablución' , de: 'Ablution', it: 'Abluzione', nl: 'Reiniging', pt: 'Ablução', tr: 'Abdest'},
      closingDua: { fr: 'Que tes ablutions soient acceptées, tes péchés effacés et les portes du Paradis ouvertes pour toi', en: 'May your ablution be accepted, your sins erased and the gates of Paradise opened for you', es: 'Que tu ablución sea aceptada, tus pecados borrados y las puertas del Paraíso abiertas para ti' , de: 'Möge deine Ablution angenommen, deine Sünden ausgelöscht und die Tore des Paradieses für dich geöffnet werden', it: 'Che la tua abluzione sia accettata, i tuoi peccati cancellati e le porte del Paradiso aperte per te', nl: 'Moge je reiniging aanvaard worden, je zonden uitgewist en de poorten van het Paradijs voor je geopend worden', pt: 'Que a tua ablução seja aceite, os teus pecados apagados e as portas do Paraíso abertas para ti', tr: 'Abdestinin kabul edilmesi, günahlarının silinmesi ve cennet kapılarının sana açılması dileniyor'}
    },
    acc1: {
      titre: { fr: 'AVANT DE COMMENCER LES ABLUTIONS (وضوء / WUDU)', en: 'BEFORE STARTING ABLUTION (WUDU)', es: 'ANTES DE COMENZAR LA ABLUCIÓN (WUDU)' , de: 'VOR DEN ABLUTIONEN (وضوء / WUDU)', it: 'PRIMA DI INIZIARE L\'ABLUZIONE (WUDU)', nl: 'VOOR DE REINIGING (وضوء / WUDU)', pt: 'ANTES DE COMEÇAR A ABLUÇÃO (WUDU)', tr: 'ABDESTTEN ÖNCE (وضوء / WUDU)'},
      arabe: 'بِسْمِ اللَّهِ',
      phonetique: { fr: 'Bismillâh', en: 'Bismillaah', es: 'Bismilláh', de: 'Bismillâh', it: 'Bismillāh', nl: 'Bismillâh', pt: 'Bismillāh', tr: 'Besmele' },
      traduction: { fr: 'Au nom d\'Allah', en: 'In the name of Allah', es: 'En el nombre de Allah', de: 'Im Namen Allahs', it: 'Nel nome di Allah', nl: 'In de naam van Allah', pt: 'Em nome de Allah', tr: 'Allah\'ın adıyla' },
      hadith: {
        fr: 'Le Prophète ﷺ a dit : « L\'ablution de celui qui n\'a pas mentionné le nom d\'Allah n\'est pas complète. »\nSource : Sunan Abu Daoud (101)',
        en: 'The Prophet ﷺ said: "The ablution of the one who does not mention the name of Allah is not complete."\nSource: Sunan Abu Dawud (101)',
        es: 'El Profeta ﷺ dijo: «La ablución de quien no menciona el nombre de Allah no es completa.»\nFuente: Sunan Abu Daoud (101)'
      , de: 'Der Prophet ﷺ sagte: „Die Waschung desjenigen, der Allahs Namen nicht nennt, ist unvollständig.“\nQuelle: Sunan Abî Dâwûd (101)', it: 'Il Profeta ﷺ disse: «L\'abluzione di chi non menziona il nome di Allah non è completa.»\nFonte: Sunan Abî Dâwûd (101)', nl: 'De Profeet ﷺ zei: "De reiniging van degene die de naam van Allah niet noemt is onvolledig."\nBron: Sunan Abî Dâwûd (101)', pt: 'O Profeta ﷺ disse: «A ablução de quem não menciona o nome de Allah não está completa.»\nFonte: Sunan Abî Dâwûd (101)', tr: 'Peygamber ﷺ şöyle buyurdu: "Allah\'ın adını zikretmeyen kimsenin abdesti tamam değildir."\nKaynak: Sünen-i Ebî Dâvûd (101)'},
      audio: 'ablution1.mp3',
      sheet: { sub_fr: 'Niyyah & Basmala', sub_en: 'Intention & Basmala', sub_es: 'Niyyah & Basmala', sub_de: 'Niyyah & Basmala', sub_it: 'Niyyah & Basmala', sub_nl: 'Niyyah & Basmala', sub_pt: 'Niyyah & Basmala', sub_tr: 'Niyet & Besmele' }
    },
    acc2: {
      titre: { fr: 'RÉCITE CETTE SHAHADA APRÈS UN WUDU PARFAIT', en: 'RECITE THIS SHAHADA AFTER PERFECT WUDU', es: 'RECITA ESTA SHAHADA DESPUÉS DE UN WUDU PERFECTO' , de: 'SPRICH DIESE SHAHADA NACH VOLLKOMMENEM WUDU', it: 'RECITA QUESTA SHAHADA DOPO UN WUDU PERFETTO', nl: 'SPREEK DEZE SHAHADA NA EEN PERFECT WUDU', pt: 'RECITA ESTA SHAHADA APÓS UM WUDU PERFEITO', tr: 'MÜKEMMEL ABDEST SONRASI BU ŞEHADETI OKU'},
      arabe: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّداً عَبْدُهُ وَرَسُولُهُ',
      phonetique: {
        fr: 'Ash-hadu an lâ ilâha illallâhu wahdahu lâ sharîka lah, wa ashhadu anna Muhammadan \'abduhu wa rasûluh.',
        en: 'Ash-hadu an laa ilaaha illallaahu wahdahu laa shareeka lah, wa ash-hadu anna Muhammadan \'abduhu wa rasooluh.',
        es: 'Ash-hadu an laa iláaha illalláahu wahdahu laa sharíika lah, wa ash-hadu anna Muhammadan \'abduhu wa rasúluh.'
      , de: 'Ash-hadu an lâ ilâha illallaahu wahdahu lâ shareeka lah, wa ash-hadu anna Muhammadan \'abduhu wa rasûluh.', it: 'Ash-hadu an lā ilāha illallāhu wahdahu lā sharīka lah, wa ash-hadu anna Muhammadan \'abduhu wa rasūluh.', nl: 'Ash-hadu an laa ilaaha illallaahu wahdahu laa shareeka lah, wa ash-hadu anna Muhammadan \'abduhu wa rasooluh.', pt: 'Ash-hadu an lā ilāha illallāhu wahdahu lā sharīka lah, wa ash-hadu anna Muhammadan \'abduhu wa rasūluh.', tr: 'Eşhedü en lâ ilâhe illallâhu vahdehû lâ şerîke leh, ve eşhedü enne Muhammeden \'abdühû ve rasûlüh.'},
      traduction: {
        fr: 'J\'atteste qu\'il n\'y a de divinité digne d\'adoration qu\'Allah, Unique sans associé, et j\'atteste que Muhammad est Son serviteur et Son Messager.',
        en: 'I bear witness that there is no deity worthy of worship except Allah, alone without partner, and I bear witness that Muhammad is His servant and Messenger.',
        es: 'Atestiguo que no hay más dios que Allah, Único sin asociado, y atestiguo que Muhammad es Su siervo y Su Mensajero.'
      , de: 'Ich bezeuge, dass es keine Gottheit gibt außer Allah, Dem Einzigen ohne Teilhaber, und ich bezeuge, dass Muhammad Sein Diener und Sein Gesandter ist.', it: 'Attesto che non c\'è altro dio all\'infuori di Allah, Unico senza associato, e attesto che Muhammad è il Suo servo e il Suo Messaggero.', nl: 'Ik getuig dat er geen god is dan Allah, de Enige zonder deelgenoot, en ik getuig dat Muhammad Zijn dienaar en Zijn Boodschapper is.', pt: 'Testemunho que não há deus senão Allah, Único sem associado, e testemunho que Muhammad é o Seu servo e o Seu Mensageiro.', tr: 'Allah\'tan başka ilah olmadığına, O\'nun tek olduğuna ve ortağı bulunmadığına şahitlik ederim. Muhammed\'in O\'nun kulu ve elçisi olduğuna da şahitlik ederim.'},
      hadith: {
        fr: 'D\'après \'Umar ibn al-Khattâb (qu\'Allah l\'agrée), le Prophète ﷺ a dit : « Celui qui fait correctement ses ablutions puis dit cette shahada, les huit portes du Paradis lui seront ouvertes, il entrera par celle qu\'il désire. »\nSource : Sahih Muslim (234) · Tirmidhi (55)',
        en: 'Narrated \'Umar ibn al-Khattab (may Allah be pleased with him), the Prophet ﷺ said: "Whoever performs his ablutions correctly then says this testimony, the eight gates of Paradise will be opened for him and he may enter through whichever he wishes."\nSource: Sahih Muslim (234) · Tirmidhi (55)',
        es: 'Narrado por \'Umar ibn al-Khattâb (que Allah esté complacido con él), el Profeta ﷺ dijo: «Quien realice correctamente sus abluciones y luego diga esta shahada, se abrirán las ocho puertas del Paraíso para él.»\nFuente: Sahih Muslim (234) · Tirmidhi (55)'
      , de: 'Überliefert von \'Umar ibn al-Khattâb (möge Allah mit ihm zufrieden sein), der Prophet ﷺ sagte: „Wer seine Ablution korrekt vollzieht und dann diese Zeugenschaft spricht, dem werden die acht Tore des Paradieses geöffnet.“\nQuelle: Sahih Muslim (234) · Tirmidhi (55)', it: 'Riportato da \'Umar ibn al-Khattâb (che Allah sia soddisfatto di lui), il Profeta ﷺ disse: «Chi compie correttamente le sue ablucioni e poi dice questa shahada, gli verranno aperte le otto porte del Paradiso.»\nFonte: Sahih Muslim (234) · Tirmidhi (55)', nl: 'Overgeleverd door \'Umar ibn al-Khattâb (moge Allah tevreden met hem zijn), de Profeet ﷺ zei: "Wie zijn reiniging correct uitvoert en dan deze geloofsbelijdenis uitspreekt, voor hem worden de acht poorten van het Paradijs geopend."\nBron: Sahih Muslim (234) · Tirmidhi (55)', pt: 'Narrado por \'Umar ibn al-Khattâb (que Allah esteja satisfeito com ele), o Profeta ﷺ disse: «Quem realizar corretamente a sua ablução e depois disser esta shahada, as oito portas do Paraíso ser-lhe-ão abertas.»\nFonte: Sahih Muslim (234) · Tirmidhi (55)', tr: '\'Ömer b. Hattâb\'dan (Allah ondan razı olsun) rivayet edilmiştir; Peygamber ﷺ şöyle buyurdu: "Kim abdestini tam alır ve ardından bu şehadeti okursa, cennetin sekiz kapısı ona açılır."\nKaynak: Sahih Muslim (234) · Tirmizî (55)'},
      audio: 'ablution2.mp3',
      sheet: { sub_fr: 'Témoignage de foi', sub_en: 'Testimony of faith', sub_es: 'Testimonio de fe', sub_de: 'Glaubenszeugnis', sub_it: 'Testimonianza di fede', sub_nl: 'Geloofsgetuigenis', sub_pt: 'Testemunho de fé', sub_tr: 'İman şehadeti' }
    },
    acc3: {
      titre: { fr: 'DOU\'A COMPLÈTE APRÈS LES ABLUTIONS (TRÈS RÉCOMPENSÉE)', en: 'COMPLETE DUA AFTER ABLUTION (HIGHLY REWARDED)', es: 'DUA COMPLETA DESPUÉS DE LA ABLUCIÓN (MUY RECOMPENSADA)' , de: 'VOLLSTÄNDIGES BITTGEBET NACH DEN ABLUTIONEN (SEHR BELOHNT)', it: 'DUA COMPLETA DOPO L\'ABLUZIONE (MOLTO RICOMPENSATA)', nl: 'VOLLEDIG SMEEKGEBED NA REINIGING (STERK BELOOND)', pt: 'DUA COMPLETA APÓS A ABLUÇÃO (MUITO RECOMPENSADA)', tr: 'ABDEST SONRASI TAM DUA (ÇOK SEVAPLI)'},
      arabe: 'اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
      phonetique: {
        fr: 'Allâhumma j\'alnî minat-tawwâbîna waj\'alnî minal-mutatahhirîn.',
        en: 'Allaahummaj\'alnee minat-tawwaabeena waj\'alnee minal-mutatahhireen.',
        es: 'Alláhummay\'alnee minat-tawwaabeena way\'alnee minal-mutatahhireen.'
      , de: 'Allâhumma j\'alnî minat-tawwâbîna waj\'alnî minal-mutatahhirîn.', it: 'Allāhummaj\'alnī minat-tawwābīna waj\'alnī minal-mutatahhirīn.', nl: 'Allaahummaj\'alnee minat-tawwaabeena waj\'alnee minal-mutatahhireen.', pt: 'Allāhummaj\'alnī minat-tawwābīna waj\'alnī minal-mutatahhirīn.', tr: 'Allâhümme\'c\'alnî minet-tevvâbîne vec\'alnî minel-mütetahhirîn.'},
      traduction: {
        fr: 'Ô Allah, fais de moi l\'un de ceux qui se repentent souvent et fais de moi l\'un de ceux qui se purifient.',
        en: 'O Allah, make me of those who repent often and make me of those who purify themselves.',
        es: 'Oh Allah, hazme de aquellos que se arrepienten frecuentemente y hazme de aquellos que se purifican.'
      , de: 'O Allah, mache mich zu einem von denen, die oft bereuen, und mache mich zu einem von denen, die sich reinigen.', it: 'O Allah, fammi parte di coloro che si pentono spesso e fammi parte di coloro che si purificano.', nl: 'O Allah, maak mij tot een van degenen die vaak berouw tonen en maak mij tot een van degenen die zich reinigen.', pt: 'Ó Allah, faz de mim um daqueles que se arrependem frequentemente e faz de mim um daqueles que se purificam.', tr: 'Allah\'ım! Beni çok tövbe edenlerden ve çok temizlenenlerden eyle.'},
      hadith: {
        fr: 'D\'après \'Umar ibn al-Khattâb (qu\'Allah l\'agrée), le Prophète ﷺ enseignait à dire cette invocation après les ablutions, à la suite de la Shahada.\nSource : Jami\' at-Tirmidhi (55)',
        en: 'Narrated \'Umar ibn al-Khattab (may Allah be pleased with him), the Prophet ﷺ taught to say this supplication after ablution, following the Shahada.\nSource: Jami\' at-Tirmidhi (55)',
        es: 'Narrado por \'Umar ibn al-Khattâb (que Allah esté complacido con él), el Profeta ﷺ enseñaba a decir esta invocación después de las abluciones, a continuación de la Shahada.\nFuente: Jami\' at-Tirmidhi (55)'
      , de: 'Überliefert von \'Umar ibn al-Khattâb (möge Allah mit ihm zufrieden sein), der Prophet ﷺ lehrte, dieses Bittgebet nach den Ablutionen zu sprechen.\nQuelle: Jâmi\' at-Tirmidhi (55)', it: 'Riportato da \'Umar ibn al-Khattâb (che Allah sia soddisfatto di lui), il Profeta ﷺ insegnava a dire questa invocazione dopo le ablucioni.\nFonte: Jâmi\' at-Tirmidhi (55)', nl: 'Overgeleverd door \'Umar ibn al-Khattâb (moge Allah tevreden met hem zijn), de Profeet ﷺ leerde dit smeekgebed na de reiniging te zeggen.\nBron: Jâmi\' at-Tirmidhi (55)', pt: 'Narrado por \'Umar ibn al-Khattâb (que Allah esteja satisfeito com ele), o Profeta ﷺ ensinava a dizer esta invocação após a ablução.\nFonte: Jâmi\' at-Tirmidhi (55)', tr: '\'Ömer b. Hattâb\'dan (Allah ondan razı olsun) rivayet edilmiştir; Peygamber ﷺ abdest sonrasında bu duanın okunmasını öğretirdi.\nKaynak: Câmi\'u\'t-Tirmizî (55)'},
      audio: 'ablution3.mp3',
      sheet: { sub_fr: 'Très récompensée', sub_en: 'Highly rewarded', sub_es: 'Muy recompensada', sub_de: 'Sehr belohnt', sub_it: 'Molto ricompensata', sub_nl: 'Sterk beloond', sub_pt: 'Muito recompensada', sub_tr: 'Çok sevaplı' }
    },
    acc4: {
      titre: { fr: 'SUNNAHS DU PROPHÈTE ﷺ', en: 'PROPHET\'S ﷺ SUNNAH', es: 'SUNNAH DEL PROFETA ﷺ' },
      sunnah: true,
      items: {
        fr: [
          { titre: 'WUDU EFFACE LES PETITS PÉCHÉS', texte: 'Le Prophète ﷺ a dit : « Quand le musulman accomplit ses ablutions, ses péchés sortent de ses mains, de son visage, de sa tête et de ses pieds avec l\'eau. » [Muslim 245 - Sahih]' },
          { titre: 'EAU DU WUDU = LUMIÈRE AU PARADIS', texte: 'D\'après Uthman ibn Affan, le Prophète ﷺ a dit : « Celui qui accomplit ses ablutions, son eau atteindra jusqu\'à ses pieds et sera une lumière pour lui au Jour Dernier. » [Tirmidhi 22 - Sahih]' },
          { titre: 'WUDU = CLÉ DE LA PRIÈRE', texte: 'D\'après Abu Hurayra, le Prophète ﷺ a dit : « La prière ne peut être accomplie sans ablutions. » [Muslim 225 - Sahih]' },
          { titre: '10 RÉCOMPENSES PAR MEMBRE', texte: 'D\'après Abu Hurayra, le Prophète ﷺ a dit : « À celui qui accomplit parfaitement ses ablutions, il est écrit dix bonnes actions pour chaque membre qu\'il a lavé. » [Muslim 226 - Sahih]' },
          { titre: 'WUDU PARFAIT = ANGES TÉMOINS', texte: 'D\'après Umar ibn al-Khattab, le Prophète ﷺ a dit : « Quand l\'un de vous accomplit ses ablutions parfaitement, les anges témoignent pour lui : Qu\'Allah te purifie ! » [Tirmidhi 13 - Sahih]' }
        ],
        en: [
          { titre: 'WUDU ERASES MINOR SINS', texte: 'The Prophet ﷺ said: "When a Muslim performs ablution, his sins leave his hands, face, head and feet with the water." [Muslim 245 - Sahih]' },
          { titre: 'WUDU WATER = LIGHT ON JUDGEMENT DAY', texte: 'According to Uthman ibn Affan, the Prophet ﷺ said: "Whoever performs his ablutions, the water reaching his feet will be a light for him on the Last Day." [Tirmidhi 22 - Sahih]' },
          { titre: 'WUDU = KEY TO PRAYER', texte: 'According to Abu Hurairah, the Prophet ﷺ said: "Prayer cannot be performed without ablution." [Muslim 225 - Sahih]' },
          { titre: '10 REWARDS PER LIMB', texte: 'According to Abu Hurairah, the Prophet ﷺ said: "For whoever performs his ablutions perfectly, ten good deeds are recorded for each limb he has washed." [Muslim 226 - Sahih]' },
          { titre: 'PERFECT WUDU = ANGELS WITNESS', texte: 'According to Umar ibn al-Khattab, the Prophet ﷺ said: "When one of you performs his ablutions perfectly, the angels bear witness for him: May Allah purify you!" [Tirmidhi 13 - Sahih]' }
        ],
        es: [
          { titre: 'EL WUDU BORRA LOS PECADOS MENORES', texte: 'El Profeta ﷺ dijo: "Cuando el musulmán realiza sus abluciones, sus pecados salen de sus manos, cara, cabeza y pies con el agua." [Muslim 245 - Sahih]' },
          { titre: 'AGUA DEL WUDU = LUZ EN EL JUICIO', texte: 'Según Uthman ibn Affan, el Profeta ﷺ dijo: "Quien realice sus abluciones, el agua que llegue hasta sus pies será una luz para él en el Día Final." [Tirmidhi 22 - Sahih]' },
          { titre: 'WUDU = LLAVE DE LA ORACIÓN', texte: 'Según Abu Hurairah, el Profeta ﷺ dijo: "La oración no puede realizarse sin abluciones." [Muslim 225 - Sahih]' },
          { titre: '10 RECOMPENSAS POR MIEMBRO', texte: 'Según Abu Hurairah, el Profeta ﷺ dijo: "A quien realice perfectamente sus abluciones, se le anotan diez buenas acciones por cada miembro que haya lavado." [Muslim 226 - Sahih]' },
          { titre: 'WUDU PERFECTO = ÁNGELES TESTIGOS', texte: 'Según Umar ibn al-Khattab, el Profeta ﷺ dijo: "Cuando alguno de vosotros realiza sus abluciones perfectamente, los ángeles atestiguan por él: ¡Que Allah te purifique!" [Tirmidhi 13 - Sahih]' }
        ],
        de: [
          { titre: 'MIT BISMILLAH BEGINNEN', texte: 'Der Prophet ﷺ: „Die Waschung desjenigen, der Allahs Namen nicht nennt, ist unvollständig.“ [Sunan Abî Dâwûd 101]' },
          { titre: 'MIT DER RECHTEN HAND BEGINNEN', texte: '\'Â\'isha: der Prophet ﷺ begann bei den Ablutionen gerne von rechts. [Sahih al-Bukhârî 168]' },
          { titre: 'ZWISCHEN DEN FINGERN WASCHEN', texte: 'Der Prophet ﷺ wusch zwischen seinen Fingern und Zehen. [Sunan Ibn Mâjah 447]' },
          { titre: 'DREIMAL WASCHEN', texte: 'Der Prophet ﷺ führte die Waschungen dreimal durch. [Sahih al-Bukhârî 159]' },
          { titre: 'WUDU VOLLSTÄNDIG AUSFÜHREN', texte: 'Der Prophet ﷺ: „Wehe den Fersen vor dem Feuer!“ [Sahih al-Bukhârî 165]' }
        ],
        it: [
          { titre: 'INIZIARE CON BISMILLAH', texte: 'Il Profeta ﷺ: «L\'abluzione di chi non menziona il nome di Allah non è completa.» [Sunan Abî Dâwûd 101]' },
          { titre: 'INIZIARE CON LA MANO DESTRA', texte: '\'Â\'isha: il Profeta ﷺ amava iniziare da destra nelle ablucioni. [Sahih al-Bukhārī 168]' },
          { titre: 'LAVARE TRA LE DITA', texte: 'Il Profeta ﷺ lavava tra le sue dita e dita dei piedi. [Sunan Ibn Mâjah 447]' },
          { titre: 'LAVARE TRE VOLTE', texte: 'Il Profeta ﷺ eseguiva le abluzioni tre volte. [Sahih al-Bukhārī 159]' },
          { titre: 'ESEGUIRE IL WUDU COMPLETAMENTE', texte: 'Il Profeta ﷺ: «Guai ai talloni dal fuoco!» [Sahih al-Bukhārī 165]' }
        ],
        nl: [
          { titre: 'BEGINNEN MET BISMILLAH', texte: 'De Profeet ﷺ: "De reiniging van degene die de naam van Allah niet noemt is onvolledig." [Sunan Abî Dâwûd 101]' },
          { titre: 'BEGINNEN MET DE RECHTERHAND', texte: '\'Â\'isha: de Profeet ﷺ begon graag van rechts bij de reiniging. [Sahih al-Bukhârî 168]' },
          { titre: 'TUSSEN DE VINGERS WASSEN', texte: 'De Profeet ﷺ waste tussen zijn vingers en tenen. [Sunan Ibn Mâjah 447]' },
          { titre: 'DRIEMAAL WASSEN', texte: 'De Profeet ﷺ voerde de washandelingen driemaal uit. [Sahih al-Bukhârî 159]' },
          { titre: 'WUDU VOLLEDIG UITVOEREN', texte: 'De Profeet ﷺ: "Wee de hielen voor het vuur!" [Sahih al-Bukhârî 165]' }
        ],
        pt: [
          { titre: 'COMEÇAR COM BISMILLAH', texte: 'O Profeta ﷺ: «A ablução de quem não menciona o nome de Allah não está completa.» [Sunan Abî Dâwûd 101]' },
          { titre: 'COMEÇAR PELA MÃO DIREITA', texte: '\'Â\'isha: o Profeta ﷺ gostava de começar pelo lado direito nas ablucões. [Sahih al-Bukhārī 168]' },
          { titre: 'LAVAR ENTRE OS DEDOS', texte: 'O Profeta ﷺ lavava entre os seus dedos das mãos e dos pés. [Sunan Ibn Mâjah 447]' },
          { titre: 'LAVAR TRÊS VEZES', texte: 'O Profeta ﷺ realizava as lavagens três vezes. [Sahih al-Bukhārī 159]' },
          { titre: 'REALIZAR O WUDU COMPLETAMENTE', texte: 'O Profeta ﷺ: «Ai dos calcanhares do fogo!» [Sahih al-Bukhārī 165]' }
        ],
        tr: [
          { titre: 'BİSMİLLAH İLE BAŞLAMAK', texte: 'Peygamber ﷺ: "Allah\'ın adını zikretmeyen kimsenin abdesti tamam değildir." [Sünen-i Ebî Dâvûd 101]' },
          { titre: 'SAĞ ELDEN BAŞLAMAK', texte: '\'Âişe\'den; Peygamber ﷺ abdest alırken sağdan başlamayı severdi. [Sahihu\'l-Buhârî 168]' },
          { titre: 'PARMAKLAR ARASINI YIKAMAK', texte: 'Peygamber ﷺ el ve ayak parmaklarının aralarını yıkardı. [İbn Mâce 447]' },
          { titre: 'ÜÇ KEZ YIKAMAK', texte: 'Peygamber ﷺ abdest uzuvlarını üçer kez yıkardı. [Sahihu\'l-Buhârî 159]' },
          { titre: 'ABDEST UZUVLARINI TAM YIKAMAK', texte: 'Peygamber ﷺ: "Ateşten topuklara yazıklar olsun!" [Sahihu\'l-Buhârî 165]' }
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas', sub_de: 'Empfohlene Praktiken', sub_it: 'Pratiche raccomandate', sub_nl: 'Aanbevolen praktijken', sub_pt: 'Práticas recomendadas', sub_tr: 'Tavsiye edilen uygulamalar' }
    }
  },

  // ===========================
  // REVEIL
  // ===========================
  reveil: {
    meta: {
      icon: 'images/lit.webp',
      titre: { fr: 'Réveil & Couché', en: 'Wake & Sleep', es: 'Despertar & Dormir' , de: 'Aufwachen & Schlafen', it: 'Sveglio & Sonno', nl: 'Wakker & Slapen', pt: 'Acordar & Dormir', tr: 'Uyanış & Uyku'},
      closingDua: { fr: 'Que tes nuits soient protégées et tes réveils remplis de baraka', en: 'May your nights be protected and your mornings filled with baraka', es: 'Que tus noches sean protegidas y tus mañanas llenas de baraka' , de: 'Mögen deine Nächte beschützt und deine Morgen voller Baraka sein', it: 'Che le tue notti siano protette e i tuoi risvegli pieni di baraka', nl: 'Mogen je nachten beschermd zijn en je ochtenden gevuld met baraka', pt: 'Que as tuas noites sejam protegidas e os teus despertares cheios de baraka', tr: 'Gecelerinin korunaklı, sabahlarının bereketli olması dileğiyle'}
    },
    acc1: {
      titre: { fr: 'LORSQU\'ON SE RÉVEILLE', en: 'UPON WAKING UP', es: 'AL DESPERTAR' , de: 'BEIM AUFWACHEN', it: 'AL RISVEGLIO', nl: 'BIJ HET WAKKER WORDEN', pt: 'AO ACORDAR', tr: 'UYANINCA'},
      arabe: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
      phonetique: {
        fr: 'Al-hamdu lillâhi lladhî ahyânâ ba\'da mâ amâtanâ wa ilayhi n-nushûr.',
        en: 'Al-hamdu lillaahil-lathee ahyaanaa ba\'da maa amaatanaa wa ilayhin-nushoor.',
        es: 'Al-hamdu lilláhil-lathí ahyáanaa ba\'da maa amaatanaa wa iláihin-nushúur.'
      , de: 'Al-hamdu lil-lâhi lladhî ahyânâ ba\'da mâ amâtanâ wa ilayhi n-nushûr.', it: 'Al-ḥamdu lillāhi lladhī aḥyānā ba\'da mā amātanā wa ilayhi n-nushūr.', nl: 'Al-hamdu lillaahil-lathee ahyaanaa ba\'da maa amaatanaa wa ilayhin-nushoor.', pt: 'Al-hamdu lillāhi lladhī aḥyānā ba\'da mā amātanā wa ilayhi n-nushūr.', tr: 'Elhamdü lillâhillezî ahyânâ ba\'de mâ emâtenâ ve ileyhin-nüşûr.'},
      traduction: {
        fr: 'Louange à Allah qui nous a rendus à la vie après nous avoir fait mourir, et c\'est vers Lui que sera la résurrection.',
        en: 'Praise be to Allah Who gave us life after He had caused us to die, and to Him is the Resurrection.',
        es: 'Alabado sea Allah que nos dio vida después de habernos dado muerte, y hacia Él es la resurrección.'
      , de: 'Lob sei Allah, Der uns Leben schenkte, nachdem Er uns hatte sterben lassen, und zu Ihm ist die Auferstehung.', it: 'Lode ad Allah che ci ha ridato la vita dopo averci fatto morire, e a Lui è la resurrezione.', nl: 'Lof zij Allah Die ons leven heeft gegeven nadat Hij ons had doen sterven, en tot Hem is de opstanding.', pt: 'Louvor a Allah que nos deu vida depois de nos ter feito morrer, e para Ele é a ressurreição.', tr: 'Bizi öldürdükten sonra dirilten Allah\'a hamd olsun. Dönüş O\'nadır.'},
      hadith: {
        fr: 'D\'après Hudhayfah (qu\'Allah l\'agrée) : « Lorsque le Prophète ﷺ se levait, il disait cette invocation. »\nSource : Sahih al-Bukhârî (6312) · Sahih Muslim (2711)',
        en: 'Narrated Hudhayfah (may Allah be pleased with him): "When the Prophet ﷺ got up from sleep, he would say this supplication."\nSource: Sahih al-Bukhari (6312) · Sahih Muslim (2711)',
        es: 'Narrado por Hudhayfah (que Allah esté complacido con él): «Cuando el Profeta ﷺ se levantaba, decía esta invocación.»\nFuente: Sahih al-Bukhârî (6312) · Sahih Muslim (2711)'
      , de: 'Überliefert von Hudhayfah (möge Allah mit ihm zufrieden sein): „Wenn der Prophet ﷺ aufstand, sprach er dieses Bittgebet.“\nQuelle: Sahih al-Bukhârî (6312) · Sahih Muslim (2711)', it: 'Riportato da Hudhayfah (che Allah sia soddisfatto di lui): «Quando il Profeta ﷺ si svegliava, diceva questa invocazione.»\nFonte: Sahih al-Bukhârî (6312) · Sahih Muslim (2711)', nl: 'Overgeleverd door Hudhayfah (moge Allah tevreden met hem zijn): "Wanneer de Profeet ﷺ opstond, zei hij dit smeekgebed."\nBron: Sahih al-Bukhârî (6312) · Sahih Muslim (2711)', pt: 'Narrado por Hudhayfah (que Allah esteja satisfeito com ele): «Quando o Profeta ﷺ acordava, dizia esta invocação.»\nFonte: Sahih al-Bukhârî (6312) · Sahih Muslim (2711)', tr: 'Huzeyfe\'den (Allah ondan razı olsun) rivayet edilmiştir: "Peygamber ﷺ uyandığında bu duayı okurdu."\nKaynak: Sahihu\'l-Buhârî (6312) · Sahih Muslim (2711)'},
      audio: 'reveil1.mp3',
      sheet: { sub_fr: 'Au lever du sommeil', sub_en: 'When waking up', sub_es: 'Al despertarse', sub_de: 'Beim Aufwachen', sub_it: 'Al risveglio', sub_nl: 'Bij het wakker worden', sub_pt: 'Ao acordar', sub_tr: 'Uyanınca' }
    },
    acc2: {
      titre: { fr: 'INVOCATION LORSQU\'ON VA SE COUCHER', en: 'WHEN GOING TO SLEEP', es: 'AL IR A DORMIR' , de: 'BEIM SCHLAFENGEHEN', it: 'PRIMA DI DORMIRE', nl: 'BIJ HET GAAN SLAPEN', pt: 'AO IR DORMIR', tr: 'UYUMADAN ÖNCE'},
      arabe: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
      phonetique: {
        fr: 'Bismika Allâhumma amûtu wa ahyâ.',
        en: 'Bismika Allaahummaa amootu wa ahyaa.',
        es: 'Bismika Alláhummaa amúutu wa ahyáa.'
      , de: 'Bismika Allâhumma amûtu wa ahyâ.', it: 'Bismika Allāhummā amūtu wa aḥyā.', nl: 'Bismika Allaahummaa amootu wa ahyaa.', pt: 'Bismika Allāhummā amūtu wa aḥyā.', tr: 'Bismike Allâhümme emûtü ve ahyâ.'},
      traduction: {
        fr: 'C\'est en Ton nom, ô Allah, que je meurs et que je vis',
        en: 'In Your name, O Allah, I die and I live.',
        es: 'En Tu nombre, oh Allah, muero y vivo.'
      , de: 'In Deinem Namen, o Allah, sterbe ich und lebe ich.', it: 'Nel Tuo nome, o Allah, muoio e vivo.', nl: 'In Uw naam, o Allah, sterf ik en leef ik.', pt: 'Em Teu nome, ó Allah, morro e vivo.', tr: 'Senin adınla, ey Allah\'ım, ölürüm ve yaşarım.'},
      hadith: {
        fr: 'D\'après Hudhayfah (qu\'Allah l\'agrée) : « Lorsque le Prophète ﷺ allait se coucher, il disait cette invocation. »\nSource : Sahih al-Bukhârî (6312) · Sahih Muslim (2711)',
        en: 'Narrated Hudhayfah (may Allah be pleased with him): "When the Prophet ﷺ went to bed, he would say this supplication."\nSource: Sahih al-Bukhari (6312) · Sahih Muslim (2711)',
        es: 'Narrado por Hudhayfah (que Allah esté complacido con él): «Cuando el Profeta ﷺ iba a acostarse, decía esta invocación.»\nFuente: Sahih al-Bukhârî (6312) · Sahih Muslim (2711)'
      , de: 'Überliefert von Hudhayfah (möge Allah mit ihm zufrieden sein): „Wenn der Prophet ﷺ sich zum Schlafen niederlegte, sprach er dieses Bittgebet.“\nQuelle: Sahih al-Bukhârî (6312) · Sahih Muslim (2711)', it: 'Riportato da Hudhayfah (che Allah sia soddisfatto di lui): «Quando il Profeta ﷺ andava a dormire, diceva questa invocazione.»\nFonte: Sahih al-Bukhârî (6312) · Sahih Muslim (2711)', nl: 'Overgeleverd door Hudhayfah (moge Allah tevreden met hem zijn): "Wanneer de Profeet ﷺ ging slapen, zei hij dit smeekgebed."\nBron: Sahih al-Bukhârî (6312) · Sahih Muslim (2711)', pt: 'Narrado por Hudhayfah (que Allah esteja satisfeito com ele): «Quando o Profeta ﷺ ia deitar-se, dizia esta invocação.»\nFonte: Sahih al-Bukhârî (6312) · Sahih Muslim (2711)', tr: 'Huzeyfe\'den (Allah ondan razı olsun) rivayet edilmiştir: "Peygamber ﷺ uyumaya gideceğinde bu duayı okurdu."\nKaynak: Sahihu\'l-Buhârî (6312) · Sahih Muslim (2711)'},
      audio: 'reveil2.mp3',
      sheet: { sub_fr: 'Invocation du coucher', sub_en: 'Bedtime supplication', sub_es: 'Invocación al acostarse', sub_de: 'Schlafenszeit-Bittgebet', sub_it: 'Invocazione del riposo', sub_nl: 'Slaaptijd smeekgebed', sub_pt: 'Invocação ao deitar', sub_tr: 'Yatarken dua' }
    },
    acc3: {
      titre: { fr: 'VARIANTE COMPLÈTE', en: 'COMPLETE VERSION', es: 'VERSIÓN COMPLETA' , de: 'VOLLSTÄNDIGE VARIANTE', it: 'VERSIONE COMPLETA', nl: 'VOLLEDIGE VERSIE', pt: 'VERSÃO COMPLETA', tr: 'TAM VERSİYON'},
      arabe: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
      phonetique: {
        fr: 'Bismika Rabbî wada\'tu janbî, wa bika arfa\'uhu. Fa-in amsakta nafsî farhamhâ, wa in arsaltahâ fahfazhâ bimâ tahfazu bihi \'ibâdaka s-sâlihîn.',
        en: 'Bismika Rabbee wada\'tu janbee, wa bika arfa\'uh. Fa-in amsakta nafsee farhamhaa, wa in arsaltahaa fahfathhaa bimaa tahfathu bihi \'ibaadakas-saaliheen.',
        es: 'Bismika Rabbee wada\'tu yanbee, wa bika arfa\'uh. Fa-in amsakta nafsee farhamhaa, wa in arsaltahaa fahfathhaa bimaa tahfathu bihi \'ibaadakas-saaliheen.'
      , de: 'Bismika Rabbî wada\'tu janbî, wa bika arfa\'uhu. Fa-in amsakta nafsî farhamhâ, wa in arsaltahâ fahfazhâ bimâ tahfazu bihi \'ibâdaka s-sâlihîn.', it: 'Bismika Rabbī wada\'tu janbī, wa bika arfa\'uhu. Fa-in amsakta nafsī farḥamhā, wa in arsaltahā faḥfaẓhā bimā taḥfaẓu bihi \'ibādaka s-ṣāliḥīn.', nl: 'Bismika Rabbee wada\'tu janbee, wa bika arfa\'uh. Fa-in amsakta nafsee farhamhaa, wa in arsaltahaa fahfathhaa bimaa tahfathu bihi \'ibaadakas-saaliheen.', pt: 'Bismika Rabbī wada\'tu janbī, wa bika arfa\'uhu. Fa-in amsakta nafsī farḥamhā, wa in arsaltahā faḥfaẓhā bimā taḥfaẓu bihi \'ibādaka s-ṣāliḥīn.', tr: 'Bismike Rabbî vada\'tü cenbî ve bike erfe\'uhû. Fe-in emsekte nefsî ferhamhâ, ve in erseltehâ fahfazhâ bimâ tahfazu bihî ibâdeke\'s-sâlihîn.'},
      traduction: {
        fr: 'Ô mon Seigneur, c\'est en Ton nom que je me couche sur le côté, et c\'est par Toi que je le relève. Si Tu retiens mon âme, fais-lui miséricorde ; et si Tu la renvoies, protège-la comme Tu protèges Tes serviteurs pieux.',
        en: 'O my Lord, in Your name I lie down on my side, and in Your name I raise it. If You hold my soul, then have mercy on it; and if You release it, then protect it as You protect Your righteous servants.',
        es: 'Oh Señor mío, en Tu nombre me acuesto sobre mi lado y en Tu nombre me levanto. Si retienes mi alma, ten misericordia de ella; y si la liberas, protégela como proteges a Tus siervos piadosos.'
      , de: 'O mein Herr, in Deinem Namen lege ich mich auf meine Seite, und in Deinem Namen richte ich mich wieder auf. Wenn Du meine Seele behältst, dann erbarme Dich ihrer; und wenn Du sie freigibst, dann schütze sie, wie Du Deine rechtschaffenen Diener schützt.', it: 'O mio Signore, nel Tuo nome mi stendo sul fianco e nel Tuo nome lo sollevo. Se trattieni la mia anima, abbi misericordia di essa; e se la rimandi, proteggila come proteggi i Tuoi servi pii.', nl: 'O mijn Heer, in Uw naam leg ik mij op mijn zij neer en in Uw naam richt ik mij op. Als U mijn ziel vasthoudt, heb dan genade met haar; en als U haar vrijlaat, bescherm haar dan zoals U Uw rechtschapen dienaren beschermt.', pt: 'Ó meu Senhor, em Teu nome me deito de lado e em Teu nome me levanto. Se retiveres a minha alma, tem misericórdia dela; e se a enviares de volta, protege-a como proteges os Teus servos piedosos.', tr: 'Rabbim! Senin adınla yanımı yere koyuyorum, Seninle kaldırıyorum. Canımı alırsan ona merhamet et; geri gönderirsen, salih kullarını koruduğun gibi onu koru.'},
      hadith: {
        fr: 'D\'après Abu Hurayrah (qu\'Allah l\'agrée), le Prophète ﷺ a dit : « Lorsque l\'un de vous va se coucher, qu\'il secoue son lit puis qu\'il dise cette invocation. »\nSource : Sahih al-Bukhârî (6320)',
        en: 'Narrated Abu Hurairah (may Allah be pleased with him), the Prophet ﷺ said: "When one of you goes to bed, let him shake out his bed then say this supplication."\nSource: Sahih al-Bukhari (6320)',
        es: 'Narrado por Abu Hurayrah (que Allah esté complacido con él), el Profeta ﷺ dijo: «Cuando alguno de vosotros vaya a acostarse, que sacuda su cama y luego diga esta invocación.»\nFuente: Sahih al-Bukhârî (6320)'
      , de: 'Überliefert von Abu Hurayrah (möge Allah mit ihm zufrieden sein), der Prophet ﷺ sagte: „Wenn einer von euch schlafen geht, soll er sein Bett ausschütteln und dann dieses Bittgebet sprechen.“\nQuelle: Sahih al-Bukhârî (6320)', it: 'Riportato da Abu Hurayrah (che Allah sia soddisfatto di lui), il Profeta ﷺ disse: «Quando uno di voi va a letto, che scuota il suo letto e poi dica questa invocazione.»\nFonte: Sahih al-Bukhârî (6320)', nl: 'Overgeleverd door Abu Hurayrah (moge Allah tevreden met hem zijn), de Profeet ﷺ zei: "Wanneer een van jullie gaat slapen, laat hem zijn bed afschudden en dan dit smeekgebed zeggen."\nBron: Sahih al-Bukhârî (6320)', pt: 'Narrado por Abu Hurayrah (que Allah esteja satisfeito com ele), o Profeta ﷺ disse: «Quando um de vós for deitar-se, que sacuda a sua cama e depois diga esta invocação.»\nFonte: Sahih al-Bukhârî (6320)', tr: 'Ebû Hüreyre\'den (Allah ondan razı olsun) rivayet edilmiştir; Peygamber ﷺ şöyle buyurdu: "Biriniz yatağa gittiğinde yatağını silksin, sonra bu duayı okusun."\nKaynak: Sahihu\'l-Buhârî (6320)'},
      audio: 'reveil3.mp3',
      sheet: { sub_fr: 'Version longue', sub_en: 'Extended version', sub_es: 'Versión larga', sub_de: 'Lange Version', sub_it: 'Versione lunga', sub_nl: 'Lange versie', sub_pt: 'Versão longa', sub_tr: 'Uzun versiyon' }
    },
    acc4: {
      titre: { fr: 'SUNNAHS DU PROPHÈTE ﷺ', en: 'PROPHET\'S ﷺ SUNNAH', es: 'SUNNAH DEL PROFETA ﷺ' },
      sunnah: true,
      items: {
        fr: [
          { titre: 'DORMIR SUR LE CÔTÉ DROIT', texte: 'D\'après Al-Barâ\' ibn \'Âzib, le Prophète ﷺ a dit : « Quand tu veux te coucher, couche-toi sur le côté droit. » [Sahih al-Bukhârî 6311]' },
          { titre: 'DORMIR EN ÉTAT DE PURETÉ (WUDU)', texte: 'Le Prophète ﷺ a dit : « Quand tu veux aller te coucher, accomplis les ablutions comme pour la prière. » [Sahih al-Bukhârî 6311]' },
          { titre: 'SOUFFLER DANS LES MAINS ET RÉCITER LES 3 SOURATES', texte: 'D\'après Aïcha, le Prophète ﷺ joignait ses mains, soufflait dedans, récitait Al-Ikhlas, Al-Falaq et An-Nas trois fois chacune, puis les passait sur son corps. [Sahih al-Bukhârî 5748]' },
          { titre: 'SECOUER SON LIT AVANT DE DORMIR', texte: 'Le Prophète ﷺ a dit : « Quand l\'un de vous va se coucher, qu\'il secoue son lit. » [Sahih al-Bukhârî 6320]' },
          { titre: 'COMMENCER LA JOURNÉE AVEC LE DHIKR', texte: 'Le Prophète ﷺ disait au réveil : « Al-hamdu lillâhi lladhî ahyânâ ba\'da mâ amâtanâ wa ilayhi n-nushûr. » [Sahih al-Bukhârî 6312]' }
        ],
        en: [
          { titre: 'SLEEP ON THE RIGHT SIDE', texte: 'According to Al-Bara\' ibn \'Azib, the Prophet ﷺ said: "When you want to go to bed, lie down on your right side." [Sahih al-Bukhari 6311]' },
          { titre: 'SLEEP IN A STATE OF PURITY (WUDU)', texte: 'The Prophet ﷺ said: "When you want to go to bed, perform ablution as you do for prayer." [Sahih al-Bukhari 6311]' },
          { titre: 'BLOW INTO HANDS AND RECITE THE 3 SURAHS', texte: 'According to Aisha, the Prophet ﷺ would cup his hands, blow into them, recite Al-Ikhlas, Al-Falaq and An-Nas three times each, then wipe them over his body. [Sahih al-Bukhari 5748]' },
          { titre: 'DUST THE BED BEFORE SLEEPING', texte: 'The Prophet ﷺ said: "When one of you goes to his bed, let him dust it." [Sahih al-Bukhari 6320]' },
          { titre: 'START THE DAY WITH DHIKR', texte: 'The Prophet ﷺ used to say upon waking: "Al-hamdu lillâhi lladhî ahyânâ ba\'da mâ amâtanâ wa ilayhi n-nushûr." [Sahih al-Bukhari 6312]' }
        ],
        es: [
          { titre: 'DORMIR SOBRE EL LADO DERECHO', texte: 'Según Al-Barâ\' ibn \'Âzib, el Profeta ﷺ dijo: "Cuando quieras acostarte, hazlo sobre tu lado derecho." [Sahih al-Bujari 6311]' },
          { titre: 'DORMIR EN ESTADO DE PUREZA (WUDU)', texte: 'El Profeta ﷺ dijo: "Cuando quieras ir a dormir, realiza las abluciones como para la oración." [Sahih al-Bujari 6311]' },
          { titre: 'SOPLAR EN LAS MANOS Y RECITAR LAS 3 SURAS', texte: 'Según Aisha, el Profeta ﷺ juntaba sus manos, soplaba en ellas, recitaba Al-Ikhlas, Al-Falaq y An-Nas tres veces cada una, y las pasaba por su cuerpo. [Sahih al-Bujari 5748]' },
          { titre: 'SACUDIR LA CAMA ANTES DE DORMIR', texte: 'El Profeta ﷺ dijo: "Cuando alguno de vosotros vaya a acostarse, que sacuda su cama." [Sahih al-Bujari 6320]' },
          { titre: 'COMENZAR EL DÍA CON DHIKR', texte: 'El Profeta ﷺ decía al despertar: "Al-hamdu lillâhi lladhî ahyânâ ba\'da mâ amâtanâ wa ilayhi n-nushûr." [Sahih al-Bujari 6312]' }
        ],
        de: [
          { titre: 'AUF DER RECHTEN SEITE SCHLAFEN', texte: 'Gemäß \'Â\'isha schlief der Prophet ﷺ auf seiner rechten Seite. [Sahih al-Bukhârî 6311]' },
          { titre: 'IN EINEM ZUSTAND DER REINHEIT SCHLAFEN', texte: 'Der Prophet ﷺ: "Wenn du dein Bett aufsuchen willst, vollziehe die Waschung wie zum Gebet." [Sahih al-Bukhârî 6311]' },
          { titre: 'DIE HÄNDE BLASEN UND REZITIEREN', texte: '\'Â\'isha berichtete: Der Prophet ﷺ blies in seine Hände, rezitierte die drei Quls und wischte damit über seinen Körper. [Sahih al-Bukhârî 5748]' },
          { titre: 'DAS BETT AUSSCHÜTTELN', texte: 'Der Prophet ﷺ: "Wenn einer von euch schlafen geht, soll er sein Bett ausschütteln." [Sahih al-Bukhârî 6320]' },
          { titre: 'DEN TAG MIT DHIKR BEGINNEN', texte: 'Der Prophet ﷺ: "Wenn einer von euch morgens aufwacht, soll er sagen: Al-hamdu lillâhi lladhî ahyânâ..." [Sahih al-Bukhârî 6312]' }
        ],
        it: [
          { titre: 'DORMIRE SUL LATO DESTRO', texte: 'Secondo \'Â\'isha il Profeta ﷺ dormiva sul lato destro. [Sahih al-Bukhārī 6311]' },
          { titre: 'DORMIRE IN STATO DI PUREZZA', texte: 'Il Profeta ﷺ: «Quando vuoi andare a letto, fai le abluzioni come per la preghiera.» [Sahih al-Bukhārī 6311]' },
          { titre: 'SOFFIARE NELLE MANI E RECITARE', texte: '\'Â\'isha riferì: il Profeta ﷺ soffiava nelle mani, recitava le tre Qul e le passava sul corpo. [Sahih al-Bukhārī 5748]' },
          { titre: 'SCUOTERE IL LETTO', texte: 'Il Profeta ﷺ: «Quando uno di voi va a letto, che scuota il suo letto.» [Sahih al-Bukhārī 6320]' },
          { titre: 'INIZIARE LA GIORNATA CON DHIKR', texte: 'Il Profeta ﷺ: «Quando uno di voi si sveglia, dica: Al-hamdu lillâhi lladhî ahyânâ...» [Sahih al-Bukhārī 6312]' }
        ],
        nl: [
          { titre: 'SLAPEN OP DE RECHTERZIJDE', texte: 'Volgens \'Â\'isha sliep de Profeet ﷺ op zijn rechterzijde. [Sahih al-Bukhârî 6311]' },
          { titre: 'SLAPEN IN STAAT VAN REINHEID', texte: 'De Profeet ﷺ: "Wanneer je naar bed wilt gaan, voer dan de wassing uit zoals voor het gebed." [Sahih al-Bukhârî 6311]' },
          { titre: 'IN HANDEN BLAZEN EN RECITEREN', texte: '\'Â\'isha: de Profeet ﷺ blies in zijn handen, reciteerde de drie Qul\'s en wreef daarmee over zijn lichaam. [Sahih al-Bukhârî 5748]' },
          { titre: 'HET BED AFSCHUDDEN', texte: 'De Profeet ﷺ: "Wanneer een van jullie gaat slapen, laat hem zijn bed afschudden." [Sahih al-Bukhârî 6320]' },
          { titre: 'DE DAG BEGINNEN MET DHIKR', texte: 'De Profeet ﷺ: "Wanneer een van jullie wakker wordt, laat hem zeggen: Al-hamdu lillâhi lladhî ahyânâ..." [Sahih al-Bukhârî 6312]' }
        ],
        pt: [
          { titre: 'DORMIR SOBRE O LADO DIREITO', texte: 'Segundo \'Â\'isha o Profeta ﷺ dormia sobre o lado direito. [Sahih al-Bukhārī 6311]' },
          { titre: 'DORMIR EM ESTADO DE PUREZA', texte: 'O Profeta ﷺ: «Quando quiseres ir dormir, faz a ablução como para a oração.» [Sahih al-Bukhārī 6311]' },
          { titre: 'SOPRAR NAS MÃOS E RECITAR', texte: '\'Â\'isha: o Profeta ﷺ soprava nas mãos, recitava as três Qul e passava-as pelo corpo. [Sahih al-Bukhārī 5748]' },
          { titre: 'SACUDIR A CAMA', texte: 'O Profeta ﷺ: «Quando um de vós for dormir, que sacuda a sua cama.» [Sahih al-Bukhārī 6320]' },
          { titre: 'COMEÇAR O DIA COM DHIKR', texte: 'O Profeta ﷺ: «Quando um de vós acordar, que diga: Al-hamdu lillâhi lladhî ahyânâ...» [Sahih al-Bukhārī 6312]' }
        ],
        tr: [
          { titre: 'SAĞ TARAFA YATMAK', texte: '\'Âişe\'den; Peygamber ﷺ sağ yanı üzerine yatardı. [Sahihu\'l-Buhârî 6311]' },
          { titre: 'ABDESTLİ UYUMAK', texte: 'Peygamber ﷺ: "Yatmak istediğinde namaz abdesti gibi abdest al." [Sahihu\'l-Buhârî 6311]' },
          { titre: 'ELLERİNE ÜFLEYEREK OKUMAK', texte: '\'Âişe\'den: Peygamber ﷺ ellerine üfler, üç Kul surelerini okur ve ellerini vücuduna sürerdi. [Sahihu\'l-Buhârî 5748]' },
          { titre: 'YATAĞINI SILKMAK', texte: 'Peygamber ﷺ: "Biriniz yatağa gideceğinde yatağını silksin." [Sahihu\'l-Buhârî 6320]' },
          { titre: 'GÜNE ZİKİRLE BAŞLAMAK', texte: 'Peygamber ﷺ: "Biriniz sabah uyandığında: Elhamdü lillâhillezî ahyânâ... desin." [Sahihu\'l-Buhârî 6312]' }
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas', sub_de: 'Empfohlene Praktiken', sub_it: 'Pratiche raccomandate', sub_nl: 'Aanbevolen praktijken', sub_pt: 'Práticas recomendadas', sub_tr: 'Tavsiye edilen uygulamalar' }
    }
  },

  // ===========================
  // TOILETTES
  // ===========================
  toilettes: {
    meta: {
      icon: 'images/wc.webp',
      titre: { fr: 'Toilettes', en: 'Restroom', es: 'Baño' , de: 'Toilette', it: 'Bagno', nl: 'Toilet', pt: 'Casa de Banho', tr: 'Tuvalet'},
      closingDua: { fr: 'Que tes entrées et sorties soient toujours protégées, et qu\'Allah accepte tes invocations', en: 'May your entries and exits be always protected, and may Allah accept your supplications', es: 'Que tus entradas y salidas sean siempre protegidas, y que Allah acepte tus súplicas' , de: 'Mögen deine Ein- und Ausgänge stets beschützt sein und möge Allah deine Bittgebete annehmen', it: 'Che le tue entrate e uscite siano sempre protette e che Allah accetti le tue invocazioni', nl: 'Mogen je ingangen en uitgangen altijd beschermd zijn en moge Allah je smeekgebeden aanvaarden', pt: 'Que as tuas entradas e saídas sejam sempre protegidas e que Allah aceite as tuas invocações', tr: 'Girişlerin ve çıkışların her zaman korunaklı olsun, Allah dualarını kabul etsin'}
    },
    acc1: {
      titre: { fr: 'AVANT D\'ENTRER AUX TOILETTES', en: 'BEFORE ENTERING THE RESTROOM', es: 'ANTES DE ENTRAR AL BAÑO' , de: 'VOR DEM BETRETEN DER TOILETTE', it: 'PRIMA DI ENTRARE IN BAGNO', nl: 'VOOR HET BETREDEN VAN HET TOILET', pt: 'ANTES DE ENTRAR NA CASA DE BANHO', tr: 'TUVALETE GİRMEDEN ÖNCE'},
      arabe: 'بِسْمِ اللهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
      phonetique: {
        fr: 'Bismillah.\nAllâhumma innî a\'ûdhu bika min al-khubuthi wal-khabâ\'ith',
        en: 'Bismillaah.\nAllaahummaa innee a\'oodhu bika minal khubuthi wal khabaa\'ith',
        es: 'Bismilláh.\nAlláhumma inní a\'údhu bika minal-jubúthi wal-jabáa\'ith'
      , de: 'Bismillâh.\nAllâhumma innî a\'ûdhu bika minal-khubuthi wal-khabâ\'ith', it: 'Bismillāh.\nAllāhummā innī a\'ūdhu bika minal-khubuthi wal-khabā\'ith', nl: 'Bismillaah.\nAllaahummaa innee a\'oodhu bika minal khubuthi wal khabaa\'ith', pt: 'Bismillāh.\nAllāhummā innī a\'ūdhu bika minal-khubuthi wal-khabā\'ith', tr: 'Bismillâh.\nAllâhümme innî eûzü bike minel-hubsi vel-habâis'},
      traduction: {
        fr: 'Au nom d\'Allah. Ô Allah, je cherche refuge auprès de Toi contre les démons mâles et femelles',
        en: 'In the name of Allah. O Allah, I seek refuge in You from male and female devils',
        es: 'En el nombre de Allah. Oh Allah, me refugio en Ti de los demonios masculinos y femeninos'
      , de: 'Im Namen Allahs. O Allah, ich suche Zuflucht bei Dir vor männlichen und weiblichen Teufeln.', it: 'Nel nome di Allah. O Allah, cerco rifugio in Te dai demoni maschili e femminili.', nl: 'In de naam van Allah. O Allah, ik zoek mijn toevlucht bij U voor mannelijke en vrouwelijke duivels.', pt: 'Em nome de Allah. Ó Allah, procuro refúgio em Ti dos demónios masculinos e femininos.', tr: 'Allah\'ın adıyla. Allah\'ım! Erkek ve dişi şeytanlardan Sana sığınırım.'},
      hadith: {
        fr: 'D\'après Anas ibn Mâlik (qu\'Allah l\'agrée) : « Lorsque le Prophète ﷺ entrait aux toilettes, il disait : Allâhumma innî a\'ûdhu bika min al-khubuthi wal-khabâ\'ith. »\nSource : Sahih al-Bukhârî (142) · Sahih Muslim (375)',
        en: 'Narrated Anas ibn Malik (may Allah be pleased with him): "When the Prophet ﷺ entered the restroom, he would say: Allahumma inni a\'udhu bika min al-khubuthi wal-khaba\'ith."\nSource: Sahih al-Bukhari (142) · Sahih Muslim (375)',
        es: 'Narrado por Anas ibn Mâlik (que Allah esté complacido con él): «Cuando el Profeta ﷺ entraba al baño, decía: Allâhumma innî a\'ûdhu bika min al-khubuthi wal-khabâ\'ith.»\nFuente: Sahih al-Bukhârî (142) · Sahih Muslim (375)'
      , de: 'Überliefert von Anas ibn Mâlik (möge Allah mit ihm zufrieden sein): „Wenn der Prophet ﷺ die Toilette betrat, sagte er: Allâhumma innî a\'ûdhu bika minal-khubuthi wal-khabâ\'ith.“\nQuelle: Sahih al-Bukhârî (142) · Sahih Muslim (375)', it: 'Riportato da Anas ibn Mâlik (che Allah sia soddisfatto di lui): «Quando il Profeta ﷺ entrava in bagno, diceva: Allāhummā innī a\'ūdhu bika minal-khubuthi wal-khabā\'ith.»\nFonte: Sahih al-Bukhârî (142) · Sahih Muslim (375)', nl: 'Overgeleverd door Anas ibn Mâlik (moge Allah tevreden met hem zijn): "Wanneer de Profeet ﷺ het toilet betrad, zei hij: Allaahummaa innee a\'oodhu bika minal khubuthi wal khabaa\'ith."\nBron: Sahih al-Bukhârî (142) · Sahih Muslim (375)', pt: 'Narrado por Anas ibn Mâlik (que Allah esteja satisfeito com ele): «Quando o Profeta ﷺ entrava na casa de banho, dizia: Allāhummā innī a\'ūdhu bika minal-khubuthi wal-khabā\'ith.»\nFonte: Sahih al-Bukhârî (142) · Sahih Muslim (375)', tr: 'Enes b. Mâlik\'ten (Allah ondan razı olsun) rivayet edilmiştir: "Peygamber ﷺ tuvalete girerken: Allâhümme innî eûzü bike minel-hubsi vel-habâis, derdi."\nKaynak: Sahihu\'l-Buhârî (142) · Sahih Muslim (375)'},
      audio: 'toilettes1.mp3',
      sheet: { sub_fr: 'Protection contre le mal', sub_en: 'Protection from evil', sub_es: 'Protección del mal', sub_de: 'Schutz vor dem Bösen', sub_it: 'Protezione dal male', sub_nl: 'Bescherming tegen kwaad', sub_pt: 'Proteção do mal', sub_tr: 'Kötülükten korunma' }
    },
    acc2: {
      titre: { fr: 'APRÈS ÊTRE SORTI DES TOILETTES', en: 'AFTER LEAVING THE RESTROOM', es: 'AL SALIR DEL BAÑO' , de: 'NACH DEM VERLASSEN DER TOILETTE', it: 'DOPO ESSERE USCITO DAL BAGNO', nl: 'NA HET VERLATEN VAN HET TOILET', pt: 'AO SAIR DA CASA DE BANHO', tr: 'TUVALETTEN ÇIKTIKTAN SONRA'},
      arabe: 'غُفْرَانَكَ',
      phonetique: { fr: 'Ghufrânak', en: 'Ghufraanak', es: 'Ghufraanak' , de: 'Ghufrânak', it: 'Ghufrānak', nl: 'Ghufraanak', pt: 'Ghufrānak', tr: 'Gufrâneke'},
      traduction: { fr: '(Ô Allah) Pardonne-moi', en: '(O Allah) Grant me Your forgiveness', es: '(Oh Allah) Concédeme Tu perdón' , de: '(O Allah) Vergib mir', it: '(O Allah) Concedimi il Tuo perdono', nl: '(O Allah) Schenk mij Uw vergiffenis', pt: '(Ó Allah) Concede-me o Teu perdão', tr: '(Allah\'ım) Bağışlamanı dilerim'},
      hadith: {
        fr: 'D\'après \'Â\'ishah (qu\'Allah l\'agrée) : « Lorsque le Prophète ﷺ sortait des toilettes, il disait : Ghufrânaka. »\nSource : Jami\' at-Tirmidhi (7) · Sunan Abu Daoud (30) · Ibn Mâjah (300)',
        en: 'Narrated \'A\'ishah (may Allah be pleased with her): "When the Prophet ﷺ came out of the restroom, he would say: Ghufraanak."\nSource: Jami\' at-Tirmidhi (7) · Sunan Abu Dawud (30) · Ibn Majah (300)',
        es: 'Narrado por \'Â\'ishah (que Allah esté complacida con ella): «Cuando el Profeta ﷺ salía del baño, decía: Ghufrânaka.»\nFuente: Jami\' at-Tirmidhi (7) · Sunan Abu Daoud (30) · Ibn Mâjah (300)'
      , de: 'Überliefert von \'Â\'isha (möge Allah mit ihr zufrieden sein): „Wenn der Prophet ﷺ die Toilette verließ, sagte er: Ghufrânak.“\nQuelle: Jâmi\' at-Tirmidhi (7) · Sunan Abî Dâwûd (30) · Ibn Mâjah (300)', it: 'Riportato da \'Â\'isha (che Allah sia soddisfatta di lei): «Quando il Profeta ﷺ usciva dal bagno, diceva: Ghufrānak.»\nFonte: Jâmi\' at-Tirmidhi (7) · Sunan Abî Dâwûd (30) · Ibn Mâjah (300)', nl: 'Overgeleverd door \'Â\'isha (moge Allah tevreden met haar zijn): "Wanneer de Profeet ﷺ het toilet verliet, zei hij: Ghufraanak."\nBron: Jâmi\' at-Tirmidhi (7) · Sunan Abî Dâwûd (30) · Ibn Mâjah (300)', pt: 'Narrado por \'Â\'isha (que Allah esteja satisfeito com ela): «Quando o Profeta ﷺ saía da casa de banho, dizia: Ghufrānak.»\nFonte: Jâmi\' at-Tirmidhi (7) · Sunan Abî Dâwûd (30) · Ibn Mâjah (300)', tr: '\'Âişe\'den (Allah ondan razı olsun) rivayet edilmiştir: "Peygamber ﷺ tuvaletten çıkınca: Gufrâneke, derdi."\nKaynak: Câmi\'u\'t-Tirmizî (7) · Sünen-i Ebî Dâvûd (30) · İbn Mâce (300)'},
      audio: 'toilettes2.mp3',
      sheet: { sub_fr: 'Ghufraanak', sub_en: 'Ghufraanak', sub_es: 'Ghufraanak', sub_de: 'Ghufrânak', sub_it: 'Ghufrānak', sub_nl: 'Ghufraanak', sub_pt: 'Ghufrānak', sub_tr: 'Gufrâneke' }
    },
    acc3: {
      titre: { fr: 'SUNNAHS DU PROPHÈTE ﷺ', en: 'PROPHET\'S ﷺ SUNNAH', es: 'SUNNAH DEL PROFETA ﷺ' },
      sunnah: true,
      items: {
        fr: [
          { titre: 'ENTRER PIED GAUCHE', texte: 'D\'après Abou Hourayra : « Le Messager d\'Allah entrait aux toilettes pied gauche, sortait pied droit. » Tirmidhi n°16' },
          { titre: 'SE NETTOYER AVEC LA MAIN GAUCHE', texte: 'D\'après Salman al-Farisi : « La main droite est pour manger et boire, la main gauche pour se nettoyer des impuretés. »' },
          { titre: 'NE PAS PARLER AUX TOILETTES', texte: 'D\'après Aïcha : « Le Messager d\'Allah ﷺ n\'a jamais parlé une seule fois aux toilettes. » Muslim n°262 - Sahih' }
        ],
        en: [
          { titre: 'ENTER WITH LEFT FOOT', texte: 'Abu Hurairah reported: "The Messenger of Allah entered the restroom with his left foot and exited with his right." Tirmidhi 16' },
          { titre: 'CLEAN WITH THE LEFT HAND', texte: 'Salman al-Farisi: "The right hand is for eating and drinking, the left for cleaning impurities."' },
          { titre: 'DO NOT SPEAK IN THE RESTROOM', texte: 'Aisha reported: "The Messenger of Allah ﷺ never spoke a single time in the restroom." Muslim 262 - Sahih' }
        ],
        es: [
          { titre: 'ENTRAR CON EL PIE IZQUIERDO', texte: 'Abu Hurairah narró: "El Mensajero de Allah entraba al baño con el pie izquierdo y salía con el derecho." Tirmidhi 16' },
          { titre: 'LIMPIARSE CON LA MANO IZQUIERDA', texte: 'Salman al-Farisi: "La mano derecha es para comer y beber, la izquierda para limpiar las impurezas."' },
          { titre: 'NO HABLAR EN EL BAÑO', texte: 'Aisha narró: "El Mensajero de Allah ﷺ nunca habló ni una sola vez en el baño." Muslim 262 - Sahih' }
        ],
        de: [
          { titre: 'MIT DEM LINKEN FUSS EINTRETEN', texte: 'Gemäß Abû Hurayra: „Der Gesandte Allahs betrat die Toilette mit dem linken Fuß und verließ sie mit dem rechten." Tirmidhi Nr. 16' },
          { titre: 'MIT DER LINKEN HAND REINIGEN', texte: 'Salman al-Fârisî: „Die rechte Hand ist zum Essen und Trinken, die linke zum Reinigen von Unreinheiten."' },
          { titre: 'NICHT AUF DER TOILETTE SPRECHEN', texte: 'Gemäß \'Â\'isha: „Der Gesandte Allahs ﷺ hat auf der Toilette kein einziges Mal gesprochen." Muslim Nr. 262 - Sahih' }
        ],
        it: [
          { titre: 'ENTRARE CON IL PIEDE SINISTRO', texte: 'Secondo Abû Hurayra: «Il Messaggero di Allah entrava in bagno con il piede sinistro e usciva con il destro.» Tirmidhi n°16' },
          { titre: 'PULIRSI CON LA MANO SINISTRA', texte: 'Salman al-Fârisî: «La mano destra è per mangiare e bere, la sinistra per pulirsi dalle impurità.»' },
          { titre: 'NON PARLARE IN BAGNO', texte: 'Secondo \'Â\'isha: «Il Messaggero di Allah ﷺ non ha mai parlato nemmeno una volta in bagno.» Muslim n°262 - Sahih' }
        ],
        nl: [
          { titre: 'BINNENGAAN MET DE LINKERVOET', texte: 'Volgens Abû Hurayra: "De Boodschapper van Allah ging het toilet binnen met zijn linkervoet en verliet het met zijn rechtervoet." Tirmidhi nr. 16' },
          { titre: 'REINIGEN MET DE LINKERHAND', texte: 'Salman al-Fârisî: "De rechterhand is voor eten en drinken, de linkerhand voor het reinigen van onreinheden."' },
          { titre: 'NIET SPREKEN OP HET TOILET', texte: 'Volgens \'Â\'isha: "De Boodschapper van Allah ﷺ heeft nooit ook maar één keer gesproken op het toilet." Muslim nr. 262 - Sahih' }
        ],
        pt: [
          { titre: 'ENTRAR COM O PÉ ESQUERDO', texte: 'Segundo Abû Hurayra: «O Mensageiro de Allah entrava na casa de banho com o pé esquerdo e saía com o direito.» Tirmidhi n°16' },
          { titre: 'LIMPAR-SE COM A MÃO ESQUERDA', texte: 'Salman al-Fârisî: «A mão direita é para comer e beber, a esquerda para limpar as impurezas.»' },
          { titre: 'NÃO FALAR NA CASA DE BANHO', texte: 'Segundo \'Â\'isha: «O Mensageiro de Allah ﷺ nunca falou uma única vez na casa de banho.» Muslim n°262 - Sahih' }
        ],
        tr: [
          { titre: 'SOL AYAKLA GİRMEK', texte: 'Ebû Hureyre\'den: "Allah\'ın Rasûlü tuvalete sol ayağıyla girer, sağ ayağıyla çıkardı." Tirmizî n°16' },
          { titre: 'SOL ELLE TEMİZLENMEK', texte: 'Selmân el-Fârisî: "Sağ el yemek ve içmek içindir, sol el ise pisliği temizlemek içindir."' },
          { titre: 'TUVALETTE KONUŞMAMAK', texte: '\'Âişe\'den: "Allah\'ın Rasûlü ﷺ tuvalette hiç konuşmamıştır." Muslim n°262 - Sahih' }
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas', sub_de: 'Empfohlene Praktiken', sub_it: 'Pratiche raccomandate', sub_nl: 'Aanbevolen praktijken', sub_pt: 'Práticas recomendadas', sub_tr: 'Tavsiye edilen uygulamalar' }
    }
  },

  // ===========================
  // MAISON
  // ===========================
  maison: {
    meta: {
      icon: 'images/maison.webp',
      titre: { fr: 'Maison', en: 'Home', es: 'Casa' , de: 'Zuhause', it: 'Casa', nl: 'Thuis', pt: 'Casa', tr: 'Ev'},
      closingDua: { fr: 'Que tes entrées et sorties soient bénies', en: 'May your entrances and exits be blessed', es: 'Que tus entradas y salidas sean bendecidas' , de: 'Mögen deine Eintritte und Ausgänge gesegnet sein', it: 'Che le tue entrate e uscite siano benedette', nl: 'Mogen je ingangen en uitgangen gezegend zijn', pt: 'Que as tuas entradas e saídas sejam abençoadas', tr: 'Girişlerin ve çıkışların bereketli olsun'}
    },
    acc1: {
      titre: { fr: 'QUAND ON ENTRE CHEZ SOI', en: 'WHEN ENTERING HOME', es: 'AL ENTRAR A CASA' , de: 'WENN MAN NACH HAUSE KOMMT', it: 'QUANDO SI ENTRA IN CASA', nl: 'BIJ HET THUISKOMEN', pt: 'AO ENTRAR EM CASA', tr: 'EVE GİRERKEN'},
      arabe: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
      phonetique: {
        fr: 'Bismillâhi walajnâ, wa bismillâhi kharajnâ, wa \'alâ Allâhi rabbinâ tawakkalnâ',
        en: 'Bismillaahi walajnaa, wa bismillaahi kharajnaa, wa \'alallaahi rabbinaa tawakkalnaa',
        es: 'Bismilláahi walajnáa, wa bismilláahi kharajnáa, wa \'alalláahi rabbiná tawakkalnáa'
      , de: 'Bismillâhi walajnâ, wa bismillâhi kharajnâ, wa \'alâ Allâhi rabbinâ tawakkalnâ', it: 'Bismillāhi walajnā, wa bismillāhi kharajnā, wa \'alā Allāhi rabbinā tawakkalnā', nl: 'Bismillaahi walajnaa, wa bismillaahi kharajnaa, wa \'alallaahi rabbinaa tawakkalnaa', pt: 'Bismillāhi walajnā, wa bismillāhi kharajnā, wa \'alā Allāhi rabbinā tawakkalnā', tr: 'Bismillâhi velecnâ ve bismillâhi haracnâ ve \'alellâhi rabbenâ tevekkelnâ'},
      traduction: {
        fr: 'Au nom d\'Allah nous entrons, au nom d\'Allah nous sortons, et sur Allah notre Seigneur nous nous reposons.',
        en: 'In the name of Allah we enter, in the name of Allah we leave, and upon Allah our Lord we rely.',
        es: 'En el nombre de Allah entramos, en el nombre de Allah salimos, y en Allah nuestro Señor confiamos.'
      , de: 'Im Namen Allahs betreten wir es, im Namen Allahs verlassen wir es, und auf Allah, unseren Herrn, vertrauen wir.', it: 'Nel nome di Allah entriamo, nel nome di Allah usciamo, e in Allah nostro Signore confidiamo.', nl: 'In de naam van Allah gaan wij naar binnen, in de naam van Allah verlaten wij het, en op Allah onze Heer vertrouwen wij.', pt: 'Em nome de Allah entramos, em nome de Allah saímos, e em Allah nosso Senhor confiamos.', tr: 'Allah\'ın adıyla girdik, Allah\'ın adıyla çıktık, Rabbimiz Allah\'a tevekkül ettik.'},
      hadith: {
        fr: 'D\'après Abu Mâlik al-Ash\'arî (qu\'Allah l\'agrée), le Prophète ﷺ a dit : « Lorsque l\'un de vous entre chez lui, qu\'il dise : Bismillâhi walajnâ... puis qu\'il salue sa famille. »\nSource : Sunan Abu Daoud (5096)',
        en: 'Narrated Abu Malik al-Ash\'ari (may Allah be pleased with him), the Prophet ﷺ said: "When one of you enters his home, let him say: Bismillahi walajnaa... then let him greet his family."\nSource: Sunan Abu Dawud (5096)',
        es: 'Narrado por Abu Mâlik al-Ash\'arî (que Allah esté complacido con él), el Profeta ﷺ dijo: «Cuando alguno de vosotros entre en su casa, que diga: Bismillâhi walajnâ... y luego salude a su familia.»\nFuente: Sunan Abu Daoud (5096)'
      , de: 'Überliefert von Abu Mâlik al-Ash\'arî (möge Allah mit ihm zufrieden sein), der Prophet ﷺ sagte: „Wenn einer von euch sein Haus betritt, soll er sagen: Bismillâhi walajnâ... und dann seine Familie grüßen.“\nQuelle: Sunan Abî Dâwûd (5096)', it: 'Riportato da Abu Mâlik al-Ash\'arî (che Allah sia soddisfatto di lui), il Profeta ﷺ disse: «Quando uno di voi entra in casa, che dica: Bismillāhi walajnā... e poi saluti la sua famiglia.»\nFonte: Sunan Abî Dâwûd (5096)', nl: 'Overgeleverd door Abu Mâlik al-Ash\'arî (moge Allah tevreden met hem zijn), de Profeet ﷺ zei: "Wanneer een van jullie zijn huis binnengaat, laat hem zeggen: Bismillaahi walajnaa... en dan zijn familie begroeten."\nBron: Sunan Abî Dâwûd (5096)', pt: 'Narrado por Abu Mâlik al-Ash\'arî (que Allah esteja satisfeito com ele), o Profeta ﷺ disse: «Quando um de vós entrar na sua casa, que diga: Bismillāhi walajnā... e depois saúde a sua família.»\nFonte: Sunan Abî Dâwûd (5096)', tr: 'Ebû Mâlik el-Eş\'arî\'den (Allah ondan razı olsun) rivayet edilmiştir; Peygamber ﷺ şöyle buyurdu: "Biriniz evine girerken: Bismillâhi velecnâ... desin, ardından ailesini selamlasın."\nKaynak: Sünen-i Ebî Dâvûd (5096)'},
      audio: 'maison1.mp3',
      sheet: { sub_fr: 'Invocation d\'entrée', sub_en: 'Entry supplication', sub_es: 'Invocación de entrada', sub_de: 'Eintrittsbittgebet', sub_it: 'Invocazione d\'entrata', sub_nl: 'Binnentredenssmeekgebed', sub_pt: 'Invocação de entrada', sub_tr: 'Giriş duası' }
    },
    acc2: {
      titre: { fr: 'VARIANTE PLUS COMPLÈTE (RECOMMANDÉE)', en: 'MORE COMPLETE VARIANT (RECOMMENDED)', es: 'VARIANTE MÁS COMPLETA (RECOMENDADA)' , de: 'VOLLSTÄNDIGERE VARIANTE (EMPFOHLEN)', it: 'VARIANTE PIÙ COMPLETA (RACCOMANDATA)', nl: 'MEER VOLLEDIGE VARIANT (AANBEVOLEN)', pt: 'VARIANTE MAIS COMPLETA (RECOMENDADA)', tr: 'DAHA TAM VERSİYON (TAVSİYE EDİLEN)'},
      arabe: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ، بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
      phonetique: {
        fr: 'Allâhumma innî as\'aluka khayra l-mawlaji wa khayra l-makhraji, bismillâhi walajnâ, wa bismillâhi kharajnâ, wa \'alâ Allâhi rabbinâ tawakkalnâ.',
        en: 'Allaahummaa innee as\'aluka khayral-mawlaji wa khayral-makhraji, bismillaahi walajnaa, wa bismillaahi kharajnaa, wa \'alallaahi rabbinaa tawakkalnaa.',
        es: 'Alláhummaa innee as\'aluka khayral-mawlaji wa khayral-makhraji, bismilláahi walajnáa, wa bismilláahi kharajnáa, wa \'alalláahi rabbináa tawakkalnáa.'
      , de: 'Allâhumma innî as\'aluka khayral-mawlaji wa khayral-makhraji, bismillâhi walajnâ, wa bismillâhi kharajnâ, wa \'alâ Allâhi rabbinâ tawakkalnâ.', it: 'Allāhummā innī as\'aluka khayral-mawlaji wa khayral-makhraji, bismillāhi walajnā, wa bismillāhi kharajnā, wa \'alā Allāhi rabbinā tawakkalnā.', nl: 'Allaahummaa innee as\'aluka khayral-mawlaji wa khayral-makhraji, bismillaahi walajnaa, wa bismillaahi kharajnaa, wa \'alallaahi rabbinaa tawakkalnaa.', pt: 'Allāhummā innī as\'aluka khayral-mawlaji wa khayral-makhraji, bismillāhi walajnā, wa bismillāhi kharajnā, wa \'alā Allāhi rabbinā tawakkalnā.', tr: 'Allâhümme innî es\'elüke hayrel-mevleci ve hayrel-mahrecî, bismillâhi velecnâ ve bismillâhi haracnâ ve \'alellâhi rabbenâ tevekkelnâ.'},
      traduction: {
        fr: 'Ô Allah, je Te demande le meilleur dans l\'entrée et le meilleur dans la sortie. Au nom d\'Allah nous entrons, au nom d\'Allah nous sortons, et sur Allah notre Seigneur nous nous reposons.',
        en: 'O Allah, I ask You for the best of entering and the best of leaving. In the name of Allah we enter, in the name of Allah we leave, and upon Allah our Lord we rely.',
        es: 'Oh Allah, Te pido lo mejor en la entrada y lo mejor en la salida. En el nombre de Allah entramos, en el nombre de Allah salimos, y en Allah nuestro Señor confiamos.'
      , de: 'O Allah, ich bitte Dich um das Beste beim Eintreten und das Beste beim Verlassen. Im Namen Allahs betreten wir es, im Namen Allahs verlassen wir es, und auf Allah, unseren Herrn, vertrauen wir.', it: 'O Allah, Ti chiedo il meglio nell\'entrare e il meglio nell\'uscire. Nel nome di Allah entriamo, nel nome di Allah usciamo, e in Allah nostro Signore confidiamo.', nl: 'O Allah, ik vraag U het beste bij het binnengaan en het beste bij het verlaten. In de naam van Allah gaan wij naar binnen, in de naam van Allah verlaten wij het, en op Allah onze Heer vertrouwen wij.', pt: 'Ó Allah, peço-Te o melhor na entrada e o melhor na saída. Em nome de Allah entramos, em nome de Allah saímos, e em Allah nosso Senhor confiamos.', tr: 'Allah\'ım! Senden giriş ve çıkışımda hayır dilerim. Allah\'ın adıyla girdik, Allah\'ın adıyla çıktık, Rabbimiz Allah\'a tevekkül ettik.'},
      hadith: {
        fr: 'D\'après Abu Mâlik al-Ash\'arî (qu\'Allah l\'agrée), le Prophète ﷺ a dit : « Lorsque l\'un de vous entre chez lui, qu\'il dise cette invocation puis qu\'il salue sa famille. »\nSource : Sunan Abu Daoud (5096)',
        en: 'Narrated Abu Malik al-Ash\'ari (may Allah be pleased with him), the Prophet ﷺ said: "When one of you enters his home, let him say this supplication then greet his family."\nSource: Sunan Abu Dawud (5096)',
        es: 'Narrado por Abu Mâlik al-Ash\'arî (que Allah esté complacido con él), el Profeta ﷺ dijo: «Cuando alguno entre en su casa, que diga esta invocación y luego salude a su familia.»\nFuente: Sunan Abu Daoud (5096)'
      , de: 'Überliefert von Abu Mâlik al-Ash\'arî (möge Allah mit ihm zufrieden sein), der Prophet ﷺ sagte: „Wenn jemand sein Haus betritt, soll er dieses Bittgebet sprechen und dann seine Familie grüßen.“\nQuelle: Sunan Abî Dâwûd (5096)', it: 'Riportato da Abu Mâlik al-Ash\'arî (che Allah sia soddisfatto di lui), il Profeta ﷺ disse: «Quando qualcuno entra in casa, che dica questa invocazione e poi saluti la sua famiglia.»\nFonte: Sunan Abî Dâwûd (5096)', nl: 'Overgeleverd door Abu Mâlik al-Ash\'arî (moge Allah tevreden met hem zijn), de Profeet ﷺ zei: "Wanneer iemand zijn huis binnengaat, laat hem dit smeekgebed zeggen en dan zijn familie begroeten."\nBron: Sunan Abî Dâwûd (5096)', pt: 'Narrado por Abu Mâlik al-Ash\'arî (que Allah esteja satisfeito com ele), o Profeta ﷺ disse: «Quando alguém entrar em casa, que diga esta invocação e depois saúde a sua família.»\nFonte: Sunan Abî Dâwûd (5096)', tr: 'Ebû Mâlik el-Eş\'arî\'den (Allah ondan razı olsun) rivayet edilmiştir; Peygamber ﷺ şöyle buyurdu: "Biri evine girdiğinde bu duayı okusun, ardından ailesini selamlasın."\nKaynak: Sünen-i Ebî Dâvûd (5096)'},
      audio: 'maison2.mp3',
      sheet: { sub_fr: 'Version plus complète', sub_en: 'More complete version', sub_es: 'Versión más completa', sub_de: 'Vollständigere Version', sub_it: 'Versione più completa', sub_nl: 'Meer volledige versie', sub_pt: 'Versão mais completa', sub_tr: 'Daha tam versiyon' }
    },
    acc3: {
      titre: { fr: 'INVOCATION QUAND ON SORT', en: 'SUPPLICATION WHEN LEAVING', es: 'INVOCACIÓN AL SALIR' , de: 'BITTGEBET BEIM HINAUSGEHEN', it: 'INVOCAZIONE QUANDO SI ESCE', nl: 'SMEEKGEBED BIJ HET VERLATEN', pt: 'INVOCAÇÃO AO SAIR', tr: 'ÇIKARKEN OKUNACAK DUA'},
      arabe: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
      phonetique: {
        fr: 'Bismillâh, tawakkaltu \'alâ Allâh, wa lâ hawla wa lâ quwwata illâ billâh',
        en: 'Bismillaah, tawakkaltu \'alallaah, wa laa hawla wa laa quwwata illaa billaah',
        es: 'Bismilláah, tawakkaltu \'alalláah, wa laa hawla wa laa qúwwata illaa billáah'
      , de: 'Bismillâh, tawakkaltu \'alâ Allâh, wa lâ hawla wa lâ quwwata illâ billâh', it: 'Bismillāh, tawakkaltu \'alā Allāh, wa lā ḥawla wa lā quwwata illā billāh', nl: 'Bismillaah, tawakkaltu \'alallaah, wa laa hawla wa laa quwwata illaa billaah', pt: 'Bismillāh, tawakkaltu \'alā Allāh, wa lā ḥawla wa lā quwwata illā billāh', tr: 'Bismillâh, tevekkeltü \'alellâh, ve lâ havle ve lâ kuvvete illâ billâh'},
      traduction: {
        fr: 'Au nom d\'Allah, je place ma confiance en Allah, et il n\'y a de force ni de puissance qu\'en Allah',
        en: 'In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.',
        es: 'En el nombre de Allah, confío en Allah, y no hay fuerza ni poder excepto con Allah.'
      , de: 'Im Namen Allahs, ich vertraue auf Allah, und es gibt keine Kraft noch Macht außer bei Allah.', it: 'Nel nome di Allah, ripongo la mia fiducia in Allah, e non c\'è forza né potere se non in Allah.', nl: 'In de naam van Allah, ik stel mijn vertrouwen in Allah, en er is geen macht noch kracht behalve bij Allah.', pt: 'Em nome de Allah, deposito a minha confiança em Allah, e não há força nem poder senão em Allah.', tr: 'Allah\'ın adıyla, Allah\'a tevekkül ettim. Güç ve kuvvet ancak Allah\'a mahsustur.'},
      hadith: {
        fr: 'D\'après Abu Mâlik al-Ash\'arî (qu\'Allah l\'agrée), le Prophète ﷺ enseignait cette invocation pour celui qui sort de chez lui.\nSource : Sunan Abu Daoud (5095)',
        en: 'Narrated Abu Malik al-Ash\'ari (may Allah be pleased with him), the Prophet ﷺ taught this supplication for when leaving the home.\nSource: Sunan Abu Dawud (5095)',
        es: 'Narrado por Abu Mâlik al-Ash\'arî (que Allah esté complacido con él), el Profeta ﷺ enseñaba esta invocación para cuando se sale de casa.\nFuente: Sunan Abu Daoud (5095)'
      , de: 'Überliefert von Abu Mâlik al-Ash\'arî (möge Allah mit ihm zufrieden sein), der Prophet ﷺ lehrte dieses Bittgebet für den Moment, wenn man das Haus verlässt.\nQuelle: Sunan Abî Dâwûd (5095)', it: 'Riportato da Abu Mâlik al-Ash\'arî (che Allah sia soddisfatto di lui), il Profeta ﷺ insegnava questa invocazione per quando si esce di casa.\nFonte: Sunan Abî Dâwûd (5095)', nl: 'Overgeleverd door Abu Mâlik al-Ash\'arî (moge Allah tevreden met hem zijn), de Profeet ﷺ leerde dit smeekgebed voor het moment waarop men het huis verlaat.\nBron: Sunan Abî Dâwûd (5095)', pt: 'Narrado por Abu Mâlik al-Ash\'arî (que Allah esteja satisfeito com ele), o Profeta ﷺ ensinava esta invocação para quando se sai de casa.\nFonte: Sunan Abî Dâwûd (5095)', tr: 'Ebû Mâlik el-Eş\'arî\'den (Allah ondan razı olsun) rivayet edilmiştir; Peygamber ﷺ bu duayı evden çıkarken okunmak üzere öğretirdi.\nKaynak: Sünen-i Ebî Dâvûd (5095)'},
      audio: 'maison3.mp3',
      sheet: { sub_fr: 'Tawakkul sur Allah', sub_en: 'Trust in Allah', sub_es: 'Tawakkul en Allah', sub_de: 'Tawakkul auf Allah', sub_it: 'Tawakkul in Allah', sub_nl: 'Tawakkul op Allah', sub_pt: 'Tawakkul em Allah', sub_tr: 'Allah\'a tevekkül' }
    },
    acc4: {
      titre: { fr: 'PROTECTION CONTRE L\'ÉGAREMENT', en: 'PROTECTION AGAINST GOING ASTRAY', es: 'PROTECCIÓN CONTRA EL EXTRAVÍO' , de: 'SCHUTZ VOR DEM IRREGEHEN', it: 'PROTEZIONE CONTRO LO SMARRIMENTO', nl: 'BESCHERMING TEGEN DWALEN', pt: 'PROTEÇÃO CONTRA O DESVIO', tr: 'SAPMAYA KARŞI KORUMA'},
      arabe: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ',
      phonetique: {
        fr: 'Allâhumma innî a\'ûdhu bika an adilla aw udalla, aw azilla aw uzalla, aw azlima aw uzlama, aw ajhala aw yujhala \'alayya.',
        en: 'Allaahummaa innee a\'oodhu bika an adilla aw udalla, aw azilla aw uzalla, aw athlima aw uthlama, aw ajhala aw yujhala \'alayya.',
        es: 'Alláhummaa innee a\'údhu bika an adilla aw udalla, aw azilla aw uzalla, aw athlima aw uthlama, aw ayhala aw yuyhaala \'alayya.'
      , de: 'Allâhumma innî a\'ûdhu bika an adilla aw udalla, aw azilla aw uzalla, aw azlima aw uzlama, aw ajhala aw yujhala \'alayya.', it: 'Allāhummā innī a\'ūdhu bika an aḍilla aw uḍalla, aw azilla aw uzalla, aw aẓlima aw uẓlama, aw ajhala aw yujhala \'alayya.', nl: 'Allaahummaa innee a\'oodhu bika an adilla aw udalla, aw azilla aw uzalla, aw athlima aw uthlama, aw ajhala aw yujhala \'alayya.', pt: 'Allāhummā innī a\'ūdhu bika an aḍilla aw uḍalla, aw azilla aw uzalla, aw aẓlima aw uẓlama, aw ajhala aw yujhala \'alayya.', tr: 'Allâhümme innî eûzü bike en edille ev üdalle, ev ezille ev üzalle, ev ezlime ev üzleme, ev echele ev yüchele \'aleyye.'},
      traduction: {
        fr: 'Ô Allah, je cherche refuge auprès de Toi contre le fait d\'égarer ou d\'être égaré, de glisser ou de faire glisser, d\'opprimer ou d\'être opprimé, d\'être ignorant ou qu\'on soit ignorant envers moi',
        en: 'O Allah, I seek refuge in You from going astray or being led astray, from slipping or causing others to slip, from oppressing or being oppressed, from being ignorant or having others be ignorant toward me.',
        es: 'Oh Allah, me refugio en Ti de extraviarme o ser extraviado, de resbalar o hacer resbalar, de oprimir o ser oprimido, de ser ignorante o que se sea ignorante conmigo.'
      , de: 'O Allah, ich suche Zuflucht bei Dir davor, zu verirren oder verirrt zu werden, auszugleiten oder andere ausgleiten zu lassen, zu unterdrücken oder unterdrückt zu werden, unwissend zu sein oder dass man mir gegenüber unwissend ist.', it: 'O Allah, cerco rifugio in Te dal perdermi o essere portato fuori strada, dallo scivolare o far scivolare altri, dall\'opprimere o essere oppresso, dall\'essere ignorante o che altri siano ignoranti nei miei confronti.', nl: 'O Allah, ik zoek mijn toevlucht bij U voor het afdwalen of misleid worden, voor het uitglijden of anderen doen uitglijden, voor het onderdrukken of onderdrukt worden, voor het onwetend zijn of dat anderen onwetend tegenover mij zijn.', pt: 'Ó Allah, procuro refúgio em Ti de me perder ou ser desviado, de escorregar ou fazer escorregar, de oprimir ou ser oprimido, de ser ignorante ou que se seja ignorante em relação a mim.', tr: 'Allah\'ım! Sapıtmaktan ya da saptırılmaktan, kaymaktan ya da kaydırılmaktan, zulmetmekten ya da zulme uğramaktan, cahillik etmekten ya da cahillik edilmesinden Sana sığınırım.'},
      hadith: {
        fr: 'D\'après Umm Salamah (qu\'Allah l\'agrée) : « Lorsque le Prophète ﷺ sortait de chez lui, il disait cette invocation. »\nSource : Sunan Abu Daoud (5094)',
        en: 'Narrated Umm Salamah (may Allah be pleased with her): "When the Prophet ﷺ left his home, he would say this supplication."\nSource: Sunan Abu Dawud (5094)',
        es: 'Narrado por Umm Salamah (que Allah esté complacida con ella): «Cuando el Profeta ﷺ salía de su casa, decía esta invocación.»\nFuente: Sunan Abu Daoud (5094)'
      , de: 'Überliefert von Umm Salamah (möge Allah mit ihr zufrieden sein): „Wenn der Prophet ﷺ sein Haus verließ, sprach er dieses Bittgebet.“\nQuelle: Sunan Abî Dâwûd (5094)', it: 'Riportato da Umm Salamah (che Allah sia soddisfatta di lei): «Quando il Profeta ﷺ usciva di casa, diceva questa invocazione.»\nFonte: Sunan Abî Dâwûd (5094)', nl: 'Overgeleverd door Umm Salamah (moge Allah tevreden met haar zijn): "Wanneer de Profeet ﷺ zijn huis verliet, zei hij dit smeekgebed."\nBron: Sunan Abî Dâwûd (5094)', pt: 'Narrado por Umm Salamah (que Allah esteja satisfeito com ela): «Quando o Profeta ﷺ saía de casa, dizia esta invocação.»\nFonte: Sunan Abî Dâwûd (5094)', tr: 'Ümmü Seleme\'den (Allah ondan razı olsun) rivayet edilmiştir: "Peygamber ﷺ evinden çıkarken bu duayı okurdu."\nKaynak: Sünen-i Ebî Dâvûd (5094)'},
      audio: null,
      sheet: { sub_fr: 'Contre l\'égarement', sub_en: 'Against going astray', sub_es: 'Contra el extravío', sub_de: 'Gegen das Abirren', sub_it: 'Contro lo smarrimento', sub_nl: 'Tegen het afdwalen', sub_pt: 'Contra o desvio', sub_tr: 'Sapkınlığa karşı' }
    },
    acc5: {
      titre: { fr: 'SUNNAHS DU PROPHÈTE ﷺ', en: 'PROPHET\'S ﷺ SUNNAH', es: 'SUNNAH DEL PROFETA ﷺ' },
      sunnah: true,
      items: {
        fr: [
          { titre: 'SALUE TA FAMILLE EN ENTRANT', texte: 'Le Prophète ﷺ enseignait à Anas ibn Malik de saluer sa famille en entrant chez lui. [Tirmidhi]' },
          { titre: 'MENTIONNE ALLAH EN ENTRANT ET EN MANGEANT', texte: 'D\'après Jabir ibn Abdullah, le Prophète ﷺ a dit : « Quand quelqu\'un entre chez lui et mentionne le nom d\'Allah en entrant et en mangeant, le diable dit : "Pas de nuitée ni de dîner pour vous." » [Sahih Muslim 2018]' },
          { titre: 'FERME TES PORTES LA NUIT EN DISANT BISMILLAH', texte: 'D\'après Jabir, le Prophète ﷺ a dit : « Quand la nuit tombe, retenez vos enfants. Fermez vos portes en mentionnant le nom d\'Allah, car le diable n\'ouvre pas une porte fermée. » [Sahih al-Bukhari 3280]' },
          { titre: 'RÉCITE LA SOURATE AL-BAQARAH CHEZ TOI', texte: 'D\'après Abu Hurayra, le Prophète ﷺ a dit : « Ne transformez pas vos maisons en cimetières. Le diable fuit la maison dans laquelle la Sourate Al-Baqarah est récitée. » [Sahih Muslim 780]' }
        ],
        en: [
          { titre: 'GREET YOUR FAMILY WHEN ENTERING', texte: 'The Prophet ﷺ used to teach Anas ibn Malik to greet his family when entering his home. [Tirmidhi]' },
          { titre: 'MENTION ALLAH WHEN ENTERING AND EATING', texte: 'According to Jabir ibn Abdullah, the Prophet ﷺ said: "When a person enters his home and mentions Allah upon entering and eating, the devil says: \'No lodging or dinner for us.\'" [Sahih Muslim 2018]' },
          { titre: 'CLOSE YOUR DOORS AT NIGHT SAYING BISMILLAH', texte: 'According to Jabir, the Prophet ﷺ said: "When night falls, keep your children close. Close your doors and mention the name of Allah, for Satan does not open a closed door." [Sahih al-Bukhari 3280]' },
          { titre: 'RECITE SURAH AL-BAQARAH IN YOUR HOME', texte: 'According to Abu Hurairah, the Prophet ﷺ said: "Do not turn your houses into graveyards. Satan runs away from the house in which Surah al-Baqarah is recited." [Sahih Muslim 780]' }
        ],
        es: [
          { titre: 'SALUDA A TU FAMILIA AL ENTRAR', texte: 'El Profeta ﷺ enseñaba a Anas ibn Malik a saludar a su familia al entrar en casa. [Tirmidhi]' },
          { titre: 'MENCIONA A ALLAH AL ENTRAR Y AL COMER', texte: 'Según Jabir ibn Abdullah, el Profeta ﷺ dijo: "Cuando alguien entra en su casa y menciona a Allah al entrar y al comer, el diablo dice: \'No hay alojamiento ni cena para nosotros.\'" [Sahih Muslim 2018]' },
          { titre: 'CIERRA TUS PUERTAS DE NOCHE DICIENDO BISMILLAH', texte: 'Según Jabir, el Profeta ﷺ dijo: "Cuando cae la noche, retenéd a vuestros hijos. Cerrad vuestras puertas mencionando el nombre de Allah, pues el diablo no abre una puerta cerrada." [Sahih al-Bukhari 3280]' },
          { titre: 'RECITA LA SURA AL-BAQARAH EN TU HOGAR', texte: 'Según Abu Hurairah, el Profeta ﷺ dijo: "No convirtáis vuestras casas en cementerios. El diablo huye de la casa en la que se recita la Sura Al-Baqarah." [Sahih Muslim 780]' }
        ],
        de: [
          { titre: 'FAMILIE BEIM EINTRETEN GRÜSSEN', texte: 'Der Prophet ﷺ lehrte Anas ibn Malik, beim Eintreten ins Haus seine Familie zu grüßen. [Tirmidhi]' },
          { titre: 'ALLAH BEIM EINTRETEN UND ESSEN ERWÄHNEN', texte: 'Gemäß Jabir ibn Abdullah sagte der Prophet ﷺ: „Wenn jemand sein Haus betritt und Allah beim Eintreten und Essen erwähnt, sagt der Teufel: \'Keine Nacht und kein Abendessen für uns.\'" [Sahih Muslim 2018]' },
          { titre: 'TÜREN NACHTS MIT BISMILLAH SCHLIEẞEN', texte: 'Gemäß Jabir sagte der Prophet ﷺ: „Wenn die Nacht hereinbricht, haltet eure Kinder nah. Schließt eure Türen und erwähnt den Namen Allahs, denn Satan öffnet keine geschlossene Tür." [Sahih al-Bukhârî 3280]' },
          { titre: 'SURAH AL-BAQARAH ZU HAUSE REZITIEREN', texte: 'Gemäß Abû Hurayra sagte der Prophet ﷺ: „Verwandelt eure Häuser nicht in Friedhöfe. Satan flieht vor dem Haus, in dem Surah al-Baqarah rezitiert wird." [Sahih Muslim 780]' }
        ],
        it: [
          { titre: 'SALUTARE LA FAMIGLIA ENTRANDO', texte: 'Il Profeta ﷺ insegnava ad Anas ibn Malik di salutare la sua famiglia entrando in casa. [Tirmidhi]' },
          { titre: 'MENZIONARE ALLAH ENTRANDO E MANGIANDO', texte: 'Secondo Jabir ibn Abdullah, il Profeta ﷺ disse: «Quando qualcuno entra in casa e menziona Allah entrando e mangiando, il diavolo dice: "Niente pernottamento né cena per noi."» [Sahih Muslim 2018]' },
          { titre: 'CHIUDERE LE PORTE DI NOTTE CON BISMILLAH', texte: 'Secondo Jabir, il Profeta ﷺ disse: «Quando cala la notte, tenete vicino i vostri figli. Chiudete le porte menzionando il nome di Allah, poiché Satana non apre una porta chiusa.» [Sahih al-Bukhārī 3280]' },
          { titre: 'RECITARE LA SURAH AL-BAQARAH IN CASA', texte: 'Secondo Abû Hurayra, il Profeta ﷺ disse: «Non trasformate le vostre case in cimiteri. Satana fugge dalla casa in cui viene recitata la Surah Al-Baqarah.» [Sahih Muslim 780]' }
        ],
        nl: [
          { titre: 'FAMILIE BEGROETEN BIJ BINNENKOMST', texte: 'De Profeet ﷺ leerde Anas ibn Malik zijn familie te begroeten bij het binnengaan van zijn huis. [Tirmidhi]' },
          { titre: 'ALLAH NOEMEN BIJ BINNENKOMST EN ETEN', texte: 'Volgens Jabir ibn Abdullah zei de Profeet ﷺ: "Wanneer iemand zijn huis betreedt en Allah noemt bij het binnengaan en eten, zegt de duivel: \'Geen nachtverblijf en geen avondeten voor ons.\'" [Sahih Muslim 2018]' },
          { titre: '\'S NACHTS DEUREN SLUITEN MET BISMILLAH', texte: 'Volgens Jabir zei de Profeet ﷺ: "Wanneer de nacht valt, houd uw kinderen dichtbij. Sluit uw deuren en noem de naam van Allah, want Satan opent geen gesloten deur." [Sahih al-Bukhârî 3280]' },
          { titre: 'SURAH AL-BAQARAH THUIS RECITEREN', texte: 'Volgens Abû Hurayra zei de Profeet ﷺ: "Maak uw huizen geen begraafplaatsen. Satan vlucht uit het huis waar Surah al-Baqarah wordt gereciteerd." [Sahih Muslim 780]' }
        ],
        pt: [
          { titre: 'SAUDAR A FAMÍLIA AO ENTRAR', texte: 'O Profeta ﷺ ensinava Anas ibn Malik a saudar a sua família ao entrar em casa. [Tirmidhi]' },
          { titre: 'MENCIONAR ALLAH AO ENTRAR E COMER', texte: 'Segundo Jabir ibn Abdullah, o Profeta ﷺ disse: «Quando alguém entra em casa e menciona Allah ao entrar e ao comer, o diabo diz: "Sem dormida nem jantar para nós."» [Sahih Muslim 2018]' },
          { titre: 'FECHAR AS PORTAS À NOITE COM BISMILLAH', texte: 'Segundo Jabir, o Profeta ﷺ disse: «Quando cair a noite, mantenha os vossos filhos perto. Fechai as portas mencionando o nome de Allah, pois Satanás não abre uma porta fechada.» [Sahih al-Bukhārī 3280]' },
          { titre: 'RECITAR A SURAH AL-BAQARAH EM CASA', texte: 'Segundo Abû Hurayra, o Profeta ﷺ disse: «Não transformeis as vossas casas em cemitérios. Satanás foge da casa onde a Surah Al-Baqarah é recitada.» [Sahih Muslim 780]' }
        ],
        tr: [
          { titre: 'EVE GİRERKEN AİLEYİ SELAMLAMAK', texte: 'Peygamber ﷺ, Enes ibn Mâlik\'e eve girerken ailesini selamlamasını öğretirdi. [Tirmizî]' },
          { titre: 'GİRERKEN VE YERKEN ALLAH\'I ZİKRETMEK', texte: 'Câbir ibn Abdullah\'tan; Peygamber ﷺ şöyle buyurdu: "Biri evine girdiğinde ve yemek yerken Allah\'ı zikrederse, şeytan: \'Sizin için ne gecelik ne de akşam yemeği var\' der." [Sahih Muslim 2018]' },
          { titre: 'GECELERI KAPILARI BİSMİLLAH İLE KAPAMAK', texte: 'Câbir\'den; Peygamber ﷺ şöyle buyurdu: "Gece olunca çocuklarınızı yanınıza alın. Kapıları Allah\'ın adını zikrederek kapatın, zira şeytan kapalı kapıyı açamaz." [Sahihu\'l-Buhârî 3280]' },
          { titre: 'EVDE BAKARA SURESİ OKUMAK', texte: 'Ebû Hureyre\'den; Peygamber ﷺ şöyle buyurdu: "Evlerinizi kabristana çevirmeyin. Şeytan, içinde Bakara suresi okunan evden kaçar." [Sahih Muslim 780]' }
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas', sub_de: 'Empfohlene Praktiken', sub_it: 'Pratiche raccomandate', sub_nl: 'Aanbevolen praktijken', sub_pt: 'Práticas recomendadas', sub_tr: 'Tavsiye edilen uygulamalar' }
    }
  },

  // ===========================
  // TRISTESSE
  // ===========================
  tristesse: {
    meta: {
      icon: 'images/tristesse.webp',
      titre: { fr: 'Tristesse', en: 'Sadness', es: 'Tristeza' , de: 'Traurigkeit', it: 'Tristezza', nl: 'Verdriet', pt: 'Tristeza', tr: 'Üzüntü'},
      closingDua: { fr: 'Que Allah dissipe ta tristesse et remplisse ton cœur de sérénité', en: 'May Allah dispel your sadness and fill your heart with serenity', es: 'Que Allah disipe tu tristeza y llene tu corazón de serenidad' , de: 'Möge Allah deine Traurigkeit vertreiben und dein Herz mit Gelassenheit erfüllen', it: 'Che Allah dissipi la tua tristezza e riempia il tuo cuore di serenità', nl: 'Moge Allah jouw verdriet wegnemen en jouw hart vullen met sereniteit', pt: 'Que Allah dissipe a tua tristeza e encha o teu coração de serenidade', tr: 'Allah üzüntünü gidersin ve kalbini huzurla doldursun'}
    },
    acc1: {
      titre: { fr: 'LORSQU\'ON RESSENT DE LA TRISTESSE / DU CHAGRIN', en: 'WHEN FEELING SADNESS / GRIEF / ANXIETY', es: 'CUANDO SE SIENTE TRISTEZA / PENA / ANGUSTIA' , de: 'BEI TRAURIGKEIT / KUMMER / ANGST', it: 'QUANDO SI PROVA TRISTEZZA / DOLORE / ANSIA', nl: 'BIJ HET VOELEN VAN VERDRIET / DROEFHEID / ANGST', pt: 'QUANDO SE SENTE TRISTEZA / MÁGOA / ANGÚSTIA', tr: 'ÜZÜNTÜ / KEDER / SIKINTI HİSSEDİLDİĞİNDE'},
      arabe: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْبُخْلِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
      phonetique: {
        fr: 'Allâhumma innî a\'ûdhu bika minal-hammi wal-hazani, wal-\'ajzi wal-kasali, wal-jubni wal-bukhli, wa dala\'i d-dayni wa ghalabati r-rijâli.',
        en: 'Allaahummaa innee a\'oodhu bika minal-hammi wal-hazani, wal-\'ajzi wal-kasali, wal-jubni wal-bukhli, wa dhala\'id-dayni wa ghalabatir-rijaal.',
        es: 'Alláhummaa innee a\'údhu bika minal-hammi wal-hazani, wal-\'ayzi wal-kasali, wal-yubni wal-bujli, wa dhala\'id-dayni wa ghalabatir-riyaal.'
      , de: 'Allâhumma innî a\'ûdhu bika minal-hammi wal-hazani, wal-\'ajzi wal-kasali, wal-jubni wal-bukhli, wa dala\'i d-dayni wa ghalabati r-rijâli.', it: 'Allāhummā innī a\'ūdhu bika minal-hammi wal-ḥazani, wal-\'ajzi wal-kasali, wal-jubni wal-bukhli, wa ḍala\'i d-dayni wa ghalabati r-rijāl.', nl: 'Allaahummaa innee a\'oodhu bika minal-hammi wal-hazani, wal-\'ajzi wal-kasali, wal-jubni wal-bukhli, wa dhala\'id-dayni wa ghalabatir-rijaal.', pt: 'Allāhummā innī a\'ūdhu bika minal-hammi wal-ḥazani, wal-\'ajzi wal-kasali, wal-jubni wal-bukhli, wa ḍala\'i d-dayni wa ghalabati r-rijāl.', tr: 'Allâhümme innî eûzü bike minel-hemmi vel-hazen, vel-\'aczi vel-kesel, vel-cubni vel-buhl, ve dale\'id-deyni ve gelebetir-ricâl.'},
      traduction: {
        fr: 'Ô Allah, je cherche refuge auprès de Toi contre les soucis et la tristesse, contre l\'incapacité et la paresse, contre la lâcheté et l\'avarice, contre le poids de la dette et la domination des hommes.',
        en: 'O Allah, I seek refuge in You from worry and grief, from helplessness and laziness, from cowardice and miserliness, from the burden of debt and the oppression of men.',
        es: 'Oh Allah, me refugio en Ti de la preocupación y la tristeza, de la impotencia y la pereza, de la cobardía y la avaricia, del peso de la deuda y la dominación de los hombres.'
      , de: 'O Allah, ich suche Zuflucht bei Dir vor Sorgen und Traurigkeit, vor Hilflosigkeit und Faulheit, vor Feigheit und Geiz, vor der Last der Schulden und der Unterdrückung durch Menschen.', it: 'O Allah, cerco rifugio in Te dalla preoccupazione e dalla tristezza, dall\'impotenza e dalla pigrizia, dalla vigliaccheria e dall\'avarizia, dal peso del debito e dalla dominazione degli uomini.', nl: 'O Allah, ik zoek mijn toevlucht bij U voor zorgen en verdriet, voor hulpeloosheid en luiheid, voor lafheid en gierigheid, voor de last van schulden en de overheersing door mensen.', pt: 'Ó Allah, procuro refúgio em Ti da preocupação e tristeza, da incapacidade e preguiça, da cobardia e avareza, do peso da dívida e da dominação dos homens.', tr: 'Allah\'ım! Sıkıntıdan ve üzüntüden, acizlikten ve tembellikten, korkaklıktan ve cimrilikten, borç yükünden ve insanların baskısından Sana sığınırım.'},
      hadith: {
        fr: 'D\'après Anas ibn Mâlik (qu\'Allah l\'agrée) : « Le Prophète ﷺ avait l\'habitude de dire cette invocation. »\nSource : Sahih al-Bukhârî (6369)',
        en: 'Narrated Anas ibn Malik (may Allah be pleased with him): "The Prophet ﷺ used to say this supplication."\nSource: Sahih al-Bukhari (6369)',
        es: 'Narrado por Anas ibn Mâlik (que Allah esté complacido con él): «El Profeta ﷺ solía decir esta invocación.»\nFuente: Sahih al-Bukhârî (6369)'
      , de: 'Überliefert von Anas ibn Mâlik (möge Allah mit ihm zufrieden sein): „Der Prophet ﷺ pflegte dieses Bittgebet zu sprechen.“\nQuelle: Sahih al-Bukhârî (6369)', it: 'Riportato da Anas ibn Mâlik (che Allah sia soddisfatto di lui): «Il Profeta ﷺ era solito dire questa invocazione.»\nFonte: Sahih al-Bukhârî (6369)', nl: 'Overgeleverd door Anas ibn Mâlik (moge Allah tevreden met hem zijn): "De Profeet ﷺ placht dit smeekgebed te zeggen."\nBron: Sahih al-Bukhârî (6369)', pt: 'Narrado por Anas ibn Mâlik (que Allah esteja satisfeito com ele): «O Profeta ﷺ costumava dizer esta invocação.»\nFonte: Sahih al-Bukhârî (6369)', tr: 'Enes b. Mâlik\'ten (Allah ondan razı olsun) rivayet edilmiştir: "Peygamber ﷺ bu duayı okurdu."\nKaynak: Sahihu\'l-Buhârî (6369)'},
      audio: 'tristesse1.mp3',
      sheet: { sub_fr: 'Pour les moments difficiles', sub_en: 'For difficult moments', sub_es: 'Para momentos difíciles', sub_de: 'Für schwere Zeiten', sub_it: 'Per momenti difficili', sub_nl: 'Voor moeilijke momenten', sub_pt: 'Para momentos difíceis', sub_tr: 'Zor anlar için' }
    },
    acc2: {
      titre: { fr: 'DUA DU CORAN — PRINTEMPS DU CŒUR', en: 'QUR\'AN DUA — SPRING OF THE HEART', es: 'DUA DEL CORÁN — PRIMAVERA DEL CORAZÓN' , de: 'KORANISCHES BITTGEBET — FRÜHLING DES HERZENS', it: 'DUA DEL CORANO — PRIMAVERA DEL CUORE', nl: 'KORANISCH SMEEKGEBED — LENTE VAN HET HART', pt: 'DUA DO ALCORÃO — PRIMAVERA DO CORAÇÃO', tr: 'KUR\'AN DUASI — KALBİN BAHARI'},
      arabe: 'اللَّهُمَّ إِنِّي عَبْدُكَ ابْنُ عَبْدِكَ ابْنُ أَمَتِكَ نَاصِيَتِي بِيَدِكَ مَاضٍ فِيَّ حُكْمُكَ عَدْلٌ فِيَّ قَضَاؤُكَ أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ أَوْ عَلَّمْتَهُ أَحَداً مِنْ خَلْقِكَ أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي وَنُورَ صَدْرِي وَجَلاَءَ حُزْنِي وَذَهَابَ هَمِّي',
      phonetique: {
        fr: 'Allâhumma innî \'abduka ibnu \'abdika ibnu amatika, nâsiyatî biyadika, mâdin fiyya hukmuka, \'adlun fiyya qadâ\'uka. As\'aluka bikulli ismin huwa laka... an taj\'ala l-Qur\'âna rabî\'a qalbî, wa nûra sadrî, wa jalâ\'a huznî, wa dhahâba hammî.',
        en: 'Allaahummaa innee \'abduka ibnu \'abdika ibnu amatika, naasiyatee biyadika... an taj\'alal-Qur\'aana rabee\'a qalbee, wa noora sadree, wa jalaa\'a huznee, wa dhahaaba hammee.',
        es: 'Alláhummaa innee \'abduka ibnu \'abdika ibnu amatika, naasiyatee biyadika... an taj\'alal-Qur\'aana rabee\'a qalbee, wa núura sadree, wa yalaa\'a huznee, wa dhahaaba hammee.',
        de: 'Allâhumma innî \'abduka ibnu \'abdika ibnu amatika, nâsiyatî biyadika, mâdin fiyya hukmuka, \'adlun fiyya qadâ\'uka. As\'aluka bikulli ismin huwa laka... an taj\'ala l-Qur\'âna rabî\'a qalbî, wa nûra sadrî, wa jalâ\'a huznî, wa dhahâba hammî.',
        it: 'Allāhummā innī \'abduka ibnu \'abdika ibnu amatika, nāsiyatī biyadika, mādin fiyya hukmuka, \'adlun fiyya qaḍā\'uka. As\'aluka bikulli ismin huwa laka... an taj\'ala l-Qur\'āna rabī\'a qalbī, wa nūra ṣadrī, wa jalā\'a ḥuznī, wa dhahāba hammī.',
        nl: 'Allaahummaa innee \'abduka ibnu \'abdika ibnu amatika, naasiyatee biyadika... an taj\'alal-Qur\'aana rabee\'a qalbee, wa noora sadree, wa jalaa\'a huznee, wa dhahaaba hammee.',
        pt: 'Allāhummā innī \'abduka ibnu \'abdika ibnu amatika, nāsiyatī biyadika, mādin fiyya hukmuka, \'adlun fiyya qaḍā\'uka. As\'aluka bikulli ismin huwa laka... an taj\'ala l-Qur\'āna rabī\'a qalbī, wa nūra ṣadrī, wa jalā\'a ḥuznī, wa dhahāba hammī.',
        tr: 'Allâhümme innî abdüke vebnü abdike vebnü emetike nâsiyetî biyedike mâdın fiyye hukmüke adlün fiyye kadâüke. Es\'elüke bikülli ismin hüve leke... en tec\'alel-Kur\'âne rabîa kalbî ve nûra sadrî ve celâe huznî ve zehâbe hemmî.'
      },
      traduction: {
        fr: 'Ô Allah ! Je suis Ton serviteur, fils de Ton serviteur, fils de Ta servante. Mon toupet est dans Ta Main... de faire du Coran le printemps de mon cœur, la lumière de ma poitrine, la dissipation de ma tristesse et la fin de mes soucis.',
        en: 'O Allah! I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your Hand... to make the Quran the spring of my heart, the light of my chest, the removal of my sadness and the departure of my anxiety.',
        es: 'Oh Allah, soy Tu siervo, hijo de Tu siervo, hijo de Tu sierva... que hagas del Corán la primavera de mi corazón, la luz de mi pecho, la disipación de mi tristeza y el fin de mis preocupaciones.'
      , de: 'O Allah! Ich bin Dein Diener, Sohn Deines Dieners, Sohn Deiner Dienerin. Mein Schopf ist in Deiner Hand... den Koran zum Frühling meines Herzens, zum Licht meiner Brust, zur Zerstreuung meiner Traurigkeit und zur Beendigung meiner Sorgen zu machen.', it: 'O Allah! Sono il Tuo servo, figlio del Tuo servo, figlio della Tua serva. Il mio ciuffo è nella Tua Mano... di fare del Corano la primavera del mio cuore, la luce del mio petto, la dispersione della mia tristezza e la fine delle mie preoccupazioni.', nl: 'O Allah! Ik ben Uw dienaar, zoon van Uw dienaar, zoon van Uw dienstmaagd. Mijn voorhoofdslok is in Uw Hand... om de Koran de lente van mijn hart te maken, het licht van mijn borst, de wegneming van mijn verdriet en het vertrek van mijn angst.', pt: 'Ó Allah! Sou o Teu servo, filho do Teu servo, filho da Tua serva. O meu cacho frontal está na Tua Mão... de fazer do Alcorão a primavera do meu coração, a luz do meu peito, a dissipação da minha tristeza e o fim das minhas preocupações.', tr: 'Allah\'ım! Ben Senin kulun, kulunun oğlu, cariyenin oğluyum. Alnım Senin elindedir... Kur\'an\'ı kalbimin baharı, göğsümün nuru, üzüntümün cilası ve sıkıntımın gidericisi kıl.'},
      hadith: {
        fr: 'D\'après \'Abdallah ibn Mas\'ûd (qu\'Allah l\'agrée), le Prophète ﷺ a dit : « Il n\'est pas une personne atteinte par l\'anxiété ou la tristesse qui dit cette invocation, sans qu\'Allah ne fasse disparaître son anxiété et sa tristesse et les lui remplace par de la joie. » Les compagnons dirent : « Devons-nous l\'apprendre ? » Il répondit : « Que toute personne qui l\'entend l\'apprenne. »\nSource : Musnad Ahmad (1/391), Sahih par al-Albânî',
        en: 'Narrated \'Abdullah ibn Mas\'ud (may Allah be pleased with him), the Prophet ﷺ said: "There is no one afflicted with anxiety or sadness who says this supplication, but Allah will remove his anxiety and sadness and replace it with joy." The companions asked: "Should we learn it?" He replied: "Everyone who hears it should learn it."\nSource: Musnad Ahmad (1/391), Sahih by al-Albani',
        es: 'Narrado por \'Abdallah ibn Mas\'ûd (que Allah esté complacido con él), el Profeta ﷺ dijo: «No hay nadie afligido por la ansiedad o la tristeza que diga esta invocación, sin que Allah elimine su ansiedad y tristeza y las reemplace por alegría.»\nFuente: Musnad Ahmad (1/391), Sahih por al-Albânî'
      , de: 'Überliefert von \'Abdallah ibn Mas\'ûd (möge Allah mit ihm zufrieden sein), der Prophet ﷺ sagte: „Es gibt niemanden, der von Angst oder Traurigkeit befallen wird und dieses Bittgebet spricht, ohne dass Allah seine Angst und Traurigkeit entfernt und durch Freude ersetzt.“\nQuelle: Musnad Ahmad (1/391), Sahih laut al-Albânî', it: 'Riportato da \'Abdallah ibn Mas\'ûd (che Allah sia soddisfatto di lui), il Profeta ﷺ disse: «Non c\'è nessuno afflitto dall\'ansia o dalla tristezza che dica questa invocazione, senza che Allah rimuova la sua ansia e tristezza e le sostituisca con gioia.»\nFonte: Musnad Ahmad (1/391), Sahih secondo al-Albânî', nl: 'Overgeleverd door \'Abdallah ibn Mas\'ûd (moge Allah tevreden met hem zijn), de Profeet ﷺ zei: "Er is niemand die door angst of verdriet getroffen wordt en dit smeekgebed zegt, zonder dat Allah zijn angst en verdriet wegneemt en vervangt door vreugde."\nBron: Musnad Ahmad (1/391), Sahih volgens al-Albânî', pt: 'Narrado por \'Abdallah ibn Mas\'ûd (que Allah esteja satisfeito com ele), o Profeta ﷺ disse: «Não há ninguém afligido pela ansiedade ou tristeza que diga esta invocação, sem que Allah remova a sua ansiedade e tristeza e as substitua por alegria.»\nFonte: Musnad Ahmad (1/391), Sahih segundo al-Albânî', tr: 'Abdullah b. Mes\'ûd\'dan (Allah ondan razı olsun) rivayet edilmiştir; Peygamber ﷺ şöyle buyurdu: "Herhangi bir kimseye sıkıntı ve üzüntü isabet edip de bu duayı okursa mutlaka Allah onun sıkıntısını ve üzüntüsünü giderir, yerine sevinç verir."\nKaynak: Müsned-i Ahmed (1/391), Sahih — el-Albânî'},
      audio: 'tristesse2.mp3',
      sheet: { sub_fr: 'Printemps du cœur', sub_en: 'Spring of the heart', sub_es: 'Primavera del corazón', sub_de: 'Frühling des Herzens', sub_it: 'Primavera del cuore', sub_nl: 'Lente van het hart', sub_pt: 'Primavera do coração', sub_tr: 'Kalbin baharı' }
    },
    acc3: {
      titre: { fr: 'SUNNAHS DU PROPHÈTE ﷺ', en: 'PROPHET\'S ﷺ SUNNAH', es: 'SUNNAH DEL PROFETA ﷺ' },
      sunnah: true,
      items: {
        fr: [
          { titre: 'FAIS DU CORAN LE PRINTEMPS DE TON CŒUR', texte: 'D\'après Abdallah ibn Mas\'oud, le Prophète ﷺ a dit : « Il n\'y a personne frappée par l\'anxiété ou la tristesse qui récite cette invocation sans qu\'Allah ne dissipe sa tristesse et ne la remplace par de la joie. » Je Te demande de rendre le Coran le printemps de mon cœur, la lumière de ma poitrine, la dissipation de ma tristesse et la fin de mes soucis. [Musnad Ahmad 1/391 — Sahih par Al-Albânî]' },
          { titre: 'LA TRISTESSE EST UNE EXPIATION', texte: 'D\'après Abu Hurayra, le Prophète ﷺ a dit : « Tout ce qui touche le croyant comme fatigue, maladie, soucis, tristesse, gêne, angoisse, même une épine qui le pique, est une expiation de ses péchés par Allah. » [Sahih Muslim]' },
          { titre: 'PLACE TA CONFIANCE EN ALLAH', texte: 'Le Prophète ﷺ a dit : « Si vous placiez votre confiance en Allah comme il se doit, Il vous accorderait votre subsistance tout comme Il l\'accorde aux oiseaux. Ils quittent leur nid le matin l\'estomac vide, et ils y rentrent le soir rassasiés. » [Tirmidhi]' }
        ],
        en: [
          { titre: 'MAKE THE QURAN THE SPRING OF YOUR HEART', texte: 'According to Abdullah ibn Mas\'ud, the Prophet ﷺ said: "There is no one afflicted with anxiety or sadness who recites this supplication, but Allah will remove his sadness and replace it with joy." I ask You to make the Quran the spring of my heart, the light of my chest, the remover of my sadness and the reliever of my distress. [Musnad Ahmad 1/391 — Sahih by Al-Albani]' },
          { titre: 'SADNESS IS AN EXPIATION', texte: 'According to Abu Hurairah, the Prophet ﷺ said: "Nothing befalls a believer — fatigue, illness, worry, sadness, hardship, distress, or even a thorn that pricks him — except that Allah expiates some of his sins thereby." [Sahih Muslim]' },
          { titre: 'PLACE YOUR TRUST IN ALLAH', texte: 'The Prophet ﷺ said: "If you were to rely upon Allah with the reliance He is due, He would provide for you just as He provides for the birds. They leave in the morning with empty stomachs and return in the evening full." [Tirmidhi]' }
        ],
        es: [
          { titre: 'HAZ DEL CORÁN LA PRIMAVERA DE TU CORAZÓN', texte: 'Según Abdullah ibn Mas\'ud, el Profeta ﷺ dijo: «No hay nadie afligido por la ansiedad o la tristeza que recite esta invocación, sin que Allah disipe su tristeza y la reemplace por alegría.» Te pido que hagas del Corán la primavera de mi corazón, la luz de mi pecho, la disipación de mi tristeza y el fin de mis preocupaciones. [Musnad Ahmad 1/391 — Sahih por Al-Albânî]' },
          { titre: 'LA TRISTEZA ES UNA EXPIACIÓN', texte: 'Según Abu Hurairah, el Profeta ﷺ dijo: «Nada afecta al creyente — fatiga, enfermedad, preocupación, tristeza, dificultad, angustia, ni siquiera una espina que le pinche — sin que Allah expíe algunos de sus pecados.» [Sahih Muslim]' },
          { titre: 'CONFÍA COMPLETAMENTE EN ALLAH', texte: 'El Profeta ﷺ dijo: «Si confiarais en Allah como se merece, Él os proveería como provee a los pájaros. Salen por la mañana con el estómago vacío y regresan por la tarde llenos.» [Tirmidhi]' }
        ],
        de: [
          { titre: 'MACH DEN KORAN ZUM FRÜHLING DEINES HERZENS', texte: 'Gemäß Abdallah ibn Mas\'ûd sagte der Prophet ﷺ: „Es gibt niemanden, der von Angst oder Traurigkeit befallen wird und dieses Bittgebet spricht, ohne dass Allah seine Traurigkeit entfernt und durch Freude ersetzt." Ich bitte Dich, den Koran zum Frühling meines Herzens, zur Helle meiner Brust, zur Linderung meiner Traurigkeit zu machen. [Musnad Ahmad 1/391 — Sahih laut Al-Albânî]' },
          { titre: 'TRAURIGKEIT IST EINE SÜHNE', texte: 'Gemäß Abû Hurayra sagte der Prophet ﷺ: „Nichts trifft den Gläubigen — Müdigkeit, Krankheit, Sorge, Traurigkeit, Not, Kummer, ja nicht einmal ein Dorn, der ihn sticht — ohne dass Allah dadurch einige seiner Sünden sühnt." [Sahih Muslim]' },
          { titre: 'VERTRAUE VOLLSTÄNDIG AUF ALLAH', texte: 'Der Prophet ﷺ sagte: „Wenn ihr Allah so vertrauen würdet, wie es Ihm gebührt, würde Er euch versorgen, so wie Er die Vögel versorgt. Sie verlassen ihr Nest morgens mit leerem Magen und kehren abends gesättigt zurück." [Tirmidhi]' }
        ],
        it: [
          { titre: 'FAI DEL CORANO LA PRIMAVERA DEL TUO CUORE', texte: 'Secondo Abdallah ibn Mas\'ûd, il Profeta ﷺ disse: «Non c\'è nessuno afflitto dall\'ansia o dalla tristezza che reciti questa invocazione, senza che Allah rimuova la sua tristezza e la sostituisca con gioia.» Ti chiedo di rendere il Corano la primavera del mio cuore, la luce del mio petto, la dissipazione della mia tristezza. [Musnad Ahmad 1/391 — Sahih secondo Al-Albânî]' },
          { titre: 'LA TRISTEZZA È UN\'ESPIAZIONE', texte: 'Secondo Abû Hurayra, il Profeta ﷺ disse: «Nulla colpisce il credente — stanchezza, malattia, preoccupazione, tristezza, difficoltà, angoscia, né anche una spina che lo punge — senza che Allah espi alcuni dei suoi peccati.» [Sahih Muslim]' },
          { titre: 'RIPONI LA TUA FIDUCIA IN ALLAH', texte: 'Il Profeta ﷺ disse: «Se riponeste la vostra fiducia in Allah come si deve, Egli vi provvederebbe come provvede agli uccelli. Partono al mattino con lo stomaco vuoto e tornano la sera sazi.» [Tirmidhi]' }
        ],
        nl: [
          { titre: 'MAAK DE KORAN DE LENTE VAN JE HART', texte: 'Volgens Abdallah ibn Mas\'ûd zei de Profeet ﷺ: "Er is niemand die door angst of verdriet getroffen wordt en dit smeekgebed zegt, zonder dat Allah zijn verdriet wegneemt en vervangt door vreugde." Ik vraag U de Koran de lente van mijn hart, het licht van mijn borst en de verdrijver van mijn verdriet te maken. [Musnad Ahmad 1/391 — Sahih volgens Al-Albânî]' },
          { titre: 'VERDRIET IS EEN BOETEDOENING', texte: 'Volgens Abû Hurayra zei de Profeet ﷺ: "Niets treft een gelovige — vermoeidheid, ziekte, zorgen, verdriet, nood, angst, zelfs een doorn die hem prikt — zonder dat Allah daardoor sommige van zijn zonden uitwist." [Sahih Muslim]' },
          { titre: 'VERTROUW VOLLEDIG OP ALLAH', texte: 'De Profeet ﷺ zei: "Als jullie op Allah zouden vertrouwen zoals Hij het verdient, zou Hij jullie voorzien zoals Hij de vogels voorziet. Ze vertrekken \'s ochtends met een lege maag en keren \'s avonds vol terug." [Tirmidhi]' }
        ],
        pt: [
          { titre: 'FAZ DO ALCORÃO A PRIMAVERA DO TEU CORAÇÃO', texte: 'Segundo Abdallah ibn Mas\'ûd, o Profeta ﷺ disse: «Não há ninguém afligido pela ansiedade ou tristeza que recite esta invocação, sem que Allah dissipe a sua tristeza e a substitua por alegria.» Peço-Te que faças do Alcorão a primavera do meu coração, a luz do meu peito, a dissipação da minha tristeza. [Musnad Ahmad 1/391 — Sahih por Al-Albânî]' },
          { titre: 'A TRISTEZA É UMA EXPIAÇÃO', texte: 'Segundo Abû Hurayra, o Profeta ﷺ disse: «Nada afeta o crente — cansaço, doença, preocupação, tristeza, dificuldade, angústia, nem mesmo um espinho que o pique — sem que Allah expie alguns dos seus pecados.» [Sahih Muslim]' },
          { titre: 'DEPOSITA A TUA CONFIANÇA EM ALLAH', texte: 'O Profeta ﷺ disse: «Se confiastes em Allah como Ele merece, Ele vos proveria como provê os pássaros. Partem de manhã com o estômago vazio e regressam à tarde saciados.» [Tirmidhi]' }
        ],
        tr: [
          { titre: 'KUR\'ANI KALBİNİN BAHARI YAP', texte: 'Abdullah b. Mes\'ûd\'dan; Peygamber ﷺ şöyle buyurdu: "Herhangi bir kimseye sıkıntı ve üzüntü isabet edip de bu duayı okursa mutlaka Allah onun sıkıntısını ve üzüntüsünü giderir, yerine sevinç verir." Kur\'an\'ı kalbimin baharı, göğsümün nuru, üzüntümün gidericisi kılmanı istiyorum. [Müsned-i Ahmed 1/391 — Sahih — el-Albânî]' },
          { titre: 'ÜZÜNTÜ BİR KEFARET', texte: 'Ebû Hureyre\'den; Peygamber ﷺ şöyle buyurdu: "Müminin başına gelen yorgunluk, hastalık, tasa, üzüntü, sıkıntı, keder ve hatta ayağına batan bir diken bile Allah\'ın o kişinin günahlarına kefaret olmasına vesile olur." [Sahih Muslim]' },
          { titre: 'ALLAH\'A TEVEKKÜL ET', texte: 'Peygamber ﷺ şöyle buyurdu: "Allah\'a hakkıyla tevekkül etseydiniz, sizi kuşları rızıklandırdığı gibi rızıklandırırdı. Kuşlar sabah aç çıkar, akşam tok döner." [Tirmizî]' }
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas', sub_de: 'Empfohlene Praktiken', sub_it: 'Pratiche raccomandate', sub_nl: 'Aanbevolen praktijken', sub_pt: 'Práticas recomendadas', sub_tr: 'Tavsiye edilen uygulamalar' }
    }
  },

  // ===========================
  // ENFANTS
  // ===========================
  enfants: {
    meta: {
      icon: 'images/enfants.webp',
      titre: { fr: 'Enfants', en: 'Children', es: 'Niños' , de: 'Kinder', it: 'Bambini', nl: 'Kinderen', pt: 'Crianças', tr: 'Çocuklar'},
      closingDua: { fr: 'Que Allah protège tes enfants de tout mal, visible ou invisible, et les garde dans Sa miséricorde', en: 'May Allah protect your children from all evil, visible or invisible, and keep them in His mercy', es: 'Que Allah proteja a tus hijos de todo mal, visible o invisible, y los guarde en Su misericordia' , de: 'Möge Allah deine Kinder vor allem Bösen schützen und sie in Seiner Barmherzigkeit bewahren', it: 'Che Allah protegga i tuoi figli da ogni male e li tenga nella Sua misericordia', nl: 'Moge Allah jouw kinderen beschermen tegen alle kwaad en hen bewaren in Zijn genade', pt: 'Que Allah proteja os teus filhos de todo o mal e os guarde na Sua misericórdia', tr: 'Allah çocuklarını tüm kötülüklerden korusun ve onları rahmetinde muhafaza etsin'}
    },
    acc1: {
      titre: { fr: 'INVOCATION PRINCIPALE — PROTÉGER SES ENFANTS', en: 'MAIN SUPPLICATION — PROTECT YOUR CHILDREN', es: 'INVOCACIÓN PRINCIPAL — PROTEGER A TUS HIJOS' , de: 'HAUPTBITTGEBET — SEINE KINDER SCHÜTZEN', it: 'INVOCAZIONE PRINCIPALE — PROTEGGERE I PROPRI FIGLI', nl: 'HOOFDSMEEKGEBED — JE KINDEREN BESCHERMEN', pt: 'INVOCAÇÃO PRINCIPAL — PROTEGER OS FILHOS', tr: 'ANA DUA — ÇOCUKLARINI KORUMAK'},
      arabe: 'أُعِيذُكُمَا* بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
      phonetique: {
        fr: '*U\'îdhukumâ bi kalimâti Llâhi t-tâmmati min kulli shaytânin wa hâmmatin wa min kulli \'aynin lâmmatin.',
        en: '*U\'eedhukumaa bi kalimaaatillaahit-taammati min kulli shaytaanin wa haammatin wa min kulli \'aynin laammatin.',
        es: '*U\'eedhukumáa bi kalimaatilláahit-taammati min kulli shaytaanin wa haammatin wa min kulli \'aynin laammatin.'
      , de: '*U\'îdhukumâ bi kalimâti Llâhi t-tâmmati min kulli shaytânin wa hâmmatin wa min kulli \'aynin lâmmatin.', it: '*U\'īdhukumā bi kalimāti llāhi t-tāmmati min kulli shayṭānin wa hāmmatin wa min kulli \'aynin lāmmatin.', nl: '*U\'eedhukumaa bi kalimaatillaahit-taammati min kulli shaytaanin wa haammatin wa min kulli \'aynin laammatin.', pt: '*U\'īdhukumā bi kalimāti llāhi t-tāmmati min kulli shayṭānin wa hāmmatin wa min kulli \'aynin lāmmatin.', tr: '*Üîzükümâ bi kelimâtillâhi\'t-tâmmeti min külli şeytânin ve hâmmetin ve min külli \'aynin lâmmetin.'},
      traduction: {
        fr: 'Je cherche refuge pour vous deux* dans les paroles parfaites d\'Allah contre tout diable, toute bête venimeuse et tout mauvais œil envieux.',
        en: 'I seek refuge for you both* in the perfect words of Allah from every devil, every poisonous creature, and every evil eye.',
        es: 'Me refugio para vosotros dos* en las palabras perfectas de Allah de todo diablo, toda criatura venenosa y todo mal de ojo.'
      , de: 'Ich suche für euch beide* Zuflucht in den vollkommenen Worten Allahs vor jedem Teufel, jedem Gifttier und jedem bösen Blick.', it: 'Cerco rifugio per entrambi voi* nelle parole perfette di Allah da ogni diavolo, ogni creatura velenosa e ogni malocchio.', nl: 'Ik zoek voor jullie beiden* toevlucht in de volmaakte woorden van Allah voor elke duivel, elk giftig wezen en elk boze oog.', pt: 'Peço refúgio para vós dois* nas palavras perfeitas de Allah de todo diabo, toda criatura venenosa e todo mau-olhado.', tr: 'İkinizi* her şeytandan, zehirli hayvandan ve değen her gözden Allah\'ın eksiksiz kelimelerine sığındırırım.'},
      hadith: {
        fr: 'Ibn \'Abbâs rapporte que le Messager d\'Allah ﷺ cherchait refuge pour Al-Hasan et Al-Husayn en disant cette invocation. Sahih al-Bukhari (3371).<br><br><strong style="color:var(--gold);">* 1 enfant :</strong> Phonétique : <em>U\'îdhuka</em> — Arabe : <span style="font-family:\'Amiri\',serif;">أُعِيذُكَ</span>',
        en: 'Ibn Abbas reported that the Messenger of Allah ﷺ sought refuge for Al-Hasan and Al-Husayn with this supplication. Sahih al-Bukhari (3371).<br><br><strong style="color:var(--gold);">* 1 child:</strong> Phonetic: <em>U\'eedhuka</em> — Arabic: <span style="font-family:\'Amiri\',serif;">أُعِيذُكَ</span>',
        es: 'Ibn Abbas narró que el Mensajero de Allah ﷺ buscaba refugio para Al-Hasan y Al-Husayn con esta súplica. Sahih al-Bukhari (3371).<br><br><strong style="color:var(--gold);">* 1 niño:</strong> Fonético: <em>U\'eedhuka</em> — Árabe: <span style="font-family:\'Amiri\',serif;">أُعِيذُكَ</span>'
      , de: 'Ibn \'Abbâs berichtet, dass der Gesandte Allahs ﷺ für Al-Hasan und Al-Husayn mit dieser Bittformel Schutz suchte. Sahih al-Bukhârî (3371).<br><br><strong style="color:var(--gold);">* 1 Kind:</strong> Phonetik: <em>U\'îdhuka</em> — Arabisch: <span style="font-family:\'Amiri\',serif;">أُعِيذُكَ</span>', it: 'Ibn \'Abbâs riporta che il Messaggero di Allah ﷺ cercava rifugio per Al-Hasan e Al-Husayn con questa invocazione. Sahih al-Bukhârî (3371).<br><br><strong style="color:var(--gold);">* 1 bambino:</strong> Fonetica: <em>U\'îdhuka</em> — Arabo: <span style="font-family:\'Amiri\',serif;">أُعِيذُكَ</span>', nl: 'Ibn \'Abbâs vermeldt dat de Boodschapper van Allah ﷺ voor Al-Hasan en Al-Husayn bescherming zocht met dit smeekgebed. Sahih al-Bukhârî (3371).<br><br><strong style="color:var(--gold);">* 1 kind:</strong> Fonetiek: <em>U\'îdhuka</em> — Arabisch: <span style="font-family:\'Amiri\',serif;">أُعِيذُكَ</span>', pt: 'Ibn \'Abbâs relata que o Mensageiro de Allah ﷺ pedia proteção para Al-Hasan e Al-Husayn com esta invocação. Sahih al-Bukhârî (3371).<br><br><strong style="color:var(--gold);">* 1 criança:</strong> Fonética: <em>U\'îdhuka</em> — Árabe: <span style="font-family:\'Amiri\',serif;">أُعِيذُكَ</span>', tr: 'İbn Abbâs, Allah\'ın Rasûlü ﷺ\'nin Hasan ve Hüseyin için bu duayla koruma dilediğini nakleder. Sahihu\'l-Buhârî (3371).<br><br><strong style="color:var(--gold);">* 1 çocuk:</strong> Fonetik: <em>U\'îdhuka</em> — Arapça: <span style="font-family:\'Amiri\',serif;">أُعِيذُكَ</span>'},
      audio: 'enfants1.mp3',
      sheet: { sub_fr: 'Invocation principale', sub_en: 'Main supplication', sub_es: 'Invocación principal', sub_de: 'Hauptbittgebet', sub_it: 'Invocazione principale', sub_nl: 'Hoofdsmeekgebed', sub_pt: 'Invocação principal', sub_tr: 'Ana dua'}
    },
    acc2: {
      titre: { fr: 'VARIANTE POUR UN ENFANT UNIQUE', en: 'VARIANT FOR A SINGLE CHILD', es: 'VARIANTE PARA UN HIJO ÚNICO' , de: 'VARIANTE FÜR EIN EINZIGES KIND', it: 'VARIANTE PER UN FIGLIO UNICO', nl: 'VARIANT VOOR EEN ENKEL KIND', pt: 'VARIANTE PARA UM FILHO ÚNICO', tr: 'TEK ÇOCUK İÇİN VERSİYON'},
      arabe: 'أُعِيذُكَ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
      phonetique: {
        fr: 'U\'îdhuka bi kalimâti Llâhi t-tâmmati min kulli shaytânin wa hâmmatin wa min kulli \'aynin lâmmatin.',
        en: 'U\'eedhuka bi kalimaatillaahit-taammati min kulli shaytaanin wa haammatin wa min kulli \'aynin laammatin.',
        es: 'U\'eedhuka bi kalimaatilláahit-taammati min kulli shaytaanin wa haammatin wa min kulli \'aynin laammatin.'
      , de: 'U\'îdhuka bi kalimâti Llâhi t-tâmmati min kulli shaytânin wa hâmmatin wa min kulli \'aynin lâmmatin.', it: 'U\'īdhuka bi kalimāti llāhi t-tāmmati min kulli shayṭānin wa hāmmatin wa min kulli \'aynin lāmmatin.', nl: 'U\'eedhuka bi kalimaatillaahit-taammati min kulli shaytaanin wa haammatin wa min kulli \'aynin laammatin.', pt: 'U\'īdhuka bi kalimāti llāhi t-tāmmati min kulli shayṭānin wa hāmmatin wa min kulli \'aynin lāmmatin.', tr: 'Üîzüke bi kelimâtillâhi\'t-tâmmeti min külli şeytânin ve hâmmetin ve min külli \'aynin lâmmetin.'},
      traduction: {
        fr: 'Je cherche refuge pour toi dans les paroles parfaites d\'Allah contre tout diable, toute bête venimeuse et tout mauvais œil envieux.',
        en: 'I seek refuge for you in the perfect words of Allah from every devil, every poisonous creature, and every evil eye.',
        es: 'Me refugio para ti en las palabras perfectas de Allah de todo diablo, toda criatura venenosa y todo mal de ojo.'
      , de: 'Ich suche für dich Zuflucht in den vollkommenen Worten Allahs vor jedem Teufel, jedem Gifttier und jedem bösen Blick.', it: 'Cerco rifugio per te nelle parole perfette di Allah da ogni diavolo, ogni creatura velenosa e ogni malocchio.', nl: 'Ik zoek voor jou toevlucht in de volmaakte woorden van Allah voor elke duivel, elk giftig wezen en elk boze oog.', pt: 'Peço refúgio para ti nas palavras perfeitas de Allah de todo diabo, toda criatura venenosa e todo mau-olhado.', tr: 'Seni her şeytandan, zehirli hayvandan ve değen her gözden Allah\'ın eksiksiz kelimelerine sığındırırım.'},
      hadith: {
        fr: 'D\'après Ibn \'Abbâs (qu\'Allah les agrée), le Prophète ﷺ demandait protection pour al-Hasan et al-Husayn par cette invocation, comme Ibrâhîm ﷺ le faisait pour Ismâ\'îl et Ishâq.\nSource : Sahih al-Bukhârî (3371)',
        en: 'Narrated Ibn \'Abbas (may Allah be pleased with them both), the Prophet ﷺ used to seek refuge for al-Hasan and al-Husayn with this supplication, as Ibrahim ﷺ did for Ismail and Ishaq.\nSource: Sahih al-Bukhari (3371)',
        es: 'Narrado por Ibn \'Abbâs (que Allah esté complacido con ellos), el Profeta ﷺ pedía protección para al-Hasan y al-Husayn con esta invocación, como Ibrâhîm ﷺ lo hacía para Ismâ\'îl e Ishâq.\nFuente: Sahih al-Bukhârî (3371)'
      , de: 'Überliefert von Ibn \'Abbâs (möge Allah mit ihnen beiden zufrieden sein), der Prophet ﷺ bat um Schutz für al-Hasan und al-Husayn mit diesem Bittgebet, wie Ibrâhîm ﷺ es für Ismâ\'îl und Ishâq tat.\nQuelle: Sahih al-Bukhârî (3371)', it: 'Riportato da Ibn \'Abbâs (che Allah sia soddisfatto di entrambi), il Profeta ﷺ chiedeva protezione per al-Hasan e al-Husayn con questa invocazione, come Ibrâhîm ﷺ faceva per Ismâ\'îl e Ishâq.\nFonte: Sahih al-Bukhârî (3371)', nl: 'Overgeleverd door Ibn \'Abbâs (moge Allah tevreden met hen beiden zijn), de Profeet ﷺ vroeg bescherming voor al-Hasan en al-Husayn met dit smeekgebed, zoals Ibrâhîm ﷺ dat deed voor Ismâ\'îl en Ishâq.\nBron: Sahih al-Bukhârî (3371)', pt: 'Narrado por Ibn \'Abbâs (que Allah esteja satisfeito com ambos), o Profeta ﷺ pedia proteção para al-Hasan e al-Husayn com esta invocação, como Ibrâhîm ﷺ fazia para Ismâ\'îl e Ishâq.\nFonte: Sahih al-Bukhârî (3371)', tr: 'İbn Abbâs\'tan (Allah onlardan razı olsun) rivayet edilmiştir; Peygamber ﷺ, İbrâhim ﷺ\'in İsmâil ve İshak için yaptığı gibi, Hasan ve Hüseyin için bu duayla koruma dilerdi.\nKaynak: Sahihu\'l-Buhârî (3371)', de: 'Überliefert von Ibn \'Abbâs (möge Allah mit ihnen beiden zufrieden sein), der Prophet ﷺ bat um Schutz für al-Hasan und al-Husayn mit diesem Bittgebet, wie Ibrâhîm ﷺ es für Ismâ\'îl und Ishâq tat.\nQuelle: Sahih al-Bukhârî (3371)', it: 'Riportato da Ibn \'Abbâs (che Allah sia soddisfatto di entrambi), il Profeta ﷺ chiedeva protezione per al-Hasan e al-Husayn con questa invocazione, come Ibrâhîm ﷺ faceva per Ismâ\'îl e Ishâq.\nFonte: Sahih al-Bukhârî (3371)', nl: 'Overgeleverd door Ibn \'Abbâs (moge Allah tevreden met hen beiden zijn), de Profeet ﷺ vroeg bescherming voor al-Hasan en al-Husayn met dit smeekgebed, zoals Ibrâhîm ﷺ dat deed voor Ismâ\'îl en Ishâq.\nBron: Sahih al-Bukhârî (3371)', pt: 'Narrado por Ibn \'Abbâs (que Allah esteja satisfeito com ambos), o Profeta ﷺ pedia proteção para al-Hasan e al-Husayn com esta invocação, como Ibrâhîm ﷺ fazia para Ismâ\'îl e Ishâq.\nFonte: Sahih al-Bukhârî (3371)', tr: 'İbn Abbâs\'tan (Allah onlardan razı olsun) rivayet edilmiştir; Peygamber ﷺ, İbrâhim ﷺ\'in İsmâil ve İshak için yaptığı gibi, Hasan ve Hüseyin için bu duayla koruma dilerdi.\nKaynak: Sahihu\'l-Buhârî (3371)'},
      audio: 'enfants2.mp3',
      sheet: { sub_fr: 'Variante spécifique', sub_en: 'Specific variant', sub_es: 'Variante específica', sub_de: 'Spezifische Variante', sub_it: 'Variante specifica', sub_nl: 'Specifieke variant', sub_pt: 'Variante específica', sub_tr: 'Özel versiyon'}
    },
    acc3: {
      titre: { fr: 'SUNNAHS DU PROPHÈTE ﷺ (PROTECTIONS)', en: 'PROPHET\'S ﷺ SUNNAH (PROTECTIONS)', es: 'SUNNAH DEL PROFETA ﷺ (PROTECCIONES)' , de: 'SUNNA DES PROPHETEN ﷺ (SCHUTZ)', it: 'SUNNAH DEL PROFETA ﷺ (PROTEZIONI)', nl: 'SOENNA VAN DE PROFEET ﷺ (BESCHERMINGEN)', pt: 'SUNNAH DO PROFETA ﷺ (PROTEÇÕES)', tr: 'PEYGAMBERİN ﷺ SÜNNETİ (KORUMALAR)'},
      sunnah: true,
      items: {
        fr: [
          { titre: 'RÉCITE LES SOURATES DE PROTECTION', texte: 'D\'après Aïcha, le Prophète ﷺ soufflait sur ses mains en récitant Al-Ikhlas, Al-Falaq et An-Nas, puis les passait sur son corps. Récite-les trois fois chaque matin et soir sur tes enfants. [Sahih al-Bukhari 5017]' },
          { titre: 'PROTÉGER LES ENFANTS EN LES BÉNISSANT', texte: 'D\'après Abou Hourayra, le Prophète ﷺ a dit : « Si l\'un de vous voit chez son frère ce qui l\'impressionne, qu\'il dise : "Bârakallâhu fîhi", car le mauvais œil est une réalité. » [Sahih Muslim 2188]' },
          { titre: 'AYATUL KURSI CHAQUE SOIR', texte: 'D\'après Abou Hourayra, le Prophète ﷺ a dit : « Celui qui récite Ayatul Kursi le soir sera protégé par Allah et aucun shaytan ne pourra l\'approcher jusqu\'au matin. » [Sahih al-Bukhari 2311]' },
          { titre: 'L\'INVOCATION DU PÈRE EST EXAUCÉE', texte: 'D\'après Ibn Abbas, le Prophète ﷺ a dit : « Il y a trois invocations qui ne sont pas refusées : l\'invocation du père pour son enfant, l\'invocation du voyageur et l\'invocation de celui à qui on a fait tort. » [Sunan at-Tirmidhi 1905]' },
          { titre: 'FERME LES PORTES EN DISANT BISMILLAH', texte: 'D\'après Jabir ibn Abdillah, le Prophète ﷺ a dit : « Fermez vos portes en mentionnant le nom d\'Allah, car les shayateen ne peuvent ouvrir une porte fermée avec le nom d\'Allah. » [Sahih al-Bukhari 3280]' }
        ],
        en: [
          { titre: 'RECITE THE PROTECTION SURAHS', texte: 'According to Aisha, the Prophet ﷺ used to blow on his hands while reciting Al-Ikhlas, Al-Falaq and An-Nas, then pass them over his body. Recite them three times every morning and evening over your children. [Sahih al-Bukhari 5017]' },
          { titre: 'PROTECT CHILDREN BY BLESSING THEM', texte: 'According to Abu Hurairah, the Prophet ﷺ said: "If any of you sees something impressive in his brother, let him say: \'Barakallahu fih\', for the evil eye is a reality." [Sahih Muslim 2188]' },
          { titre: 'AYATUL KURSI EVERY EVENING', texte: 'According to Abu Hurairah, the Prophet ﷺ said: "Whoever recites Ayatul Kursi in the evening will be protected by Allah and no shaytan will be able to approach him until morning." [Sahih al-Bukhari 2311]' },
          { titre: 'THE FATHER\'S SUPPLICATION IS ANSWERED', texte: 'According to Ibn Abbas, the Prophet ﷺ said: "There are three supplications that are not rejected: the supplication of the father for his child, the supplication of the traveler and the supplication of the one who has been wronged." [Sunan at-Tirmidhi 1905]' },
          { titre: 'CLOSE DOORS SAYING BISMILLAH', texte: 'According to Jabir ibn Abdillah, the Prophet ﷺ said: "Close your doors while mentioning the name of Allah, for the shayateen cannot open a door closed with the name of Allah." [Sahih al-Bukhari 3280]' }
        ],
        es: [
          { titre: 'RECITA LAS SURAS DE PROTECCIÓN', texte: 'Según Aisha, el Profeta ﷺ soplaba sobre sus manos recitando Al-Ikhlas, Al-Falaq y An-Nas, luego las pasaba por su cuerpo. Recítalas tres veces cada mañana y tarde sobre tus hijos. [Sahih al-Bukhari 5017]' },
          { titre: 'PROTEGE A LOS NIÑOS BENDICIÉNDOLOS', texte: 'Según Abu Hurairah, el Profeta ﷺ dijo: "Si alguno de vosotros ve algo impresionante en su hermano, que diga: \'Barakallahu fih\', pues el mal de ojo es una realidad." [Sahih Muslim 2188]' },
          { titre: 'AYATUL KURSI CADA TARDE', texte: 'Según Abu Hurairah, el Profeta ﷺ dijo: "Quien recite Ayatul Kursi por la tarde será protegido por Allah y ningún shaytan podrá acercarse hasta la mañana." [Sahih al-Bukhari 2311]' },
          { titre: 'LA SÚPLICA DEL PADRE ES ACEPTADA', texte: 'Según Ibn Abbas, el Profeta ﷺ dijo: "Hay tres súplicas que no son rechazadas: la súplica del padre por su hijo, la súplica del viajero y la súplica de quien ha sido agraviado." [Sunan at-Tirmidhi 1905]' },
          { titre: 'CIERRA LAS PUERTAS DICIENDO BISMILLAH', texte: 'Según Jabir ibn Abdillah, el Profeta ﷺ dijo: "Cerrad vuestras puertas mencionando el nombre de Allah, pues los shayateen no pueden abrir una puerta cerrada con el nombre de Allah." [Sahih al-Bukhari 3280]' }
        ],
        de: [
          { titre: 'REZITIERE DIE SCHUTZ-SUREN', texte: 'Gemäß \'Â\'isha blies der Prophet ﷺ in seine Hände während er Al-Ikhlas, Al-Falaq und An-Nas rezitierte, dann strich er damit über seinen Körper. Rezitiere sie dreimal jeden Morgen und Abend über deine Kinder. [Sahih al-Bukhârî 5017]' },
          { titre: 'KINDER DURCH SEGNUNG SCHÜTZEN', texte: 'Gemäß Abû Hurayra sagte der Prophet ﷺ: „Wenn einer von euch bei seinem Bruder etwas Beeindruckendes sieht, soll er sagen: \'Bârakallâhu fîhi\', denn der böse Blick ist eine Realität." [Sahih Muslim 2188]' },
          { titre: 'AYATUL KURSI JEDEN ABEND', texte: 'Gemäß Abû Hurayra sagte der Prophet ﷺ: „Wer Ayatul Kursi am Abend rezitiert, wird von Allah beschützt und kein Shaytan kann ihm bis zum Morgen nahekommen." [Sahih al-Bukhârî 2311]' },
          { titre: 'DAS BITTGEBET DES VATERS WIRD ERHÖRT', texte: 'Gemäß Ibn \'Abbâs sagte der Prophet ﷺ: „Es gibt drei Bittgebete, die nicht abgelehnt werden: das Bittgebet des Vaters für sein Kind, das Bittgebet des Reisenden und das Bittgebet dessen, dem Unrecht getan wurde." [Sunan at-Tirmidhî 1905]' },
          { titre: 'TÜREN MIT BISMILLAH SCHLIEßEN', texte: 'Gemäß Jâbir ibn \'Abdillah sagte der Prophet ﷺ: „Schließt eure Türen unter Erwähnung des Namens Allahs, denn die Shayâteen können keine Tür öffnen, die mit dem Namen Allahs geschlossen wurde." [Sahih al-Bukhârî 3280]' }
        ],
        it: [
          { titre: 'RECITA LE SURE DI PROTEZIONE', texte: 'Secondo \'Â\'isha, il Profeta ﷺ soffiava sulle sue mani recitando Al-Ikhlas, Al-Falaq e An-Nas, poi le passava sul suo corpo. Recitale tre volte ogni mattina e sera sui tuoi figli. [Sahih al-Bukhârî 5017]' },
          { titre: 'PROTEGGERE I BAMBINI BENEDICENDOLI', texte: 'Secondo Abû Hurayra, il Profeta ﷺ disse: «Se qualcuno di voi vede qualcosa di impressionante nel suo fratello, dica: "Bârakallâhu fîhi", poiché il malocchio è una realtà.» [Sahih Muslim 2188]' },
          { titre: 'AYATUL KURSI OGNI SERA', texte: 'Secondo Abû Hurayra, il Profeta ﷺ disse: «Chi recita Ayatul Kursi la sera sarà protetto da Allah e nessun shaytan potrà avvicinarsi fino al mattino.» [Sahih al-Bukhârî 2311]' },
          { titre: 'L\'INVOCAZIONE DEL PADRE VIENE ESAUDITA', texte: 'Secondo Ibn \'Abbâs, il Profeta ﷺ disse: «Ci sono tre invocazioni che non vengono rifiutate: l\'invocazione del padre per il suo figlio, l\'invocazione del viaggiatore e l\'invocazione di colui a cui è stato fatto un torto.» [Sunan at-Tirmidhî 1905]' },
          { titre: 'CHIUDI LE PORTE DICENDO BISMILLAH', texte: 'Secondo Jâbir ibn \'Abdillah, il Profeta ﷺ disse: «Chiudete le vostre porte menzionando il nome di Allah, poiché gli shayâteen non possono aprire una porta chiusa con il nome di Allah.» [Sahih al-Bukhârî 3280]' }
        ],
        nl: [
          { titre: 'RECITEER DE BESCHERMENDE SURA\'S', texte: 'Volgens \'Â\'isha blies de Profeet ﷺ in zijn handen terwijl hij Al-Ikhlas, Al-Falaq en An-Nas reciteerde, dan streek hij ermee over zijn lichaam. Reciteer ze driemaal elke ochtend en avond over je kinderen. [Sahih al-Bukhârî 5017]' },
          { titre: 'KINDEREN BESCHERMEN DOOR HEN TE ZEGENEN', texte: 'Volgens Abû Hurayra zei de Profeet ﷺ: "Als iemand van jullie iets indrukwekkends ziet bij zijn broeder, laat hem dan zeggen: \'Bârakallâhu fîhi\', want het boze oog is een realiteit." [Sahih Muslim 2188]' },
          { titre: 'AYATUL KURSI ELKE AVOND', texte: 'Volgens Abû Hurayra zei de Profeet ﷺ: "Wie Ayatul Kursi \'s avonds reciteert, wordt door Allah beschermd en geen shaytan kan hem tot de ochtend naderen." [Sahih al-Bukhârî 2311]' },
          { titre: 'HET SMEEKGEBED VAN DE VADER WORDT VERHOORD', texte: 'Volgens Ibn \'Abbâs zei de Profeet ﷺ: "Er zijn drie smeekgebeden die niet worden afgewezen: het smeekgebed van de vader voor zijn kind, het smeekgebed van de reiziger en het smeekgebed van degene die onrecht is aangedaan." [Sunan at-Tirmidhî 1905]' },
          { titre: 'SLUIT DEUREN MET BISMILLAH', texte: 'Volgens Jâbir ibn \'Abdillah zei de Profeet ﷺ: "Sluit uw deuren terwijl u de naam van Allah noemt, want de shayâteen kunnen geen deur openen die gesloten is met de naam van Allah." [Sahih al-Bukhârî 3280]' }
        ],
        pt: [
          { titre: 'RECITA AS SURAS DE PROTEÇÃO', texte: 'Segundo \'Â\'isha, o Profeta ﷺ soprava nas suas mãos enquanto recitava Al-Ikhlas, Al-Falaq e An-Nas, depois passava-as pelo seu corpo. Recita-as três vezes cada manhã e tarde sobre os teus filhos. [Sahih al-Bukhârî 5017]' },
          { titre: 'PROTEGER AS CRIANÇAS ABENÇOANDO-AS', texte: 'Segundo Abû Hurayra, o Profeta ﷺ disse: «Se alguém de vós vir algo impressionante no seu irmão, que diga: "Bârakallâhu fîhi", pois o mau-olhado é uma realidade.» [Sahih Muslim 2188]' },
          { titre: 'AYATUL KURSI CADA TARDE', texte: 'Segundo Abû Hurayra, o Profeta ﷺ disse: «Quem recitar Ayatul Kursi à tarde será protegido por Allah e nenhum shaytan poderá aproximar-se até à manhã.» [Sahih al-Bukhârî 2311]' },
          { titre: 'A INVOCAÇÃO DO PAI É ATENDIDA', texte: 'Segundo Ibn \'Abbâs, o Profeta ﷺ disse: «Há três invocações que não são rejeitadas: a invocação do pai pelo seu filho, a invocação do viajante e a invocação de quem foi injustiçado.» [Sunan at-Tirmidhî 1905]' },
          { titre: 'FECHA AS PORTAS DIZENDO BISMILLAH', texte: 'Segundo Jâbir ibn \'Abdillah, o Profeta ﷺ disse: «Fechai as vossas portas mencionando o nome de Allah, pois os shayâteen não podem abrir uma porta fechada com o nome de Allah.» [Sahih al-Bukhârî 3280]' }
        ],
        tr: [
          { titre: 'KORUMA SURELERİNİ OKU', texte: '\'Âişe\'den; Peygamber ﷺ ellerine üfleyerek Al-İhlâs, Al-Felak ve An-Nâs surelerini okur, sonra ellerini vücuduna sürerdi. Her sabah ve akşam çocuklarının üzerine üç kez oku. [Sahihu\'l-Buhârî 5017]' },
          { titre: 'ÇOCUKLARI BEREKETLEYEREK KORUMAK', texte: 'Ebû Hureyre\'den; Peygamber ﷺ şöyle buyurdu: "Biriniz kardeşinde beğendiği bir şey görürse \'Bârekallâhu fîh\' desin, zira nazar haktır." [Sahihu Muslim 2188]' },
          { titre: 'HER AKŞAM AYETÜ\'L-KÜRSİ OKUMAK', texte: 'Ebû Hureyre\'den; Peygamber ﷺ şöyle buyurdu: "Her kim akşam Âyetü\'l-Kürsî\'yi okursa sabaha kadar Allah\'ın koruması altında olur ve hiçbir şeytan ona yaklaşamaz." [Sahihu\'l-Buhârî 2311]' },
          { titre: 'BABANIN DUASI KABUL EDİLİR', texte: 'İbn \'Abbâs\'tan; Peygamber ﷺ şöyle buyurdu: "Üç dua reddedilmez: Babanın çocuğu için duası, yolcunun duası ve mazlumun duası." [Sünen-i Tirmizî 1905]' },
          { titre: 'KAPILARI BİSMİLLAH İLE KAPAT', texte: 'Câbir ibn \'Abdillah\'tan; Peygamber ﷺ şöyle buyurdu: "Kapılarınızı Allah\'ın adını anarak kapatın, zira şeytanlar Allah\'ın adıyla kapatılmış bir kapıyı açamazlar." [Sahihu\'l-Buhârî 3280]' }
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas', sub_de: 'Empfohlene Praktiken', sub_it: 'Pratiche raccomandate', sub_nl: 'Aanbevolen praktijken', sub_pt: 'Práticas recomendadas', sub_tr: 'Tavsiye edilen uygulamalar' }
    }
  },

  // ===========================
  // TRANSPORT
  // ===========================
  transport: {
    meta: {
      icon: 'images/voiture.webp',
      titre: { fr: 'Transport', en: 'Transport', es: 'Transporte' , de: 'Transport', it: 'Trasporto', nl: 'Transport', pt: 'Transporte', tr: 'Ulaşım'},
      closingDua: { fr: 'Que tes trajets quotidiens soient protégés et bénis', en: 'May your daily journeys be protected and blessed', es: 'Que tus viajes diarios sean protegidos y bendecidos' , de: 'Mögen deine täglichen Fahrten beschützt und gesegnet sein', it: 'Che i tuoi viaggi quotidiani siano protetti e benedetti', nl: 'Mogen je dagelijkse reizen beschermd en gezegend zijn', pt: 'Que as tuas viagens diárias sejam protegidas e abençoadas', tr: 'Günlük yolculuklarının korunaklı ve bereketli olması dileğiyle'}
    },
    acc1: {
      titre: { fr: 'LORSQU\'ON PREND UN MOYEN DE TRANSPORT', en: 'WHEN TAKING ANY MEANS OF TRANSPORT', es: 'AL TOMAR UN MEDIO DE TRANSPORTE' , de: 'BEIM BENUTZEN EINES VERKEHRSMITTELS', it: 'QUANDO SI PRENDE UN MEZZO DI TRASPORTO', nl: 'BIJ HET NEMEN VAN EEN VERVOERMIDDEL', pt: 'AO TOMAR UM MEIO DE TRANSPORTE', tr: 'BİR TAŞIT ARACIYLA YOLCULUĞA ÇIKARKEN'},
      arabe: 'بِسْمِ اللَّهِ، الْحَمْدُ لِلَّهِ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ',
      phonetique: {
        fr: 'Bismillâh. Al-hamdu lillâh. Subhâna lladhî sakhkhara lanâ hâdhâ wa mâ kunnâ lahu muqrînîn. Wa innâ ilâ rabbinâ lamunqalibûn.',
        en: 'Bismillaah. Al-hamdu lillaah. Subhaanalladhee sakhkhara lanaa haathaa wa maa kunnaa lahu muqrineen. Wa innaa ilaa rabbinaa lamunqaliboon.',
        es: 'Bismilláh. Al-hamdu lilláh. Subhánalladhí sajjhara lanaa háthaa wa maa kunnaa lahu muqrineen. Wa innaa ilaa rabbiná lamunqalibúun.'
      , de: 'Bismillâh. Al-hamdu lillâh. Subhâna lladhî sakhkhara lanâ hâdhâ wa mâ kunnâ lahu muqrînîn. Wa innâ ilâ rabbinâ lamunqalibûn.', it: 'Bismillāh. Al-ḥamdu lillāh. Subḥāna lladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrīnīn. Wa innā ilā rabbinā lamunqalibūn.', nl: 'Bismillaah. Al-hamdu lillaah. Subhaanalladhee sakhkhara lanaa haathaa wa maa kunnaa lahu muqrineen. Wa innaa ilaa rabbinaa lamunqaliboon.', pt: 'Bismillāh. Al-ḥamdu lillāh. Subḥāna lladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrīnīn. Wa innā ilā rabbinā lamunqalibūn.', tr: 'Bismillâh. Elhamdülillâh. Sübhânellezî sehhere lenâ hâzâ ve mâ künnâ lehû mukrinîn. Ve innâ ilâ rabbinâ lemünkalibûn.'},
      traduction: {
        fr: 'Au nom d\'Allah. Louange à Allah. Gloire à Celui qui a soumis ceci à notre service alors que nous n\'étions pas capables de le maîtriser. Et certes, nous retournerons vers notre Seigneur.',
        en: 'In the name of Allah. Praise be to Allah. Glory be to Him Who has subjected this to us while we were unable to subdue it. And indeed to our Lord we are returning.',
        es: 'En el nombre de Allah. La alabanza es para Allah. Gloria a Quien ha sometido esto a nuestro servicio cuando no éramos capaces de dominarlo. Y ciertamente, volveremos a nuestro Señor.'
      , de: 'Im Namen Allahs. Lob sei Allah. Ehre sei Dem, Der uns dies dienstbar gemacht hat, während wir nicht in der Lage gewesen wären, es zu bezwingen. Und wahrlich, zu unserem Herrn kehren wir zurück.', it: 'Nel nome di Allah. Lode ad Allah. Gloria a Colui che ha assoggettato questo al nostro servizio mentre non eravamo capaci di dominarlo. E invero, al nostro Signore facciamo ritorno.', nl: 'In de naam van Allah. Lof zij Allah. Glorie zij Hem Die dit aan ons onderworpen heeft terwijl wij het niet hadden kunnen bedwingen. En voorwaar, tot onze Heer keren wij terug.', pt: 'Em nome de Allah. Louvor a Allah. Glória a Quem nos submeteu isto enquanto não éramos capazes de o dominar. E certamente, ao nosso Senhor regressaremos.', tr: 'Allah\'ın adıyla. Hamd Allah\'a. Bunu bize boyun eğdiren Allah\'ı tesbih ederiz; oysa biz onu ehledilebilecek güçte değildik. Şüphesiz biz Rabbimize döneceğiz.'},
      hadith: {
        fr: 'D\'après Ibn \'Umar (qu\'Allah les agrée) : « Lorsque le Prophète ﷺ montait sur sa monture pour voyager, il disait trois fois Allâhu Akbar, puis disait cette invocation. »\nSource : Sunan Abu Daoud (2602) · Tirmidhi (3446)',
        en: 'Narrated Ibn \'Umar (may Allah be pleased with them both): "When the Prophet ﷺ mounted his riding animal for a journey, he would say Allahu Akbar three times, then say this supplication."\nSource: Sunan Abu Dawud (2602) · Tirmidhi (3446)',
        es: 'Narrado por Ibn \'Umar (que Allah esté complacido con ellos): «Cuando el Profeta ﷺ montaba en su cabalgadura para viajar, decía Allâhu Akbar tres veces, luego decía esta invocación.»\nFuente: Sunan Abu Daoud (2602) · Tirmidhi (3446)'
      , de: 'Überliefert von Ibn \'Umar (möge Allah mit ihnen beiden zufrieden sein): „Wenn der Prophet ﷺ auf sein Reittier stieg, sagte er dreimal Allâhu Akbar, dann sprach er dieses Bittgebet.“\nQuelle: Sunan Abî Dâwûd (2602) · Tirmidhi (3446)', it: 'Riportato da Ibn \'Umar (che Allah sia soddisfatto di entrambi): «Quando il Profeta ﷺ saliva sulla sua cavalcatura, diceva tre volte Allâhu Akbar, poi diceva questa invocazione.»\nFonte: Sunan Abî Dâwûd (2602) · Tirmidhi (3446)', nl: 'Overgeleverd door Ibn \'Umar (moge Allah tevreden met hen beiden zijn): "Wanneer de Profeet ﷺ op zijn rijdier steeg, zei hij driemaal Allâhu Akbar, dan zei hij dit smeekgebed."\nBron: Sunan Abî Dâwûd (2602) · Tirmidhi (3446)', pt: 'Narrado por Ibn \'Umar (que Allah esteja satisfeito com ambos): «Quando o Profeta ﷺ montava na sua montaria, dizia Allâhu Akbar três vezes, depois dizia esta invocação.»\nFonte: Sunan Abî Dâwûd (2602) · Tirmidhi (3446)', tr: 'İbn Ömer\'den (Allah onlardan razı olsun) rivayet edilmiştir: "Peygamber ﷺ yolculuk için bineğine bindiğinde üç kez Allahu Ekber der, ardından bu duayı okurdu."\nKaynak: Sünen-i Ebî Dâvûd (2602) · Tirmizî (3446)'},
      audio: 'transport1.mp3',
      sheet: { sub_fr: 'Subhâna alladhî', sub_en: 'Subhâna alladhî', sub_es: 'Subhâna alladhî', sub_de: 'Subhâna alladhî', sub_it: 'Subhāna lladhī', sub_nl: 'Subhâna alladhî', sub_pt: 'Subhāna lladhī', sub_tr: 'Sübhânellezî' }
    },
    acc2: {
      titre: { fr: 'OPTION POUR LES TRAJETS PLUS LONGS (VARIANTE COMPLÈTE)', en: 'OPTION FOR LONGER JOURNEYS (COMPLETE VERSION)', es: 'OPCIÓN PARA VIAJES MÁS LARGOS (VERSIÓN COMPLETA)' , de: 'OPTION FÜR LÄNGERE REISEN (VOLLSTÄNDIGE VARIANTE)', it: 'OPZIONE PER VIAGGI PIÙ LUNGHI (VERSIONE COMPLETA)', nl: 'OPTIE VOOR LANGERE REIZEN (VOLLEDIGE VERSIE)', pt: 'OPÇÃO PARA VIAGENS MAIS LONGAS (VERSÃO COMPLETA)', tr: 'DAHA UZUN YOLCULUKLAR İÇİN (TAM VERSİYON)'},
      arabe: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى. اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ',
      phonetique: {
        fr: 'Allâhumma innâ nas\'aluka fî safarinâ hâdhâ l-birra wat-taqwâ, wa minal-\'amali mâ tardâ. Allâhumma hawwin \'alaynâ safaranâ hâdhâ watwi \'annâ bu\'dahu...',
        en: 'Allaahummaa innaa nas\'aluka fee safarinaa haathal-birra wat-taqwaa, wa minal-\'amali maa tardaa. Allaahummaa hawwin \'alaynaa safaranaa haathaa watwi \'annaa bu\'dah...',
        es: 'Alláhummaa innaa nas\'aluka fee safarinaa haathal-birra wat-taqwáa, wa minal-\'amali maa tardáa. Alláhummaa hawwin \'alaynaa safaranaa haathaa watwi \'annaa bu\'dah...'
      , de: 'Allâhumma innâ nas\'aluka fî safarinâ hâdhâ l-birra wat-taqwâ, wa minal-\'amali mâ tardâ. Allâhumma hawwin \'alaynâ safaranâ hâdhâ watwi \'annâ bu\'dahu...', it: 'Allāhummā innā nas\'aluka fī safarinā hādhā l-birra wat-taqwā, wa minal-\'amali mā tarḍā. Allāhummā hawwin \'alaynā safaranā hādhā waṭwi \'annā bu\'dahu...', nl: 'Allaahummaa innaa nas\'aluka fee safarinaa haathal-birra wat-taqwaa, wa minal-\'amali maa tardaa. Allaahummaa hawwin \'alaynaa safaranaa haathaa watwi \'annaa bu\'dah...', pt: 'Allāhummā innā nas\'aluka fī safarinā hādhā l-birra wat-taqwā, wa minal-\'amali mā tarḍā. Allāhummā hawwin \'alaynā safaranā hādhā waṭwi \'annā bu\'dahu...', tr: 'Allâhümme innâ nes\'elüke fî seferinâ hâzâ el-birre vet-takvâ, ve minel-ameli mâ terdâ. Allâhümme havvin aleynâ seferanâ hâzâ vatvi annâ bu\'dehû...'},
      traduction: {
        fr: 'Ô Allah, nous Te demandons dans ce voyage la piété, la crainte pieuse et les actions qui Te plaisent. Ô Allah, facilite-nous ce voyage et raccourcis sa distance...',
        en: 'O Allah, we ask You in this journey of ours for righteousness and piety, and for deeds that please You. O Allah, make this journey easy for us and shorten its distance...',
        es: 'Oh Allah, Te pedimos en este viaje piedad, temor reverente y acciones que Te complazcan. Oh Allah, facilítanos este viaje y acorta su distancia...'
      , de: 'O Allah, wir bitten Dich in dieser Reise um Frömmigkeit, Gottesfurcht und Taten, die Dir gefallen. O Allah, erleichtere uns diese Reise und verkürze ihre Distanz...', it: 'O Allah, Ti chiediamo in questo viaggio pietà, timore reverente e azioni che Ti piacciono. O Allah, rendici facile questo viaggio e accorcia la sua distanza...', nl: 'O Allah, wij vragen U in deze reis om vroomheid, godsvrees en daden die U behagen. O Allah, maak deze reis gemakkelijk voor ons en verkort de afstand...', pt: 'Ó Allah, pedimos-Te nesta viagem piedade, temor reverente e ações que Te agradem. Ó Allah, facilita-nos esta viagem e encurta a sua distância...', tr: 'Allah\'ım! Bu yolculuğumuzda senden iyilik, takva ve razı olduğun ameller dileriz. Allah\'ım! Bu yolculuğumuzu bize kolaylaştır ve uzaklığını kısa kıl...'},
      hadith: {
        fr: 'D\'après Ibn \'Umar (qu\'Allah les agrée) : « Le Prophète ﷺ disait cette invocation lors de ses voyages, au matin et au soir. »\nSource : Sahih Muslim (1342)',
        en: 'Narrated Ibn \'Umar (may Allah be pleased with them both): "The Prophet ﷺ used to say this supplication during his journeys, morning and evening."\nSource: Sahih Muslim (1342)',
        es: 'Narrado por Ibn \'Umar (que Allah esté complacido con ellos): «El Profeta ﷺ decía esta invocación durante sus viajes, mañana y tarde.»\nFuente: Sahih Muslim (1342)'
      , de: 'Überliefert von Ibn \'Umar (möge Allah mit ihnen beiden zufrieden sein): „Der Prophet ﷺ pflegte dieses Bittgebet während seiner Reisen morgens und abends zu sprechen.“\nQuelle: Sahih Muslim (1342)', it: 'Riportato da Ibn \'Umar (che Allah sia soddisfatto di entrambi): «Il Profeta ﷺ era solito dire questa invocazione durante i suoi viaggi, mattina e sera.»\nFonte: Sahih Muslim (1342)', nl: 'Overgeleverd door Ibn \'Umar (moge Allah tevreden met hen beiden zijn): "De Profeet ﷺ placht dit smeekgebed tijdens zijn reizen te zeggen, \'s ochtends en \'s avonds."\nBron: Sahih Muslim (1342)', pt: 'Narrado por Ibn \'Umar (que Allah esteja satisfeito com ambos): «O Profeta ﷺ costumava dizer esta invocação durante as suas viagens, de manhã e à tarde.»\nFonte: Sahih Muslim (1342)', tr: 'İbn Ömer\'den (Allah onlardan razı olsun) rivayet edilmiştir: "Peygamber ﷺ yolculuklarında sabah ve akşam bu duayı okurdu."\nKaynak: Sahih Muslim (1342)'},
      audio: 'transport2.mp3',
      sheet: { sub_fr: 'Variante complète', sub_en: 'Complete variant', sub_es: 'Variante completa', sub_de: 'Vollständige Variante', sub_it: 'Variante completa', sub_nl: 'Volledige variant', sub_pt: 'Variante completa', sub_tr: 'Tam versiyon' }
    },
    acc3: {
      titre: { fr: 'SUNNAHS DU PROPHÈTE ﷺ', en: 'PROPHET\'S ﷺ SUNNAH', es: 'SUNNAH DEL PROFETA ﷺ' },
      sunnah: true,
      items: {
        fr: [
          { titre: 'COMMENCE PAR BISMILLAH ET LOUANGE', texte: 'D\'après Abou Hourayra, le Prophète ﷺ insistait sur le rappel d\'Allah avant tout déplacement, même court. [Sahih Muslim 2727a]' },
          { titre: 'FAIS CONFIANCE À ALLAH POUR LA SÉCURITÉ', texte: 'D\'après Anas ibn Malik, le Prophète ﷺ enseignait à placer sa tawakkul en Allah pour tout voyage, même quotidien. [Sahih Tirmidhi 2344]' },
          { titre: 'DIS BISMILLAH AVANT TOUT DÉPART', texte: 'D\'après Abou Hourayra, le Prophète ﷺ ordonnait de dire Bismillah avant de monter sa monture. [Sahih Muslim 2727a]' },
          { titre: 'PROTECTION ET COUVERTURE DU DANGER', texte: 'D\'après Ibn Omar, le Prophète ﷺ récitait cette protection à chaque départ. Elle couvre tous dangers. [Sahih Muslim 2182]' }
        ],
        en: [
          { titre: 'START WITH BISMILLAH AND PRAISE', texte: 'According to Abu Hurairah, the Prophet ﷺ insisted on remembering Allah before any journey, even short ones. [Sahih Muslim 2727a]' },
          { titre: 'TRUST ALLAH FOR SAFETY', texte: 'According to Anas ibn Malik, the Prophet ﷺ taught to place one\'s tawakkul in Allah for every journey, even daily ones. [Sahih Tirmidhi 2344]' },
          { titre: 'SAY BISMILLAH BEFORE EVERY DEPARTURE', texte: 'According to Abu Hurairah, the Prophet ﷺ commanded saying Bismillah before mounting. [Sahih Muslim 2727a]' },
          { titre: 'PROTECTION AND COVERAGE FROM DANGER', texte: 'According to Ibn Umar, the Prophet ﷺ recited this protection at every departure. It covers all dangers. [Sahih Muslim 2182]' }
        ],
        es: [
          { titre: 'COMIENZA CON BISMILLAH Y ALABANZA', texte: 'Según Abu Hurairah, el Profeta ﷺ insistía en recordar a Allah antes de cualquier desplazamiento. [Sahih Muslim 2727a]' },
          { titre: 'CONFÍA EN ALLAH PARA LA SEGURIDAD', texte: 'Según Anas ibn Malik, el Profeta ﷺ enseñaba a depositar su tawakkul en Allah para todo viaje. [Sahih Tirmidhi 2344]' },
          { titre: 'DI BISMILLAH ANTES DE CADA SALIDA', texte: 'Según Abu Hurairah, el Profeta ﷺ ordenaba decir Bismillah antes de montar. [Sahih Muslim 2727a]' },
          { titre: 'PROTECCIÓN Y COBERTURA DEL PELIGRO', texte: 'Según Ibn Umar, el Profeta ﷺ recitaba esta protección en cada salida. [Sahih Muslim 2182]' }
        ],
        de: [
          { titre: 'BEGINNE MIT BISMILLAH UND LOB', texte: 'Gemäß Abû Hurayra bestand der Prophet ﷺ darauf, Allah vor jeder Reise zu gedenken, auch kurzen. [Sahih Muslim 2727a]' },
          { titre: 'VERTRAUE ALLAH FÜR DIE SICHERHEIT', texte: 'Gemäß Anas ibn Mâlik lehrte der Prophet ﷺ, bei jeder Reise sein Tawakkul in Allah zu setzen. [Sahih Tirmidhî 2344]' },
          { titre: 'SAG BISMILLAH VOR JEDER ABFAHRT', texte: 'Gemäß Abû Hurayra ordnete der Prophet ﷺ an, Bismillah zu sagen, bevor man aufsteigt. [Sahih Muslim 2727a]' },
          { titre: 'SCHUTZ VOR ALLEN GEFAHREN', texte: 'Gemäß Ibn \'Umar rezitierte der Prophet ﷺ diesen Schutz bei jeder Abfahrt. Er deckt alle Gefahren ab. [Sahih Muslim 2182]' }
        ],
        it: [
          { titre: 'INIZIA CON BISMILLAH E LA LODE', texte: 'Secondo Abû Hurayra, il Profeta ﷺ insisteva nel ricordare Allah prima di qualsiasi viaggio, anche breve. [Sahih Muslim 2727a]' },
          { titre: 'AFFIDATI AD ALLAH PER LA SICUREZZA', texte: 'Secondo Anas ibn Mâlik, il Profeta ﷺ insegnava a porre il proprio tawakkul in Allah per ogni viaggio. [Sahih Tirmidhî 2344]' },
          { titre: 'DI\' BISMILLAH PRIMA DI OGNI PARTENZA', texte: 'Secondo Abû Hurayra, il Profeta ﷺ ordinava di dire Bismillah prima di salire. [Sahih Muslim 2727a]' },
          { titre: 'PROTEZIONE DA TUTTI I PERICOLI', texte: 'Secondo Ibn \'Umar, il Profeta ﷺ recitava questa protezione ad ogni partenza. Copre tutti i pericoli. [Sahih Muslim 2182]' }
        ],
        nl: [
          { titre: 'BEGIN MET BISMILLAH EN LOFPRIJZING', texte: 'Volgens Abû Hurayra drong de Profeet ﷺ erop aan Allah te gedenken voor elke reis, ook korte. [Sahih Muslim 2727a]' },
          { titre: 'VERTROUW OP ALLAH VOOR VEILIGHEID', texte: 'Volgens Anas ibn Mâlik leerde de Profeet ﷺ zijn tawakkul in Allah te stellen voor elke reis. [Sahih Tirmidhî 2344]' },
          { titre: 'ZEG BISMILLAH VOOR ELK VERTREK', texte: 'Volgens Abû Hurayra beval de Profeet ﷺ Bismillah te zeggen voor het opstijgen. [Sahih Muslim 2727a]' },
          { titre: 'BESCHERMING TEGEN ALLE GEVAREN', texte: 'Volgens Ibn \'Umar reciteerde de Profeet ﷺ deze bescherming bij elk vertrek. Het dekt alle gevaren. [Sahih Muslim 2182]' }
        ],
        pt: [
          { titre: 'COMEÇA COM BISMILLAH E LOUVOR', texte: 'Segundo Abû Hurayra, o Profeta ﷺ insistia em lembrar Allah antes de qualquer viagem, mesmo curta. [Sahih Muslim 2727a]' },
          { titre: 'CONFIA EM ALLAH PARA A SEGURANÇA', texte: 'Segundo Anas ibn Mâlik, o Profeta ﷺ ensinava a depositar o seu tawakkul em Allah para cada viagem. [Sahih Tirmidhî 2344]' },
          { titre: 'DI BISMILLAH ANTES DE CADA PARTIDA', texte: 'Segundo Abû Hurayra, o Profeta ﷺ ordenava dizer Bismillah antes de montar. [Sahih Muslim 2727a]' },
          { titre: 'PROTEÇÃO CONTRA TODOS OS PERIGOS', texte: 'Segundo Ibn \'Umar, o Profeta ﷺ recitava esta proteção a cada partida. Cobre todos os perigos. [Sahih Muslim 2182]' }
        ],
        tr: [
          { titre: 'BİSMİLLAH VE HAMD İLE BAŞLA', texte: 'Ebû Hureyre\'den; Peygamber ﷺ kısa da olsa her yolculuktan önce Allah\'ı zikretmeye önem verirdi. [Sahih Muslim 2727a]' },
          { titre: 'GÜVENLİK İÇİN ALLAH\'A TEVEKKÜL ET', texte: 'Enes ibn Mâlik\'ten; Peygamber ﷺ her yolculukta tevekkülü Allah\'a bırakmayı öğretirdi. [Sahih Tirmizî 2344]' },
          { titre: 'HER YOLA ÇIKMADAN ÖNCE BİSMİLLAH DE', texte: 'Ebû Hureyre\'den; Peygamber ﷺ bineğe binmeden önce Bismillah demeyi emrederdi. [Sahih Muslim 2727a]' },
          { titre: 'TÜM TEHLİKELERDEN KORUNMA', texte: 'İbn Ömer\'den; Peygamber ﷺ her yola çıkışta bu korumayı okurdu. Tüm tehlikeleri kapsar. [Sahih Muslim 2182]' }
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas', sub_de: 'Empfohlene Praktiken', sub_it: 'Pratiche raccomandate', sub_nl: 'Aanbevolen praktijken', sub_pt: 'Práticas recomendadas', sub_tr: 'Tavsiye edilen uygulamalar' }
    }
  }

}; // fin DUAS
