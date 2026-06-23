const ITEMS = {
    cup:   { svgX: 1360, svgY: 460, w: 80,  src: "SVGs/cup.svg",           step: 1, label: "Becher" },
    tape:  { svgX: 990,  svgY: 392, w: 70,  src: "SVGs/TapeWithWater.svg",  step: 2, label: "Hahn"   },
    brush: { svgX: 640,  svgY: 432, w: 220, src: "SVGs/TeethBrush.svg",     step: 3, label: "Zahnbuerste" },
};

const SINK = { x: 953, y: 570, rx: 200, ry: 90 };

let gameStep   = 1;
let wrongCount = 0;
let gameActive = false;
let dragging   = null;


function playAudio(src, callback) {
    const audio = new Audio(src);
    let done = false;
    const next = () => { if (!done) { done = true; if (callback) callback(); } };
    audio.addEventListener('ended', next);
    const p = audio.play();
    if (p) p.catch(() => setTimeout(next, 5000));
}

function introScene() {
    changeBackground("SVGs/village.svg", 1920, 1080);
    showChar("SVGs/FanyahWithLegsNoArm.svg");

    // Arm: character top-left at SVG (800,410), rendered width 170 (char SVG 267.4×650)
    // Shoulder at ~78% x, ~23% y of the character SVG → SVG space ≈ (933, 503)
    const arm = document.createElement('img');
    arm.id        = 'fanyahIntroArm';
    arm.src       = 'SVGs/FanyahArm.svg';
    arm.className = 'scene-char fanyah-intro-arm';
    arm.style.width = (45 * scale) + 'px';
    arm.style.left  = sx(933) + 'px';
    arm.style.top   = sy(503) + 'px';
    document.getElementById('scene').appendChild(arm);

    setTimeout(() => {
        const a = document.getElementById('fanyahIntroArm');
        if (a) a.remove();
        document.getElementById("fanyahChar").src = "SVGs/FanyahSad.svg";
    }, 3500);

    playAudio('../Rampatrap/audios/rampatrapVillageStartScene.mp3', bathScene);
}

function bathScene() {
    changeBackground("SVGs/bathWithNothing.svg", 1920, 1080);
    showChar("SVGs/Fanyah.svg");
    createGameObjects();

    playAudio('../Rampatrap/audios/rampatrapHouseDecideScene.mp3', startMiniGame);
}

function startMiniGame() {
    gameStep   = 1;
    wrongCount = 0;
    gameActive = true;

    hideChar();
    document.getElementById("tapeOnScene").classList.remove("visible");

    setScale();
    positionDropZone();
    positionTapeScene();
    changeBackground("SVGs/bathWithNothing.svg", 1920, 1080);

    document.getElementById("hud").classList.add("visible");
    showToast("Zieh den Becher ins Waschbecken!");
}

function onGameSuccess() {
    gameActive = false;
    document.getElementById("hud").classList.remove("visible");
    document.getElementById("tapeOnScene").classList.remove("visible");
    document.querySelectorAll(".game-obj").forEach(e => e.remove());

    changeBackground("SVGs/bathWithNothing.svg", 1920, 1080);

    if (wrongCount === 0) {
        showChar("SVGs/Fanyah.svg");
    } else {
        showChar("SVGs/FanyahSad.svg");
    }
    setTimeout(endScene, 1000);
}

function endScene() {
    changeBackground("SVGs/village.svg", 1920, 1080);
    showChar("SVGs/Fanyah.svg");

    playAudio('../Rampatrap/audios/rampatrapVillageStartScene.mp3', () => {
        window.location.href = '../worldmap/index.html';
    });
}


function createGameObjects() {
    document.querySelectorAll(".game-obj").forEach(e => e.remove());

    for (const [key, item] of Object.entries(ITEMS)) {
        const img = document.createElement("img");
        img.className   = "game-obj";
        img.src         = item.src;
        img.id          = "gobj-" + key;
        img.dataset.key = key;

        placeAtHome(img, item);
        if (item.step === 1) img.classList.add("hint-glow");

        document.getElementById("scene").appendChild(img);
        setupDrag(img);
    }
}

function placeAtHome(el, item) {
    el.style.width  = (item.w * scale) + "px";
    el.style.height = "auto";
    el.style.left   = (sx(item.svgX) - (item.w * scale) / 2) + "px";
    el.style.top    = (sy(item.svgY) - 20 * scale) + "px";
}

function positionGameObjects() {
    setScale();
    positionDropZone();
    positionTapeScene();

    for (const [key, item] of Object.entries(ITEMS)) {
        const el = document.getElementById("gobj-" + key);
        if (!el || el.classList.contains("done")) continue;
        if (dragging && dragging.itemKey === key) continue;
        placeAtHome(el, item);
    }
}

function positionDropZone() {
    const dz = document.getElementById("dropZone");
    const rx = SINK.rx * scale;
    const ry = SINK.ry * scale;
    dz.style.left   = (sx(SINK.x) - rx) + "px";
    dz.style.top    = (sy(SINK.y) - ry) + "px";
    dz.style.width  = (rx * 2) + "px";
    dz.style.height = (ry * 2) + "px";
}

function positionTapeScene() {
    const item = ITEMS.tape;
    const t    = document.getElementById("tapeOnScene");
    t.style.width  = (item.w * scale) + "px";
    t.style.left   = (sx(item.svgX) - (item.w * scale) / 2) + "px";
    t.style.top    = (sy(item.svgY) - 20 * scale) + "px";
}


function setupDrag(el) {
    el.addEventListener("mousedown",  onDragStart);
    el.addEventListener("touchstart", onDragStart, { passive: false });
}

function onDragStart(e) {
    if (!gameActive) return;
    e.preventDefault();

    const key  = e.currentTarget.dataset.key;
    const item = ITEMS[key];

    if (item.step !== gameStep) {
        showWrong(item.label + " kommt noch! Zuerst: " + getStepName(gameStep));
        shakeEl(e.currentTarget);
        return;
    }

    const el = e.currentTarget;
    el.classList.add("dragging");
    el.classList.remove("hint-glow");

    const pt = getPoint(e);
    dragging = {
        el,
        itemKey:   key,
        startLeft: parseFloat(el.style.left),
        startTop:  parseFloat(el.style.top),
        startPX:   pt.x,
        startPY:   pt.y,
    };

    document.getElementById("dropZone").classList.add("active");
    document.addEventListener("mousemove",  onDragMove);
    document.addEventListener("mouseup",    onDragEnd);
    document.addEventListener("touchmove",  onDragMove, { passive: false });
    document.addEventListener("touchend",   onDragEnd);
}

function onDragMove(e) {
    if (!dragging) return;
    e.preventDefault();
    const pt = getPoint(e);
    dragging.el.style.left = (dragging.startLeft + pt.x - dragging.startPX) + "px";
    dragging.el.style.top  = (dragging.startTop  + pt.y - dragging.startPY) + "px";
}

function onDragEnd(e) {
    if (!dragging) return;

    document.removeEventListener("mousemove",  onDragMove);
    document.removeEventListener("mouseup",    onDragEnd);
    document.removeEventListener("touchmove",  onDragMove);
    document.removeEventListener("touchend",   onDragEnd);
    document.getElementById("dropZone").classList.remove("active");

    const el  = dragging.el;
    const key = dragging.itemKey;

    const rect  = el.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const svgCX = (cx - offX) / scale;
    const svgCY = (cy - offY) / scale;
    const dx    = (svgCX - SINK.x) / SINK.rx;
    const dy    = (svgCY - SINK.y) / SINK.ry;
    const inSink = (dx * dx + dy * dy) <= 1.0;

    el.classList.remove("dragging");

    if (inSink) {
        onCorrectDrop(key, el, cx, cy);
    } else {
        el.style.left = dragging.startLeft + "px";
        el.style.top  = dragging.startTop  + "px";
        el.classList.add("hint-glow");
        showWrong("Fast! Zieh es ins Waschbecken.");
    }

    dragging = null;
}

function getPoint(e) {
    if (e.touches        && e.touches.length)        return { x: e.touches[0].clientX,        y: e.touches[0].clientY };
    if (e.changedTouches && e.changedTouches.length) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    return { x: e.clientX, y: e.clientY };
}


function onCorrectDrop(key, el, screenCX, screenCY) {
    spawnRipple(screenCX, screenCY);
    spawnSplash(screenCX, screenCY);

    el.classList.add("done");
    hudDone(gameStep);

    if (key === "tape") {
        document.getElementById("tapeOnScene").classList.add("visible");
    }

    gameStep++;

    if (gameStep <= 3) {
        hudActive(gameStep);
        const nextEl = document.getElementById("gobj-" + getKeyForStep(gameStep));
        if (nextEl) nextEl.classList.add("hint-glow");

        const msgs = {
            2: "Super! Jetzt dreh den Wasserhahn ab!",
            3: "Toll! Jetzt kurz abspuelen!",
        };
        showToast(msgs[gameStep] || "");
    } else {
        hudDone(3);
        setTimeout(onGameSuccess, 700);
    }
}


function spawnRipple(cx, cy) {
    const r = document.createElement("div");
    r.className  = "ripple-el";
    r.style.left = cx + "px";
    r.style.top  = cy + "px";
    document.getElementById("scene").appendChild(r);
    setTimeout(() => r.remove(), 700);
}

function spawnSplash(cx, cy) {
    const s = document.createElement("div");
    s.textContent   = "*";
    s.style.cssText = `
        position: absolute; pointer-events: none; z-index: 150;
        font-size: ${Math.round(40 * scale)}px;
        color: #2abbd0;
        left: ${cx - 20}px; top: ${cy - 20}px;
        animation: splashAnim 0.7s ease-out forwards;
    `;
    document.getElementById("scene").appendChild(s);
    setTimeout(() => s.remove(), 800);
}

let toastTimer = null;
function showToast(msg) {
    let t = document.getElementById("toastMsg");
    if (!t) {
        t = document.createElement("div");
        t.id        = "toastMsg";
        t.className = "toast";
        document.getElementById("scene").appendChild(t);
    }
    t.textContent = msg;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { if (t) t.remove(); }, 2500);
}

function showWrong(msg) {
    wrongCount++;
    const w = document.getElementById("wrongMsg");
    w.textContent = msg;
    w.classList.add("show");
    setTimeout(() => w.classList.remove("show"), 1800);
}

function shakeEl(el) {
    const orig = parseFloat(el.style.left);
    let i = 0;
    const iv = setInterval(() => {
        el.style.left = (orig + (i % 2 === 0 ? -10 : 10) * scale) + "px";
        if (++i > 5) {
            clearInterval(iv);
            el.style.left = orig + "px";
            el.classList.add("hint-glow");
        }
    }, 60);
}

function hudDone(step) {
    const el = document.getElementById("s" + step);
    if (el) el.className = "hud-step done";
}

function hudActive(step) {
    const el = document.getElementById("s" + step);
    if (el) el.className = "hud-step active";
}

function getKeyForStep(s) {
    return Object.keys(ITEMS).find(k => ITEMS[k].step === s);
}

function getStepName(s) {
    return { 1: "Becher nehmen", 2: "Hahn abdrehen", 3: "Abspuelen" }[s] || "";
}


positionBg();
introScene();
