# Deentag — Migration Next.js (multilingue)

## État : migration terminée, en ligne en production

Le site tourne sur Next.js depuis la branche `Deentag-neact`, mergée dans `main` fin août 2026. Routing par langue réel, contenu server-rendered dans la bonne langue, hreflang + sitemap automatiques, JS/CSS d'origine conservés à l'identique (roue interactive, profils, horaires de prière, coran, kids...).

Pages migrées :
- **Accueil** (`/[locale]`) — écrite en JSX pur, traduite via `messages/*.json`
- **Invocations** (`/[locale]/invocations`)
- **Coran** (`/[locale]/quran`)
- **Boutique** (`/[locale]/shop`)
- **Kids** (`/[locale]/kids`)
- **Coran enfants** (`/[locale]/quran-kids`)

(La section Masjid des Lumières a été retirée du projet — `masjid.js`/`masjid.css` n'existent plus dans le repo.)

Langues : `fr`, `en`, `es`, `de`, `it`, `nl`, `pt`, `tr`

## Comment ça marche

- Le contenu textuel de chaque page provenait déjà en 8 langues dans le code source d'origine (caché en CSS derrière un sélecteur JS). Un script a extrait, pour chaque page et chaque langue, uniquement le texte de cette langue (voir `content/`) — plus de doublons de langues invisibles dans le DOM, ce qui est le vrai gain SEO.
- `middleware.js` redirige `/` vers la langue du navigateur au premier passage.
- Chaque route a ses propres `<title>`, `<meta description>` et balises `hreflang` (visibles dans `generateMetadata` de chaque `page.js`), traduits individuellement dans `messages/*.json` (clé `pages.*`). Le titre de la page Invocations, qui dupliquait celui de l'accueil dans les 8 langues, a été corrigé pour être unique.
- Tout le JS interactif d'origine (`duas.js`, `quran.js`, `wheel.js`, `profiles.js`, `prayer-times.js`, `kids*.js`, `nav.js`...) est chargé tel quel via `next/script` — rien n'a été réécrit dans sa logique.
- `nav.js` a été légèrement patché : la barre de navigation en bas de page générait des liens vers `invocations.html`, `quran.html`, etc. Elle génère maintenant `/fr/invocations`, `/en/quran`, etc., en fonction de la langue de la page courante (déduite de l'URL, pas du localStorage).
- Quelques liens internes codés en dur (widget "invocation du moment" sur l'accueil, deep-link "reprendre ma sourate" dans le profil) ont été adaptés pour pointer vers la bonne route localisée.
- Tous les chemins d'images/audio (`images/...`, `Audio/...`) ont été rendus absolus (`/images/...`, `/Audio/...`), à la fois dans le HTML et dans le JS — nécessaire car les pages vivent maintenant sous des URLs imbriquées type `/fr/invocations`.
- `shop.css` (perdu lors de l'extraction initiale — c'était un `<style>` inline dans l'ancien `shop.html`, pas un fichier séparé) a été récupéré depuis une sauvegarde de l'ancien site et ajouté dans `public/css/`, chargé dans `app/[locale]/layout.js`.
- **Seule source de vérité pour le JS/CSS servi : `public/js/` et `public/css/`.** Les anciens dossiers `/js/` et `/css/` à la racine (qui contenaient une version parallèle, non servie par Next puisque hors de `public/`) ont été supprimés pour éviter toute divergence entre les deux.

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

## Déploiement

Le site est déployé sur Vercel, branché sur `main`. Chaque push sur `main` redéploie automatiquement la production.

## À faire

- **Traductions** : celles pour en/es/de/it/nl/pt/tr (labels d'interface + meta SEO) ont été générées par mes soins et sont correctes, mais méritent une relecture par un locuteur natif de chaque langue — en particulier pour tout ce qui touche au vocabulaire religieux, où la précision compte.
- **Google Search Console** : le sitemap multilingue (`/sitemap.xml`, généré par `app/sitemap.js`) n'a pas encore été soumis à Search Console. À faire pour accélérer la réindexation des nouvelles URLs `/fr/`, `/en/`, etc.
- Aucun fichier de vérification Google (Search Console) ni de tag Analytics/GTM n'est présent dans le projet pour l'instant.
