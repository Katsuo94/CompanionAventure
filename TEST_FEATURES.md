# 🧪 Guide de Test - Compagnon d'Aventure

## ✅ Checklist de Test

### 📋 Menu Principal
- [ ] Afficher la page d'accueil
- [ ] Bouton "Continuer" présent
- [ ] Bouton "Nouvelle partie" présent
- [ ] Bouton "Charger partie" présent
- [ ] Bouton "Gestion des sauvegardes" présent (remplace "Supprimer partie")

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

### 🎨 Page Croquis

#### Navigation :
- [ ] Voir 4 onglets : Personnage, Inventaire, Dés, **Croquis**
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

### 💾 Persistance

- [ ] Recharger la page → Données conservées
- [ ] Changer de session → Croquis conservés par session
- [ ] Aller sur un autre onglet puis revenir → État préservé

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
- localStorage accessible (tape dans console):
  ```javascript
  localStorage.getItem('compagnon_sessions_store_v2')
  ```

### Test export/import en console :
```javascript
// Vérifier structure export
const data = JSON.parse(localStorage.getItem('compagnon_sessions_store_v2'));
console.log(Object.keys(data)); // Voir noms des sessions
```

---

## ✨ Cas d'usage avancés

1. **Multi-appareil** : Exporter sur PC, importer sur tablette
2. **Sauvegarde** : Exporter régulièrement pour backup
3. **Collaboration** : Partager fichier JSON
4. **Croquis détaillés** : Plusieurs layers via sessions différentes

---

Créé : 2026-07-21 | Version : 2.0
