
    loadVillageScene();

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
        document.getElementById("bike").onclick = RightDecisionScene;
    });
}


    function RightDecisionScene() {
    loadVillageScene();

    playAudio('audios/rampatrapRightDecision.mp3', () => {
        window.location.href = "../Worldmap/index.html";
    });
}
