let audio = null;

// zentrale Audio-Funktion

function playAudio(src, onEnd) {
    if (audio) {
        audio.pause();
        audio.onended = null;
    }

    audio = new Audio(src);
    audio.play();

    if (onEnd) {
        audio.onended = onEnd;
    }
}


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
    const arm = document.getElementById("rampatrapArm");
    const rampatrap = document.getElementById("rampatrap");

    if (arm) arm.style.display = "none";
    if (rampatrap) rampatrap.src = "SVGs/rampatrapSad.svg";
}



    audio.addEventListener('ended', function () {
        loadHouseScene();
        houseScene();
    });


    function houseScene() {
        playAudio('audios/rampatrapHouseDecideScene.mp3');
    
        setTimeout(() => {
            document.getElementById("bike").style.animation = "orangeAnimation 2s linear";
        }, 4500);
    
        setTimeout(() => {
            document.getElementById("car").style.animation = "purpleAnimation 2s linear";
        }, 6500);
    
        audio.onended = () => {
            document.getElementById("decisionBox").style.display = "block";
            document.getElementById("decisionBox").style.animation = "blendIn 0.5s linear";
    
            document.getElementById("car").onclick = wrongDecisionScene;
            document.getElementById("bike").onclick = RightDecisionScene;
        };
    }
    

    function wrongDecisionScene() {
        loadWrongDecisionScene();
        document.getElementById("decisionBox").style.display = "none";
    
        playAudio('audios/rampatrapWrongDecision.mp3', () => {
            document.getElementById("decisionBox").style.display = "block";
            document.getElementById("decisionBox").innerHTML =
                "Klicke auf das Fahrrad um keine schädlichen Abgase in die Luft zu stoßen!";
            document.getElementById("bike").onclick = RightDecisionScene;
        });
    }
    

    function RightDecisionScene(){
        loadVillageScene();
        document.getElementById("rampatrapArm").style.display = "none";
        document.getElementById("rampatrap").src = "SVGs/rampatrap.svg";

        const audio = new Audio('audios/rampatrapRightDecision.mp3');
        audio.play();
        audio.addEventListener('ended', function () {
            window.location.href = "../Worldmap/index.html";
        });
    }