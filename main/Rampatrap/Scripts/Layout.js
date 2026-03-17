// ================= GLOBAL STATE =================

// Hintergrund-Originalgröße
let backgroundWidth = 0;
let backgroundHeight = 0;

// Skalierungswerte
let scale = 1;
let offX = 0;
let offY = 0;
let drawnW = 0;
let drawnH = 0;

// Registrierte Elemente
let objects = [];
let textBoxes = [];

// ================= EVENTS =================

window.addEventListener("resize", () => scaleElements());
window.addEventListener("orientationchange", () => scaleElements());

// ================= CORE =================

function setBackgroundScale(width, height) {
    backgroundWidth = width;
    backgroundHeight = height;
}

function setScale() {
    const scene = document.getElementById("scene");
    if (!scene || !backgroundHeight) return;

    const clientWidth = scene.clientWidth;
    const clientHeight = scene.clientHeight;

    scale = clientHeight / backgroundHeight;
    drawnW = backgroundWidth * scale;
    drawnH = backgroundHeight * scale;

    offX = (clientWidth - drawnW) / 2;
    offY = (clientHeight - drawnH) / 2;
}

// ================= LAYOUT =================

function scaleElements() {
    setScale();

    const background = document.getElementById("background");
    if (!background) return;

    background.style.left = offX + "px";
    background.style.top = offY + "px";
    background.style.height = drawnH + "px";

    objects.forEach(obj => scaleObject(obj));
    textBoxes.forEach(tb => scaleTextBox(tb));
}

function scaleObject({ id, right, bottom, width }) {
    const el = document.getElementById(id);
    if (!el) return;

    const x = backgroundWidth - right;
    const y = backgroundHeight - bottom;

    el.style.left = offX + x * scale + "px";
    el.style.top = offY + y * scale + "px";
    el.style.width = width * scale + "px";
}

function scaleTextBox({ id, width, fontSize }) {
    const el = document.getElementById(id);
    if (!el) return;

    el.style.width = width * scale + "px";
    el.style.fontSize = fontSize * scale + "px";
    el.style.border = 8 * scale + "px solid #FED880";
    el.style.borderRadius = 8 * scale + "px";
}

function registerObjects(newObjects) {
    objects = newObjects;
    scaleElements();
}

function registerTextBoxes(newTextBoxes) {
    textBoxes = newTextBoxes;
    scaleElements();
}

function clearLayout() {
    objects = [];
    textBoxes = [];
}