let dlgQueue = [];
let dlgCb    = null;

function showDialog(lines, cb) {
    dlgQueue = Array.isArray(lines) ? [...lines] : [lines];
    dlgCb    = cb || null;
    nextDlg();
}

function nextDlg() {
    const box = document.getElementById("dialogBox");
    if (!dlgQueue.length) {
        box.classList.add("hidden");
        if (dlgCb) { const c = dlgCb; dlgCb = null; c(); }
        return;
    }
    box.classList.remove("hidden");
    document.getElementById("dialogText").textContent = dlgQueue.shift();
}

function changeBackground(src, W, H) {
    BG_W = W;
    BG_H = H;
    document.getElementById("background").src = src;
    positionBg();
}

function showChar(src) {
    const char = document.getElementById("fanyahChar");
    char.src            = src;
    char.style.display  = "block";
    char.style.position = "absolute";
    char.style.bottom   = "0";
    char.style.right    = "2vw";
    char.style.left     = "auto";
    char.style.top      = "auto";
    char.style.height   = "55vh";
    char.style.width    = "auto";
}

function hideChar() {
    document.getElementById("fanyahChar").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dialogBox").addEventListener("click", nextDlg);
});
