function loadVillageStartScene() {
    const scene = document.getElementById("scene");
    scene.innerHTML = `
        <img id="background" class="background" src="SVGs/village.svg" alt="">
        <img id="rampatrap" class="object" src="SVGs/rampatrapNoArm.svg" alt="">
        <img id="rampatrapArm" class="object" src="SVGs/rampatrapArm.svg" alt="">
    `;

    setBackroundScale(1920 , 1080);

    objects = [
        {
            object: document.getElementById("rampatrap"),
            right: 900,
            bottom: 700,
            width: 230
        },
        {
            object: document.getElementById("rampatrapArm"),
            right: 740,
            bottom: 500,
            width: 50
        }
    ];

    textBoxes = [];

    layout(objects, textBoxes);
}

function loadHouseScene(){
    const scene = document.getElementById("scene");
    scene.innerHTML = `
        <img id="background" class="background" src="SVGs/house.svg" alt="">
        <img id="car" class="object" src="SVGs/car.svg" alt="">
        <img id="bike" class="object" src="SVGs/bike.svg" alt="">

        <div class="textBox" id="decisionBox">Klicke auf das Fahrrad oder das Auto!</div>
    `;

    setBackroundScale(1920 , 1080);

    objects = [
        {
            object: document.getElementById("bike"),
            right: 900,
            bottom: 420,
            width: 270
        },
        {
            object: document.getElementById("car"),
            right: 1600,
            bottom: 400,
            width: 500
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

