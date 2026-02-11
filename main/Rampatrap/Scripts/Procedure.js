introductionVillageScene();


//------------------------------------------------------------------------------------

function introductionVillageScene() {

    changeBackground("SVGs/village.svg", 1920, 1080);

    addObject("rampatrap", "SVGs/rampatrapNoArm.svg", 1015, 1000, 230);
    addObject("rampatrapArm", "SVGs/rampatrapArm.svg", 640, 340, 50);


    const audio = new Audio('audios/rampatrapVillageStartScene.mp3');
    audio.play();

    setTimeout(explanationVillageScene, 4000);

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

