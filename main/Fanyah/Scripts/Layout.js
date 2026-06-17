let BG_W = 1920;
let BG_H = 1080;
let scale = 1;
let offX  = 0;
let offY  = 0;

function setScale() {
    const scene = document.getElementById("scene");
    scale = scene.clientHeight / BG_H;
    offX  = (scene.clientWidth - BG_W * scale) / 2;
    offY  = (scene.clientHeight - BG_H * scale) / 2;
}

function sx(x) { return offX + x * scale; }
function sy(y) { return offY + y * scale; }

function positionBg() {
    setScale();
    const bg = document.getElementById("background");
    bg.style.left   = offX + "px";
    bg.style.top    = offY + "px";
    bg.style.height = (BG_H * scale) + "px";
    bg.style.width  = "auto";
}

window.addEventListener("resize",            () => { positionBg(); positionGameObjects(); positionChar(); });
window.addEventListener("orientationchange", () => { positionBg(); positionGameObjects(); positionChar(); });
