// ================= OBJECTS =================

function addObject(id, img, right, bottom, width) {
    objects.push({
        id,
        img,
        right,
        bottom,
        width
    });

    loadHTMLs();
    registerObjects(objects);
}

function deleteObject(id) {
    objects = objects.filter(o => o.id !== id);

    loadHTMLs();
    registerObjects(objects);
}

// ================= TEXTBOXES =================

function addTextBox(id, text, width, fontSize) {
    textBoxes.push({
        id,
        text,
        width,
        fontSize
    });

    loadHTMLs();
    registerTextBoxes(textBoxes);
}

function deleteTextBox(id) {
    textBoxes = textBoxes.filter(t => t.id !== id);

    loadHTMLs();
    registerTextBoxes(textBoxes);
}

// ================= BACKGROUND =================

function changeBackground(img, width, height) {
    const bg = document.getElementById("background");
    if (!bg) return;

    bg.src = img;
    setBackgroundScale(width, height);
}

// ================= DOM BUILDER =================

function loadHTMLs() {
    const container = document.getElementById("elements");
    if (!container) return;

    container.innerHTML = "";

    objects.forEach(o => {
        container.innerHTML += `
            <img id="${o.id}" class="object" src="${o.img}">
        `;
    });

    textBoxes.forEach(t => {
        container.innerHTML += `
            <div class="textBox" id="${t.id}">${t.text}</div>
        `;
    });
}