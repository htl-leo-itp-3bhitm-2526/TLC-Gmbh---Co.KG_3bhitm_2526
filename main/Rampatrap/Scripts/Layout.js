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
    background.style.left = offX + "px";
    background.style.top = offY + "px";
    background.style.height = drawnH + "px";
    
    for (let o = 0; o < objects.length; o++) {
        loadObjects(objects[o].id, objects[o].img, objects[o].right, objects[o].bottom, objects[o].width);
    }
    for (let t = 0; t < textBoxes.length; t++) {
        loadTextBox(textBoxes[t].id, textBoxes[t].text, textBoxes[t].width, textBoxes[t].fontSize);
    }
}

function loadObjects(id, img, right, bottom, width) {
    setScale();

    let x = backgroundWidth - right;
    let y = backgroundHeight - bottom;

    document.getElementById(id).style.left = (offX + x * scale) + "px";
    document.getElementById(id).style.top = (offY + y * scale) + "px";
    document.getElementById(id).style.width = (width * scale) + "px";
}

function loadTextBox(id, text, width, fontSize) {
    setScale();
    document.getElementById(id).style.width = (width * scale) + "px";
    document.getElementById(id).style.fontSize = (fontSize * scale) + "px";
    document.getElementById(id).style.border = (8 * scale) + "px solid #FED880";
    document.getElementById(id).style.borderRadius = (8 * scale) + "px";
}

function loadHTMLs(objects, textBoxes){
    document.getElementById("elements").innerHTML = "";
    for (let o = 0; o < objects.length; o++) {
        document.getElementById("elements").innerHTML += `
            <img id="${objects[o].id}" class="object" src="${objects[o].img}">
        `;
    }
    for (let t = 0; t < textBoxes.length; t++) {
        document.getElementById("elements").innerHTML += `
            <div class="textBox" id="${textBoxes[t].id}">${textBoxes[t].text}</div> 
        `;
    }
}



// Laden der layout Function
addEventListener("resize", () => layout(objects, textBoxes));
addEventListener("orientationchange", () => layout(objects, textBoxes));
layout(objects, textBoxes);

