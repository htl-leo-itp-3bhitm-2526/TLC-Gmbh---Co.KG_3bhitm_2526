
    loadVillageScene();

    const audio = new Audio('audios/rampatrapVillageStartScene.mp3');
    audio.play();

    setTimeout(setIdel, 4000);

    function setIdel() {
        document.getElementById("rampatrapArm").style.display = "none";
        document.getElementById("rampatrap").src = "SVGs/rampatrapSad.svg";
    }


    audio.addEventListener('ended', function () {
        loadHouseScene();
        houseScene();
    });


    function houseScene() {
        const audio = new Audio('audios/rampatrapHouseDecideScene.mp3');
        audio.play();

        setTimeout(animateBike, 4500);
        setTimeout(animateCar, 6500);

        function animateBike(){
            document.getElementById("bike").style.animation = "orangeAnimation 2s linear";
        }

        function animateCar(){
            document.getElementById("car").style.animation = "purpleAnimation 2s linear";
        }

        audio.addEventListener('ended', function () {
            document.getElementById("bike").style.animation = "none";
            document.getElementById("car").style.animation = "none";

            document.getElementById("decisionBox").style.display = "block";
            document.getElementById("decisionBox").style.animation = "blendIn 0.5s linear";

            document.getElementById("car").onclick = wrongDecisionScene;
            document.getElementById("bike").onclick = RightDecisionScene;
        });
    }

    function wrongDecisionScene(){
        loadWrongDecisionScene();
        document.getElementById("decisionBox").style.display = "none";

        const audio = new Audio('audios/rampatrapWrongDecision.mp3');
        audio.play();

        audio.addEventListener('ended', function () {
            document.getElementById("decisionBox").style.display = "block";
            document.getElementById("decisionBox").style.animation = "blendIn 0.5s linear";
            document.getElementById("decisionBox").innerHTML = "Klicke auf das Fahrrad um keine schädlichen Abgase in die Luft zu stoßen!";
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