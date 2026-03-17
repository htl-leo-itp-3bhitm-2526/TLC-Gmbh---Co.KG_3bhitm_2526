let audio = null;

function playAudio(src, onEnd, onStart) {
    if (audio) {
        audio.pause();
        audio.onended = null;
    }

    audio = new Audio(src);

    audio.onplay = () => {
        if (onStart) onStart();
    };

    audio.play();

    if (onEnd) {
        audio.onended = onEnd;
    }
}

document.addEventListener("click", startGame, { once: true });

function startGame() {
    introductionVillageScene();
}

// ================= INTRODUCTION =================

function introductionVillageScene() {
    changeBackground("SVGs/village.svg", 1920, 1080);

    addObject("rampatrap", "SVGs/rampatrapNoArm.svg", 1015, 1000, 230);
    addObject("rampatrapArm", "SVGs/rampatrapArm.svg", 640, 340, 50);

    playAudio(
        "../../audios/rampatrap/rampatrapVillageStartScene.mp3",
        () => {
            explanationVillageScene();
            setTimeout(houseScene, 500);
        }
    );

    setTimeout(setIdle, 4000);
}

function setIdle() {
    const arm = document.getElementById("rampatrapArm");
    const rampatrap = document.getElementById("rampatrap");

    if (arm) arm.style.display = "none";
    if (rampatrap) rampatrap.src = "SVGs/rampatrapSad.svg";
}

// ================= EXPLANATION =================

function explanationVillageScene() {
    deleteObject("rampatrap");
    deleteObject("rampatrapArm");

    addObject("rampatrap", "SVGs/rampatrapSad.svg", 1015, 1000, 230);
}

// ================= HOUSE SCENE =================

function houseScene() {
    changeBackground("SVGs/house.svg", 1920, 1080);

    deleteObject("rampatrap");

    addObject("bike", "SVGs/bike.svg", 1100, 600, 270);
    addObject("car", "SVGs/car.svg", 1900, 650, 500);

    playAudio(
        "../../audios/rampatrap/rampatrapHouseDecideScene.mp3",
        () => {
            addTextBox("decisionBox", "Klicke auf das Fahrrad oder das Auto!", 650, 45);

            document.getElementById("car").onclick = wrongDecisionScene;
            document.getElementById("bike").onclick = RightDecisionScene;
        },
        () => {
            setTimeout(() => {
                document.getElementById("bike").style.animation =
                    "orangeAnimation 2s linear";
            }, 4500);

            setTimeout(() => {
                document.getElementById("car").style.animation =
                    "purpleAnimation 2s linear";
            }, 6500);
        }
    );
}

// ================= WRONG DECISION =================

function wrongDecisionScene() {
    deleteTextBox("decisionBox");

    addObject("rampatrap", "SVGs/rampatrapSad.svg", 800, 700, 230);

    playAudio(
        "../../audios/rampatrap/rampatrapWrongDecision.mp3",
        () => {
            addTextBox(
                "decisionBox",
                "Klicke auf das Fahrrad um keine schädlichen Abgase in die Luft zu stoßen!",
                650,
                45
            );
            document.getElementById("decisionBox").style.animation =
                "blendIn 0.5s linear";
            document.getElementById("bike").onclick = RightDecisionScene;
        }
    );
}

// ================= RIGHT DECISION =================

function RightDecisionScene() {
    deleteObject("bike");
    deleteObject("car");
    deleteTextBox("decisionBox");
    deleteObject("rampatrap");

    changeBackground("SVGs/village.svg", 1920, 1080);
    addObject("rampatrap", "SVGs/rampatrap.svg", 1015, 1000, 230);

    playAudio("../../audios/rampatrap/rampatrapRightDecision.mp3", () => {
        window.location.href = "../Worldmap/index.html";
    });
}