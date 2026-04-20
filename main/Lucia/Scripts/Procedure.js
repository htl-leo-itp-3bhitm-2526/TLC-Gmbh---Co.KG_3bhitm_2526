
let round = 0;
let maxRounds = 3;

const playerPositions = [
    { roomId: "attic", right: 1150, bottom: 779},
    { roomId: "room1", right: 1250, bottom: 573},
    { roomId: "room2", right: 950, bottom: 573},
    { roomId: "room3", right: 1250, bottom: 353},
    { roomId: "room4", right: 950, bottom: 353},
];

let randomPositions = [];
introVillageScene();

//------------------------------------------------------------------------------------

function introVillageScene() {
    changeBackground("SVGs/village.svg", 1920, 1080);

    addObject("lucia", "SVGs/LuciaNoArm.svg", 1015, 1000, 230);
    addObject("luciaArm", "SVGs/LuciaArm.svg", 920, 400, 50);

    setTimeout(function() {
        deleteObject("luciaArm");
        deleteObject("lucia");
        addObject("lucia", "SVGs/Lucia.svg", 1015, 1000, 230);
    }, 3000);

    const audio = new Audio("../Rampatrap/audios/rampatrapVillageStartScene.mp3");
    audio.play();

    audio.addEventListener("ended", function () {
        houseExplanationScene();
    });
}

//------------------------------------------------------------------------------------

function houseExplanationScene() {
    changeBackground("SVGs/house.svg", 1920, 843.6);

    deleteObject("lucia");

    addObject("lucia", "SVGs/Lucia.svg", 1800, 700, 200);

    addObject("attic", "SVGs/attic.svg", 1580, 900, 500, "light");
    addObject("room1", "SVGs/room1.svg", 1475, 680, 250, "light");
    addObject("room2", "SVGs/room2.svg", 1175, 680, 250, "light");
    addObject("room3", "SVGs/room3.svg", 1475, 460, 250, "light");
    addObject("room4", "SVGs/room4.svg", 1175, 460, 250, "light");

    const audio = new Audio("../Rampatrap/audios/rampatrapHouseDecideScene.mp3");
    audio.play();

    audio.addEventListener("ended", function () {
        deleteObject("lucia");
        startGameRound();
    });
}

//------------------------------------------------------------------------------------



function startGameRound() {
    objects = [];
    textBoxes = [];
    document.getElementById("elements").innerHTML = "";

    changeBackground("SVGs/house.svg", 1920, 843.6);

    addObject("attic", "SVGs/attic.svg", 1580, 900, 500, "light");
    addObject("room1", "SVGs/room1.svg", 1475, 680, 250, "light");
    addObject("room2", "SVGs/room2.svg", 1175, 680, 250, "light");
    addObject("room3", "SVGs/room3.svg", 1475, 460, 250, "light");
    addObject("room4", "SVGs/room4.svg", 1175, 460, 250, "light");

    while (randomPositions.length < 2) {
        let randomPosition = Math.floor(Math.random() * 5);
        if (!randomPositions.includes(randomPosition)) {
            randomPositions.push(randomPosition);
        }
    }

    for (let i = 0; i <= 1; i++) {
        addObject("fig" + i, "../Rampatrap/SVGs/rampatrapNoArm.svg", playerPositions[randomPositions[i]].right, playerPositions[randomPositions[i]].bottom, 50);
    }

    addTextBox("instructionBox", "Schalte das Licht in leeren Räumen aus! (Runde " + (round + 1) + " / " + maxRounds + ")", 650, 30);

    document.getElementById("attic").onclick = function() { changeLight(this); };
    document.getElementById("room1").onclick = function() { changeLight(this); };
    document.getElementById("room2").onclick = function() { changeLight(this); };
    document.getElementById("room3").onclick = function() { changeLight(this); };
    document.getElementById("room4").onclick = function() { changeLight(this); };


}

//------------------------------------------------------------------------------------

function changeLight(object) {
    if (object.classList.contains("light")) {
        object.src = "SVGs/" + object.id + "Dark.svg";
        object.classList.replace("light", "dark");
    } else {
        object.src = "SVGs/" + object.id + ".svg";
        object.classList.replace("dark", "light");
    }
    checkWin();
}

//------------------------------------------------------------------------------------

function checkWin() {
    let figRoom0 = playerPositions[randomPositions[0]].roomId;
    let figRoom1 = playerPositions[randomPositions[1]].roomId;

    let correct = true;

    if (!document.getElementById(figRoom0).classList.contains("light")) correct = false;
    if (!document.getElementById(figRoom1).classList.contains("light")) correct = false;

    let allRooms = ["attic", "room1", "room2", "room3", "room4"];
    for (let i = 0; i < allRooms.length; i++) {
        if (allRooms[i] != figRoom0 && allRooms[i] != figRoom1) {
            if (!document.getElementById(allRooms[i]).classList.contains("dark")) correct = false;
        }
    }

    if (!correct) return;

    document.getElementById("attic").onclick = null;
    document.getElementById("room1").onclick = null;
    document.getElementById("room2").onclick = null;
    document.getElementById("room3").onclick = null;
    document.getElementById("room4").onclick = null;

    const audio = new Audio("../Rampatrap/audios/rampatrapRightDecision.mp3");
    round++;
    if (round >= maxRounds) {
        endVillageScene();
    } else {
        audio.play();

        audio.addEventListener("ended", function () {
        randomPositions = [];
        startGameRound();
    });
    }
}

//------------------------------------------------------------------------------------

function endVillageScene() {
    objects = [];
    textBoxes = [];
    document.getElementById("elements").innerHTML = "";

    changeBackground("SVGs/village.svg", 1920, 1080);

    addObject("lucia", "SVGs/Lucia.svg", 1015, 1000, 230);


    const audio = new Audio("../Rampatrap/audios/rampatrapRightDecision.mp3");
    audio.play();

    audio.addEventListener("ended", function () {
        window.location.href = "../worldmap/index.html";
    });
}
