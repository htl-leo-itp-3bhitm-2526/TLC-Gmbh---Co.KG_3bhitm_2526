let CONFIG = { scenes: {}, audio: {} };

fetch('../api/get_character.php?slug=rampatrap')
    .then(r => r.json())
    .then(data => {
        data.scenes.forEach(s => {
            const objMap = {};
            s.objects.forEach(o => { objMap[o.object_key] = o; });
            CONFIG.scenes[s.scene_key] = { ...s, objectMap: objMap };
        });
        CONFIG.audio = data.audio;
        introductionVillageScene();
    })
    .catch(() => introductionVillageScene());

// ─────────────────────── INTRO VILLAGE ───────────────────────

function introductionVillageScene() {
    const s    = CONFIG.scenes.intro_village || {};
    const objs = s.objectMap || {};

    changeBackground(s.background_svg || 'SVGs/village.svg', s.bg_width || 1920, s.bg_height || 1080);

    const ramp = objs.rampatrap    || { svg_path: 'SVGs/rampatrapNoArm.svg', pos_right: 1015, pos_bottom: 1000, width: 230 };
    const arm  = objs.rampatrapArm || { svg_path: 'SVGs/rampatrapArm.svg',   pos_right:  640, pos_bottom:  340, width:  50 };

    addObject('rampatrap',    ramp.svg_path, ramp.pos_right, ramp.pos_bottom, ramp.width);
    addObject('rampatrapArm', arm.svg_path,  arm.pos_right,  arm.pos_bottom,  arm.width);

    const audio = new Audio(CONFIG.audio.village_start || 'audios/rampatrapVillageStartScene.mp3');
    audio.play();

    setTimeout(explanationVillageScene, 4000);
    audio.addEventListener('ended', houseScene);
}

// ─────────────────────── EXPLANATION VILLAGE ───────────────────────

function explanationVillageScene() {
    const s    = CONFIG.scenes.explanation_village || {};
    const objs = s.objectMap || {};

    changeBackground(s.background_svg || 'SVGs/village.svg', s.bg_width || 1920, s.bg_height || 1080);
    deleteObject('rampatrap');
    deleteObject('rampatrapArm');

    const ramp = objs.rampatrap || { svg_path: 'SVGs/rampatrapSad.svg', pos_right: 1015, pos_bottom: 1000, width: 230 };
    addObject('rampatrap', ramp.svg_path, ramp.pos_right, ramp.pos_bottom, ramp.width);
}

// ─────────────────────── HOUSE SCENE ───────────────────────

function houseScene() {
    const s    = CONFIG.scenes.house || {};
    const objs = s.objectMap || {};

    changeBackground(s.background_svg || 'SVGs/house.svg', s.bg_width || 1920, s.bg_height || 1080);
    deleteObject('rampatrap');

    const bike = objs.bike || { svg_path: 'SVGs/bike.svg', pos_right: 1100, pos_bottom: 600, width: 270 };
    const car  = objs.car  || { svg_path: 'SVGs/car.svg',  pos_right: 1900, pos_bottom: 650, width: 500 };

    addObject('bike', bike.svg_path, bike.pos_right, bike.pos_bottom, bike.width);
    addObject('car',  car.svg_path,  car.pos_right,  car.pos_bottom,  car.width);

    const audio = new Audio(CONFIG.audio.house_decide || 'audios/rampatrapHouseDecideScene.mp3');
    audio.play();

    setTimeout(() => { document.getElementById('bike').style.animation = 'orangeAnimation 2s linear'; }, 4500);
    setTimeout(() => { document.getElementById('car').style.animation  = 'purpleAnimation 2s linear'; }, 6500);

    audio.addEventListener('ended', () => {
        document.getElementById('bike').style.animation = 'none';
        document.getElementById('car').style.animation  = 'none';

        addTextBox('decisionBox', 'Klicke auf das Fahrrad oder das Auto!', 650, 45);

        document.getElementById('car').addEventListener('click',  wrongDecisionScene);
        document.getElementById('bike').addEventListener('click', RightDecisionScene);
    });
}

// ─────────────────────── WRONG DECISION ───────────────────────

function wrongDecisionScene() {
    const s    = CONFIG.scenes.wrong_decision || {};
    const objs = s.objectMap || {};

    const ramp = objs.rampatrap || { svg_path: 'SVGs/rampatrapSad.svg', pos_right: 800, pos_bottom: 700, width: 230 };
    addObject('rampatrap', ramp.svg_path, ramp.pos_right, ramp.pos_bottom, ramp.width);
    deleteTextBox('decisionBox');

    const audio = new Audio(CONFIG.audio.wrong || 'audios/rampatrapWrongDecision.mp3');
    audio.play();
    audio.addEventListener('ended', () => {
        addTextBox('decisionBox', 'Klicke auf das Fahrrad um keine schädlichen Abgase in die Luft zu stoßen!', 650, 45);
        document.getElementById('decisionBox').style.animation = 'blendIn 0.5s linear';
        document.getElementById('bike').onclick = RightDecisionScene;
    });
}

// ─────────────────────── RIGHT DECISION ───────────────────────

function RightDecisionScene() {
    const s    = CONFIG.scenes.right_decision || {};
    const objs = s.objectMap || {};

    deleteObject('car');
    deleteObject('bike');
    deleteTextBox('decisionBox');
    deleteObject('rampatrap');

    changeBackground(s.background_svg || 'SVGs/village.svg', s.bg_width || 1920, s.bg_height || 1080);

    const ramp = objs.rampatrap || { svg_path: 'SVGs/rampatrap.svg', pos_right: 1015, pos_bottom: 1000, width: 230 };
    addObject('rampatrap', ramp.svg_path, ramp.pos_right, ramp.pos_bottom, ramp.width);

    const audio = new Audio(CONFIG.audio.right || 'audios/rampatrapRightDecision.mp3');
    audio.play();
    audio.addEventListener('ended', () => {
        window.location.href = '../Worldmap/index.html';
    });
}
