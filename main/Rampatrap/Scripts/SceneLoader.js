if (scene == null) {
    const scene = document.getElementById("scene");
}

scene.innerHTML = `
        <img id="background" class="background" src="SVGs/village.svg" alt="">
        <div id="elements"></div>
`;

setBackroundScale(1920, 1080);


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

    layout(objects, textBoxes);
}

function changeBackground(img){
    document.getElementById("background").src = img;
}