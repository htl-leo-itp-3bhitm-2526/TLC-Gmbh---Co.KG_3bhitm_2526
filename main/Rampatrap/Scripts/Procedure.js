villageStartScene();

const audio = new Audio('audios/rampatrapVillageStartScene.mp3');
audio.play();

audio.addEventListener('ended', function() {
    houseScene();
});

const audio2 = new Audio('audios/rampatrapHouseDecideScene.mp3');
audio2.play();

audio2.addEventListener('ended', function() {
   villageStartScene();
});