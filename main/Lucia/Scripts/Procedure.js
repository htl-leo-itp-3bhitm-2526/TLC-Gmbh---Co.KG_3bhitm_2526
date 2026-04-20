let round = 0;
const MAX_ROUNDS = 3;

// right/bottom = Abstand vom rechten/unteren Rand des Hintergrunds (1920×843.6)
// Die Positionswerte sind Annäherungswerte – bei Bedarf anpassen.
const ROOM_CONFIGS = [
    {
        id: "attic",
        lightSrc: "SVGs/attic.svg",
        darkSrc:  "SVGs/atticDark.svg",
        right: 1580, bottom: 900, width: 500,
        figRight: 1598, figBottom: 857, figWidth: 100,
    },
    {
        id: "room1",
        lightSrc: "SVGs/room1.svg",
        darkSrc:  "SVGs/room1Dark.svg",
        right: 1475, bottom: 680, width: 250,
        figRight: 1426, figBottom: 530, figWidth: 85,
    },
    {
        id: "room2",
        lightSrc: "SVGs/room2.svg",
        darkSrc:  "SVGs/room2Dark.svg",
        right: 1175, bottom: 680, width: 250,
        figRight: 1099, figBottom: 530, figWidth: 85,
    },
    {
        id: "room3",
        lightSrc: "SVGs/room3.svg",
        darkSrc:  "SVGs/room3Dark.svg",
        right: 1475, bottom: 460, width: 250,
        figRight: 1426, figBottom: 305, figWidth: 85,
    },
    {
        id: "room4",
        lightSrc: "SVGs/room4.svg",
        darkSrc:  "SVGs/room4Dark.svg",
        right: 1175, bottom: 460, width: 250,
        figRight: 1099, figBottom: 305, figWidth: 85,
    },
];

startGameRound();

//------------------------------------------------------------------------------------

function introVillageScene() {
    changeBackground("SVGs/village.svg", 1920, 1080);

    addObject("lucia", "SVGs/Lucia.svg", 1015, 1000, 230);

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

    addObject("lucia", "SVGs/Lucia.svg", 1800, 450, 200);



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

    // 3 zufällige Räume mit Figur belegen
    const shuffled = [...ROOM_CONFIGS].sort(() => Math.random() - 0.5);
    const figureRoomIds = new Set(shuffled.slice(0, 3).map(r => r.id));

    // Zustand: alle Räume beginnen hell (Licht an)
    const roomState = {};
    ROOM_CONFIGS.forEach(r => { roomState[r.id] = "light"; });

    // Alle Räume (hell) hinzufügen
    ROOM_CONFIGS.forEach(r => {
        addObject(r.id, r.lightSrc, r.right, r.bottom, r.width);
    });

    // Figuren in den belegten Räumen platzieren
    ROOM_CONFIGS.forEach(r => {
        if (figureRoomIds.has(r.id)) {
            addObject(
                "fig_" + r.id,
                "../Rampatrap/SVGs/rampatrapNoArm.svg",
                r.figRight, r.figBottom, r.figWidth
            );
        }
    });

    addTextBox("instructionBox", "Schalte das Licht in leeren Räumen aus! (Runde " + (round + 1) + " / " + MAX_ROUNDS + ")", 650, 30);

    // Klick-Handler für Räume setzen (nach letztem addObject)
    ROOM_CONFIGS.forEach(r => {
        const el = document.getElementById(r.id);
        if (!el) return;
        el.classList.add("room");
        el.addEventListener("click", function () {
            toggleRoom(r, roomState, figureRoomIds);
        });
    });
}

//------------------------------------------------------------------------------------

function toggleRoom(room, roomState, figureRoomIds) {
    const isLight = roomState[room.id] === "light";
    roomState[room.id] = isLight ? "dark" : "light";

    const el = document.getElementById(room.id);
    if (el) {
        el.src = roomState[room.id] === "light" ? room.lightSrc : room.darkSrc;
    }

    checkWin(roomState, figureRoomIds);
}

//------------------------------------------------------------------------------------

function checkWin(roomState, figureRoomIds) {
    const allCorrect = ROOM_CONFIGS.every(r => {
        if (figureRoomIds.has(r.id)) return roomState[r.id] === "light";
        return roomState[r.id] === "dark";
    });

    if (!allCorrect) return;

    deleteTextBox("instructionBox");

    const audio = new Audio("../Rampatrap/audios/rampatrapRightDecision.mp3");
    audio.play();

    audio.addEventListener("ended", function () {
        round++;
        if (round >= MAX_ROUNDS) {
            endVillageScene();
        } else {
            startGameRound();
        }
    });
}

//------------------------------------------------------------------------------------

function endVillageScene() {
    objects = [];
    textBoxes = [];
    document.getElementById("elements").innerHTML = "";

    changeBackground("SVGs/village.svg", 1920, 1080);

    addObject("lucia", "SVGs/Lucia.svg", 1015, 1000, 230);

    addTextBox(
        "speechBox",
        "Danke, dass du meinen Lamas helfen willst! " +
        "Durch das Ausschalten von Licht in leeren Räumen sparst du Strom. " +
        "Dadurch schmelzen meine Gletscher langsamer und meine Lamas haben länger Wasser und grünes Gras.",
        650, 45
    );

    const audio = new Audio("../Rampatrap/audios/rampatrapRightDecision.mp3");
    audio.play();

    audio.addEventListener("ended", function () {
        window.location.href = "../worldmap/index.html";
    });
}
