# 🧪 Guide de Test - Compagnon d'Aventure

## ✅ Checklist de Test

### 📋 Menu Principal
- [ ] Afficher la page d'accueil
- [ ] Le sous-titre affiche "Créé par Katsuo" (accueil et en-tête d'app)
- [ ] Bouton "Continuer" présent
- [ ] Bouton "Nouvelle partie" présent
- [ ] Bouton "Charger partie" présent
- [ ] Bouton "Gestion des sauvegardes" présent

### 🛠️ Gestion des Sauvegardes

#### Créer et sauvegarder :
1. [ ] Cliquer "Nouvelle partie"
2. [ ] Entrer un nom de session
3. [ ] Ajouter quelques armes/inventaire
4. [ ] Retour accueil → Session sauvegardée

#### Exporter :
1. [ ] Cliquer "Gestion des sauvegardes"
2. [ ] Cliquer "Exporter"
3. [ ] Fichier `compagnon-sauvegardes-DDMMYYYY.json` téléchargé
4. [ ] Ouvrir JSON → Voir toutes les sessions

#### Importer :
1. [ ] Cliquer "Gestion des sauvegardes"
2. [ ] Cliquer "Importer"
3. [ ] Sélectionner fichier JSON précédent
4. [ ] Message : "X session(s) importée(s)"
5. [ ] Créer session avec même nom
6. [ ] Réimporter → Session renommée avec `_importDDMMYYYY`
7. [ ] Les deux sessions coexistent

#### Supprimer :
1. [ ] Dans "Gestion des sauvegardes"
2. [ ] Cliquer "Supprimer" sur une session
3. [ ] Confirmation demandée
4. [ ] Session disparaît après confirmation

### 🧙 Page Personnage

#### Champs de base :
- [ ] Points de vie max/actuel : +/− fonctionnent, valeur persiste
- [ ] Dextérité, Chance : idem
- [ ] **Talent** : c'est désormais une liste — taper un talent, cliquer **+** (ou Entrée), il apparaît avec une pastille dorée ; bouton **−** le supprime
- [ ] Sauvegarde : 3 cases cochables indépendamment
- [ ] Armes et spécificités : ajout affiche une pastille dorée identique à l'inventaire
- [ ] Notes : la zone de texte enregistre bien le contenu

#### Alignement de l'icône ⚙️ (non-régression mobile) :
- [ ] Sur mobile (largeur < 760px), l'icône ⚙️ reste bien en haut à droite du bloc "Fiche de personnage", sur la même ligne que le titre — elle ne descend plus sous le titre
- [ ] Le texte "Chaque champ est configurable et peut être ajusté rapidement." s'aligne à droite, sous l'icône, sans repasser en pleine largeur

#### Écran de personnalisation des champs (icône ⚙️) :
1. [ ] Cliquer sur l'icône ⚙️ en haut à droite du bloc "Fiche de personnage" → l'écran s'ouvre
2. [ ] La liste déroulante "type" (Nombre / Case à cocher / Liste / Zone de texte) est lisible (fond sombre, texte clair — pas de fond blanc)
3. [ ] Tous les champs de base (PV max, PV actuel, Dextérité, Chance, Talent, Sauvegarde, Armes et spécificités, Notes) apparaissent dans la même liste que les champs personnalisés
4. [ ] Un champ de base a une case "Afficher" mais pas de champ de nom ni de sélecteur de type modifiable
5. [ ] **Réorganisation libre** : utiliser ↑ / ↓ pour déplacer un champ de base au milieu de champs personnalisés (et inversement) → l'ordre est respecté sans contrainte de groupe
6. [ ] **Masquer un champ de base** : décocher "Afficher" sur ex. "Notes" → Enregistrer → le champ disparaît de la fiche
7. [ ] Réafficher ce champ → Enregistrer → il réapparaît à la même position
8. [ ] **Ajouter un champ personnalisé** de type Nombre (ex. "Constitution") → apparaît avec +/− sur la fiche
9. [ ] **Ajouter un champ personnalisé** de type Case à cocher :
   - [ ] Sans case nommée ajoutée → une case unique reprenant le nom du champ s'affiche
   - [ ] Avec "+ Ajouter une case" utilisé plusieurs fois et chaque case nommée (ex. "Empoisonné", "Étourdi") → toutes les cases nommées s'affichent séparément sur la fiche, chacune cochable indépendamment
10. [ ] **Ajouter un champ personnalisé** de type Liste (ajout/suppression) → se comporte comme "Armes et spécificités" (pastille dorée, ajout/suppression)
11. [ ] **Ajouter un champ personnalisé** de type Zone de texte → se comporte comme "Notes"
12. [ ] **Supprimer un champ personnalisé** (×) → Enregistrer → il disparaît, aucun doublon résiduel
13. [ ] **Non-régression doublons** : créer un champ → Enregistrer → rouvrir l'écran → réorganiser (sans rien ajouter) → Enregistrer → le champ n'apparaît qu'une seule fois sur la fiche (pas de doublon)
14. [ ] **Non-régression doublons (suppression)** : supprimer un champ existant → Enregistrer → le champ ne réapparaît pas, même fantôme
15. [ ] **Annuler** : faire des changements puis cliquer "Annuler" → rien n'est appliqué ni sauvegardé
16. [ ] Changer le type d'un champ personnalisé existant contenant déjà une valeur → la valeur repart à son défaut (comportement attendu, pas une erreur)
17. [ ] Les champs personnalisés et leur ordre sont identiques sur toutes les sessions ; seules les valeurs saisies changent d'une session à l'autre

### 🎲 Jets de Dés

#### Deux dés toujours visibles :
- [ ] Sur la page Dés, les deux dés (ou les deux cubes en mode 3D) sont visibles en permanence, avant même le premier lancer
- [ ] Cliquer **"Lancer un dé"** → seul le premier dé tourne/s'anime, le second reste figé sur sa valeur précédente
- [ ] Cliquer **"Lancer deux dés"** → les deux dés tournent
- [ ] Le résultat affiché correspond bien à la valeur unique (1 dé) ou à la somme (2 dés)
- [ ] Cliquer rapidement plusieurs fois sur un bouton pendant qu'une animation est en cours → aucun chevauchement, aucun bug visuel (le clic est ignoré tant que le lancer précédent n'est pas terminé)

#### Icône ⚙️ (alignement + accès) :
- [ ] Sur mobile, l'icône ⚙️ de la page Dés reste bien en haut à droite du bloc, sur la même ligne que le titre "Jets de dés"
- [ ] Cliquer dessus → l'écran "Personnaliser les dés" s'ouvre

#### Choix du style d'animation :
1. [ ] Ouvrir ⚙️ → sélectionner "Animation classique" → Enregistrer → lancer → les dés tremblent puis affichent le résultat (comportement historique)
2. [ ] Ouvrir ⚙️ → sélectionner "Animation 3D" → Enregistrer → lancer → un cube en volume bascule sur lui-même avant de s'arrêter sur la bonne face
3. [ ] **Ralentissement naturel (3D)** : la rotation est visiblement plus rapide au début puis ralentit progressivement jusqu'à l'arrêt, sans vitesse constante
4. [ ] **Irrégularité (3D)** : relancer plusieurs fois → la cadence et l'amplitude de la rotation varient d'un lancer à l'autre, et ne sont jamais parfaitement identiques entre les deux dés
5. [ ] **Décalage entre les deux dés (3D, "Lancer deux dés")** : les deux cubes ne démarrent pas exactement au même instant et ne s'arrêtent pas forcément en même temps ; ce n'est pas toujours le même dé qui part en premier sur plusieurs lancers successifs
6. [ ] Le résultat (valeur/somme) ne s'affiche qu'une fois l'animation du dé le plus lent réellement terminée
7. [ ] Le choix du style est mémorisé après rechargement de la page

#### Vibrations :
1. [ ] Ouvrir ⚙️ → case "Vibrations pendant le lancer" cochée par défaut → Enregistrer
2. [ ] **Android/Chrome, animation classique** : 3 impulsions régulières ressenties pendant le tremblement
3. [ ] **Android/Chrome, animation 3D** : plusieurs petites impulsions ressenties, de plus en plus espacées et un peu plus longues, suivant le ralentissement visuel du cube ; une vibration finale plus marquée ressentie pile au moment où le dé s'arrête
4. [ ] **Android/Chrome, 3D + "Lancer deux dés"** : chaque dé produit sa propre vibration finale à son propre moment d'arrêt (pas une seule vibration finale commune aux deux)
5. [ ] Décocher "Vibrations pendant le lancer" → Enregistrer → lancer (dans les deux styles) → aucune vibration, mais animation et résultat fonctionnent normalement
6. [ ] **iOS/Safari** : aucune vibration quel que soit le réglage (API non supportée), mais aucune erreur console

#### Secouer pour lancer :
1. [ ] Ouvrir ⚙️ → cocher "Secouer pour lancer" → Enregistrer
2. [ ] **iOS** : une demande d'autorisation d'accès au mouvement apparaît au moment de cliquer "Enregistrer"
3. [ ] Autoriser → secouer le téléphone en étant sur la page Dés → un lancer se déclenche automatiquement avec le dernier nombre de dés utilisé (1 ou 2)
4. [ ] Secouer le téléphone en étant sur une **autre page** (Personnage, Inventaire, Croquis) → aucun lancer ne se déclenche
5. [ ] Secouer plusieurs fois très rapidement, ou pendant qu'un lancer est déjà en cours → pas de déclenchements multiples ni de chevauchement d'animations
6. [ ] Décocher "Secouer pour lancer" → Enregistrer → secouer le téléphone → plus aucun lancer ne se déclenche
7. [ ] **iOS uniquement** : fermer et rouvrir l'app → même si le réglage était activé, l'autorisation doit être redonnée (revenir dans ⚙️ et cliquer "Enregistrer" à nouveau) pour que la détection fonctionne à nouveau — comportement attendu, imposé par Safari
8. [ ] **Android** : fermer et rouvrir l'app → si le réglage était activé, la détection reprend sans nouvelle demande d'autorisation

### 🎨 Page Croquis

#### Navigation :
- [ ] Voir les onglets : Personnage, Inventaire, Dés, Croquis
- [ ] Cliquer sur "Croquis" → Page se charge

#### Créer un croquis :
1. [ ] Entrer un nom : "Mon dessin"
2. [ ] Cliquer "+" pour créer
3. [ ] Éditeur de croquis s'ouvre
4. [ ] Le titre du croquis s'affiche

#### Dessiner :
1. [ ] Sélectionner une couleur (color picker)
2. [ ] Ajuster la taille du pinceau (slider 1-20)
3. [ ] Dessiner à la souris sur le canvas
4. [ ] **TACTILE** : Dessiner au doigt sur mobile/tablette
5. [ ] Trait apparaît en temps réel
6. [ ] **Non-régression navigation** : tracer un trait qui se termine par un mouvement horizontal (gauche→droite ou droite→gauche) → l'app reste sur la page Croquis, ne bascule pas vers une autre page (Dés)
7. [ ] En dehors du canvas, un swipe horizontal change bien de page normalement

#### Outils de dessin :
- [ ] **Annuler** : Revenir au trait précédent
- [ ] **Effacer tout** : Canvas complètement vide
- [ ] **Sauvegarder le croquis** : Retour à la liste
- [ ] Message "Croquis sauvegardé"

#### Gérer les croquis :
1. [ ] Retour à la liste après sauvegarde
2. [ ] Croquis apparaît dans la liste
3. [ ] Bouton ✏️ pour éditer → Reouvre l'éditeur
4. [ ] Bouton − pour supprimer → Disparaît de la liste
5. [ ] Renommer en changeant le titre

#### Exporter :
- [ ] Cliquer "Exporter les croquis"
- [ ] Fichier `croquis-DDMMYYYY.json` téléchargé
- [ ] Contient tous les croquis avec imageData

### 📲 Installation en plein écran

#### Android (Chrome) :
1. [ ] Ouvrir le site dans Chrome mobile
2. [ ] Menu ⋮ → "Ajouter à l'écran d'accueil" / "Installer l'application" proposé
3. [ ] Icône installée visible sur l'écran d'accueil (icône dorée/anthracite avec motif de dé)
4. [ ] Ouvrir depuis l'icône → l'app se lance sans barre d'adresse ni barre de statut (plein écran)

#### iOS (Safari) :
1. [ ] Ouvrir le site dans Safari
2. [ ] Bouton Partager → "Sur l'écran d'accueil"
3. [ ] Ouvrir depuis l'icône → barre d'adresse masquée (barre de statut système restant visible, limite iOS)

#### Service worker / hors-ligne :
1. [ ] Charger l'app une première fois avec connexion
2. [ ] Ouvrir les DevTools → Application → Service Workers → vérifier qu'il est bien "activated and running" (pas d'échec d'enregistrement)
3. [ ] Couper la connexion réseau → recharger la page → l'app se charge quand même

### 💾 Persistance

- [ ] Recharger la page → Données conservées
- [ ] Changer de session → Croquis et valeurs de champs personnalisés conservés par session
- [ ] Aller sur un autre onglet puis revenir → État préservé
- [ ] Fermer et rouvrir l'app installée → dernière session restaurée
- [ ] Fermer et rouvrir l'app → réglages des dés (style, vibrations, secouer) conservés (sous réserve, pour la détection de mouvement elle-même, de la limite iOS ci-dessus)

### 📱 Responsive & Tactile

- [ ] Réduire fenêtre (mobile) → Layout s'adapte
- [ ] Canvas responsive
- [ ] Boutons tactiles (hit targets > 44px)
- [ ] Dessiner au doigt sur mobile
- [ ] Icônes ⚙️ (Personnage et Dés) toujours en haut à droite, jamais repoussées sous le titre, à toutes les largeurs d'écran testées

---

## 🐛 Debugging

### Ouvrir la console :
```
F12 → Console tab
```

### Points à vérifier :
- Pas d'erreur "Uncaught"
- Pas d'avertissement sur les event listeners
- Le service worker s'enregistre sans erreur (`sw.js` doit être à la racine du dépôt, au même niveau que `index.html`)
- localStorage accessible (tape dans console) :
  ```javascript
  localStorage.getItem('compagnon_sessions_store_v2')
  localStorage.getItem('compagnon_custom_fields_v1')
  localStorage.getItem('compagnon_base_fields_visibility_v1')
  localStorage.getItem('compagnon_field_order_v1')
  localStorage.getItem('compagnon_dice_style_v1')
  localStorage.getItem('compagnon_dice_vibration_v1')
  localStorage.getItem('compagnon_dice_shake_v1')
  ```

### Test export/import en console :
```javascript
// Vérifier structure export
const data = JSON.parse(localStorage.getItem('compagnon_sessions_store_v2'));
console.log(Object.keys(data)); // Voir noms des sessions
```

### Test de la configuration des champs en console :
```javascript
JSON.parse(localStorage.getItem('compagnon_field_order_v1'));
// Doit renvoyer un tableau du type :
// [{kind:'base', key:'hpMax'}, {kind:'custom', key:'cf_abc123'}, ...]
```

### Test des réglages des dés en console :
```javascript
localStorage.getItem('compagnon_dice_style_v1');      // "classic" ou "cube3d"
localStorage.getItem('compagnon_dice_vibration_v1');  // "on" ou "off"
localStorage.getItem('compagnon_dice_shake_v1');      // "on" ou "off"
```

---

## ✨ Cas d'usage avancés

1. **Multi-appareil** : Exporter sur PC, importer sur tablette
2. **Sauvegarde** : Exporter régulièrement pour backup
3. **Collaboration** : Partager fichier JSON
4. **Croquis détaillés** : Plusieurs layers via sessions différentes
5. **Fiche sur mesure** : masquer les champs inutiles pour un système de jeu donné et ajouter uniquement les statistiques pertinentes (ex. Constitution, Niveau, États)
6. **Mains occupées** : secouer le téléphone pour relancer sans avoir à viser un bouton, pratique en pleine partie

---

Créé : 2026-07-21 | Mis à jour : 2026-07-24 | Version : 4.0
