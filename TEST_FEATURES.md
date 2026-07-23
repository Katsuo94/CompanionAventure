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
- [ ] Lancer les dés → animation de roulement visible
- [ ] **Android/Chrome** : 3 vibrations courtes ressenties pendant l'animation
- [ ] **iOS/Safari** : aucune vibration, mais aucune erreur console, l'animation et le résultat fonctionnent normalement
- [ ] Résultat final affiché correctement

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

### 📱 Responsive & Tactile

- [ ] Réduire fenêtre (mobile) → Layout s'adapte
- [ ] Canvas responsive
- [ ] Boutons tactiles (hit targets > 44px)
- [ ] Dessiner au doigt sur mobile

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

---

## ✨ Cas d'usage avancés

1. **Multi-appareil** : Exporter sur PC, importer sur tablette
2. **Sauvegarde** : Exporter régulièrement pour backup
3. **Collaboration** : Partager fichier JSON
4. **Croquis détaillés** : Plusieurs layers via sessions différentes
5. **Fiche sur mesure** : masquer les champs inutiles pour un système de jeu donné et ajouter uniquement les statistiques pertinentes (ex. Constitution, Niveau, États)

---

Créé : 2026-07-21 | Mis à jour : 2026-07-23 | Version : 3.0
