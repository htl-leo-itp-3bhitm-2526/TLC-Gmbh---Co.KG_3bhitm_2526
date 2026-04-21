introductionScene();

// ───────────────────────── INTRO ─────────────────────────

function introductionScene() {
    changeBackground("SVGs/field.svg", 1920, 1080);
    addObject("jose", "SVGs/JoséWithoutArm.svg", 1615, 1400, 500);
    addObject("joseArm", "SVGs/JoséArm.svg", 1430, 740, 50);

    const audio = new Audio('audios/joseStart.mp3');
    let sceneDone = false;
    const goToBath = () => { if (!sceneDone) { sceneDone = true; bathScene(); } };

    audio.addEventListener('ended', goToBath);
    const p = audio.play();
    if (p) p.catch(() => setTimeout(goToBath, 5000));

    setTimeout(introductionSadScene, 4000);
}

function introductionSadScene() {
    deleteObject("jose");
    deleteObject("joseArm");
    addObject("jose", "SVGs/JoséSad.svg", 1615, 1400, 500);
}

// ───────────────────────── BATH SCENE ─────────────────────────

function bathScene() {
    deleteObject("jose");
    deleteObject("joseArm");
    changeBackground("SVGs/bath.svg", 1920, 1080);

    addObject("showerHand1", "SVGs/ShowerHand.svg", 1430, 840, 200);
    addObject("showerHand2", "SVGs/ShowerHand.svg", 1030, 840, 200);

    const audio = new Audio('audios/joseExplain.mp3');
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
    const container = document.createElement("div");
    container.id = "timerContainer";
    container.innerHTML = `
        <div id="timerDisplay">00:00.0</div>
        <div class="timerBarWrap"><div class="timerBar" id="timerBar"></div></div>
        <div class="timerButtons">
            <button id="timerStart">Start</button>
            <button id="timerStop" disabled>Stop</button>
        </div>
    `;
    document.getElementById("elements").appendChild(container);
    document.getElementById("timerStart").onclick = startTimer;
    document.getElementById("timerStop").onclick = stopTimer;
}

function fmtTime(ms) {
    const s = ms / 1000;
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    const tenths = Math.floor((ms % 1000) / 100);
    return String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0") + "." + tenths;
}

function renderBar(ms) {
    const bar = document.getElementById("timerBar");
    if (bar) bar.style.width = Math.min(ms / BAR_MS, 1) * 100 + "%";
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
    document.getElementById("timerStart").disabled = true;
    document.getElementById("timerStop").disabled = false;

    timerStart = Date.now();
    timerRunId = setInterval(() => {
        const display = document.getElementById("timerDisplay");
        if (display) display.textContent = fmtTime(Date.now() - timerStart + timerElapsed);
    }, 100);

    barFrameStart = 0;
    barAnimId = requestAnimationFrame(tickBar);
}

function stopTimer() {
    if (!timerRunId) return;
    clearInterval(timerRunId);
    timerRunId = null;
    if (barAnimId) {
        cancelAnimationFrame(barAnimId);
        barAnimId = null;
    }
    timerElapsed += Date.now() - timerStart;

    document.getElementById("timerStop").disabled = true;
    setTimeout(() => resultScene(timerElapsed), 500);
}

// ───────────────────────── RESULT ─────────────────────────

function resultScene(ms) {
    const container = document.getElementById("timerContainer");
    if (container) container.remove();
    deleteObject("showerHand1");
    deleteObject("showerHand2");

    // overshoot only: positive = too late, negative/zero = early (always safe)
    const overshoot = ms - BAR_MS;
    let audioFile;
    if (overshoot <= 1000) {
        audioFile = 'audios/joseGood.mp3';   // ≤9s (any early stop + up to 1s over)
    } else if (overshoot <= 2500) {
        audioFile = 'audios/joseMedium.mp3'; // 9s–10.5s
    } else {
        audioFile = 'audios/joseBad.mp3';    // >10.5s
    }

    const audio = new Audio(audioFile);
    audio.play();
    audio.addEventListener('ended', () => {
        window.location.href = "../worldmap/index.html";
    });
}
