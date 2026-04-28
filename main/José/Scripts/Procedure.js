let CONFIG = { scenes: {}, audio: {}, results: [] };

fetch('../api/get_character.php?slug=jose')
    .then(r => r.json())
    .then(data => {
        data.scenes.forEach(s => {
            const objMap = {};
            s.objects.forEach(o => { objMap[o.object_key] = o; });
            CONFIG.scenes[s.scene_key] = { ...s, objectMap: objMap };
        });
        CONFIG.audio   = data.audio;
        CONFIG.results = data.results;
        introductionScene();
    })
    .catch(() => introductionScene());

// ───────────────────────── INTRO ─────────────────────────

function introductionScene() {
    const s    = CONFIG.scenes.introduction || {};
    const objs = s.objectMap || {};

    changeBackground(s.background_svg || 'SVGs/field.svg', s.bg_width || 1920, s.bg_height || 1080);

    const jose = objs.jose    || { svg_path: 'SVGs/JoséWithoutArm.svg', pos_right: 1615, pos_bottom: 1400, width: 500 };
    const arm  = objs.joseArm || { svg_path: 'SVGs/JoséArm.svg',        pos_right: 1430, pos_bottom:  740, width:  50 };

    addObject('jose',    jose.svg_path, jose.pos_right, jose.pos_bottom, jose.width);
    addObject('joseArm', arm.svg_path,  arm.pos_right,  arm.pos_bottom,  arm.width);

    const audio = new Audio(CONFIG.audio.start || 'audios/joseStart.mp3');
    let sceneDone = false;
    const goToBath = () => { if (!sceneDone) { sceneDone = true; bathScene(); } };

    audio.addEventListener('ended', goToBath);
    const p = audio.play();
    if (p) p.catch(() => setTimeout(goToBath, 5000));

    setTimeout(introductionSadScene, 4000);
}

function introductionSadScene() {
    const s    = CONFIG.scenes.introduction_sad || {};
    const objs = s.objectMap || {};
    const jose = objs.jose || { svg_path: 'SVGs/JoséSad.svg', pos_right: 1615, pos_bottom: 1400, width: 500 };

    deleteObject('jose');
    deleteObject('joseArm');
    addObject('jose', jose.svg_path, jose.pos_right, jose.pos_bottom, jose.width);
}

// ───────────────────────── BATH SCENE ─────────────────────────

function bathScene() {
    const s    = CONFIG.scenes.bath || {};
    const objs = s.objectMap || {};

    deleteObject('jose');
    deleteObject('joseArm');
    changeBackground(s.background_svg || 'SVGs/bath.svg', s.bg_width || 1920, s.bg_height || 1080);

    const hand1 = objs.showerHand1 || { svg_path: 'SVGs/ShowerHand.svg', pos_right: 1430, pos_bottom: 840, width: 200 };
    const hand2 = objs.showerHand2 || { svg_path: 'SVGs/ShowerHand.svg', pos_right: 1030, pos_bottom: 840, width: 200 };

    addObject('showerHand1', hand1.svg_path, hand1.pos_right, hand1.pos_bottom, hand1.width);
    addObject('showerHand2', hand2.svg_path, hand2.pos_right, hand2.pos_bottom, hand2.width);

    const audio = new Audio(CONFIG.audio.explain || 'audios/joseExplain.mp3');
    let sceneDone = false;
    const goToTimer = () => { if (!sceneDone) { sceneDone = true; showTimer(); } };

    audio.addEventListener('ended', goToTimer);
    const p = audio.play();
    if (p) p.catch(() => setTimeout(goToTimer, 5000));
}

// ───────────────────────── TIMER ─────────────────────────

const BAR_MS = 8000;
let timerElapsed = 0, timerStart = 0, timerRunId = null;
let barAnimId = null, barFrameStart = 0, barAccum = 0;

function showTimer() {
    const container = document.createElement('div');
    container.id = 'timerContainer';
    container.innerHTML = `
        <div id="timerDisplay">00:00.0</div>
        <div class="timerBarWrap"><div class="timerBar" id="timerBar"></div></div>
        <div class="timerButtons">
            <button id="timerStart">Start</button>
            <button id="timerStop" disabled>Stop</button>
        </div>
    `;
    document.getElementById('elements').appendChild(container);
    document.getElementById('timerStart').onclick = startTimer;
    document.getElementById('timerStop').onclick  = stopTimer;
}

function fmtTime(ms) {
    const s      = ms / 1000;
    const m      = Math.floor(s / 60);
    const sec    = Math.floor(s % 60);
    const tenths = Math.floor((ms % 1000) / 100);
    return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0') + '.' + tenths;
}

function renderBar(ms) {
    const bar = document.getElementById('timerBar');
    if (bar) bar.style.width = Math.min(ms / BAR_MS, 1) * 100 + '%';
}

function tickBar(ts) {
    if (!barFrameStart) barFrameStart = ts;
    const total = barAccum + (ts - barFrameStart);
    renderBar(total);
    if (total < BAR_MS) {
        barAnimId = requestAnimationFrame(tickBar);
    } else {
        barAnimId = null;
        barFrameStart = 0;
        barAccum = BAR_MS;
    }
}

function startTimer() {
    if (timerRunId) return;
    document.getElementById('timerStart').disabled = true;
    document.getElementById('timerStop').disabled  = false;

    timerStart = Date.now();
    timerRunId = setInterval(() => {
        const display = document.getElementById('timerDisplay');
        if (display) display.textContent = fmtTime(Date.now() - timerStart + timerElapsed);
    }, 100);

    barFrameStart = 0;
    barAnimId = requestAnimationFrame(tickBar);
}

function stopTimer() {
    if (!timerRunId) return;
    clearInterval(timerRunId);
    timerRunId = null;
    if (barAnimId) { cancelAnimationFrame(barAnimId); barAnimId = null; }
    timerElapsed += Date.now() - timerStart;

    document.getElementById('timerStop').disabled = true;
    setTimeout(() => resultScene(timerElapsed), 500);
}

// ───────────────────────── RESULT ─────────────────────────

function resultScene(ms) {
    const container = document.getElementById('timerContainer');
    if (container) container.remove();
    deleteObject('showerHand1');
    deleteObject('showerHand2');

    const overshoot = ms - BAR_MS;
    let audioFile;

    if (CONFIG.results && CONFIG.results.length > 0) {
        const sorted = [...CONFIG.results].sort((a, b) =>
            (a.max_overshoot_ms ?? Infinity) - (b.max_overshoot_ms ?? Infinity)
        );
        const match = sorted.find(r => r.max_overshoot_ms === null || overshoot <= Number(r.max_overshoot_ms));
        audioFile = CONFIG.audio[match?.audio_key] || 'audios/joseBad.mp3';
    } else {
        if (overshoot <= 1000)      audioFile = 'audios/joseGood.mp3';
        else if (overshoot <= 2500) audioFile = 'audios/joseMedium.mp3';
        else                        audioFile = 'audios/joseBad.mp3';
    }

    const audio = new Audio(audioFile);
    audio.play();
    audio.addEventListener('ended', () => {
        window.location.href = '../worldmap/index.html';
    });
}
