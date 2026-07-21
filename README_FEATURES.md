# 🎮 Compagnon d'Aventure - Prototype Android

Une application web mobile pour gérer une partie de jeu de rôle en solo, avec personnage, inventaire, jets de dés et croquis.

## ✨ Fonctionnalités

### 📋 Gestion des Sessions
- **Créer** une nouvelle partie
- **Charger** une partie existante
- **Renommer** la session active
- **Exporter** toutes les sauvegardes en JSON
- **Importer** des sauvegardes (avec gestion automatique des conflits)

### 🧙 Personnage
- Points de vie (max et actuels)
- Statistiques : Dextérité, Chance, Talent
- Sauvegardes (3 cases)
- Armes et spécificités
- Notes personnelles

### 🎒 Inventaire
- Ajouter/supprimer des objets
- Vider l'inventaire complet
- Librement extensible

### 🎲 Jets de Dés
- Lancer 2 dés à 6 faces
- Animation de roulement
- Résultat affiché

### 🎨 Croquis (NEW)
- Créer des croquis
- Dessiner avec couleur et taille variable
- Support tactile (mobile/tablette)
- Annuler et effacer
- Renommer les croquis
- Exporter en PNG ou JSON

## 🚀 Utilisation

### Menu Principal
1. **Continuer** : Reprendre la dernière session
2. **Nouvelle partie** : Créer une nouvelle session
3. **Charger partie** : Sélectionner une session sauvegardée
4. **Gestion des sauvegardes** : Exporter/Importer/Supprimer

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
- **Pas de serveur** : Fonctionne hors ligne
- **Sécurisé** : Données restent sur l'appareil

## 📱 Responsive

- Adapté mobile, tablette, desktop
- Canvas responsive
- Touch-friendly (44px+ hit targets)
- Zoom désactivé pour éviter les bugs

## 🎨 Thème

- Palette dorée et sombre
- Cinzel pour les titres
- Inter pour le corps
- Dégradés et ombres légères

## 📁 Fichiers

- `index.html` : Application complète (HTML + CSS + JS)
- `TEST_FEATURES.md` : Guide de test complet

## 🔧 Développement

### Structure
```
index.html
├── HTML (Sections screens)
├── CSS (Variables + styles)
└── JavaScript (Logique)
    ├── Session management
    ├── State persistence
    ├── Sketch drawing
    └── Import/Export
```

### Clés localStorage
- `compagnon_sessions_store_v2` : Toutes les sessions
- `compagnon_last_session_v2` : Dernière session ouverte

### Format des sessions
```javascript
{
  sessionName: "Campagne Nord",
  hpMax: 20,
  hpNow: 20,
  dex: 5,
  luck: 3,
  talent: 2,
  save1: true,
  save2: false,
  save3: true,
  notes: "...",
  weapons: ["Épée", "Arc"],
  inventory: ["Potion", "Clé"],
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

## 🎯 Prochaines améliorations possibles

- [ ] Édition des croquis (eraser, couleurs avancées)
- [ ] Partage via QR code
- [ ] Synchronisation cloud (Firebase)
- [ ] Historique des jets
- [ ] Battestats visualisations
- [ ] Sons/Haptic feedback
- [ ] Thème clair
- [ ] Langue anglaise

## 📝 Notes

- Première version: Personnage + Inventaire + Dés
- V2: Export/Import + Croquis
- Toutes les données sont persistantes
- Aucune telémétrie ni tracking

## 🎮 Cas d'usage

- Solo RPG campaign tracker
- Character sheet for TTRPGs
- Sketch/map drawing during sessions
- Backup and transfer between devices

---

Créé : 2026-07-21
Maintenu par : Copilot
