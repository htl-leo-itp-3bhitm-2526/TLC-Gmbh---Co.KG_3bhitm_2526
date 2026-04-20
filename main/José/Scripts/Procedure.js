showerScene();


function introductionScene() {
    changeBackground("SVGs/field.svg", 1920, 1080);

    addObject("jose", "SVGs/JoséWithoutArm.svg", 1615, 1400, 500);
    addObject("joseArm", "SVGs/JoséArm.svg", 1430, 740, 50);


    const audio = new Audio('audios/rampatrapVillageStartScene.mp3');
    audio.play();

    setTimeout(explanationScene, 4000);

    audio.addEventListener('ended', function () {
        showerScene();
    });
}

function explanationScene(){
    deleteObject("jose");
    deleteObject("joseArm");

    addObject("jose", "SVGs/JoséSad.svg", 1615, 1400, 500);
}

function showerScene(){
    deleteObject("jose");

    changeBackground("SVGs/bath.svg", 1920, 1080);

    addObject("showerHand1", "SVGs/showerHand.svg", 1430, 840, 200)
    addObject("showerHand2", "SVGs/showerHand.svg", 1030, 840, 200)

    let min = 0;
    let showering = true;

    while(showering){
        setTimeout(min++, 2000);
    }
}