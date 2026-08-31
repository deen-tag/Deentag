# Deentag — Migration Next.js (multilingue)

## État : migration complète des 7 pages

Toutes les pages existantes sont migrées sur le même modèle : routing par langue réel, contenu server-rendered dans la bonne langue, hreflang + sitemap automatiques, JS/CSS d'origine conservés à l'identique (roue interactive, profils, horaires de prière, coran, kids...).

Pages migrées :
- **Accueil** (`/[locale]`) — écrite en JSX pur, traduite via `messages/*.json`
- **Invocations** (`/[locale]/invocations`)
- **Coran** (`/[locale]/quran`)
- **Boutique** (`/[locale]/shop`)
- **Kids** (`/[locale]/kids`)
- **Coran enfants** (`/[locale]/quran-kids`)

(La section Masjid des Lumières a été retirée du projet.)

Langues : `fr`, `en`, `es`, `de`, `it`, `nl`, `pt`, `tr`

## Comment ça marche

- Le contenu textuel de chaque page provenait déjà en 8 langues dans le code source d'origine (caché en CSS derrière un sélecteur JS). Un script a extrait, pour chaque page et chaque langue, uniquement le texte de cette langue (voir `content/`) — plus de doublons de langues invisibles dans le DOM, ce qui est le vrai gain SEO.
- `middleware.js` redirige `/` vers la langue du navigateur au premier passage.
- Chaque route a ses propres `<title>`, `<meta description>` et balises `hreflang` (visibles dans `generateMetadata` de chaque `page.js`).
- Tout le JS interactif d'origine (`duas.js`, `quran.js`, `wheel.js`, `profiles.js`, `prayer-times.js`, `kids*.js`, `masjid.js`, `nav.js`...) est chargé tel quel via `next/script` — rien n'a été réécrit dans sa logique.
- `nav.js` a été légèrement patché : la barre de navigation en bas de page générait des liens vers `invocations.html`, `quran.html`, etc. Elle génère maintenant `/fr/invocations`, `/en/quran`, etc., en fonction de la langue de la page courante.
- Quelques liens internes codés en dur (partage, deep-links vers une invocation ou une sourate précise) ont été adaptés pour pointer vers la bonne route localisée.
- Tous les chemins d'images/audio (`images/...`, `Audio/...`) ont été rendus absolus (`/images/...`, `/Audio/...`), à la fois dans le HTML et dans le JS — nécessaire car les pages vivent maintenant sous des URLs imbriquées type `/fr/invocations`.

## Comment tester en local

```bash
npm install
npm run dev
```
Ouvre http://localhost:3000 — tu seras redirigé vers ta langue de navigateur.

Teste au minimum :
- La navigation entre les 4 onglets du bas (Invocations / Coran / Enfants / Boutique) dans au moins 2 langues
- Le changement de langue via le sélecteur en haut à gauche — il doit changer d'URL, pas juste de texte
- La roue interactive sur la page Invocations
- Les horaires de prière sur l'accueil (nécessite d'autoriser la géolocalisation)
- L'espace enfants et le passage Kids ↔ Adulte

## Déploiement sur Vercel

Pousse ce dossier sur ton dépôt GitHub (à la place de l'actuel, ou en branche séparée pour comparer avant de basculer) — Vercel détecte Next.js automatiquement, aucune configuration supplémentaire nécessaire.

## À vérifier avant mise en ligne définitive

- **Traductions** : celles pour en/es/de/it/nl/pt/tr (labels d'interface + meta SEO) ont été générées par mes soins et sont correctes, mais méritent une relecture par un locuteur natif de chaque langue avant publication — en particulier pour tout ce qui touche au vocabulaire religieux, où la précision compte.
- **Test réel sur mobile** : le site est très orienté mobile (splash screen, tabbar, roue tactile) — à tester sur un vrai téléphone dans chaque langue avant de remplacer le site actuel.
- Une fois validé, pense à mettre à jour Google Search Console avec le nouveau sitemap multilingue une fois en ligne, pour accélérer la réindexation.
