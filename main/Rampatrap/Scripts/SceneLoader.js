function villageStartScene() {
    const scene = document.getElementById("scene");
    scene.innerHTML = `
        <img id="background" class="background" src="../SVGs/village.svg" alt="">
        <img id="rampatrap" class="object" src="../SVGs/rampatrap.svg" alt="">
    `;

    setBackroundScale(1920 , 1080);

    objects = [
        {
            object: document.getElementById("rampatrap"),
            right: 900,
            bottom: 700,
            width: 230
        }
    ];

    textBoxes = [];

    layout(objects, textBoxes);
}

function houseScene(){
    const scene = document.getElementById("scene");
    scene.innerHTML = `
        <img id="background" class="background" src="../SVGs/house.svg" alt="">
        <img id="car" class="object" src="../SVGs/car.svg" alt="">
        <img id="bike" class="object" src="../SVGs/bike.svg" alt="">

        <div class="object textBox" id="decisionBox">Klicke auf das Fahrrad oder das Auto!</div>
    `;

    setBackroundScale(1920 , 1080);

    objects = [
        {
            object: document.getElementById("bike"),
            right: 900,
            bottom: 450,
            width: 300
        },
        {
            object: document.getElementById("car"),
            right: 1600,
            bottom: 400,
            width: 600
        }
    ];

    textBoxes = [
        {
            object: document.getElementById("decisionBox"),
            width: 650,
            fontSize: 45,
            borderSize: 8,
            borderRadius : 8
        }
    ];

    layout(objects, textBoxes);
}

