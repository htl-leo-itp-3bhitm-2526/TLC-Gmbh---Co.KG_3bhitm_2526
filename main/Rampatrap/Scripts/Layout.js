// Skalierungen definieren damit alle Funktionen drauf zugreifen können
let backgroundWidth;
let backgroundHeight;

let scene;
let clientWidth;
let clientHeight;

let scale;
let drawnW;
let drawnH;
let offX;
let offY;

function setBackroundScale(W, H) {
    // Verhältnise des Hintergrundbildes angeben
    backgroundWidth = W;
    backgroundHeight = H;
}

function setScale() {
    // Bildschirmgröße holen
    scene = document.getElementById("scene");
    clientWidth = scene.clientWidth;
    clientHeight = scene.clientHeight;

    //Skalierung ausrechnen
    scale = clientHeight / backgroundHeight;
    drawnW = backgroundWidth * scale;
    drawnH = backgroundHeight * scale;
    offX = (clientWidth - drawnW) / 2;
    offY = (clientHeight - drawnH) / 2;
}

function layout(objects, textBoxes) {
    setScale();

    //worlmap skalieren
    const background = document.getElementById("background");
    if (!background) return;
    background.style.left = offX + "px";
    background.style.top = offY + "px";
    background.style.height = drawnH + "px";

    for (let o = 0; o < objects.length; o++) {
        loadObjects(objects[o].object, objects[o].right, objects[o].bottom, objects[o].width);
    }
    for (let t = 0; t < textBoxes.length; t++) {
        loadTextBox(textBoxes[t].object, textBoxes[t].width, textBoxes[t].fontSize, textBoxes[t].borderSize, textBoxes[t].borderRadius);
    }
}

function loadObjects(object, right, bottom, width) {
    setScale();

    let x = backgroundWidth - right;
    let y = backgroundHeight - bottom;

    object.style.left = (offX + x * scale) + "px";
    object.style.top = (offY + y * scale) + "px";
    object.style.width = (width * scale) + "px";
}

function loadTextBox(object, width, fontSize, border, borderRadius) {
    setScale();

    object.style.width = (width * scale) + "px";
    object.style.fontSize = (fontSize * scale) + "px";
    object.style.border = (border * scale) + "px solid #FED880";
    object.style.borderRadius = (borderRadius * scale) + "px";
}

let objects = [];

let textBoxes = [];



// Laden der layout Function
addEventListener("resize", () => layout(objects, textBoxes));
addEventListener("orientationchange", () => layout(objects, textBoxes));
layout(objects, textBoxes);