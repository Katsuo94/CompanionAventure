# 🎮 Compagnon d'Aventure — Créé par Katsuo

Une application web mobile pour gérer une partie de jeu de rôle en solo, avec personnage entièrement personnalisable, inventaire, jets de dés et croquis. Installable en plein écran directement depuis l'écran d'accueil du téléphone.

## ✨ Fonctionnalités

### 📋 Gestion des Sessions
- **Créer** une nouvelle partie
- **Charger** une partie existante
- **Renommer** la session active
- **Exporter** toutes les sauvegardes en JSON
- **Importer** des sauvegardes (avec gestion automatique des conflits)

### 🧙 Personnage
- Points de vie (max et actuels)
- Statistiques : Dextérité, Chance
- **Talent** : liste libre (ajout/suppression), pour noter autant de talents que nécessaire
- Sauvegardes (3 cases)
- Armes et spécificités (liste avec pastille dorée, ajout/suppression)
- Notes personnelles
- **Champs entièrement personnalisables** (voir section dédiée ci-dessous)

### 🛠️ Personnalisation des champs
Accessible via l'icône ⚙️ en haut à droite du bloc "Fiche de personnage" (fixée à cet emplacement quelle que soit la taille d'écran, y compris mobile) :
- **Réorganisation libre** : tous les champs (de base *et* personnalisés) se déplacent avec les flèches ↑ / ↓, sans contrainte de groupe — un champ personnalisé peut être positionné n'importe où entre deux champs de base
- **Champs de base** (PV max, PV actuel, Dextérité, Chance, Talent, Sauvegarde, Armes et spécificités, Notes) : peuvent être **affichés ou masqués** au besoin, mais restent non renommables et de type fixe
- **Champs personnalisés** : entièrement libres — nom, type, ordre et suppression
  - **Nombre** : champ numérique avec boutons +/−
  - **Case à cocher** : une ou plusieurs cases **nommées individuellement** (ex : Empoisonné, Étourdi, À terre...), ajoutées/supprimées à la volée
  - **Liste (ajout/suppression)** : même comportement que "Armes et spécificités"
  - **Zone de texte** : même comportement que "Notes"
- Boutons **Enregistrer** (applique et sauvegarde la disposition) et **Annuler** (ferme sans rien changer)
- La disposition et les types de champs sont partagés entre toutes les sessions ; les **valeurs** saisies restent propres à chaque personnage/session

### 🎒 Inventaire
- Ajouter/supprimer des objets (pastille dorée par objet)
- Vider l'inventaire complet
- Librement extensible

### 🎲 Jets de Dés
- **Lancer un dé** ou **Lancer deux dés** : les deux boutons sont toujours disponibles, les deux dés restent toujours visibles à l'écran ; seul le(s) dé(s) demandé(s) tourne(nt), l'autre reste figé sur sa dernière valeur
- **Secouer le téléphone pour lancer** : relance automatiquement le dernier nombre de dés utilisé (1 ou 2), uniquement quand la page Dés est active — activable/désactivable dans les réglages
- Icône ⚙️ en haut à droite (même emplacement fixe que sur la page Personnage) ouvrant l'écran **"Personnaliser les dés"** :
  - **Animation classique** : les dés tremblent puis affichent le résultat (comportement d'origine)
  - **Animation 3D** : un vrai cube en volume, avec un chiffre fixe par face (faces opposées = 7, comme un dé physique), qui bascule sur lui-même par à-coups décroissants pour un effet de lancer naturel — rotation qui ralentit progressivement, vitesse et amplitude légèrement aléatoires sur chaque axe, chaque dé indépendant de l'autre (léger décalage de départ, durée totale différente)
  - **Vibrations pendant le lancer** (on/off) — rythme différent selon le style choisi :
    - Classique : 3 impulsions régulières sur la durée du tremblement
    - 3D : une petite impulsion à chaque à-coup de rotation (de plus en plus longue à mesure que le dé ralentit), plus une vibration finale plus marquée pile au moment où *chaque* dé termine sa propre animation
  - **Secouer pour lancer** (on/off)
- Résultat affiché (valeur unique ou somme des deux dés selon le nombre lancé)

### 🎨 Croquis
- Créer des croquis
- Dessiner avec couleur et taille variable
- Support tactile (mobile/tablette)
- Un trait qui se termine par un mouvement horizontal ne déclenche plus, par erreur, un changement de page
- Annuler et effacer
- Renommer les croquis
- Exporter en PNG ou JSON

### 📲 Installation en plein écran
- **Manifest PWA** (`manifest.json`) avec icônes dédiées (192px, 512px, maskable, apple-touch-icon)
- **Android/Chrome** : "Ajouter à l'écran d'accueil" propose l'installation native, lancement en plein écran
- **iOS/Safari** : "Sur l'écran d'accueil" masque la barre d'adresse (limite Apple : la barre de statut système reste visible, l'API Fullscreen n'existe pas sur iOS)
- **Service worker** (`sw.js`) : cache l'app pour un fonctionnement hors-ligne complet, cohérent avec le stockage 100 % local
- Repli JavaScript (API Fullscreen) pour les appareils Android qui n'appliquent pas nativement `display: fullscreen`

## 🚀 Utilisation

### Menu Principal
1. **Continuer** : Reprendre la dernière session
2. **Nouvelle partie** : Créer une nouvelle session
3. **Charger partie** : Sélectionner une session sauvegardée
4. **Gestion des sauvegardes** : Exporter/Importer/Supprimer

### Installer sur le téléphone
- **Android (Chrome)** : ouvrir le site → menu ⋮ → "Ajouter à l'écran d'accueil" / "Installer l'application"
- **iOS (Safari)** : ouvrir le site → bouton Partager → "Sur l'écran d'accueil"

### Personnaliser la fiche personnage
1. Aller sur l'onglet **Personnage**
2. Cliquer sur l'icône **⚙️** en haut à droite du bloc fiche
3. Réorganiser, masquer, ajouter ou supprimer des champs
4. **Enregistrer** pour appliquer, ou **Annuler** pour fermer sans changement

### Personnaliser les dés
1. Aller sur l'onglet **Dés**
2. Cliquer sur l'icône **⚙️** en haut à droite du bloc
3. Choisir l'animation (classique ou 3D), activer/désactiver les vibrations et/ou le secouer-pour-lancer
4. **Enregistrer**. Sur iPhone, l'autorisation d'accès au mouvement est redemandée par Safari à chaque nouvelle ouverture de l'app (limite d'Apple, la permission ne peut pas être mémorisée durablement)

### Sauvegardes
- **Automatiques** : À chaque modification
- **Export** : Fichier JSON avec timestamp
- **Import** : Détecte les conflits de noms et renomme avec `_importDDMMYYYY`

### Croquis
1. Aller à l'onglet **Croquis**
2. Entrer un nom et cliquer **+**
3. Dessiner dans le canvas
4. Ajuster couleur et taille
5. Cliquer **Sauvegarder le croquis**

## 💾 Stockage

- **localStorage** : Toutes les données sauvegardées localement
- **Pas de serveur** : Fonctionne hors ligne (une fois le service worker actif)
- **Sécurisé** : Données restent sur l'appareil

### Clés localStorage
- `compagnon_sessions_store_v2` : Toutes les sessions
- `compagnon_last_session_v2` : Dernière session ouverte
- `compagnon_custom_fields_v1` : Définition des champs personnalisés (nom, type, cases nommées)
- `compagnon_base_fields_visibility_v1` : Visibilité des champs de base (affiché/masqué)
- `compagnon_field_order_v1` : Ordre d'affichage global de tous les champs (base + personnalisés)
- `compagnon_dice_style_v1` : Style d'animation des dés (`classic` ou `cube3d`)
- `compagnon_dice_vibration_v1` : Vibrations des dés activées ou non (`on`/`off`)
- `compagnon_dice_shake_v1` : Secouer-pour-lancer activé ou non (`on`/`off`, se réinitialise à chaque session sur iOS pour la détection réelle du mouvement, la préférence elle-même reste mémorisée)

## 📱 Responsive

- Adapté mobile, tablette, desktop
- Canvas responsive
- Touch-friendly (44px+ hit targets)
- Zoom désactivé pour éviter les bugs
- `viewport-fit=cover` pour une bonne gestion des encoches/zones sûres en plein écran
- En-têtes de sections (icône ⚙️ incluse) toujours alignés à droite, sans jamais passer à la ligne sous le titre, quelle que soit la largeur d'écran

## 🎨 Thème

- Palette dorée et sombre
- Cinzel pour les titres
- Inter pour le corps
- Dégradés et ombres légères

## 📁 Fichiers

- `index.html` : Application complète (HTML + CSS + JS)
- `manifest.json` : Manifeste PWA (installation, icônes, plein écran)
- `sw.js` : Service worker (cache/hors-ligne) — **doit rester à la racine du dépôt**, au même niveau que `index.html`
- `icons/` : Icônes de l'application (192px, 512px, maskable, apple-touch-icon)
- `TEST_FEATURES.md` : Guide de test complet
- `css/styles.css`, `js/app.js` : fichiers hérités, non utilisés (tout le CSS/JS de l'application vit dans `index.html`)

## 🔧 Développement

### Structure
```
index.html
├── HTML (Sections screens)
├── CSS (Variables + styles)
└── JavaScript (Logique)
    ├── Session management
    ├── State persistence
    ├── Champs personnalisés (config, ordre, rendu dynamique)
    ├── Dés (styles classique/3D, vibrations, secouer-pour-lancer)
    ├── Sketch drawing
    └── Import/Export

manifest.json      → métadonnées PWA
sw.js               → cache applicatif (à la racine)
icons/              → icônes PWA
```

### Format des sessions
```javascript
{
  sessionName: "Campagne Nord",
  hpMax: 20,
  hpNow: 20,
  dex: 5,
  luck: 3,
  talent: ["Escalade", "Discrétion"],
  save1: true,
  save2: false,
  save3: true,
  notes: "...",
  weapons: ["Épée", "Arc"],
  inventory: ["Potion", "Clé"],
  customValues: {
    "cf_abc123": "12",
    "cf_def456": { "opt_1": true, "opt_2": false },
    "cf_ghi789": ["État instable"]
  },
  sketches: {
    "sketch_1234567890": {
      name: "Carte du donjon",
      imageData: "data:image/png;base64,...",
      createdAt: "2026-07-21T10:00:00Z",
      updatedAt: "2026-07-21T10:30:00Z"
    }
  }
}
```
> Les réglages des dés (style d'animation, vibrations, secouer-pour-lancer) ne font pas partie de la session : ce sont des préférences globales à l'appareil, pas des données de personnage.

### Format d'un champ personnalisé
```javascript
{
  id: "cf_abc123",
  label: "Constitution",
  type: "number" // "number" | "checkbox" | "list" | "text"
  // pour "checkbox" uniquement :
  // options: [{ id: "opt_1", label: "Empoisonné" }, { id: "opt_2", label: "Étourdi" }]
}
```

## 🎯 Prochaines améliorations possibles

- [ ] Support d'autres types de dés (d4, d8, d10, d12, d20) pour l'animation classique
- [ ] Édition des croquis (eraser, couleurs avancées)
- [ ] Réorganisation par glisser-déposer (en plus des flèches)
- [ ] Historique des derniers jets de dés
- [ ] Modèles de fiche prêts à l'emploi selon le système de jeu
- [ ] Partage via QR code
- [ ] Synchronisation cloud (Firebase)
- [ ] Thème clair
- [ ] Langue anglaise

## 📝 Notes

- Première version : Personnage + Inventaire + Dés
- V2 : Export/Import + Croquis
- V3 : Installation en plein écran (PWA), personnalisation complète des champs, vibrations, corrections tactiles
- V4 : Choix 1/2 dés, animation 3D des dés (avec rythme de lancer naturel et décalage entre les deux dés), secouer-pour-lancer, vibrations différenciées par style et par dé, correctif d'alignement du rouage sur mobile
- Toutes les données sont persistantes
- Aucune télémétrie ni tracking

## 🎮 Cas d'usage

- Solo RPG campaign tracker
- Character sheet for TTRPGs
- Sketch/map drawing during sessions
- Backup and transfer between devices

---

Créé : 2026-07-21
Mis à jour : 2026-07-24
Maintenu par : Katsuo
