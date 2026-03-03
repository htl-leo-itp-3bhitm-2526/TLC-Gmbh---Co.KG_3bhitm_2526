const t = document.getElementById("t");
const bar = document.getElementById("bar");
let startTime = 0, elapsed = 0, timerId = null;
let barId = null, barStart = 0, barElapsed = 0;
const BAR_MS = 6000;

function fmt(ms) {
  const s = ms / 1000;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  const tenths = Math.floor((ms % 1000) / 100);
  return String(m).padStart(2,"0") + ":" +
         String(sec).padStart(2,"0") + "." + tenths;
}

function tick() {
  const now = Date.now();
  t.textContent = fmt(now - startTime + elapsed);
}

function renderBar(ms) {
  const p = Math.min(ms / BAR_MS, 1);
  bar.style.width = (p * 100) + "%";
}

function tickBar(ts) {
  if (!barStart) barStart = ts;
  const total = barElapsed + (ts - barStart);
  renderBar(total);
  if (total < BAR_MS) {
    barId = requestAnimationFrame(tickBar);
  } else {
    barId = null;
    barStart = 0;
    barElapsed = BAR_MS;
  }
}

document.getElementById("start").onclick = () => {
  if (timerId) return;
  startTime = Date.now();
  timerId = setInterval(tick, 100);

  // Progress-Bar neu starten, wenn sie fertig ist
  if (barElapsed >= BAR_MS) {
    barElapsed = 0;
    renderBar(0);
  }

  if (!barId) {
    barStart = 0;
    barId = requestAnimationFrame(tickBar);
  }
};

document.getElementById("stop").onclick = () => {
  if (!timerId) return;
  clearInterval(timerId);
  timerId = null;
  elapsed += Date.now() - startTime;

  // Progress-Bar anhalten
  if (barId) {
    cancelAnimationFrame(barId);
    barId = null;
    // den bis jetzt gelaufenen Teil merken
    const now = performance.now();
    if (!barStart) barStart = now;
    barElapsed += now - barStart;
    barStart = 0;
  }
};

document.getElementById("reset").onclick = () => {
  clearInterval(timerId);
  if (barId) cancelAnimationFrame(barId);
  timerId = null;
  barId = null;
  startTime = elapsed = 0;
  barStart = 0;
  barElapsed = 0;
  t.textContent = "00:00.0";
  renderBar(0);
};
