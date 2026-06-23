function changeBackground(src, W, H) {
    BG_W = W;
    BG_H = H;
    document.getElementById("background").src = src;
    positionBg();
}

const CHAR_X = 800;
const CHAR_Y = 410;
const CHAR_W = 170;

function showChar(src) {
    const char = document.getElementById("fanyahChar");
    char.src           = src;
    char.style.display = "block";
    positionChar();
}

function positionChar() {
    const char = document.getElementById("fanyahChar");
    if (char.style.display === "none") return;
    char.style.position = "absolute";
    char.style.left     = sx(CHAR_X) + "px";
    char.style.top      = sy(CHAR_Y) + "px";
    char.style.width    = (CHAR_W * scale) + "px";
    char.style.height   = "auto";
    char.style.bottom   = "auto";
    char.style.right    = "auto";
}

function hideChar() {
    document.getElementById("fanyahChar").style.display = "none";
}

