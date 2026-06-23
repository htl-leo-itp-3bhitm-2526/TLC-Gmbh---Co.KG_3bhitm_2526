let backgroundWidth;
let backgroundHeight;

// Bildschirmgröße holen
let scene;
let clientWidth;
let clientHeight;

//Skalierung ausrechnen
let scale;
let drawnW;
let drawnH;
let offX;
let offY;

function setScale() {
    // Verhältnise des Hintergrundbildes angeben
    backgroundWidth = 2899.2;
    backgroundHeight = 1449.94;

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

function layout() {
    setScale();

    //worlmap skalieren
    const worldmap = document.getElementById("worldmap");
    worldmap.style.left = offX + "px";
    worldmap.style.top = offY + "px";
    worldmap.style.height = drawnH + "px";

    //Objekte anlegen
    const rampatrap = document.getElementById("rampatrap");
    const rampatrapArm = document.getElementById("rampatrapArm");
    const lucia = document.getElementById("lucia");
    const luciaArm = document.getElementById("luciaArm");
    const introduction = document.getElementById("introduction");
    const jose = document.getElementById("jose");
    const joseArm = document.getElementById("joseArm");
    const sailosi = document.getElementById("sailosi");
    const sailosiArm = document.getElementById("sailosiArm");
    const fanyah = document.getElementById("fanyah");
    const fanyahArm = document.getElementById("fanyahArm");

    //Stats der Objekte
    const rampatrapRight = 1140;
    const rampatrapBottom = 1040;
    const rampatrapWidth = 100;

    const rampatrapArmRight = 1070;
    const rampatrapArmBottom = 955;
    const rampatrapArmWidth = 25;

    const luciaRight = 2050;
    const luciaBottom = 820;
    const luciaWidth = 100;

    const luciaArmRight = 2050;
    const luciaArmBottom = 735;
    const luciaArmWidth = 25;

    const joseRight = 2200; //2400
    const joseBottom = 1150; //1040
    const joseWidth = 200;

    const joseArmRight = 2100;
    const joseArmBottom = 1020;
    const joseArmWidth = 25;

    const sailosiRight = 580;
    const sailosiBottom = 750; //650
    const sailosiWidth = 100;

    const sailosiArmRight = 530;
    const sailosiArmBottom = 680;
    const sailosiArmWidth = 25;

    const fanyahRight = 1280; //1600
    const fanyahBottom = 770; //1000
    const fanyahWidth = 85;

    const fanyahArmRight = 1240;
    const fanyahArmBottom = 705;
    const fanyahArmWidth = 25;

    const introductionWidth = 550;
    const introductionTextSize = 50;
    const introductionBorderSize = 8;
    const introductionborderRadius = 8;

    // Objekte laden
    loadObjects(rampatrap, rampatrapRight, rampatrapBottom, rampatrapWidth);
    loadObjects(rampatrapArm, rampatrapArmRight, rampatrapArmBottom, rampatrapArmWidth);
    loadObjects(lucia, luciaRight, luciaBottom, luciaWidth);
    loadObjects(luciaArm, luciaArmRight, luciaArmBottom, luciaArmWidth);
    loadObjects(jose, joseRight, joseBottom, joseWidth);
    loadObjects(joseArm, joseArmRight, joseArmBottom, joseArmWidth);
    loadObjects(sailosi, sailosiRight, sailosiBottom, sailosiWidth);
    loadObjects(sailosiArm, sailosiArmRight, sailosiArmBottom, sailosiArmWidth);
    loadObjects(fanyah, fanyahRight, fanyahBottom, fanyahWidth);
    loadObjects(fanyahArm, fanyahArmRight, fanyahArmBottom, fanyahArmWidth);
    loadTextBox(introduction, introductionWidth, introductionTextSize, introductionBorderSize, introductionborderRadius);
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

// Laden der layout Function
addEventListener("resize", layout);
addEventListener("orientationchange", layout);
layout();