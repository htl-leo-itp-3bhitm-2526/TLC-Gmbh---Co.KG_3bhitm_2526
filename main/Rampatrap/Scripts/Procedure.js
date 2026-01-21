loadVillageStartScene();

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
        const audio2 = new Audio('audios/rampatrapHouseDecideScene.mp3');
        audio2.play();

        audio2.addEventListener('ended', function () {
            villageStartScene();
        });
    }

