// ===== DEENTAG KIDS — KIDS-DUAS.JS =====
// Contenu simplifié pour les enfants de 4 à 10 ans
// Pas de hadith, traductions courtes et accessibles
// titre / moment / traduction / conseil sont traduits dans les 8 langues
// de l'application (fr, en, es, de, it, nl, pt, tr).
// arabe et phonetique restent identiques dans toutes les langues.

var KIDS_DUAS = {

  repas: {
    meta: {
      emoji: '🍽️',
      image: 'images/kids_repas.webp',
      couleur: '#FF6B6B',
      couleurLight: '#FFE5E5',
      titre: { fr:'Les Repas', en:'Meals', es:'Las Comidas', de:'Die Mahlzeiten', it:'I Pasti', nl:'De Maaltijden', pt:'As Refeições', tr:'Yemekler' },
    },
    dua1: {
      moment: { fr:'Avant de manger', en:'Before eating', es:'Antes de comer', de:'Vor dem Essen', it:'Prima di mangiare', nl:'Voor het eten', pt:'Antes de comer', tr:'Yemekten önce' },
      emoji: '🤲',
      arabe: 'بِسْمِ اللَّهِ',
      phonetique: 'Bismillâh',
      traduction: { fr:'Je commence au nom d\'Allah', en:'I begin in the name of Allah', es:'Empiezo en el nombre de Allah', de:'Ich beginne im Namen Allahs', it:'Comincio nel nome di Allah', nl:'Ik begin in de naam van Allah', pt:'Começo em nome de Allah', tr:'Allah\'ın adıyla başlıyorum' },
      audio: 'repas1.mp3',
      conseil: { fr:'Assieds-toi bien et utilise ta main droite comme le Prophète ﷺ !', en:'Sit up nicely and use your right hand, just like the Prophet ﷺ!', es:'Siéntate bien y usa tu mano derecha, ¡como el Profeta ﷺ!', de:'Setz dich schön hin und benutze deine rechte Hand, so wie der Prophet ﷺ!', it:'Siediti bene e usa la mano destra, come il Profeta ﷺ!', nl:'Ga goed zitten en gebruik je rechterhand, net als de Profeet ﷺ!', pt:'Senta-te bem e usa a tua mão direita, como o Profeta ﷺ!', tr:'Güzelce otur ve Peygamber ﷺ gibi sağ elini kullan!' },
    },
    dua2: {
      moment: { fr:'Après avoir mangé', en:'After eating', es:'Después de comer', de:'Nach dem Essen', it:'Dopo aver mangiato', nl:'Na het eten', pt:'Depois de comer', tr:'Yemekten sonra' },
      emoji: '😊',
      arabe: 'الْحَمْدُ لِلَّهِ',
      phonetique: 'Al-hamdulillâh',
      traduction: { fr:'Merci à Allah pour ce repas !', en:'Thank you Allah for this meal!', es:'¡Gracias Allah por esta comida!', de:'Danke Allah für dieses Essen!', it:'Grazie Allah per questo pasto!', nl:'Dank U Allah voor deze maaltijd!', pt:'Obrigado Allah por esta refeição!', tr:'Bu yemek için Allah\'a şükürler olsun!' },
      audio: 'repas3.mp3',
      conseil: { fr:'N\'oublie pas de remercier aussi la personne qui a préparé ton repas !', en:'Don\'t forget to also thank the person who made your meal!', es:'¡No olvides agradecer también a quien preparó tu comida!', de:'Vergiss nicht, auch der Person zu danken, die dein Essen gekocht hat!', it:'Non dimenticare di ringraziare anche chi ha preparato il tuo pasto!', nl:'Vergeet niet ook de persoon te bedanken die je maaltijd heeft gemaakt!', pt:'Não te esqueças de agradecer também a quem preparou a tua refeição!', tr:'Yemeğini hazırlayan kişiye de teşekkür etmeyi unutma!' },
    },
  },

  dodo: {
    meta: {
      emoji: '😴',
      image: 'images/kids_dodo.webp',
      couleur: '#6C63FF',
      couleurLight: '#EEECFF',
      titre: { fr:'Le Dodo', en:'Bedtime', es:'A Dormir', de:'Schlafenszeit', it:'La Nanna', nl:'Slaaptijd', pt:'A Dormir', tr:'Uyku Zamanı' },
    },
    dua1: {
      moment: { fr:'Pour s\'endormir', en:'Falling asleep', es:'Para dormirse', de:'Zum Einschlafen', it:'Per addormentarsi', nl:'Om in slaap te vallen', pt:'Para adormecer', tr:'Uykuya dalarken' },
      emoji: '🌙',
      arabe: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
      phonetique: 'Bismika Allâhumma amûtu wa ahyâ',
      traduction: { fr:'C\'est en Ton nom, ô Allah, que je m\'endors', en:'In Your name, O Allah, I go to sleep', es:'En Tu nombre, oh Allah, me duermo', de:'In Deinem Namen, o Allah, schlafe ich ein', it:'Nel Tuo nome, o Allah, mi addormento', nl:'In Uw naam, o Allah, val ik in slaap', pt:'Em Teu nome, ó Allah, eu adormeço', tr:'Senin adınla ey Allah, uyuyorum' },
      audio: 'reveil2.mp3',
      conseil: { fr:'Fais de beaux rêves sous la protection d\'Allah. À demain !', en:'Have sweet dreams under Allah\'s protection. See you tomorrow!', es:'Que tengas dulces sueños bajo la protección de Allah. ¡Hasta mañana!', de:'Schlaf schön unter Allahs Schutz. Bis morgen!', it:'Fai bei sogni sotto la protezione di Allah. A domani!', nl:'Slaap lekker onder Allahs bescherming. Tot morgen!', pt:'Tem bons sonhos sob a proteção de Allah. Até amanhã!', tr:'Allah\'ın korumasında güzel rüyalar gör. Yarın görüşürüz!' },
    },
    dua2: {
      moment: { fr:'En se réveillant', en:'Waking up', es:'Al despertar', de:'Beim Aufwachen', it:'Al risveglio', nl:'Bij het wakker worden', pt:'Ao acordar', tr:'Uyanırken' },
      emoji: '☀️',
      arabe: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا',
      phonetique: 'Al-hamdu lillâhi lladhî ahyânâ ba\'da mâ amâtanâ',
      traduction: { fr:'Merci Allah de m\'avoir réveillé !', en:'Thank you Allah for waking me up!', es:'¡Gracias Allah por despertarme!', de:'Danke Allah, dass Du mich aufgeweckt hast!', it:'Grazie Allah per avermi svegliato!', nl:'Dank U Allah dat U mij heeft gewekt!', pt:'Obrigado Allah por me acordar!', tr:'Beni uyandırdığın için Allah\'a şükürler olsun!' },
      audio: 'reveil1.mp3',
      conseil: { fr:'Commence ta journée avec le sourire, c\'est une sadaqa !', en:'Start your day with a smile, it\'s a sadaqa!', es:'Empieza tu día con una sonrisa, ¡es una sadaqa!', de:'Beginne deinen Tag mit einem Lächeln, das ist eine Sadaqa!', it:'Inizia la giornata con un sorriso, è una sadaqa!', nl:'Begin je dag met een glimlach, het is een sadaqa!', pt:'Começa o teu dia com um sorriso, é uma sadaqa!', tr:'Gününe bir gülümsemeyle başla, bu bir sadakadır!' },
    },
  },

  ablution: {
    meta: {
      emoji: '🚿',
      image: 'images/kids_ablution.webp',
      couleur: '#00B4D8',
      couleurLight: '#E0F7FA',
      titre: { fr:'L\'Ablution', en:'Ablution', es:'La Ablución', de:'Die Waschung', it:'L\'Abluzione', nl:'De Wassing', pt:'A Ablução', tr:'Abdest' },
    },
    dua1: {
      moment: { fr:'Avant de faire le wudu', en:'Before doing wudu', es:'Antes de hacer el wudu', de:'Vor dem Wudu', it:'Prima del wudu', nl:'Voor het wudu', pt:'Antes do wudu', tr:'Abdest almadan önce' },
      emoji: '💧',
      arabe: 'بِسْمِ اللَّهِ',
      phonetique: 'Bismillâh',
      traduction: { fr:'Je commence au nom d\'Allah', en:'I begin in the name of Allah', es:'Empiezo en el nombre de Allah', de:'Ich beginne im Namen Allahs', it:'Comincio nel nome di Allah', nl:'Ik begin in de naam van Allah', pt:'Começo em nome de Allah', tr:'Allah\'ın adıyla başlıyorum' },
      audio: 'ablution1.mp3',
      conseil: { fr:'Commence toujours par la main droite, comme nous l\'a appris le Prophète ﷺ !', en:'Always start with your right hand, as the Prophet ﷺ taught us!', es:'Empieza siempre por la mano derecha, ¡como nos enseñó el Profeta ﷺ!', de:'Beginne immer mit der rechten Hand, so wie es uns der Prophet ﷺ gelehrt hat!', it:'Inizia sempre con la mano destra, come ci ha insegnato il Profeta ﷺ!', nl:'Begin altijd met je rechterhand, zoals de Profeet ﷺ ons heeft geleerd!', pt:'Começa sempre pela mão direita, como o Profeta ﷺ nos ensinou!', tr:'Peygamberimizin ﷺ öğrettiği gibi her zaman sağ elinle başla!' },
    },
    dua2: {
      moment: { fr:'Après le wudu', en:'After wudu', es:'Después del wudu', de:'Nach dem Wudu', it:'Dopo il wudu', nl:'Na het wudu', pt:'Depois do wudu', tr:'Abdestten sonra' },
      emoji: '✨',
      arabe: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
      phonetique: 'Ash-hadu an lâ ilâha illallâhu wahdahu lâ sharîka lah',
      traduction: { fr:'Je dis que seul Allah est mon Dieu', en:'I say that only Allah is my God', es:'Digo que solo Allah es mi Dios', de:'Ich bezeuge, dass allein Allah mein Gott ist', it:'Dico che solo Allah è il mio Dio', nl:'Ik zeg dat alleen Allah mijn God is', pt:'Digo que só Allah é o meu Deus', tr:'Sadece Allah\'ın benim Rabbim olduğunu söylüyorum' },
      audio: 'ablution2.mp3',
      conseil: { fr:'Bravo ! Tu es maintenant pur(e) et prêt(e) pour la prière. Allah aime ceux qui se purifient.', en:'Well done! You are now clean and ready for prayer. Allah loves those who purify themselves.', es:'¡Bravo! Ahora estás limpio(a) y listo(a) para la oración. Allah ama a quienes se purifican.', de:'Bravo! Du bist jetzt rein und bereit für das Gebet. Allah liebt diejenigen, die sich reinigen.', it:'Bravo! Ora sei puro/a e pronto/a per la preghiera. Allah ama chi si purifica.', nl:'Bravo! Je bent nu rein en klaar voor het gebed. Allah houdt van hen die zich reinigen.', pt:'Muito bem! Estás agora puro(a) e pronto(a) para a oração. Allah ama quem se purifica.', tr:'Aferin! Artık temizsin ve namaza hazırsın. Allah temizlenenleri sever.' },
    },
  },

  toilettes: {
    meta: {
      emoji: '🚽',
      image: 'images/kids_toilettes.webp',
      couleur: '#52B788',
      couleurLight: '#E8F5E9',
      titre: { fr:'Les Toilettes', en:'The Toilet', es:'El Baño', de:'Die Toilette', it:'Il Bagno', nl:'Het Toilet', pt:'A Casa de Banho', tr:'Tuvalet' },
    },
    dua1: {
      moment: { fr:'Avant d\'entrer', en:'Before entering', es:'Antes de entrar', de:'Vor dem Betreten', it:'Prima di entrare', nl:'Voor het binnengaan', pt:'Antes de entrar', tr:'Girmeden önce' },
      emoji: '🚪',
      arabe: 'بِسْمِ اللهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
      phonetique: 'Bismillah. Allâhumma innî a\'ûdhu bika min al-khubuthi wal-khabâ\'ith',
      traduction: { fr:'Allah, protège-moi des mauvaises choses', en:'Allah, protect me from bad things', es:'Allah, protégeme de las cosas malas', de:'Allah, beschütze mich vor dem Bösen', it:'Allah, proteggimi dalle cose cattive', nl:'Allah, bescherm mij tegen slechte dingen', pt:'Allah, protege-me das coisas más', tr:'Allah\'ım, beni kötü şeylerden koru' },
      audio: 'toilettes1.mp3',
      conseil: { fr:'Entre avec le pied gauche et demande la protection d\'Allah avant d\'entrer !', en:'Go in with your left foot and ask Allah for protection before entering!', es:'¡Entra con el pie izquierdo y pide la protección de Allah antes de entrar!', de:'Betritt es mit dem linken Fuß und bitte Allah um Schutz, bevor du eintrittst!', it:'Entra con il piede sinistro e chiedi la protezione di Allah prima di entrare!', nl:'Ga naar binnen met je linkervoet en vraag Allah om bescherming voordat je naar binnen gaat!', pt:'Entra com o pé esquerdo e pede a proteção de Allah antes de entrar!', tr:'Sol ayağınla gir ve girmeden önce Allah\'tan koruma dile!' },
    },
    dua2: {
      moment: { fr:'En sortant', en:'Coming out', es:'Al salir', de:'Beim Verlassen', it:'Uscendo', nl:'Bij het verlaten', pt:'Ao sair', tr:'Çıkarken' },
      emoji: '🙏',
      arabe: 'غُفْرَانَكَ',
      phonetique: 'Ghufrânak',
      traduction: { fr:'Pardonne-moi ô Allah', en:'Forgive me, O Allah', es:'Perdóname oh Allah', de:'Vergib mir, o Allah', it:'Perdonami o Allah', nl:'Vergeef mij, o Allah', pt:'Perdoa-me ó Allah', tr:'Beni bağışla ey Allah' },
      audio: 'toilettes2.mp3',
      conseil: { fr:'Super ! N\'oublie pas de bien te laver les mains avec du savon, c\'est la propreté qu\'Allah aime !', en:'Great! Don\'t forget to wash your hands well with soap, cleanliness is what Allah loves!', es:'¡Genial! No olvides lavarte bien las manos con jabón, ¡la limpieza es lo que ama Allah!', de:'Super! Vergiss nicht, deine Hände gut mit Seife zu waschen, Sauberkeit liebt Allah!', it:'Ottimo! Non dimenticare di lavarti bene le mani con il sapone, la pulizia è ciò che ama Allah!', nl:'Geweldig! Vergeet niet je handen goed met zeep te wassen, netheid is wat Allah liefheeft!', pt:'Ótimo! Não te esqueças de lavar bem as mãos com sabão, a limpeza é algo que Allah ama!', tr:'Harika! Ellerini sabunla iyice yıkamayı unutma, Allah temizliği sever!' },
    },
  },

  maison: {
    meta: {
      emoji: '🏠',
      image: 'images/kids_maison.webp',
      couleur: '#F4A261',
      couleurLight: '#FFF3E0',
      titre: { fr:'La Maison', en:'The House', es:'La Casa', de:'Das Haus', it:'La Casa', nl:'Het Huis', pt:'A Casa', tr:'Ev' },
    },
    dua1: {
      moment: { fr:'En entrant à la maison', en:'Entering the house', es:'Al entrar a la casa', de:'Beim Betreten des Hauses', it:'Entrando in casa', nl:'Bij het binnenkomen', pt:'Ao entrar em casa', tr:'Eve girerken' },
      emoji: '🔑',
      arabe: 'بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
      phonetique: 'Bismillâhi walajanâ, wa bismillâhi kharajnâ, wa \'alallâhi rabbinâ tawakkalnâ',
      traduction: { fr:'Au nom d\'Allah on entre, au nom d\'Allah on sort', en:'In the name of Allah we enter, in the name of Allah we leave', es:'En el nombre de Allah entramos, en el nombre de Allah salimos', de:'Im Namen Allahs treten wir ein, im Namen Allahs gehen wir hinaus', it:'Nel nome di Allah entriamo, nel nome di Allah usciamo', nl:'In de naam van Allah gaan wij naar binnen, in de naam van Allah gaan wij naar buiten', pt:'Em nome de Allah entramos, em nome de Allah saímos', tr:'Allah\'ın adıyla girdik, Allah\'ın adıyla çıktık' },
      audio: 'maison1.mp3',
      conseil: { fr:'Entre avec le pied droit et dis salam à ta famille, c\'est une bénédiction pour toute la maison !', en:'Go in with your right foot and say salam to your family, it\'s a blessing for the whole house!', es:'Entra con el pie derecho y saluda a tu familia, ¡es una bendición para toda la casa!', de:'Betritt das Haus mit dem rechten Fuß und grüße deine Familie mit Salam, das ist ein Segen für das ganze Haus!', it:'Entra con il piede destro e saluta la tua famiglia, è una benedizione per tutta la casa!', nl:'Ga naar binnen met je rechtervoet en zeg salam tegen je familie, dat is een zegen voor het hele huis!', pt:'Entra com o pé direito e dá salam à tua família, é uma bênção para toda a casa!', tr:'Sağ ayağınla gir ve ailene selam ver, bu tüm ev için bir bereket!' },
    },
    dua2: {
      moment: { fr:'En sortant de la maison', en:'Leaving the house', es:'Al salir de casa', de:'Beim Verlassen des Hauses', it:'Uscendo di casa', nl:'Bij het verlaten van huis', pt:'Ao sair de casa', tr:'Evden çıkarken' },
      emoji: '👟',
      arabe: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
      phonetique: 'Bismillâh, tawakkaltu \'alallâh, wa lâ hawla wa lâ quwwata illâ billâh',
      traduction: { fr:'Au nom d\'Allah, je fais confiance à Allah', en:'In the name of Allah, I put my trust in Allah', es:'En el nombre de Allah, confío en Allah', de:'Im Namen Allahs, ich vertraue auf Allah', it:'Nel nome di Allah, mi affido ad Allah', nl:'In de naam van Allah, ik vertrouw op Allah', pt:'Em nome de Allah, confio em Allah', tr:'Allah\'ın adıyla, Allah\'a güveniyorum' },
      audio: 'maison3.mp3',
      conseil: { fr:'Sors avec le pied gauche et confie ta journée à Allah, Il veille toujours sur toi !', en:'Leave with your left foot and entrust your day to Allah, He always watches over you!', es:'Sal con el pie izquierdo y confía tu día a Allah, ¡Él siempre vela por ti!', de:'Verlasse das Haus mit dem linken Fuß und vertraue deinen Tag Allah an, Er wacht immer über dich!', it:'Esci con il piede sinistro e affida la tua giornata ad Allah, Lui veglia sempre su di te!', nl:'Ga naar buiten met je linkervoet en vertrouw je dag toe aan Allah, Hij waakt altijd over jou!', pt:'Sai com o pé esquerdo e confia o teu dia a Allah, Ele vela sempre por ti!', tr:'Sol ayağınla çık ve gününü Allah\'a emanet et, O seni her zaman gözetir!' },
    },
  },

  transport: {
    meta: {
      emoji: '🚗',
      image: 'images/kids_transport.webp',
      couleur: '#E76F51',
      couleurLight: '#FBE9E7',
      titre: { fr:'Le Transport', en:'Transport', es:'El Transporte', de:'Der Transport', it:'Il Trasporto', nl:'Vervoer', pt:'O Transporte', tr:'Ulaşım' },
    },
    dua1: {
      moment: { fr:'En montant dans une voiture', en:'Getting in a car', es:'Al subir a un coche', de:'Beim Einsteigen ins Auto', it:'Salendo in macchina', nl:'Bij het instappen in de auto', pt:'Ao entrar num carro', tr:'Arabaya binerken' },
      emoji: '🚗',
      arabe: 'بِسْمِ اللَّهِ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
      phonetique: 'Bismillâh. Subhânallathî sakhkhara lanâ hâdhâ wa mâ kunnâ lahû muqrinîn, wa innâ ilâ rabbinâ lamunqalibûn',
      traduction: { fr:'Merci Allah pour ce véhicule !', en:'Thank you Allah for this vehicle!', es:'¡Gracias Allah por este vehículo!', de:'Danke Allah für dieses Fahrzeug!', it:'Grazie Allah per questo veicolo!', nl:'Dank U Allah voor dit voertuig!', pt:'Obrigado Allah por este veículo!', tr:'Bu araç için Allah\'a şükürler olsun!' },
      audio: 'transport1.mp3',
      conseil: { fr:'Regarde par la fenêtre toutes les belles choses qu\'Allah a créées pendant le voyage !', en:'Look out the window at all the beautiful things Allah created during the trip!', es:'¡Mira por la ventana todas las cosas bonitas que Allah creó durante el viaje!', de:'Schau während der Fahrt aus dem Fenster auf all die schönen Dinge, die Allah erschaffen hat!', it:'Guarda dal finestrino tutte le belle cose che Allah ha creato durante il viaggio!', nl:'Kijk tijdens de rit uit het raam naar alle mooie dingen die Allah heeft geschapen!', pt:'Olha pela janela para todas as coisas bonitas que Allah criou durante a viagem!', tr:'Yolculuk boyunca pencereden Allah\'ın yarattığı güzel şeylere bak!' },
    },
  },
};
