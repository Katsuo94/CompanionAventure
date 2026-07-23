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

### 🛠️ Personnalisation des champs (NEW)
Accessible via l'icône ⚙️ en haut à droite du bloc "Fiche de personnage" :
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
- Lancer 2 dés à 6 faces
- Animation de roulement
- **3 vibrations rythmées** pendant l'animation (Android/Chrome ; ignoré silencieusement sur iOS, non supporté par Safari)
- Résultat affiché

### 🎨 Croquis
- Créer des croquis
- Dessiner avec couleur et taille variable
- Support tactile (mobile/tablette)
- Un trait qui se termine par un mouvement horizontal ne déclenche plus, par erreur, un changement de page
- Annuler et effacer
- Renommer les croquis
- Exporter en PNG ou JSON

### 📲 Installation en plein écran (NEW)
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

## 📱 Responsive

- Adapté mobile, tablette, desktop
- Canvas responsive
- Touch-friendly (44px+ hit targets)
- Zoom désactivé pour éviter les bugs
- `viewport-fit=cover` pour une bonne gestion des encoches/zones sûres en plein écran

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

- [ ] Édition des croquis (eraser, couleurs avancées)
- [ ] Réorganisation par glisser-déposer (en plus des flèches)
- [ ] Partage via QR code
- [ ] Synchronisation cloud (Firebase)
- [ ] Historique des jets
- [ ] Battestats visualisations
- [ ] Thème clair
- [ ] Langue anglaise

## 📝 Notes

- Première version: Personnage + Inventaire + Dés
- V2: Export/Import + Croquis
- V3: Installation en plein écran (PWA), personnalisation complète des champs, vibrations, corrections tactiles
- Toutes les données sont persistantes
- Aucune télémétrie ni tracking

## 🎮 Cas d'usage

- Solo RPG campaign tracker
- Character sheet for TTRPGs
- Sketch/map drawing during sessions
- Backup and transfer between devices

---

Créé : 2026-07-21
Mis à jour : 2026-07-23
Maintenu par : Katsuo
