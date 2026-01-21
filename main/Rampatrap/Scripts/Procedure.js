function buildSceneWithInnerHTML() {
    const scene = document.getElementById("scene");
    scene.innerHTML = `
        <img id="background" class="bg" src="../SVGs/worldmap.svg" alt="">
        <img id="rampatrap" class="object" src="../SVGs/rampatrap.svg" alt="">

        <div class="object textBox" id="introduction">Klicke auf eine Figur!</div>
    `;

    setBackroundScale(2899.2, 1449.94);

    objects = [
        {
            object: document.getElementById("rampatrap"),
            right: 1140,
            bottom: 1040,
            width: 100
        }
    ];

    textBoxes = [
        {
            object: document.getElementById("introduction"),
            width: 550,
            fontSize: 50,
            borderSize: 8,
            borderRadius: 8
        }
    ];

    layout(objects, textBoxes);
}

buildSceneWithInnerHTML();