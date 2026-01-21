// Verhältnise des Hintergrundbildes angeben
const backgroundWidth = 2899.2;
const backgroundHeight = 1449.94;

// Bildschirmgröße holen
const scene = document.getElementById("scene");
const clientWidth = scene.clientWidth;
const clientHeight = scene.clientHeight;

//Skalierung ausrechnen
const scale = clientHeight / backgroundHeight;
const drawnW = backgroundWidth * scale;
const drawnH = backgroundHeight * scale;
const offX = (clientWidth - drawnW) / 2;
const offY = (clientHeight - drawnH) / 2;

function layout() {

    //worlmap skalieren
    const worldmap = document.getElementById("worldmap");
    worldmap.style.left = offX + "px";
    worldmap.style.top = offY + "px";
    worldmap.style.height = drawnH + "px";

    //Objekte anlegen
    const rampatrap = document.getElementById("rampatrap");
    const rampatrapArm = document.getElementById("rampatrapArm");
    const introduction = document.getElementById("introduction");

    //Stats der Objekte
    const rampatrapRight = 1140;
    const rampatrapBottom = 1040;
    const rampatrapWidth = 100;

    const rampatrapArmRight = 1070;
    const rampatrapArmBottom = 955;
    const rampatrapArmWidth = 25;

    const introductionWidth = 550;
    const introductionTextSize = 50;
    const introductionBorderSize = 8;
    const introductionborderRadius = 8;

    // Objekte laden
    loadObjects(rampatrap, rampatrapRight, rampatrapBottom, rampatrapWidth);
    loadObjects(rampatrapArm, rampatrapArmRight, rampatrapArmBottom, rampatrapArmWidth);
    loadTextBox(introduction, introductionWidth, introductionTextSize, introductionBorderSize, introductionborderRadius);
}

function loadObjects(object, right, bottom, width) {
    let x = backgroundWidth - right;
    let y = backgroundHeight - bottom;

    object.style.left = (offX + x * scale) + "px";
    object.style.top = (offY + y * scale) + "px";
    object.style.width = (width * scale) + "px";
}

function loadTextBox(object, width, fontSize, border, borderRadius) {
    object.style.width = (width * scale) + "px";
    object.style.fontSize = (fontSize * scale) + "px";
    object.style.border = (border * scale) + "px solid #FED880";
    object.style.borderRadius = (borderRadius * scale) + "px";
}

// Laden der layout Function
addEventListener("resize", layout);
addEventListener("orientationchange", layout);
worldmap.addEventListener("load", layout);
rampatrap.addEventListener("load", layout);
introduction.addEventListener("load", layout);
layout();