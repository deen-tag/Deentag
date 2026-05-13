// ===== DEENTAG — DUAS.JS — SOURCE UNIQUE DE VÉRITÉ =====
// Toute modification de contenu se fait ICI uniquement.
// Structure : DUAS[page][accId] = { titre, arabe, phonetique, traduction, hadith, audio }
// Pour les sunnahs : { titre, sunnah: true, items: [...] }

const DUAS = {

  // ===========================
  // REPAS
  // ===========================
  repas: {
    meta: {
      icon: 'images/repas.png',
      titre:       { fr: 'Repas',   en: 'Meals',  es: 'Comidas' },
      closingDua:  { fr: 'Que ton repas soit béni', en: 'May your meal be blessed', es: 'Que tu comida sea bendecida' }
    },
    acc1: {
      titre: {
        fr: 'AVANT DE COMMENCER À MANGER',
        en: 'BEFORE EATING',
        es: 'ANTES DE COMER'
      },
      arabe: 'بِسْمِ اللَّهِ',
      phonetique: { fr: 'Bismillâh', en: 'Bismillaah', es: 'Bismilláh' },
      traduction: {
        fr: 'Au nom d\'Allah',
        en: 'In the name of Allah',
        es: 'En el nombre de Allah'
      },
      hadith: {
        fr: 'À dire à voix basse avant de commencer à manger. Sahih al-Bukhari (5376), Sahih Muslim (2022).',
        en: 'To be said softly before beginning to eat. Sahih al-Bukhari (5376), Sahih Muslim (2022).',
        es: 'Se dice en voz baja antes de comenzar a comer. Sahih al-Bukhari (5376), Sahih Muslim (2022).'
      },
      audio: 'repas1.mp3',
      sheet: { sub_fr: 'Bismillah', sub_en: 'Bismillah', sub_es: 'Bismillah' }
    },
    acc2: {
      titre: {
        fr: 'SI OUBLI DE DIRE BISMILLAH AU DÉBUT',
        en: 'IF YOU FORGET BISMILLAH AT THE START',
        es: 'SI OLVIDAS DECIR BISMILLAH AL INICIO'
      },
      arabe: 'بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ',
      phonetique: {
        fr: 'Bismillâhi awwalahû wa âkhirahû',
        en: 'Bismillaahi awwalahu wa aakhirahu',
        es: 'Bismilláhi awwalahu wa ájirah'
      },
      traduction: {
        fr: 'Au nom d\'Allah au début et à la fin',
        en: 'In the name of Allah, at the beginning and at the end',
        es: 'En el nombre de Allah, al principio y al final'
      },
      hadith: {
        fr: 'Le Prophète ﷺ a dit : « Quand l\'un de vous mange, qu\'il dise \'Bismillah\'. Et s\'il oublie au début, qu\'il dise : \'Bismillah fî awwalihi wa âkhirihi\'. » Sahih al-Bukhari (5376) et Sahih Muslim (2022).',
        en: 'The Prophet ﷺ said: "When one of you eats, let him say \'Bismillah\'. If he forgets at the beginning, let him say: \'Bismillah fi awwalihi wa akhirihi\'." Sahih al-Bukhari (5376) and Sahih Muslim (2022).',
        es: 'El Profeta ﷺ dijo: "Cuando alguno de vosotros coma, que diga \'Bismillah\'. Y si olvida al principio, que diga: \'Bismillah fi awwalihi wa akhirihi\'." Sahih al-Bukhari (5376) y Sahih Muslim (2022).'
      },
      audio: 'repas2.mp3',
      sheet: { sub_fr: 'Si tu oublies', sub_en: 'If forgotten', sub_es: 'Si olvidaste' }
    },
    acc3: {
      titre: {
        fr: 'APRÈS AVOIR FINI DE MANGER',
        en: 'AFTER FINISHING THE MEAL',
        es: 'DESPUÉS DE TERMINAR DE COMER'
      },
      arabe: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
      phonetique: {
        fr: 'Al-hamdu lil-lâhi lladhî at\'amanî hâdhâ wa razaqanîhi min ghayri hawlin minnî wa lâ quwwatin',
        en: 'Al-hamdu lillaahil-lathee at-\'amanee haathaa wa razaqaneehi min ghayri hawlin minnee wa laa quwwatin',
        es: 'Al-hamdu lilláhil-lathí at-\'amaní hátha wa razaqaníhi min gáiri hawlin minní wa lá qúwwatin'
      },
      traduction: {
        fr: 'Louange à Allah qui m\'a nourri de ceci et me l\'a accordé sans force ni puissance de ma part.',
        en: 'Praise be to Allah Who has fed me this and provided it for me without any strength or power on my part.',
        es: 'Alabado sea Allah que me alimentó con esto y me lo proveyó sin fuerza ni poder de mi parte.'
      },
      hadith: {
        fr: 'Variante courte (si pressé) : <em style="color:var(--gold);">Al-hamdu lil-lâhi</em> — Louange à Allah (suffit et authentique)',
        en: 'Short version (if in a hurry): <em style="color:var(--gold);">Al-hamdu lillaah</em> — Praise be to Allah (sufficient and authentic)',
        es: 'Versión corta (si tienes prisa): <em style="color:var(--gold);">Al-hamdu lilláh</em> — Alabado sea Allah (suficiente y auténtico)'
      },
      audio: 'repas3.mp3',
      sheet: { sub_fr: 'Al-hamdulillah', sub_en: 'Al-hamdulillah', sub_es: 'Al-hamdulillah' }
    },
    acc4: {
      titre: {
        fr: 'SUNNAHS DU PROPHÈTE ﷺ',
        en: 'PROPHET\'S ﷺ SUNNAH',
        es: 'SUNNAH DEL PROFETA ﷺ'
      },
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
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas' }
    }
  },

  // ===========================
  // ABLUTION
  // ===========================
  ablution: {
    meta: {
      icon: 'images/ablution.png',
      titre: { fr: 'Ablution', en: 'Ablution', es: 'Ablución' },
      closingDua: { fr: 'Que tes ablutions soient acceptées, tes péchés effacés et les portes du Paradis ouvertes pour toi', en: 'May your ablution be accepted, your sins erased and the gates of Paradise opened for you', es: 'Que tu ablución sea aceptada, tus pecados borrados y las puertas del Paraíso abiertas para ti' }
    },
    acc1: {
      titre: { fr: 'AVANT COMMENCER LES ABLUTIONS (وضوء / WUDU)', en: 'BEFORE STARTING ABLUTION (WUDU)', es: 'ANTES DE COMENZAR LA ABLUCIÓN (WUDU)' },
      arabe: 'بِسْمِ اللَّهِ',
      phonetique: { fr: 'Bismillâh', en: 'Bismillaah', es: 'Bismilláh' },
      traduction: { fr: 'Au nom d\'Allah', en: 'In the name of Allah', es: 'En el nombre de Allah' },
      hadith: {
        fr: 'Le Prophète ﷺ a dit : « L\'ablution de celui qui n\'a pas mentionné le nom d\'Allah n\'est pas complète. » Rapporté par Abou Daoud (101), authentifié par Al-Albani.',
        en: 'The Prophet ﷺ said: "The ablution of the one who does not mention the name of Allah is not complete." Abu Daoud (101).',
        es: 'El Profeta ﷺ dijo: "La ablución de quien no menciona el nombre de Allah no es completa." Abu Daoud (101).'
      },
      audio: 'ablution1.mp3',
      sheet: { sub_fr: 'Niyyah & Basmala', sub_en: 'Intention & Basmala', sub_es: 'Niyyah & Basmala' }
    },
    acc2: {
      titre: { fr: 'RÉCITE CETTE SHAHADA APRÈS UN WUDU PARFAIT', en: 'RECITE THIS SHAHADA AFTER PERFECT WUDU', es: 'RECITA ESTA SHAHADA DESPUÉS DE UN WUDU PERFECTO' },
      arabe: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّداً عَبْدُهُ وَرَسُولُهُ',
      phonetique: {
        fr: 'Ash-hadu an lâ ilâha illallâhu wahdahu lâ sharîka lah, wa ashhadu anna Muhammadan \'abduhu wa rasûluh.',
        en: 'Ash-hadu an laa ilaaha illallaahu wahdahu laa shareeka lah, wa ash-hadu anna Muhammadan \'abduhu wa rasooluh.',
        es: 'Ash-hadu an laa iláaha illalláahu wahdahu laa sharíika lah, wa ash-hadu anna Muhammadan \'abduhu wa rasúluh.'
      },
      traduction: {
        fr: 'J\'atteste qu\'il n\'y a de divinité digne d\'adoration qu\'Allah, Unique sans associé, et j\'atteste que Muhammad est Son serviteur et Son Messager.',
        en: 'I bear witness that there is no deity worthy of worship except Allah, alone without partner, and I bear witness that Muhammad is His servant and Messenger.',
        es: 'Atestiguo que no hay más dios que Allah, Único sin asociado, y atestiguo que Muhammad es Su siervo y Su Mensajero.'
      },
      hadith: {
        fr: 'Le Prophète ﷺ a dit : « Celui qui fait ses ablutions correctement puis dit cette attestation, les huit portes du Paradis lui seront ouvertes. » Muslim (234).',
        en: 'The Prophet ﷺ said: "Whoever performs ablution correctly then says this testimony, the eight gates of Paradise will be opened for him." Muslim (234).',
        es: 'El Profeta ﷺ dijo: "Quien realice la ablución correctamente y luego diga esta profesión de fe, se abrirán para él las ocho puertas del Paraíso." Muslim (234).'
      },
      audio: 'ablution2.mp3',
      sheet: { sub_fr: 'Témoignage de foi', sub_en: 'Testimony of faith', sub_es: 'Testimonio de fe' }
    },
    acc3: {
      titre: { fr: 'DOU\'A COMPLÈTE APRÈS LES ABLUTIONS (TRÈS RÉCOMPENSÉE)', en: 'COMPLETE DUA AFTER ABLUTION (HIGHLY REWARDED)', es: 'DUA COMPLETA DESPUÉS DE LA ABLUCIÓN (MUY RECOMPENSADA)' },
      arabe: 'اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
      phonetique: {
        fr: 'Allâhumma j\'alnî minat-tawwâbîna waj\'alnî minal-mutatahhirîn.',
        en: 'Allaahummaj\'alnee minat-tawwaabeena waj\'alnee minal-mutatahhireen.',
        es: 'Alláhummay\'alnee minat-tawwaabeena way\'alnee minal-mutatahhireen.'
      },
      traduction: {
        fr: 'Ô Allah, fais de moi l\'un de ceux qui se repentent souvent et fais de moi l\'un de ceux qui se purifient.',
        en: 'O Allah, make me of those who repent often and make me of those who purify themselves.',
        es: 'Oh Allah, hazme de aquellos que se arrepienten frecuentemente y hazme de aquellos que se purifican.'
      },
      hadith: { fr: '', en: '', es: '' },
      audio: 'ablution3.mp3',
      sheet: { sub_fr: 'Très récompensée', sub_en: 'Highly rewarded', sub_es: 'Muy recompensada' }
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
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas' }
    }
  },

  // ===========================
  // REVEIL
  // ===========================
  reveil: {
    meta: {
      icon: 'images/lit.png',
      titre: { fr: 'Réveil & Couché', en: 'Wake & Sleep', es: 'Despertar & Dormir' },
      closingDua: { fr: 'Que tes nuits soient protégées et tes réveils remplis de baraka', en: 'May your nights be protected and your mornings filled with baraka', es: 'Que tus noches sean protegidas y tus mañanas llenas de baraka' }
    },
    acc1: {
      titre: { fr: 'LORSQU\'ON SE RÉVEILLE', en: 'UPON WAKING UP', es: 'AL DESPERTAR' },
      arabe: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
      phonetique: {
        fr: 'Al-hamdu lillâhi lladhî ahyânâ ba\'da mâ amâtanâ wa ilayhi n-nushûr.',
        en: 'Al-hamdu lillaahil-lathee ahyaanaa ba\'da maa amaatanaa wa ilayhin-nushoor.',
        es: 'Al-hamdu lilláhil-lathí ahyáanaa ba\'da maa amaatanaa wa iláihin-nushúur.'
      },
      traduction: {
        fr: 'Louange à Allah qui nous a rendus à la vie après nous avoir fait mourir, et c\'est vers Lui que sera la résurrection.',
        en: 'Praise be to Allah Who gave us life after He had caused us to die, and to Him is the Resurrection.',
        es: 'Alabado sea Allah que nos dio vida después de habernos dado muerte, y hacia Él es la resurrección.'
      },
      hadith: {
        fr: 'Le Prophète ﷺ disait cette invocation au réveil. Al-Bukhari (6312) et Muslim (2711).',
        en: 'The Prophet ﷺ used to say this upon waking. Al-Bukhari (6312) and Muslim (2711).',
        es: 'El Profeta ﷺ decía esta invocación al despertar. Al-Bujari (6312) y Muslim (2711).'
      },
      audio: 'reveil1.mp3',
      sheet: { sub_fr: 'Au lever du sommeil', sub_en: 'When waking up', sub_es: 'Al despertarse' }
    },
    acc2: {
      titre: { fr: 'INVOCATION LORSQU\'ON VA SE COUCHER', en: 'WHEN GOING TO SLEEP', es: 'AL IR A DORMIR' },
      arabe: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
      phonetique: {
        fr: 'Bismika Allâhumma amûtu wa ahyâ.',
        en: 'Bismika Allaahummaa amootu wa ahyaa.',
        es: 'Bismika Alláhummaa amúutu wa ahyáa.'
      },
      traduction: {
        fr: 'C\'est en Ton nom, ô Allah, que je meurs et que je vis',
        en: 'In Your name, O Allah, I die and I live.',
        es: 'En Tu nombre, oh Allah, muero y vivo.'
      },
      hadith: {
        fr: 'Le Prophète ﷺ disait cela avant de dormir. Al-Bukhari et Muslim.',
        en: 'The Prophet ﷺ said this before sleeping. Al-Bukhari and Muslim.',
        es: 'El Profeta ﷺ decía esto antes de dormir. Al-Bujari y Muslim.'
      },
      audio: 'reveil2.mp3',
      sheet: { sub_fr: 'Invocation du coucher', sub_en: 'Bedtime supplication', sub_es: 'Invocación al acostarse' }
    },
    acc3: {
      titre: { fr: 'VARIANTE COMPLÈTE', en: 'COMPLETE VERSION', es: 'VERSIÓN COMPLETA' },
      arabe: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
      phonetique: {
        fr: 'Bismika Rabbî wada\'tu janbî, wa bika arfa\'uhu. Fa-in amsakta nafsî farhamhâ, wa in arsaltahâ fahfazhâ bimâ tahfazu bihi \'ibâdaka s-sâlihîn.',
        en: 'Bismika Rabbee wada\'tu janbee, wa bika arfa\'uh. Fa-in amsakta nafsee farhamhaa, wa in arsaltahaa fahfathhaa bimaa tahfathu bihi \'ibaadakas-saaliheen.',
        es: 'Bismika Rabbee wada\'tu yanbee, wa bika arfa\'uh. Fa-in amsakta nafsee farhamhaa, wa in arsaltahaa fahfathhaa bimaa tahfathu bihi \'ibaadakas-saaliheen.'
      },
      traduction: {
        fr: 'Ô mon Seigneur, c\'est en Ton nom que je me couche sur le côté, et c\'est par Toi que je le relève. Si Tu retiens mon âme, fais-lui miséricorde ; et si Tu la renvoies, protège-la comme Tu protèges Tes serviteurs pieux.',
        en: 'O my Lord, in Your name I lie down on my side, and in Your name I raise it. If You hold my soul, then have mercy on it; and if You release it, then protect it as You protect Your righteous servants.',
        es: 'Oh Señor mío, en Tu nombre me acuesto sobre mi lado y en Tu nombre me levanto. Si retienes mi alma, ten misericordia de ella; y si la liberas, protégela como proteges a Tus siervos piadosos.'
      },
      hadith: {
        fr: 'Cette dua protège l\'âme pendant le sommeil. Al-Bukhari, authentique.',
        en: 'This dua protects the soul during sleep. Al-Bukhari, authentic.',
        es: 'Esta dua protege el alma durante el sueño. Al-Bujari, auténtico.'
      },
      audio: 'reveil3.mp3',
      sheet: { sub_fr: 'Version longue', sub_en: 'Extended version', sub_es: 'Versión larga' }
    },
    acc4: {
      titre: { fr: 'SUNNAHS DU PROPHÈTE ﷺ', en: 'PROPHET\'S ﷺ SUNNAH', es: 'SUNNAH DEL PROFETA ﷺ' },
      sunnah: true,
      items: {
        fr: [
          { titre: 'DORMIR SUR LE CÔTÉ DROIT', texte: 'D\'après Aïcha (qu\'Allah l\'agrée), le Prophète ﷺ dormait sur le côté droit, la main droite sous la joue droite. [Bukhari 6311]' },
          { titre: 'COUCHER COMME DERNIÈRE NUIT', texte: 'D\'après Abu Hurayra, le Prophète ﷺ disait : « Quand tu te couches, fais comme si c\'était ta dernière nuit. » [Tirmidhi 3398 - Sahih]' },
          { titre: 'WUDU + 3 SOURATES AVANT DORMIR', texte: 'D\'après Abu Hurayra, le Prophète ﷺ disait : « Quand tu vas te coucher, fais wudu comme pour la prière, puis joins tes mains, souffle légèrement dedans, récite Al-Ikhlas, Al-Falaq, An-Nas trois fois chacune, et passe-les sur ton corps autant que possible. » [Bukhari 6315 & Muslim 2192]' }
        ],
        en: [
          { titre: 'SLEEP ON THE RIGHT SIDE', texte: 'According to Aisha (may Allah be pleased with her), the Prophet ﷺ used to sleep on his right side, with his right hand under his right cheek. [Bukhari 6311]' },
          { titre: 'GO TO BED AS IF IT WERE YOUR LAST NIGHT', texte: 'According to Abu Hurairah, the Prophet ﷺ said: "When you go to bed, do so as if it were your last night." [Tirmidhi 3398 - Sahih]' },
          { titre: 'WUDU + 3 SURAHS BEFORE SLEEPING', texte: 'According to Abu Hurairah, the Prophet ﷺ said: "When you go to bed, perform wudu as for prayer, then cup your hands together, blow lightly into them, recite Al-Ikhlas, Al-Falaq, An-Nas three times each, and pass them over your body as much as possible." [Bukhari 6315 & Muslim 2192]' }
        ],
        es: [
          { titre: 'DORMIR SOBRE EL LADO DERECHO', texte: 'Según Aisha (que Allah esté complacido con ella), el Profeta ﷺ dormía sobre su lado derecho, con la mano derecha bajo la mejilla derecha. [Bujari 6311]' },
          { titre: 'ACOSTARSE COMO SI FUERA LA ÚLTIMA NOCHE', texte: 'Según Abu Hurairah, el Profeta ﷺ decía: "Cuando te acuestes, hazlo como si fuera tu última noche." [Tirmidhi 3398 - Sahih]' },
          { titre: 'WUDU + 3 SURAS ANTES DE DORMIR', texte: 'Según Abu Hurairah, el Profeta ﷺ decía: "Cuando vayas a acostarte, realiza el wudu como para la oración, luego junta tus manos, sopla suavemente en ellas, recita Al-Ikhlas, Al-Falaq, An-Nas tres veces cada una y pásalas por tu cuerpo todo lo posible." [Bujari 6315 & Muslim 2192]' }
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas' }
    }
  },

  // ===========================
  // TOILETTES
  // ===========================
  toilettes: {
    meta: {
      icon: 'images/wc.png',
      titre: { fr: 'Toilettes', en: 'Restroom', es: 'Baño' },
      closingDua: { fr: 'Que tes entrées et sorties soient toujours protégées, et qu\'Allah accepte tes invocations', en: 'May your entries and exits be always protected, and may Allah accept your supplications', es: 'Que tus entradas y salidas sean siempre protegidas, y que Allah acepte tus súplicas' }
    },
    acc1: {
      titre: { fr: 'AVANT D\'ENTRER AUX TOILETTES', en: 'BEFORE ENTERING THE RESTROOM', es: 'ANTES DE ENTRAR AL BAÑO' },
      arabe: 'بِسْمِ اللهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
      phonetique: {
        fr: 'Bismillah.\nAllâhumma innî a\'ûdhu bika min al-khubuthi wal-khabâ\'ith',
        en: 'Bismillaah.\nAllaahummaa innee a\'oodhu bika minal khubuthi wal khabaa\'ith',
        es: 'Bismilláh.\nAlláhumma inní a\'údhu bika minal-jubúthi wal-jabáa\'ith'
      },
      traduction: {
        fr: 'Au nom d\'Allah. Ô Allah, je cherche refuge auprès de Toi contre les démons mâles et femelles',
        en: 'In the name of Allah. O Allah, I seek refuge in You from male and female devils',
        es: 'En el nombre de Allah. Oh Allah, me refugio en Ti de los demonios masculinos y femeninos'
      },
      hadith: {
        fr: 'Le Prophète ﷺ disait cette invocation lorsqu\'il entrait aux toilettes. Rapporté par Anas ibn Malik. Sahih al-Bukhari (142), Sahih Muslim (375).',
        en: 'The Prophet ﷺ used to say this supplication when entering the restroom. Reported by Anas ibn Malik. Sahih al-Bukhari (142), Sahih Muslim (375).',
        es: 'El Profeta ﷺ decía esta invocación al entrar al baño. Sahih al-Bukhari (142), Sahih Muslim (375).'
      },
      audio: 'toilettes1.mp3',
      sheet: { sub_fr: 'Protection contre le mal', sub_en: 'Protection from evil', sub_es: 'Protección del mal' }
    },
    acc2: {
      titre: { fr: 'APRÈS ÊTRE SORTI DES TOILETTES', en: 'AFTER LEAVING THE RESTROOM', es: 'AL SALIR DEL BAÑO' },
      arabe: 'غُفْرَانَكَ',
      phonetique: { fr: 'Ghufrânak', en: 'Ghufraanak', es: 'Ghufraanak' },
      traduction: { fr: '(Ô Allah) Pardonne-moi', en: '(O Allah) Grant me Your forgiveness', es: '(Oh Allah) Concédeme Tu perdón' },
      hadith: {
        fr: 'Rapporté par Anas ibn Malik. Sahih al-Bukhari (142), Sahih Muslim (375).',
        en: 'Reported by Anas ibn Malik. Sahih al-Bukhari (142), Sahih Muslim (375).',
        es: 'Relatado por Anas ibn Malik. Sahih al-Bukhari (142), Sahih Muslim (375).'
      },
      audio: 'toilettes2.mp3',
      sheet: { sub_fr: 'Ghufraanak', sub_en: 'Ghufraanak', sub_es: 'Ghufraanak' }
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
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas' }
    }
  },

  // ===========================
  // MAISON
  // ===========================
  maison: {
    meta: {
      icon: 'images/maison.png',
      titre: { fr: 'Maison', en: 'Home', es: 'Casa' },
      closingDua: { fr: 'Que tes entrées et sorties soient bénies', en: 'May your entrances and exits be blessed', es: 'Que tus entradas y salidas sean bendecidas' }
    },
    acc1: {
      titre: { fr: 'QUAND ON ENTRE CHEZ SOI', en: 'WHEN ENTERING HOME', es: 'AL ENTRAR A CASA' },
      arabe: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
      phonetique: {
        fr: 'Bismillâhi walajnâ, wa bismillâhi kharajnâ, wa \'alâ Allâhi rabbinâ tawakkalnâ',
        en: 'Bismillaahi walajnaa, wa bismillaahi kharajnaa, wa \'alallaahi rabbinaa tawakkalnaa',
        es: 'Bismilláahi walajnáa, wa bismilláahi kharajnáa, wa \'alalláahi rabbiná tawakkalnáa'
      },
      traduction: {
        fr: 'Au nom d\'Allah nous entrons, au nom d\'Allah nous sortons, et sur Allah notre Seigneur nous nous reposons.',
        en: 'In the name of Allah we enter, in the name of Allah we leave, and upon Allah our Lord we rely.',
        es: 'En el nombre de Allah entramos, en el nombre de Allah salimos, y en Allah nuestro Señor confiamos.'
      },
      hadith: { fr: '', en: '', es: '' },
      audio: 'maison1.mp3',
      sheet: { sub_fr: 'Invocation d\'entrée', sub_en: 'Entry supplication', sub_es: 'Invocación de entrada' }
    },
    acc2: {
      titre: { fr: 'VARIANTE PLUS COMPLÈTE (RECOMMANDÉE)', en: 'MORE COMPLETE VARIANT (RECOMMENDED)', es: 'VARIANTE MÁS COMPLETA (RECOMENDADA)' },
      arabe: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ، بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
      phonetique: {
        fr: 'Allâhumma innî as\'aluka khayra l-mawlaji wa khayra l-makhraji, bismillâhi walajnâ, wa bismillâhi kharajnâ, wa \'alâ Allâhi rabbinâ tawakkalnâ.',
        en: 'Allaahummaa innee as\'aluka khayral-mawlaji wa khayral-makhraji, bismillaahi walajnaa, wa bismillaahi kharajnaa, wa \'alallaahi rabbinaa tawakkalnaa.',
        es: 'Alláhummaa innee as\'aluka khayral-mawlaji wa khayral-makhraji, bismilláahi walajnáa, wa bismilláahi kharajnáa, wa \'alalláahi rabbináa tawakkalnáa.'
      },
      traduction: {
        fr: 'Ô Allah, je Te demande le meilleur dans l\'entrée et le meilleur dans la sortie. Au nom d\'Allah nous entrons, au nom d\'Allah nous sortons, et sur Allah notre Seigneur nous nous reposons.',
        en: 'O Allah, I ask You for the best of entering and the best of leaving. In the name of Allah we enter, in the name of Allah we leave, and upon Allah our Lord we rely.',
        es: 'Oh Allah, Te pido lo mejor en la entrada y lo mejor en la salida. En el nombre de Allah entramos, en el nombre de Allah salimos, y en Allah nuestro Señor confiamos.'
      },
      hadith: { fr: '', en: '', es: '' },
      audio: 'maison2.mp3',
      sheet: { sub_fr: 'Version plus complète', sub_en: 'More complete version', sub_es: 'Versión más completa' }
    },
    acc3: {
      titre: { fr: 'INVOCATION QUAND ON SORT', en: 'SUPPLICATION WHEN LEAVING', es: 'INVOCACIÓN AL SALIR' },
      arabe: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
      phonetique: {
        fr: 'Bismillâh, tawakkaltu \'alâ Allâh, wa lâ hawla wa lâ quwwata illâ billâh',
        en: 'Bismillaah, tawakkaltu \'alallaah, wa laa hawla wa laa quwwata illaa billaah',
        es: 'Bismilláah, tawakkaltu \'alalláah, wa laa hawla wa laa qúwwata illaa billáah'
      },
      traduction: {
        fr: 'Au nom d\'Allah, je place ma confiance en Allah, et il n\'y a de force ni de puissance qu\'en Allah',
        en: 'In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.',
        es: 'En el nombre de Allah, confío en Allah, y no hay fuerza ni poder excepto con Allah.'
      },
      hadith: {
        fr: 'Rapporté par Abou Daoud (5095), authentifié par Al-Albani.',
        en: 'Reported by Abu Daoud (5095), authenticated by Al-Albani.',
        es: 'Relatado por Abu Daoud (5095), autentificado por Al-Albani.'
      },
      audio: 'maison3.mp3',
      sheet: { sub_fr: 'Tawakkul sur Allah', sub_en: 'Trust in Allah', sub_es: 'Tawakkul en Allah' }
    },
    acc4: {
      titre: { fr: 'PROTECTION CONTRE L\'ÉGAREMENT', en: 'PROTECTION AGAINST GOING ASTRAY', es: 'PROTECCIÓN CONTRA EL EXTRAVÍO' },
      arabe: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ',
      phonetique: {
        fr: 'Allâhumma innî a\'ûdhu bika an adilla aw udalla, aw azilla aw uzalla, aw azlima aw uzlama, aw ajhala aw yujhala \'alayya.',
        en: 'Allaahummaa innee a\'oodhu bika an adilla aw udalla, aw azilla aw uzalla, aw athlima aw uthlama, aw ajhala aw yujhala \'alayya.',
        es: 'Alláhummaa innee a\'údhu bika an adilla aw udalla, aw azilla aw uzalla, aw athlima aw uthlama, aw ayhala aw yuyhaala \'alayya.'
      },
      traduction: {
        fr: 'Ô Allah, je cherche refuge auprès de Toi contre le fait d\'égarer ou d\'être égaré, de glisser ou de faire glisser, d\'opprimer ou d\'être opprimé, d\'être ignorant ou qu\'on soit ignorant envers moi',
        en: 'O Allah, I seek refuge in You from going astray or being led astray, from slipping or causing others to slip, from oppressing or being oppressed, from being ignorant or having others be ignorant toward me.',
        es: 'Oh Allah, me refugio en Ti de extraviarme o ser extraviado, de resbalar o hacer resbalar, de oprimir o ser oprimido, de ser ignorante o que se sea ignorante conmigo.'
      },
      hadith: {
        fr: 'Rapporté par Abou Daoud (5094), authentifié par Al-Albani.',
        en: 'Reported by Abu Daoud (5094), authenticated by Al-Albani.',
        es: 'Relatado por Abu Daoud (5094), autentificado por Al-Albani.'
      },
      audio: null,
      sheet: { sub_fr: 'Contre l\'égarement', sub_en: 'Against going astray', sub_es: 'Contra el extravío' }
    },
    acc5: {
      titre: { fr: 'SUNNAHS DU PROPHÈTE ﷺ', en: 'PROPHET\'S ﷺ SUNNAH', es: 'SUNNAH DEL PROFETA ﷺ' },
      sunnah: true,
      items: {
        fr: [
          { titre: 'SALUE TA FAMILLE EN ENTRANT', texte: 'D\'après Jabir, le Prophète ﷺ a dit : « Quand l\'un de vous entre chez lui, qu\'il dise : "Bismillâh, que la paix soit sur nous et sur les serviteurs pieux d\'Allah." Puis qu\'il salue sa famille. » [Sunan Abu Dawood 5093]' },
          { titre: 'ÉLOIGNE LES DÉMONS EN ENTRANT', texte: 'D\'après Jabir ibn Abdullah, le Prophète ﷺ a dit : « Quand l\'homme entre chez lui et mentionne Allah en entrant et en mangeant, le diable dit : "Pas de nuitée ni de dîner pour nous." » [Sahih Muslim 2018]' },
          { titre: 'FERME TA PORTE AVANT LA NUIT', texte: 'D\'après Jabir ibn Abdullah, le Prophète ﷺ a dit : « Fermez vos portes la nuit et mentionnez le nom d\'Allah, car les diables ne peuvent ouvrir une porte fermée avec Bismillah. » [Sahih al-Bukhari 3280]' }
        ],
        en: [
          { titre: 'GREET YOUR FAMILY WHEN ENTERING', texte: 'According to Jabir, the Prophet ﷺ said: "When one of you enters his home, let him say: \'Bismillah, may peace be upon us and upon the righteous servants of Allah.\' Then let him greet his family." [Sunan Abu Dawood 5093]' },
          { titre: 'KEEP DEMONS AWAY WHEN ENTERING', texte: 'According to Jabir ibn Abdullah, the Prophet ﷺ said: "When a man enters his home and mentions Allah upon entering and eating, the devil says: \'No lodging or dinner for us.\'" [Sahih Muslim 2018]' },
          { titre: 'CLOSE YOUR DOOR BEFORE NIGHTFALL', texte: 'According to Jabir ibn Abdullah, the Prophet ﷺ said: "Close your doors at night and mention the name of Allah, for the devils cannot open a door closed with Bismillah." [Sahih al-Bukhari 3280]' }
        ],
        es: [
          { titre: 'SALUDA A TU FAMILIA AL ENTRAR', texte: 'Según Jabir, el Profeta ﷺ dijo: "Cuando alguno de vosotros entre a su casa, que diga: \'Bismillah, que la paz sea sobre nosotros y sobre los siervos piadosos de Allah.\' Luego que salude a su familia." [Sunan Abu Dawood 5093]' },
          { titre: 'ALEJA LOS DEMONIOS AL ENTRAR', texte: 'Según Jabir ibn Abdullah, el Profeta ﷺ dijo: "Cuando el hombre entra a su casa y menciona a Allah al entrar y al comer, el diablo dice: \'No hay alojamiento ni cena para nosotros.\'" [Sahih Muslim 2018]' },
          { titre: 'CIERRA TU PUERTA ANTES DE LA NOCHE', texte: 'Según Jabir ibn Abdullah, el Profeta ﷺ dijo: "Cerrad vuestras puertas por la noche y mencionad el nombre de Allah, pues los demonios no pueden abrir una puerta cerrada con Bismillah." [Sahih al-Bukhari 3280]' }
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas' }
    }
  },

  // ===========================
  // TRISTESSE
  // ===========================
  tristesse: {
    meta: {
      icon: 'images/tristesse.png',
      titre: { fr: 'Tristesse', en: 'Sadness', es: 'Tristeza' },
      closingDua: { fr: 'Que Allah dissipe ta tristesse et remplisse ton cœur de sérénité', en: 'May Allah dispel your sadness and fill your heart with serenity', es: 'Que Allah disipe tu tristeza y llene tu corazón de serenidad' }
    },
    acc1: {
      titre: { fr: 'LORSQU\'ON RESSENT DE LA TRISTESSE / DU CHAGRIN', en: 'WHEN FEELING SADNESS / GRIEF / ANXIETY', es: 'CUANDO SE SIENTE TRISTEZA / PENA / ANGUSTIA' },
      arabe: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْبُخْلِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
      phonetique: {
        fr: 'Allâhumma innî a\'ûdhu bika minal-hammi wal-hazani, wal-\'ajzi wal-kasali, wal-jubni wal-bukhli, wa dala\'i d-dayni wa ghalabati r-rijâli.',
        en: 'Allaahummaa innee a\'oodhu bika minal-hammi wal-hazani, wal-\'ajzi wal-kasali, wal-jubni wal-bukhli, wa dhala\'id-dayni wa ghalabatir-rijaal.',
        es: 'Alláhummaa innee a\'údhu bika minal-hammi wal-hazani, wal-\'ayzi wal-kasali, wal-yubni wal-bujli, wa dhala\'id-dayni wa ghalabatir-riyaal.'
      },
      traduction: {
        fr: 'Ô Allah, je cherche refuge auprès de Toi contre les soucis et la tristesse, contre l\'incapacité et la paresse, contre la lâcheté et l\'avarice, contre le poids de la dette et la domination des hommes.',
        en: 'O Allah, I seek refuge in You from worry and grief, from helplessness and laziness, from cowardice and miserliness, from the burden of debt and the oppression of men.',
        es: 'Oh Allah, me refugio en Ti de la preocupación y la tristeza, de la impotencia y la pereza, de la cobardía y la avaricia, del peso de la deuda y la dominación de los hombres.'
      },
      hadith: {
        fr: 'Anas ibn Malik rapporte que le Prophète ﷺ avait l\'habitude de dire cette invocation. Sahih al-Bukhari (6369), authentique.',
        en: 'Reported by Anas ibn Malik. Sahih al-Bukhari (6369), authentic.',
        es: 'Relatado por Anas ibn Malik. Sahih al-Bukhari (6369), auténtico.'
      },
      audio: 'tristesse1.mp3',
      sheet: { sub_fr: 'Pour les moments difficiles', sub_en: 'For difficult moments', sub_es: 'Para momentos difíciles' }
    },
    acc2: {
      titre: { fr: 'DUA DU CORAN — PRINTEMPS DU CŒUR', en: 'QUR\'AN DUA — SPRING OF THE HEART', es: 'DUA DEL CORÁN — PRIMAVERA DEL CORAZÓN' },
      arabe: 'اللَّهُمَّ إِنِّي عَبْدُكَ ابْنُ عَبْدِكَ ابْنُ أَمَتِكَ نَاصِيَتِي بِيَدِكَ مَاضٍ فِيَّ حُكْمُكَ عَدْلٌ فِيَّ قَضَاؤُكَ أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ أَوْ عَلَّمْتَهُ أَحَداً مِنْ خَلْقِكَ أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي وَنُورَ صَدْرِي وَجَلاَءَ حُزْنِي وَذَهَابَ هَمِّي',
      phonetique: {
        fr: 'Allâhumma innî \'abduka ibnu \'abdika ibnu amatika, nâsiyatî biyadika, mâdin fiyya hukmuka, \'adlun fiyya qadâ\'uka. As\'aluka bikulli ismin huwa laka... an taj\'ala l-Qur\'âna rabî\'a qalbî, wa nûra sadrî, wa jalâ\'a huznî, wa dhahâba hammî.',
        en: 'Allaahummaa innee \'abduka ibnu \'abdika ibnu amatika, naasiyatee biyadika... an taj\'alal-Qur\'aana rabee\'a qalbee, wa noora sadree, wa jalaa\'a huznee, wa dhahaaba hammee.',
        es: 'Alláhummaa innee \'abduka ibnu \'abdika ibnu amatika, naasiyatee biyadika... an taj\'alal-Qur\'aana rabee\'a qalbee, wa núura sadree, wa yalaa\'a huznee, wa dhahaaba hammee.'
      },
      traduction: {
        fr: 'Ô Allah ! Je suis Ton serviteur, fils de Ton serviteur, fils de Ta servante. Mon toupet est dans Ta Main... de faire du Coran le printemps de mon cœur, la lumière de ma poitrine, la dissipation de ma tristesse et la fin de mes soucis.',
        en: 'O Allah! I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your Hand... to make the Quran the spring of my heart, the light of my chest, the removal of my sadness and the departure of my anxiety.',
        es: 'Oh Allah, soy Tu siervo, hijo de Tu siervo, hijo de Tu sierva... que hagas del Corán la primavera de mi corazón, la luz de mi pecho, la disipación de mi tristeza y el fin de mis preocupaciones.'
      },
      hadith: {
        fr: 'Abdullah ibn Mas\'ûd rapporte que le Prophète ﷺ enseignait cette invocation : « Quiconque la prononce, Allah dissipera son souci et le remplacera par de la joie. » Musnad Ahmad (1/391), authentifié par Al-Albani.',
        en: 'Ibn Mas\'ud reported that whoever says this, Allah will remove his distress and replace it with joy. Musnad Ahmad (1/391), authenticated by Al-Albani.',
        es: 'Ibn Mas\'ud relató que quien diga esto, Allah disipará su angustia y la reemplazará por alegría. Musnad Ahmad (1/391), autentificado por Al-Albani.'
      },
      audio: 'tristesse2.mp3',
      sheet: { sub_fr: 'Printemps du cœur', sub_en: 'Spring of the heart', sub_es: 'Primavera del corazón' }
    },
    acc3: {
      titre: { fr: 'SUNNAHS DU PROPHÈTE ﷺ', en: 'PROPHET\'S ﷺ SUNNAH', es: 'SUNNAH DEL PROFETA ﷺ' },
      sunnah: true,
      items: {
        fr: [
          { titre: 'FAIS DU CORAN TON REMÈDE QUOTIDIEN', texte: 'D\'après Abu Hurayra, le Prophète ﷺ encourageait la récitation du Coran pour apaiser l\'âme. [Ibn Majah 3742]' },
          { titre: 'COMBINE AVEC LE TAWAKKUL ET LE SABR', texte: 'D\'après Anas ibn Malik, le Prophète ﷺ enseignait la confiance totale en Allah et la patience face aux épreuves. [Sahih Muslim 2701]' },
          { titre: 'INVOQUE ALLAH CONTRE LA TRISTESSE', texte: 'D\'après Ibn Abbas, le Prophète ﷺ a dit : « Ô Allah, je cherche refuge auprès de Toi contre l\'inquiétude et la tristesse... » [Sahih al-Bukhari 6369]' },
          { titre: 'LA PRIÈRE EST TON REMÈDE', texte: 'D\'après Abu Hurayra, le Prophète ﷺ a dit : « La prière est lumière, elle éloigne la tristesse et apporte la sérénité au cœur du croyant. » [Sahih Muslim 223]' }
        ],
        en: [
          { titre: 'MAKE THE QURAN YOUR DAILY REMEDY', texte: 'According to Abu Hurairah, the Prophet ﷺ encouraged the recitation of the Quran to soothe the soul. [Ibn Majah 3742]' },
          { titre: 'COMBINE WITH TAWAKKUL AND SABR', texte: 'According to Anas ibn Malik, the Prophet ﷺ taught complete trust in Allah and patience in the face of trials. [Sahih Muslim 2701]' },
          { titre: 'INVOKE ALLAH AGAINST SADNESS', texte: 'According to Ibn Abbas, the Prophet ﷺ said: "O Allah, I seek refuge in You from worry and sadness..." [Sahih al-Bukhari 6369]' },
          { titre: 'PRAYER IS YOUR REMEDY', texte: 'According to Abu Hurairah, the Prophet ﷺ said: "Prayer is light, it drives away sadness and brings serenity to the heart of the believer." [Sahih Muslim 223]' }
        ],
        es: [
          { titre: 'HAZ DEL CORÁN TU REMEDIO DIARIO', texte: 'Según Abu Hurairah, el Profeta ﷺ alentaba la recitación del Corán para calmar el alma. [Ibn Mayah 3742]' },
          { titre: 'COMBINA CON TAWAKKUL Y SABR', texte: 'Según Anas ibn Malik, el Profeta ﷺ enseñaba la confianza total en Allah y la paciencia ante las pruebas. [Sahih Muslim 2701]' },
          { titre: 'INVOCA A ALLAH CONTRA LA TRISTEZA', texte: 'Según Ibn Abbas, el Profeta ﷺ dijo: "Oh Allah, me refugio en Ti de la preocupación y la tristeza..." [Sahih al-Bukhari 6369]' },
          { titre: 'LA ORACIÓN ES TU REMEDIO', texte: 'Según Abu Hurairah, el Profeta ﷺ dijo: "La oración es luz, aleja la tristeza y trae serenidad al corazón del creyente." [Sahih Muslim 223]' }
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas' }
    }
  },

  // ===========================
  // ENFANTS
  // ===========================
  enfants: {
    meta: {
      icon: 'images/enfants.png',
      titre: { fr: 'Enfants', en: 'Children', es: 'Niños' },
      closingDua: { fr: 'Que Allah protège tes enfants de tout mal, visible ou invisible, et les garde dans Sa miséricorde', en: 'May Allah protect your children from all evil, visible or invisible, and keep them in His mercy', es: 'Que Allah proteja a tus hijos de todo mal, visible o invisible, y los guarde en Su misericordia' }
    },
    acc1: {
      titre: { fr: 'INVOCATION PRINCIPALE — PROTÉGER SES ENFANTS', en: 'MAIN SUPPLICATION — PROTECT YOUR CHILDREN', es: 'INVOCACIÓN PRINCIPAL — PROTEGER A TUS HIJOS' },
      arabe: 'أُعِيذُكُمَا* بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
      phonetique: {
        fr: '*U\'îdhukumâ bi kalimâti Llâhi t-tâmmati min kulli shaytânin wa hâmmatin wa min kulli \'aynin lâmmatin.',
        en: '*U\'eedhukumaa bi kalimaaatillaahit-taammati min kulli shaytaanin wa haammatin wa min kulli \'aynin laammatin.',
        es: '*U\'eedhukumáa bi kalimaatilláahit-taammati min kulli shaytaanin wa haammatin wa min kulli \'aynin laammatin.'
      },
      traduction: {
        fr: 'Je cherche refuge pour vous deux* dans les paroles parfaites d\'Allah contre tout diable, toute bête venimeuse et tout mauvais œil envieux.',
        en: 'I seek refuge for you both* in the perfect words of Allah from every devil, every poisonous creature, and every evil eye.',
        es: 'Me refugio para vosotros dos* en las palabras perfectas de Allah de todo diablo, toda criatura venenosa y todo mal de ojo.'
      },
      hadith: {
        fr: 'Ibn \'Abbâs rapporte que le Messager d\'Allah ﷺ cherchait refuge pour Al-Hasan et Al-Husayn en disant cette invocation. Sahih al-Bukhari (3371).<br><br><strong style="color:var(--gold);">* 1 enfant :</strong> Phonétique : <em>U\'îdhuka</em> — Arabe : <span style="font-family:\'Amiri\',serif;">أُعِيذُكَ</span>',
        en: 'Ibn Abbas reported that the Messenger of Allah ﷺ sought refuge for Al-Hasan and Al-Husayn with this supplication. Sahih al-Bukhari (3371).<br><br><strong style="color:var(--gold);">* 1 child:</strong> Phonetic: <em>U\'eedhuka</em> — Arabic: <span style="font-family:\'Amiri\',serif;">أُعِيذُكَ</span>',
        es: 'Ibn Abbas narró que el Mensajero de Allah ﷺ buscaba refugio para Al-Hasan y Al-Husayn con esta súplica. Sahih al-Bukhari (3371).<br><br><strong style="color:var(--gold);">* 1 niño:</strong> Fonético: <em>U\'eedhuka</em> — Árabe: <span style="font-family:\'Amiri\',serif;">أُعِيذُكَ</span>'
      },
      audio: 'enfants1.mp3',
      sheet: { sub_fr: 'Invocation principale', sub_en: 'Main supplication', sub_es: 'Invocación principal' }
    },
    acc2: {
      titre: { fr: 'VARIANTE POUR UN ENFANT UNIQUE', en: 'VARIANT FOR A SINGLE CHILD', es: 'VARIANTE PARA UN HIJO ÚNICO' },
      arabe: 'أُعِيذُكَ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
      phonetique: {
        fr: 'U\'îdhuka bi kalimâti Llâhi t-tâmmati min kulli shaytânin wa hâmmatin wa min kulli \'aynin lâmmatin.',
        en: 'U\'eedhuka bi kalimaatillaahit-taammati min kulli shaytaanin wa haammatin wa min kulli \'aynin laammatin.',
        es: 'U\'eedhuka bi kalimaatilláahit-taammati min kulli shaytaanin wa haammatin wa min kulli \'aynin laammatin.'
      },
      traduction: {
        fr: 'Je cherche refuge pour toi dans les paroles parfaites d\'Allah contre tout diable, toute bête venimeuse et tout mauvais œil envieux.',
        en: 'I seek refuge for you in the perfect words of Allah from every devil, every poisonous creature, and every evil eye.',
        es: 'Me refugio para ti en las palabras perfectas de Allah de todo diablo, toda criatura venenosa y todo mal de ojo.'
      },
      hadith: { fr: '', en: '', es: '' },
      audio: 'enfants2.mp3',
      sheet: { sub_fr: 'Variante spécifique', sub_en: 'Specific variant', sub_es: 'Variante específica' }
    },
    acc3: {
      titre: { fr: 'SUNNAHS DU PROPHÈTE ﷺ (PROTECTIONS)', en: 'PROPHET\'S ﷺ SUNNAH (PROTECTIONS)', es: 'SUNNAH DEL PROFETA ﷺ (PROTECCIONES)' },
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
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas' }
    }
  },

  // ===========================
  // TRANSPORT
  // ===========================
  transport: {
    meta: {
      icon: 'images/voiture.png',
      titre: { fr: 'Transport', en: 'Transport', es: 'Transporte' },
      closingDua: { fr: 'Que tes trajets quotidiens soient protégés et bénis', en: 'May your daily journeys be protected and blessed', es: 'Que tus viajes diarios sean protegidos y bendecidos' }
    },
    acc1: {
      titre: { fr: 'LORSQU\'ON PREND UN MOYEN DE TRANSPORT', en: 'WHEN TAKING ANY MEANS OF TRANSPORT', es: 'AL TOMAR UN MEDIO DE TRANSPORTE' },
      arabe: 'بِسْمِ اللَّهِ، الْحَمْدُ لِلَّهِ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ',
      phonetique: {
        fr: 'Bismillâh. Al-hamdu lillâh. Subhâna lladhî sakhkhara lanâ hâdhâ wa mâ kunnâ lahu muqrînîn. Wa innâ ilâ rabbinâ lamunqalibûn.',
        en: 'Bismillaah. Al-hamdu lillaah. Subhaanalladhee sakhkhara lanaa haathaa wa maa kunnaa lahu muqrineen. Wa innaa ilaa rabbinaa lamunqaliboon.',
        es: 'Bismilláh. Al-hamdu lilláh. Subhánalladhí sajjhara lanaa háthaa wa maa kunnaa lahu muqrineen. Wa innaa ilaa rabbiná lamunqalibúun.'
      },
      traduction: {
        fr: 'Au nom d\'Allah. Louange à Allah. Gloire à Celui qui a soumis ceci à notre service alors que nous n\'étions pas capables de le maîtriser. Et certes, nous retournerons vers notre Seigneur.',
        en: 'In the name of Allah. Praise be to Allah. Glory be to Him Who has subjected this to us while we were unable to subdue it. And indeed to our Lord we are returning.',
        es: 'En el nombre de Allah. La alabanza es para Allah. Gloria a Quien ha sometido esto a nuestro servicio cuando no éramos capaces de dominarlo. Y ciertamente, volveremos a nuestro Señor.'
      },
      hadith: {
        fr: 'Récite cette dua en montant ou en démarrant. Sunan Abu Daoud (2602) et Tirmidhi (3446), classé sahih par Al-Albani.',
        en: 'Recite this dua when boarding or starting. Sunan Abu Daoud (2602) and Tirmidhi (3446), classified sahih by Al-Albani.',
        es: 'Recita esta dua al subir o al arrancar. Sunan Abu Daoud (2602) y Tirmidhi (3446), clasificado sahih por Al-Albani.'
      },
      audio: 'transport1.mp3',
      sheet: { sub_fr: 'Subhâna alladhî', sub_en: 'Subhâna alladhî', sub_es: 'Subhâna alladhî' }
    },
    acc2: {
      titre: { fr: 'OPTION POUR LES TRAJETS PLUS LONGS (VARIANTE COMPLÈTE)', en: 'OPTION FOR LONGER JOURNEYS (COMPLETE VERSION)', es: 'OPCIÓN PARA VIAJES MÁS LARGOS (VERSIÓN COMPLETA)' },
      arabe: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى. اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ',
      phonetique: {
        fr: 'Allâhumma innâ nas\'aluka fî safarinâ hâdhâ l-birra wat-taqwâ, wa minal-\'amali mâ tardâ. Allâhumma hawwin \'alaynâ safaranâ hâdhâ watwi \'annâ bu\'dahu...',
        en: 'Allaahummaa innaa nas\'aluka fee safarinaa haathal-birra wat-taqwaa, wa minal-\'amali maa tardaa. Allaahummaa hawwin \'alaynaa safaranaa haathaa watwi \'annaa bu\'dah...',
        es: 'Alláhummaa innaa nas\'aluka fee safarinaa haathal-birra wat-taqwáa, wa minal-\'amali maa tardáa. Alláhummaa hawwin \'alaynaa safaranaa haathaa watwi \'annaa bu\'dah...'
      },
      traduction: {
        fr: 'Ô Allah, nous Te demandons dans ce voyage la piété, la crainte pieuse et les actions qui Te plaisent. Ô Allah, facilite-nous ce voyage et raccourcis sa distance...',
        en: 'O Allah, we ask You in this journey of ours for righteousness and piety, and for deeds that please You. O Allah, make this journey easy for us and shorten its distance...',
        es: 'Oh Allah, Te pedimos en este viaje piedad, temor reverente y acciones que Te complazcan. Oh Allah, facilítanos este viaje y acorta su distancia...'
      },
      hadith: {
        fr: 'Rapporté par Ibn \'Umar dans Sahih Muslim (1342), authentique. Pour le quotidien, la version courte suffit largement.',
        en: 'Reported by Ibn Umar in Sahih Muslim (1342), authentic. For daily commutes, the short version is sufficient.',
        es: 'Relatado por Ibn Umar en Sahih Muslim (1342), auténtico.'
      },
      audio: 'transport2.mp3',
      sheet: { sub_fr: 'Variante complète', sub_en: 'Complete variant', sub_es: 'Variante completa' }
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
        ]
      },
      sheet: { sub_fr: 'Pratiques recommandées', sub_en: 'Recommended practices', sub_es: 'Prácticas recomendadas' }
    }
  }

}; // fin DUAS
