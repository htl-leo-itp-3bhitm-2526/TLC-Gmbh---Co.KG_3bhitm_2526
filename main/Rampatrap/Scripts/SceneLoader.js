if (scene == null) {
    const scene = document.getElementById("scene");
}

objects = [];
textBoxes = [];


changeBackground("SVGs/village.svg" ,1920, 1080);


function addObject(id, img, right, bottom, width) {
    objects.push(
        {
            id: id,
            img: img,
            right: right,
            bottom: bottom,
            width: width,
        }
    );

    loadHTMLs(objects, textBoxes);
    layout(objects, textBoxes);
}

function addTextBox(id, text, width, fontSize) {

    textBoxes.push(
        {
            id: id,
            text: text,
            width: width,
            fontSize: fontSize,
        }
    );

    loadHTMLs(objects, textBoxes);
    layout(objects, textBoxes);
}

function deleteObject(id) {

    let newList = [];

    for (let i = 0; i < objects.length; i++) {
        if (objects[i].id !== id) {
            newList.push(objects[i]);
        }
    }

    objects = newList;

    loadHTMLs(objects, textBoxes);
    layout(objects, textBoxes);
}

function deleteTextBox(id) {

    let newList = [];

    for (let i = 0; i < textBoxes.length; i++) {
        if (textBoxes[i].id !== id) {
            newList.push(textBoxes[i]);
        }
    }

    textBoxes = newList;

    loadHTMLs(objects, textBoxes);
    layout(objects, textBoxes);
}

function changeBackground(img, W, H){
    document.getElementById("background").src = img;
    backgroundWidth = W;
    backgroundHeight = H;
}