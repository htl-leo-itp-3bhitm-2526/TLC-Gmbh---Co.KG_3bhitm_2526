// ─── Dialog.js ───────────────────────────────────────────────────────────────

let dlgQueue = [], dlgCb = null;

function showDialog(lines, callback) {
    dlgQueue = Array.isArray(lines) ? [...lines] : [lines];
    dlgCb = callback || null;
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

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dialogBox").addEventListener("click", nextDlg);
});
