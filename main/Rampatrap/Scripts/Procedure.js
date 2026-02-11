introductionVillageScene();


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
//------------------------------------------------------------------------------------

function introductionVillageScene() {

    changeBackground("SVGs/village.svg", 1920, 1080);

    addObject("rampatrap", "SVGs/rampatrapNoArm.svg", 1015, 1000, 230);
    addObject("rampatrapArm", "SVGs/rampatrapArm.svg", 640, 340, 50);


    const audio = new Audio('audios/rampatrapVillageStartScene.mp3');
    audio.play();

    setTimeout(explanationVillageScene, 4000);


    document.addEventListener("click", startGame, { once: true });

    function startGame() {
        loadVillageScene();

        playAudio(
            'audios/rampatrapVillageStartScene.mp3',
            () => {
                loadHouseScene();
                houseScene();
            }
        );

        setTimeout(setIdel, 4000);
    }


    function setIdel() {
        document.getElementById("rampatrapArm").style.display = "none";
        document.getElementById("rampatrap").src = "SVGs/rampatrapSad.svg";
    }


    function houseScene() {
        playAudio(
            'audios/rampatrapHouseDecideScene.mp3',
            () => {
                document.getElementById("decisionBox").style.display = "block";
                document.getElementById("decisionBox").style.animation = "blendIn 0.5s linear";

                document.getElementById("car").onclick = wrongDecisionScene;
                document.getElementById("bike").onclick = RightDecisionScene;
            },
            () => {
                setTimeout(() => {
                    document.getElementById("bike").style.animation = "orangeAnimation 2s linear";
                }, 4500);

                setTimeout(() => {
                    document.getElementById("car").style.animation = "purpleAnimation 2s linear";
                }, 6500);
            }
        );
    }



    function wrongDecisionScene() {
    loadWrongDecisionScene();
    document.getElementById("decisionBox").style.display = "none";

    playAudio('audios/rampatrapWrongDecision.mp3', () => {
        document.getElementById("decisionBox").style.display = "block";
        document.getElementById("decisionBox").innerHTML =
            "Klicke auf das Fahrrad um keine schädlichen Abgase in die Luft zu stoßen!";
    audio.addEventListener('ended', function () {
        houseScene();
    });

}

function explanationVillageScene() {
    changeBackground("SVGs/village.svg", 1920, 1080);

    deleteObject("rampatrap");
    deleteObject("rampatrapArm");

    addObject("rampatrap", "SVGs/rampatrapSad.svg", 1015, 1000, 230);
}

//------------------------------------------------------------------------------------

function houseScene() {
    changeBackground("SVGs/house.svg", 1920, 1080);

    deleteObject("rampatrap");

    addObject("bike", "SVGs/bike.svg", 1100, 600, 270);
    addObject("car", "SVGs/car.svg", 1900, 650, 500);

    const audio = new Audio('audios/rampatrapHouseDecideScene.mp3');
    audio.play();

    setTimeout(animateBike, 4500);
    setTimeout(animateCar, 6500);

    function animateBike() {
        document.getElementById("bike").style.animation = "orangeAnimation 2s linear";
    }

    function animateCar() {
        document.getElementById("car").style.animation = "purpleAnimation 2s linear";
    }

    audio.addEventListener('ended', function () {
        document.getElementById("bike").style.animation = "none";
        document.getElementById("car").style.animation = "none";

        addTextBox("decisionBox", "Klicke auf das Fahrrad oder das Auto!", 650, 45);

        document.getElementById("car").addEventListener("click", wrongDecisionScene);
        document.getElementById("bike").addEventListener("click", RightDecisionScene);

    });
}

//------------------------------------------------------------------------------------

function wrongDecisionScene() {
    addObject("rampatrap", "SVGs/rampatrapSad.svg", 800, 700, 230);
    deleteTextBox("decisionBox");

    const audio = new Audio('audios/rampatrapWrongDecision.mp3');
    audio.play();

    audio.addEventListener('ended', function () {
        addTextBox("decisionBox", "Klicke auf das Fahrrad um keine schädlichen Abgase in die Luft zu stoßen!", 650, 45)
        document.getElementById("decisionBox").style.animation = "blendIn 0.5s linear";
        document.getElementById("bike").onclick = RightDecisionScene;
    });
}


    function RightDecisionScene() {
    loadVillageScene();

    playAudio('audios/rampatrapRightDecision.mp3', () => {
        window.location.href = "../Worldmap/index.html";
    });
}
//------------------------------------------------------------------------------------

function RightDecisionScene() {
    deleteObject("car");
    deleteObject("bike");
    deleteTextBox("decisionBox")
    deleteTextBox("rampatrap")

    changeBackground("SVGs/village.svg", 1920, 1080);
    addObject("rampatrap", "SVGs/rampatrap.svg", 1015, 1000, 230);

    const audio = new Audio('audios/rampatrapRightDecision.mp3');
    audio.play();
    audio.addEventListener('ended', function () {
        window.location.href = "../Worldmap/index.html";
    });
}

