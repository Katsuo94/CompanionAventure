function updatePage(index) {
  currentPage = Math.max(0, Math.min(2, index));
  pages.style.transform = `translateX(-${currentPage * 33.333333}%)`;

  tabs.forEach((btn, i) => {
    const active = i === currentPage;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });

  navBtns.forEach((btn, i) => btn.classList.toggle("active", i === currentPage));
}
// Navigation entre pages
    const pages = document.getElementById("pages");
    const pageButtons = [...document.querySelectorAll("[data-page]")];
    const tabs = [...document.querySelectorAll(".tab")];
    const navBtns = [...document.querySelectorAll(".nav-btn")];
    const sessionName = document.getElementById("sessionName");
    let currentPage = 0;

    function updatePage(index) {
      currentPage = Math.max(0, Math.min(2, index));
      pages.style.transform = `translateX(-${currentPage * 33.333333}%)`;

      tabs.forEach((btn, i) => {
        const active = i === currentPage;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
      });

      navBtns.forEach((btn, i) => btn.classList.toggle("active", i === currentPage));
    }

    pageButtons.forEach((btn) => {
      btn.addEventListener("click", () => updatePage(Number(btn.dataset.page)));
    });

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    pages.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      },
      { passive: true }
    );

    pages.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
      },
      { passive: true }
    );

    pages.addEventListener("touchend", () => {
      if (!isDragging) return;
      const delta = currentX - startX;
      if (delta < -50) updatePage(currentPage + 1);
      if (delta > 50) updatePage(currentPage - 1);
      isDragging = false;
      startX = 0;
      currentX = 0;
    });

    // Stepper boutons pour champs numériques
    document.querySelectorAll("[data-step-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = document.getElementById(btn.dataset.stepTarget);
        const step = Number(btn.dataset.step);
        const min = target.min !== "" ? Number(target.min) : -Infinity;
        let value = Number(target.value || 0) + step;
        if (value < min) value = min;
        target.value = value;
        saveState();
      });
    });

    // Gestion des armes (page 1)
    const weaponInput = document.getElementById("weaponInput");
    const weaponsList = document.getElementById("weaponsList");

    function addWeapon(text) {
      if (!text || !text.trim()) return;
      const item = document.createElement("div");
      item.className = "weapon-item";
      item.innerHTML = `
        <span class="weapon-text"></span>
        <button class="icon-btn" aria-label="Supprimer cette arme">−</button>
      `;
      item.querySelector(".weapon-text").textContent = text.trim();
      item.querySelector("button").addEventListener("click", () => {
        item.remove();
        saveState();
      });
      weaponsList.appendChild(item);
      saveState();
    }

    document.getElementById("addWeaponBtn").addEventListener("click", () => {
      addWeapon(weaponInput.value);
      weaponInput.value = "";
      weaponInput.focus();
    });

    weaponInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addWeapon(weaponInput.value);
        weaponInput.value = "";
      }
    });

    // Gestion inventaire (page 2)
    const inventoryInput = document.getElementById("inventoryInput");
    const inventoryList = document.getElementById("inventoryList");

    function addInventoryItem(text) {
      if (!text || !text.trim()) return;
      const item = document.createElement("div");
      item.className = "inventory-item";
      item.innerHTML = `
        <span class="bullet" aria-hidden="true"></span>
        <span class="item-text"></span>
        <button class="icon-btn" aria-label="Supprimer cet élément">×</button>
      `;
      item.querySelector(".item-text").textContent = text.trim();
      item.querySelector("button").addEventListener("click", () => {
        item.remove();
        saveState();
      });
      inventoryList.appendChild(item);
      saveState();
    }

    document.getElementById("addItem").addEventListener("click", () => {
      addInventoryItem(inventoryInput.value);
      inventoryInput.value = "";
      inventoryInput.focus();
    });

    inventoryInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addInventoryItem(inventoryInput.value);
        inventoryInput.value = "";
      }
    });

    document.getElementById("clearInventory").addEventListener("click", () => {
      inventoryList.innerHTML = "";
      saveState();
    });

    // Gestion fiche personnage (page 1)
    const profileFields = [
      "hpMax",
      "hpCurrent",
      "dexterity",
      "luck",
      "talent",
      "save1",
      "save2",
      "save3",
      "sessionName",
    ];

    // Sauvegarde et chargement localStorage
    function sessionKey() {
      const name = sessionName.value.trim() || "session-principale";
      return "compagnon-aventure::" + name.toLowerCase().replace(/\s+/g, "-");
    }

    function getState() {
      return {
        profile: {
          hpMax: document.getElementById("hpMax").value,
          hpCurrent: document.getElementById("hpCurrent").value,
          dexterity: document.getElementById("dexterity").value,
          luck: document.getElementById("luck").value,
          talent: document.getElementById("talent").value,
          save1: document.getElementById("save1").checked,
          save2: document.getElementById("save2").checked,
          save3: document.getElementById("save3").checked,
          sessionName: sessionName.value,
        },
        weapons: [...weaponsList.querySelectorAll(".weapon-text")].map((el) => el.textContent),
        inventory: [...inventoryList.querySelectorAll(".item-text")].map((el) => el.textContent),
        dice: {
          total: document.getElementById("diceTotal").textContent,
          history: [...document.querySelectorAll(".history-item")].map((item) => item.dataset.roll),
        },
      };
    }

    function saveState() {
      localStorage.setItem(sessionKey(), JSON.stringify(getState()));
    }

    function loadState() {
      const raw = localStorage.getItem(sessionKey());
      if (!raw) return;
      try {
        const state = JSON.parse(raw);
        if (state.profile) {
          document.getElementById("hpMax").value = state.profile.hpMax ?? 20;
          document.getElementById("hpCurrent").value = state.profile.hpCurrent ?? 20;
          document.getElementById("dexterity").value = state.profile.dexterity ?? 0;
          document.getElementById("luck").value = state.profile.luck ?? 0;
          document.getElementById("talent").value = state.profile.talent ?? 0;
          document.getElementById("save1").checked = !!state.profile.save1;
          document.getElementById("save2").checked = !!state.profile.save2;
          document.getElementById("save3").checked = !!state.profile.save3;
          sessionName.value = state.profile.sessionName ?? "Session principale";
        }

        weaponsList.innerHTML = "";
        (state.weapons || []).forEach(addWeapon);

        inventoryList.innerHTML = "";
        (state.inventory || []).forEach(addInventoryItem);

        const diceHistory = document.getElementById("diceHistory");
        diceHistory.innerHTML = "";
        (state.dice?.history || []).forEach((rawRoll) => {
          const [d1, d2, total] = rawRoll.split("|");
          addDiceHistory(d1, d2, total);
        });
        if (state.dice?.total) document.getElementById("diceTotal").textContent = state.dice.total;
      } catch (e) {
        console.error("Erreur chargement état :", e);
      }
    }

    // Dés - affichage pips
    function createPipGrid(container) {
      container.innerHTML = "";
      for (let i = 0; i < 9; i++) {
        const pip = document.createElement("span");
        pip.className = "pip";
        container.appendChild(pip);
      }
    }

    function renderDie(container, value) {
      const map = {
        1: [4],
        2: [0, 8],
        3: [0, 4, 8],
        4: [0, 2, 6, 8],
        5: [0, 2, 4, 6, 8],
        6: [0, 2, 3, 5, 6, 8],
      };
      const pips = [...container.children];
      pips.forEach((pip, index) => {
        pip.classList.toggle("show", map[value].includes(index));
      });
    }

    const die1 = document.getElementById("die1").querySelector(".pip-grid");
    const die2 = document.getElementById("die2").querySelector(".pip-grid");
    createPipGrid(die1);
    createPipGrid(die2);
    renderDie(die1, 1);
    renderDie(die2, 1);

    // Ajout historique dés
    function addDiceHistory(d1, d2, total) {
      const diceHistory = document.getElementById("diceHistory");
      const row = document.createElement("div");
      row.className = "history-item";
      row.dataset.roll = `${d1}|${d2}|${total}`;
      row.innerHTML = `
        <span>Dé 1 : <strong>${d1}</strong> · Dé 2 : <strong>${d2}</strong></span>
        <span>Total : <strong>${total}</strong></span>
      `;
      diceHistory.prepend(row);
      while (diceHistory.children.length > 6) {
        diceHistory.removeChild(diceHistory.lastChild);
      }
    }

    // Génération aléatoire dé
    function randDie() {
      return Math.floor(Math.random() * 6) + 1;
    }

    // Animation dés avec rotation, grossissement et étincelle
    function animateDiceRoll(dieElement, finalValue) {
      return new Promise((resolve) => {
        dieElement.classList.add("rolling");
        dieElement.style.animation = "dice-rotate 1.2s ease forwards";

        // Créer étincelle
        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";
        dieElement.appendChild(sparkle);

        setTimeout(() => {
          dieElement.style.animation = "";
          dieElement.classList.remove("rolling");
          dieElement.removeChild(sparkle);
          renderDie(dieElement.querySelector(".pip-grid"), finalValue);
          resolve();
        }, 1200);
      });
    }

    // Lancer les deux dés avec animation
    document.getElementById("rollDice").addEventListener("click", async () => {
      const d1 = randDie();
      const d2 = randDie();

      await Promise.all([
        animateDiceRoll(document.getElementById("die1"), d1),
        animateDiceRoll(document.getElementById("die2"), d2),
      ]);

      const total = d1 + d2;
      document.getElementById("diceTotal").textContent = total;
      addDiceHistory(d1, d2, total);
      saveState();
    });

    // Sauvegarde fiche personnage
    document.getElementById("saveProfile").addEventListener("click", saveState);

    // Réinitialiser fiche personnage
    document.getElementById("resetProfile").addEventListener("click", () => {
      document.getElementById("hpMax").value = 20;
      document.getElementById("hpCurrent").value = 20;
      document.getElementById("dexterity").value = 0;
      document.getElementById("luck").value = 0;
      document.getElementById("talent").value = 0;
      document.getElementById("save1").checked = false;
      document.getElementById("save2").checked = false;
      document.getElementById("save3").checked = false;
      weaponsList.innerHTML = "";
      saveState();
    });

    // Écoute changements pour sauvegarde automatique
    profileFields.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const eventName = el.type === "checkbox" ? "change" : "input";
      el.addEventListener(eventName, () => {
        if (id === "sessionName") {
          loadState();
        } else {
          saveState();
        }
      });
    });

    // Initialisation
    loadState();
    updatePage(0);// Navigation entre pages
  const pages = document.getElementById("pages");
  const pageButtons = [...document.querySelectorAll("[data-page]")];
  const tabs = [...document.querySelectorAll(".tab")];
  const navBtns = [...document.querySelectorAll(".nav-btn")];
  const sessionName = document.getElementById("sessionName");
  let currentPage = 0;

  function updatePage(index) {
    currentPage = Math.max(0, Math.min(2, index));
    pages.style.transform = `translateX(-${currentPage * 100}vw)`;

    tabs.forEach((btn, i) => {
      const active = i === currentPage;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    navBtns.forEach((btn, i) => btn.classList.toggle("active", i === currentPage));
  }

  pageButtons.forEach((btn) => {
    btn.addEventListener("click", () => updatePage(Number(btn.dataset.page)));
  });

  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  pages.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    },
    { passive: true }
  );

  pages.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    },
    { passive: true }
  );

  pages.addEventListener("touchend", () => {
    if (!isDragging) return;
    const delta = currentX - startX;
    if (delta > 50) updatePage(currentPage - 1);
    else if (delta < -50) updatePage(currentPage + 1);
    isDragging = false;
    startX = 0;
    currentX = 0;
  });

  // Stepper boutons pour champs numériques
  document.querySelectorAll("[data-step-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.stepTarget);
      const step = Number(btn.dataset.step);
      const min = target.min !== "" ? Number(target.min) : -Infinity;
      let value = Number(target.value || 0) + step;
      if (value < min) value = min;
      target.value = value;
      saveState();
    });
  });

  // Gestion des armes (page 1)
  const weaponInput = document.getElementById("weaponInput");
  const weaponsList = document.getElementById("weaponsList");

  function addWeapon(text) {
    if (!text || !text.trim()) return;
    const item = document.createElement("div");
    item.className = "weapon-item";
    item.innerHTML = `
      <span class="weapon-text"></span>
      <button class="icon-btn" aria-label="Supprimer cette arme">−</button>
    `;
    item.querySelector(".weapon-text").textContent = text.trim();
    item.querySelector("button").addEventListener("click", () => {
      item.remove();
      saveState();
    });
    weaponsList.appendChild(item);
    saveState();
  }

  document.getElementById("addWeaponBtn").addEventListener("click", () => {
    addWeapon(weaponInput.value);
    weaponInput.value = "";
    weaponInput.focus();
  });

  weaponInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addWeapon(weaponInput.value);
      weaponInput.value = "";
    }
  });

  // Gestion inventaire (page 2)
  const inventoryInput = document.getElementById("inventoryInput");
  const inventoryList = document.getElementById("inventoryList");

  function addInventoryItem(text) {
    if (!text || !text.trim()) return;
    const item = document.createElement("div");
    item.className = "inventory-item";
    item.innerHTML = `
      <span class="bullet" aria-hidden="true"></span>
      <span class="item-text"></span>
      <button class="icon-btn" aria-label="Supprimer cet élément">×</button>
    `;
    item.querySelector(".item-text").textContent = text.trim();
    item.querySelector("button").addEventListener("click", () => {
      item.remove();
      saveState();
    });
    inventoryList.appendChild(item);
    saveState();
  }

  document.getElementById("addItem").addEventListener("click", () => {
    addInventoryItem(inventoryInput.value);
    inventoryInput.value = "";
    inventoryInput.focus();
  });

  inventoryInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addInventoryItem(inventoryInput.value);
      inventoryInput.value = "";
    }
  });

  document.getElementById("clearInventory").addEventListener("click", () => {
    inventoryList.innerHTML = "";
    saveState();
  });

  // Gestion fiche personnage (page 1)
  const profileFields = [
    "hpMax",
    "hpCurrent",
    "dexterity",
    "luck",
    "talent",
    "save1",
    "save2",
    "save3",
    "sessionName",
  ];

  // Sauvegarde et chargement localStorage
  function sessionKey() {
    const name = sessionName.value.trim() || "session-principale";
    return "compagnon-aventure::" + name.toLowerCase().replace(/\s+/g, "-");
  }

  function getState() {
    return {
      profile: {
        hpMax: document.getElementById("hpMax").value,
        hpCurrent: document.getElementById("hpCurrent").value,
        dexterity: document.getElementById("dexterity").value,
        luck: document.getElementById("luck").value,
        talent: document.getElementById("talent").value,
        save1: document.getElementById("save1").checked,
        save2: document.getElementById("save2").checked,
        save3: document.getElementById("save3").checked,
        sessionName: sessionName.value,
      },
      weapons: [...weaponsList.querySelectorAll(".weapon-text")].map((el) => el.textContent),
      inventory: [...inventoryList.querySelectorAll(".item-text")].map((el) => el.textContent),
      dice: {
        total: document.getElementById("diceTotal").textContent,
        history: [...document.querySelectorAll(".history-item")].map((item) => item.dataset.roll),
      },
    };
  }

  function saveState() {
    localStorage.setItem(sessionKey(), JSON.stringify(getState()));
  }

  function loadState() {
    const raw = localStorage.getItem(sessionKey());
    if (!raw) return;
    try {
      const state = JSON.parse(raw);
      if (state.profile) {
        document.getElementById("hpMax").value = state.profile.hpMax ?? 20;
        document.getElementById("hpCurrent").value = state.profile.hpCurrent ?? 20;
        document.getElementById("dexterity").value = state.profile.dexterity ?? 0;
        document.getElementById("luck").value = state.profile.luck ?? 0;
        document.getElementById("talent").value = state.profile.talent ?? 0;
        document.getElementById("save1").checked = !!state.profile.save1;
        document.getElementById("save2").checked = !!state.profile.save2;
        document.getElementById("save3").checked = !!state.profile.save3;
        sessionName.value = state.profile.sessionName ?? "Session principale";
      }

      weaponsList.innerHTML = "";
      (state.weapons || []).forEach(addWeapon);

      inventoryList.innerHTML = "";
      (state.inventory || []).forEach(addInventoryItem);

      const diceHistory = document.getElementById("diceHistory");
      diceHistory.innerHTML = "";
      (state.dice?.history || []).forEach((rawRoll) => {
        const [d1, d2, total] = rawRoll.split("|");
        addDiceHistory(d1, d2, total);
      });
      if (state.dice?.total) document.getElementById("diceTotal").textContent = state.dice.total;
    } catch (e) {
      console.error("Erreur chargement état :", e);
    }
  }

  // Dés - affichage pips
  function createPipGrid(container) {
    container.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const pip = document.createElement("span");
      pip.className = "pip";
      container.appendChild(pip);
    }
  }

  function renderDie(container, value) {
    const map = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8],
    };
    const pips = [...container.children];
    pips.forEach((pip, index) => {
      pip.classList.toggle("show", map[value].includes(index));
    });
  }

  const die1 = document.getElementById("die1").querySelector(".pip-grid");
  const die2 = document.getElementById("die2").querySelector(".pip-grid");
  createPipGrid(die1);
  createPipGrid(die2);
  renderDie(die1, 1);
  renderDie(die2, 1);

  // Ajout historique dés
  function addDiceHistory(d1, d2, total) {
    const diceHistory = document.getElementById("diceHistory");
    const row = document.createElement("div");
    row.className = "history-item";
    row.dataset.roll = `${d1}|${d2}|${total}`;
    row.innerHTML = `
      <span>Dé 1 : <strong>${d1}</strong> · Dé 2 : <strong>${d2}</strong></span>
      <span>Total : <strong>${total}</strong></span>
    `;
    diceHistory.prepend(row);
    while (diceHistory.children.length > 6) {
      diceHistory.removeChild(diceHistory.lastChild);
    }
  }

  // Génération aléatoire dé
  function randDie() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Animation dés avec rotation, grossissement et étincelle
  function animateDiceRoll(dieElement, finalValue) {
    return new Promise((resolve) => {
      dieElement.classList.add("rolling");
      dieElement.style.animation = "dice-rotate 1.2s ease forwards";

      // Créer étincelle
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      dieElement.appendChild(sparkle);

      setTimeout(() => {
        dieElement.style.animation = "";
        dieElement.classList.remove("rolling");
        dieElement.removeChild(sparkle);
        renderDie(dieElement.querySelector(".pip-grid"), finalValue);
        resolve();
      }, 1200);
    });
  }

  // Lancer les deux dés avec animation
  document.getElementById("rollDice").addEventListener("click", async () => {
    const d1 = randDie();
    const d2 = randDie();

    await Promise.all([
      animateDiceRoll(document.getElementById("die1"), d1),
      animateDiceRoll(document.getElementById("die2"), d2),
    ]);

    const total = d1 + d2;
    document.getElementById("diceTotal").textContent = total;
    addDiceHistory(d1, d2, total);
    saveState();
  });

  // Sauvegarde fiche personnage
  document.getElementById("saveProfile").addEventListener("click", saveState);

  // Réinitialiser fiche personnage
  document.getElementById("resetProfile").addEventListener("click", () => {
    document.getElementById("hpMax").value = 20;
    document.getElementById("hpCurrent").value = 20;
    document.getElementById("dexterity").value = 0;
    document.getElementById("luck").value = 0;
    document.getElementById("talent").value = 0;
    document.getElementById("save1").checked = false;
    document.getElementById("save2").checked = false;
    document.getElementById("save3").checked = false;
    weaponsList.innerHTML = "";
    saveState();
  });

  // Écoute changements pour sauvegarde automatique
  profileFields.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const eventName = el.type === "checkbox" ? "change" : "input";
    el.addEventListener(eventName, () => {
      if (id === "sessionName") {
        loadState();
      } else {
        saveState();
      }
    });
  });

  // Initialisation
  loadState();
  updatePage(0);// Navigation entre pages
  const pages = document.getElementById("pages");
  const pageButtons = [...document.querySelectorAll("[data-page]")];
  const tabs = [...document.querySelectorAll(".tab")];
  const navBtns = [...document.querySelectorAll(".nav-btn")];
  const sessionName = document.getElementById("sessionName");
  let currentPage = 0;

  function updatePage(index) {
    currentPage = Math.max(0, Math.min(2, index));
    pages.style.transform = `translateX(-${currentPage * 100}vw)`;

    tabs.forEach((btn, i) => {
      const active = i === currentPage;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    navBtns.forEach((btn, i) => btn.classList.toggle("active", i === currentPage));
  }

  pageButtons.forEach((btn) => {
    btn.addEventListener("click", () => updatePage(Number(btn.dataset.page)));
  });

  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  pages.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    },
    { passive: true }
  );

  pages.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    },
    { passive: true }
  );

  pages.addEventListener("touchend", () => {
    if (!isDragging) return;
    const delta = currentX - startX;
    if (delta > 50) updatePage(currentPage - 1);
    else if (delta < -50) updatePage(currentPage + 1);
    isDragging = false;
    startX = 0;
    currentX = 0;
  });

  // Stepper boutons pour champs numériques
  document.querySelectorAll("[data-step-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.stepTarget);
      const step = Number(btn.dataset.step);
      const min = target.min !== "" ? Number(target.min) : -Infinity;
      let value = Number(target.value || 0) + step;
      if (value < min) value = min;
      target.value = value;
      saveState();
    });
  });

  // Gestion des armes (page 1)
  const weaponInput = document.getElementById("weaponInput");
  const weaponsList = document.getElementById("weaponsList");

  function addWeapon(text) {
    if (!text || !text.trim()) return;
    const item = document.createElement("div");
    item.className = "weapon-item";
    item.innerHTML = `
      <span class="weapon-text"></span>
      <button class="icon-btn" aria-label="Supprimer cette arme">−</button>
    `;
    item.querySelector(".weapon-text").textContent = text.trim();
    item.querySelector("button").addEventListener("click", () => {
      item.remove();
      saveState();
    });
    weaponsList.appendChild(item);
    saveState();
  }

  document.getElementById("addWeaponBtn").addEventListener("click", () => {
    addWeapon(weaponInput.value);
    weaponInput.value = "";
    weaponInput.focus();
  });

  weaponInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addWeapon(weaponInput.value);
      weaponInput.value = "";
    }
  });

  // Gestion inventaire (page 2)
  const inventoryInput = document.getElementById("inventoryInput");
  const inventoryList = document.getElementById("inventoryList");

  function addInventoryItem(text) {
    if (!text || !text.trim()) return;
    const item = document.createElement("div");
    item.className = "inventory-item";
    item.innerHTML = `
      <span class="bullet" aria-hidden="true"></span>
      <span class="item-text"></span>
      <button class="icon-btn" aria-label="Supprimer cet élément">×</button>
    `;
    item.querySelector(".item-text").textContent = text.trim();
    item.querySelector("button").addEventListener("click", () => {
      item.remove();
      saveState();
    });
    inventoryList.appendChild(item);
    saveState();
  }

  document.getElementById("addItem").addEventListener("click", () => {
    addInventoryItem(inventoryInput.value);
    inventoryInput.value = "";
    inventoryInput.focus();
  });

  inventoryInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addInventoryItem(inventoryInput.value);
      inventoryInput.value = "";
    }
  });

  document.getElementById("clearInventory").addEventListener("click", () => {
    inventoryList.innerHTML = "";
    saveState();
  });

  // Gestion fiche personnage (page 1)
  const profileFields = [
    "hpMax",
    "hpCurrent",
    "dexterity",
    "luck",
    "talent",
    "save1",
    "save2",
    "save3",
    "sessionName",
  ];

  // Sauvegarde et chargement localStorage
  function sessionKey() {
    const name = sessionName.value.trim() || "session-principale";
    return "compagnon-aventure::" + name.toLowerCase().replace(/\s+/g, "-");
  }

  function getState() {
    return {
      profile: {
        hpMax: document.getElementById("hpMax").value,
        hpCurrent: document.getElementById("hpCurrent").value,
        dexterity: document.getElementById("dexterity").value,
        luck: document.getElementById("luck").value,
        talent: document.getElementById("talent").value,
        save1: document.getElementById("save1").checked,
        save2: document.getElementById("save2").checked,
        save3: document.getElementById("save3").checked,
        sessionName: sessionName.value,
      },
      weapons: [...weaponsList.querySelectorAll(".weapon-text")].map((el) => el.textContent),
      inventory: [...inventoryList.querySelectorAll(".item-text")].map((el) => el.textContent),
      dice: {
        total: document.getElementById("diceTotal").textContent,
        history: [...document.querySelectorAll(".history-item")].map((item) => item.dataset.roll),
      },
    };
  }

  function saveState() {
    localStorage.setItem(sessionKey(), JSON.stringify(getState()));
  }

  function loadState() {
    const raw = localStorage.getItem(sessionKey());
    if (!raw) return;
    try {
      const state = JSON.parse(raw);
      if (state.profile) {
        document.getElementById("hpMax").value = state.profile.hpMax ?? 20;
        document.getElementById("hpCurrent").value = state.profile.hpCurrent ?? 20;
        document.getElementById("dexterity").value = state.profile.dexterity ?? 0;
        document.getElementById("luck").value = state.profile.luck ?? 0;
        document.getElementById("talent").value = state.profile.talent ?? 0;
        document.getElementById("save1").checked = !!state.profile.save1;
        document.getElementById("save2").checked = !!state.profile.save2;
        document.getElementById("save3").checked = !!state.profile.save3;
        sessionName.value = state.profile.sessionName ?? "Session principale";
      }

      weaponsList.innerHTML = "";
      (state.weapons || []).forEach(addWeapon);

      inventoryList.innerHTML = "";
      (state.inventory || []).forEach(addInventoryItem);

      const diceHistory = document.getElementById("diceHistory");
      diceHistory.innerHTML = "";
      (state.dice?.history || []).forEach((rawRoll) => {
        const [d1, d2, total] = rawRoll.split("|");
        addDiceHistory(d1, d2, total);
      });
      if (state.dice?.total) document.getElementById("diceTotal").textContent = state.dice.total;
    } catch (e) {
      console.error("Erreur chargement état :", e);
    }
  }

  // Dés - affichage pips
  function createPipGrid(container) {
    container.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const pip = document.createElement("span");
      pip.className = "pip";
      container.appendChild(pip);
    }
  }

  function renderDie(container, value) {
    const map = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8],
    };
    const pips = [...container.children];
    pips.forEach((pip, index) => {
      pip.classList.toggle("show", map[value].includes(index));
    });
  }

  const die1 = document.getElementById("die1").querySelector(".pip-grid");
  const die2 = document.getElementById("die2").querySelector(".pip-grid");
  createPipGrid(die1);
  createPipGrid(die2);
  renderDie(die1, 1);
  renderDie(die2, 1);

  // Ajout historique dés
  function addDiceHistory(d1, d2, total) {
    const diceHistory = document.getElementById("diceHistory");
    const row = document.createElement("div");
    row.className = "history-item";
    row.dataset.roll = `${d1}|${d2}|${total}`;
    row.innerHTML = `
      <span>Dé 1 : <strong>${d1}</strong> · Dé 2 : <strong>${d2}</strong></span>
      <span>Total : <strong>${total}</strong></span>
    `;
    diceHistory.prepend(row);
    while (diceHistory.children.length > 6) {
      diceHistory.removeChild(diceHistory.lastChild);
    }
  }

  // Génération aléatoire dé
  function randDie() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Animation dés avec rotation, grossissement et étincelle
  function animateDiceRoll(dieElement, finalValue) {
    return new Promise((resolve) => {
      dieElement.classList.add("rolling");
      dieElement.style.animation = "dice-rotate 1.2s ease forwards";

      // Créer étincelle
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      dieElement.appendChild(sparkle);

      setTimeout(() => {
        dieElement.style.animation = "";
        dieElement.classList.remove("rolling");
        dieElement.removeChild(sparkle);
        renderDie(dieElement.querySelector(".pip-grid"), finalValue);
        resolve();
      }, 1200);
    });
  }

  // Lancer les deux dés avec animation
  document.getElementById("rollDice").addEventListener("click", async () => {
    const d1 = randDie();
    const d2 = randDie();

    await Promise.all([
      animateDiceRoll(document.getElementById("die1"), d1),
      animateDiceRoll(document.getElementById("die2"), d2),
    ]);

    const total = d1 + d2;
    document.getElementById("diceTotal").textContent = total;
    addDiceHistory(d1, d2, total);
    saveState();
  });

  // Sauvegarde fiche personnage
  document.getElementById("saveProfile").addEventListener("click", saveState);

  // Réinitialiser fiche personnage
  document.getElementById("resetProfile").addEventListener("click", () => {
    document.getElementById("hpMax").value = 20;
    document.getElementById("hpCurrent").value = 20;
    document.getElementById("dexterity").value = 0;
    document.getElementById("luck").value = 0;
    document.getElementById("talent").value = 0;
    document.getElementById("save1").checked = false;
    document.getElementById("save2").checked = false;
    document.getElementById("save3").checked = false;
    weaponsList.innerHTML = "";
    saveState();
  });

  // Écoute changements pour sauvegarde automatique
  profileFields.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const eventName = el.type === "checkbox" ? "change" : "input";
    el.addEventListener(eventName, () => {
      if (id === "sessionName") {
        loadState();
      } else {
        saveState();
      }
    });
  });

  // Initialisation
  loadState();
  updatePage(0);(() => {
      const STORAGE_KEY = 'compagnon_sessions_store_v2';
      const LAST_SESSION_KEY = 'compagnon_last_session_v2';

      const homeScreen = document.getElementById('homeScreen');
      const appScreen = document.getElementById('appScreen');

      const continueBtn = document.getElementById('continueBtn');
      const newSessionBtn = document.getElementById('newSessionBtn');
      const loadSessionBtn = document.getElementById('loadSessionBtn');
      const deleteSessionBtn = document.getElementById('deleteSessionBtn');
      const backHomeBtn = document.getElementById('backHomeBtn');
      const saveIndicator = document.getElementById('saveIndicator');

      const sessionNameInput = document.getElementById('sessionName');

      const tabs = [...document.querySelectorAll('.tab')];
      const pagesTrack = document.getElementById('pagesTrack');

      const weaponInput = document.getElementById('weaponInput');
      const addWeaponBtn = document.getElementById('addWeaponBtn');
      const weaponsList = document.getElementById('weaponsList');

      const inventoryInput = document.getElementById('inventoryInput');
      const addInventoryBtn = document.getElementById('addInventoryBtn');
      const inventoryList = document.getElementById('inventoryList');
      const clearInventoryBtn = document.getElementById('clearInventoryBtn');

      const die1 = document.getElementById('die1');
      const die2 = document.getElementById('die2');
      const diceTotal = document.getElementById('diceTotal');
      const diceCaption = document.getElementById('diceCaption');
      const rollDiceBtn = document.getElementById('rollDiceBtn');

      const sessionModal = document.getElementById('sessionModal');
      const sessionModalTitle = document.getElementById('sessionModalTitle');
      const sessionModalText = document.getElementById('sessionModalText');
      const sessionList = document.getElementById('sessionList');
      const closeSessionModalBtn = document.getElementById('closeSessionModalBtn');

      const confirmDeleteModal = document.getElementById('confirmDeleteModal');
      const confirmDeleteText = document.getElementById('confirmDeleteText');
      const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
      const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

      const newSessionModal = document.getElementById('newSessionModal');
      const newSessionNameInput = document.getElementById('newSessionNameInput');
      const cancelNewSessionBtn = document.getElementById('cancelNewSessionBtn');
      const confirmNewSessionBtn = document.getElementById('confirmNewSessionBtn');

      let currentPage = 0;
      let currentSessionName = null;
      let saveMessageTimer = null;
      let sessionPendingDelete = null;

      function showHome() {
        homeScreen.classList.remove('hidden');
        appScreen.classList.add('hidden');
      }

      function showApp() {
        homeScreen.classList.add('hidden');
        appScreen.classList.remove('hidden');
      }

      function setIndicator(text) {
        saveIndicator.textContent = text;
        clearTimeout(saveMessageTimer);
        saveMessageTimer = setTimeout(() => {
          saveIndicator.textContent = currentSessionName
            ? `Session active : ${currentSessionName}`
            : 'Aucune session active';
        }, 1400);
      }

      function getStore() {
        try {
          return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        } catch {
          return {};
        }
      }

      function setStore(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }

      function sessionExists(name) {
        const store = getStore();
        return !!store[name];
      }

      function collectState() {
        return {
          sessionName: sessionNameInput.value.trim() || currentSessionName || 'Nouvelle partie',
          hpMax: document.getElementById('hpMax').value,
          hpNow: document.getElementById('hpNow').value,
          dex: document.getElementById('dex').value,
          luck: document.getElementById('luck').value,
          talent: document.getElementById('talent').value,
          save1: document.getElementById('save1').checked,
          save2: document.getElementById('save2').checked,
          save3: document.getElementById('save3').checked,
          notes: document.getElementById('notes').value,
          weapons: [...weaponsList.querySelectorAll('.weapon-text')].map(el => el.textContent),
          inventory: [...inventoryList.querySelectorAll('.inventory-text')].map(el => el.textContent)
        };
      }

      function applyState(data) {
        sessionNameInput.value = data.sessionName ?? 'Nouvelle partie';
        document.getElementById('hpMax').value = data.hpMax ?? 20;
        document.getElementById('hpNow').value = data.hpNow ?? 20;
        document.getElementById('dex').value = data.dex ?? 0;
        document.getElementById('luck').value = data.luck ?? 0;
        document.getElementById('talent').value = data.talent ?? 0;
        document.getElementById('save1').checked = !!data.save1;
        document.getElementById('save2').checked = !!data.save2;
        document.getElementById('save3').checked = !!data.save3;
        document.getElementById('notes').value = data.notes ?? '';

        weaponsList.innerHTML = '';
        (data.weapons || []).forEach(text => weaponsList.appendChild(createWeaponItem(text)));

        inventoryList.innerHTML = '';
        (data.inventory || []).forEach(text => inventoryList.appendChild(createInventoryItem(text)));
      }

      function buildEmptyState(name) {
        return {
          sessionName: name,
          hpMax: 20,
          hpNow: 20,
          dex: 0,
          luck: 0,
          talent: 0,
          save1: false,
          save2: false,
          save3: false,
          notes: '',
          weapons: [],
          inventory: []
        };
      }

      function uniqueSessionName(base = 'Nouvelle partie') {
        const store = getStore();
        if (!store[base]) return base;
        let i = 2;
        while (store[`${base} ${i}`]) i++;
        return `${base} ${i}`;
      }

      function saveCurrentSession() {
        const store = getStore();
        const name = sessionNameInput.value.trim() || currentSessionName || uniqueSessionName('Nouvelle partie');
        currentSessionName = name;
        sessionNameInput.value = name;
        const state = collectState();
        state.sessionName = name;
        store[name] = state;
        setStore(store);
        localStorage.setItem(LAST_SESSION_KEY, name);
        setIndicator('Session sauvegardée');
      }

      function loadSessionByName(name) {
        const store = getStore();
        const data = store[name];
        if (!data) return false;
        currentSessionName = name;
        applyState(data);
        localStorage.setItem(LAST_SESSION_KEY, name);
        setIndicator(`Session chargée : ${name}`);
        return true;
      }

      function deleteSessionByName(name) {
        const store = getStore();
        if (!store[name]) return;
        delete store[name];
        setStore(store);
        if (localStorage.getItem(LAST_SESSION_KEY) === name) {
          localStorage.removeItem(LAST_SESSION_KEY);
        }
        if (currentSessionName === name) currentSessionName = null;
      }

      function renameCurrentSession(newNameRaw) {
        const newName = newNameRaw.trim();
        if (!newName) {
          sessionNameInput.value = currentSessionName || '';
          return;
        }

        const oldName = currentSessionName;
        const store = getStore();

        if (oldName === newName) {
          sessionNameInput.value = newName;
          saveCurrentSession();
          return;
        }

        if (store[newName]) {
          sessionNameInput.value = oldName || '';
          setIndicator('Ce nom de session existe déjà');
          return;
        }

        const state = collectState();
        state.sessionName = newName;

        if (oldName && store[oldName]) {
          delete store[oldName];
        }

        store[newName] = state;
        setStore(store);
        currentSessionName = newName;
        sessionNameInput.value = newName;
        localStorage.setItem(LAST_SESSION_KEY, newName);
        setIndicator('Session renommée');
      }

      function createSessionWithName(rawName) {
        let name = rawName.trim();
        if (!name) name = uniqueSessionName('Nouvelle partie');

        if (sessionExists(name)) {
          newSessionNameInput.value = name;
          setIndicator('Ce nom existe déjà');
          return false;
        }

        currentSessionName = name;
        applyState(buildEmptyState(name));
        saveCurrentSession();
        showApp();
        setPage(0);
        return true;
      }

      function setPage(index) {
        currentPage = Math.max(0, Math.min(2, index));
        pagesTrack.style.transform = `translateX(-${currentPage * 100}%)`;
        tabs.forEach((tab, i) => tab.classList.toggle('active', i === currentPage));
      }

      tabs.forEach(tab => {
        tab.addEventListener('click', () => setPage(Number(tab.dataset.tab)));
      });

      let startX = 0;
      let startY = 0;

      pagesTrack.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        startX = t.clientX;
        startY = t.clientY;
      }, { passive: true });

      pagesTrack.addEventListener('touchend', (e) => {
        const t = e.changedTouches[0];
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) setPage(currentPage + 1);
          else setPage(currentPage - 1);
        }
      }, { passive: true });

      document.querySelectorAll('[data-step-target]').forEach(btn => {
        btn.addEventListener('click', () => {
          const input = document.getElementById(btn.dataset.stepTarget);
          const step = parseInt(btn.dataset.step, 10) || 1;
          const current = parseInt(input.value || 0, 10) || 0;
          input.value = current + step;
          saveCurrentSession();
        });
      });

      function createWeaponItem(text) {
        const item = document.createElement('div');
        item.className = 'weapon-item';

        const label = document.createElement('div');
        label.className = 'weapon-text';
        label.textContent = text;

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'icon-btn';
        remove.textContent = '−';
        remove.setAttribute('aria-label', 'Supprimer');
        remove.addEventListener('click', () => {
          item.remove();
          saveCurrentSession();
        });

        item.appendChild(label);
        item.appendChild(remove);
        return item;
      }

      function createInventoryItem(text) {
        const item = document.createElement('div');
        item.className = 'inventory-item';

        const main = document.createElement('div');
        main.className = 'inventory-main';

        const bullet = document.createElement('div');
        bullet.className = 'bullet';

        const label = document.createElement('div');
        label.className = 'inventory-text';
        label.textContent = text;

        main.appendChild(bullet);
        main.appendChild(label);

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'icon-btn';
        remove.textContent = '−';
        remove.setAttribute('aria-label', 'Supprimer');
        remove.addEventListener('click', () => {
          item.remove();
          saveCurrentSession();
        });

        item.appendChild(main);
        item.appendChild(remove);
        return item;
      }

      function addWeapon() {
        const value = weaponInput.value.trim();
        if (!value) return;
        weaponsList.appendChild(createWeaponItem(value));
        weaponInput.value = '';
        saveCurrentSession();
      }

      function addInventory() {
        const value = inventoryInput.value.trim();
        if (!value) return;
        inventoryList.appendChild(createInventoryItem(value));
        inventoryInput.value = '';
        saveCurrentSession();
      }

      addWeaponBtn.addEventListener('click', addWeapon);
      addInventoryBtn.addEventListener('click', addInventory);

      weaponInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          addWeapon();
        }
      });

      inventoryInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          addInventory();
        }
      });

      clearInventoryBtn.addEventListener('click', () => {
        inventoryList.innerHTML = '';
        saveCurrentSession();
      });

      const pipMap = {
        1: [4],
        2: [0, 8],
        3: [0, 4, 8],
        4: [0, 2, 6, 8],
        5: [0, 2, 4, 6, 8],
        6: [0, 2, 3, 5, 6, 8]
      };

      function buildDieGrid(dieEl) {
        const grid = dieEl.querySelector('.pip-grid');
        grid.innerHTML = '';
        for (let i = 0; i < 9; i++) {
          const pip = document.createElement('span');
          pip.className = 'pip';
          grid.appendChild(pip);
        }
      }

      function renderDie(dieEl, value) {
        const pips = dieEl.querySelectorAll('.pip');
        pips.forEach((pip, i) => {
          pip.classList.toggle('show', pipMap[value].includes(i));
        });
      }

      function randomDie() {
        return Math.floor(Math.random() * 6) + 1;
      }

      function rollDice() {
        die1.classList.add('rolling');
        die2.classList.add('rolling');
        diceTotal.textContent = '…';
        diceCaption.textContent = 'Les dés roulent...';

        let count = 0;
        const flicker = setInterval(() => {
          renderDie(die1, randomDie());
          renderDie(die2, randomDie());
          count++;
          if (count >= 8) clearInterval(flicker);
        }, 80);

        setTimeout(() => {
          const a = randomDie();
          const b = randomDie();
          renderDie(die1, a);
          renderDie(die2, b);
          diceTotal.textContent = a + b;
          diceCaption.textContent = `Résultat : ${a} + ${b}`;
          die1.classList.remove('rolling');
          die2.classList.remove('rolling');
        }, 900);
      }

      buildDieGrid(die1);
      buildDieGrid(die2);
      renderDie(die1, 1);
      renderDie(die2, 1);
      rollDiceBtn.addEventListener('click', rollDice);

      function openSessionModal(mode) {
        const store = getStore();
        const names = Object.keys(store).sort((a, b) => a.localeCompare(b, 'fr'));
        sessionList.innerHTML = '';

        sessionModalTitle.textContent = mode === 'load' ? 'Charger partie' : 'Supprimer partie';
        sessionModalText.textContent = mode === 'load'
          ? 'Sélectionnez une session à charger.'
          : 'Sélectionnez une session à supprimer.';

        if (!names.length) {
          const empty = document.createElement('div');
          empty.className = 'session-item';
          empty.innerHTML = '<div class="session-item-name">Aucune session sauvegardée.</div>';
          sessionList.appendChild(empty);
        } else {
          names.forEach(name => {
            const row = document.createElement('div');
            row.className = 'session-item';

            const label = document.createElement('div');
            label.className = 'session-item-name';
            label.textContent = name;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = mode === 'load' ? 'primary-btn' : 'ghost-btn';
            btn.textContent = mode === 'load' ? 'Charger' : 'Supprimer';

            btn.addEventListener('click', () => {
              if (mode === 'load') {
                if (loadSessionByName(name)) {
                  closeSessionModal();
                  showApp();
                  setPage(0);
                }
              } else {
                sessionPendingDelete = name;
                confirmDeleteText.textContent = `Vous êtes sur le point de supprimer votre session "${name}", êtes-vous sûr de supprimer ?`;
                confirmDeleteModal.classList.add('open');
              }
            });

            row.appendChild(label);
            row.appendChild(btn);
            sessionList.appendChild(row);
          });
        }

        sessionModal.classList.add('open');
      }

      function closeSessionModal() {
        sessionModal.classList.remove('open');
      }

      function openNewSessionModal() {
        newSessionNameInput.value = '';
        newSessionModal.classList.add('open');
        setTimeout(() => newSessionNameInput.focus(), 40);
      }

      function closeNewSessionModal() {
        newSessionModal.classList.remove('open');
      }

      closeSessionModalBtn.addEventListener('click', closeSessionModal);
      sessionModal.addEventListener('click', (e) => {
        if (e.target === sessionModal) closeSessionModal();
      });

      cancelDeleteBtn.addEventListener('click', () => {
        sessionPendingDelete = null;
        confirmDeleteModal.classList.remove('open');
      });

      confirmDeleteModal.addEventListener('click', (e) => {
        if (e.target === confirmDeleteModal) {
          sessionPendingDelete = null;
          confirmDeleteModal.classList.remove('open');
        }
      });

      confirmDeleteBtn.addEventListener('click', () => {
        if (!sessionPendingDelete) return;
        deleteSessionByName(sessionPendingDelete);
        setIndicator(`Session supprimée : ${sessionPendingDelete}`);
        sessionPendingDelete = null;
        confirmDeleteModal.classList.remove('open');
        closeSessionModal();
      });

      cancelNewSessionBtn.addEventListener('click', closeNewSessionModal);
      newSessionModal.addEventListener('click', (e) => {
        if (e.target === newSessionModal) closeNewSessionModal();
      });

      confirmNewSessionBtn.addEventListener('click', () => {
        if (createSessionWithName(newSessionNameInput.value)) {
          closeNewSessionModal();
        }
      });

      newSessionNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (createSessionWithName(newSessionNameInput.value)) {
            closeNewSessionModal();
          }
        }
      });

      continueBtn.addEventListener('click', () => {
        const last = localStorage.getItem(LAST_SESSION_KEY);
        if (last && loadSessionByName(last)) {
          showApp();
          setPage(0);
          return;
        }
        openNewSessionModal();
      });

      newSessionBtn.addEventListener('click', () => {
        openNewSessionModal();
      });

      loadSessionBtn.addEventListener('click', () => openSessionModal('load'));
      deleteSessionBtn.addEventListener('click', () => openSessionModal('delete'));

      backHomeBtn.addEventListener('click', () => {
        if (!appScreen.classList.contains('hidden') && currentSessionName) {
          saveCurrentSession();
        }
        showHome();
      });

      sessionNameInput.addEventListener('change', () => {
        renameCurrentSession(sessionNameInput.value);
      });

      sessionNameInput.addEventListener('blur', () => {
        renameCurrentSession(sessionNameInput.value);
      });

      document.querySelectorAll('input, textarea').forEach(el => {
        if (el === sessionNameInput || el === newSessionNameInput) return;
        el.addEventListener('input', () => {
          if (!appScreen.classList.contains('hidden') && currentSessionName) saveCurrentSession();
        });
        el.addEventListener('change', () => {
          if (!appScreen.classList.contains('hidden') && currentSessionName) saveCurrentSession();
        });
      });

      showHome();
      setPage(0);
    })();
