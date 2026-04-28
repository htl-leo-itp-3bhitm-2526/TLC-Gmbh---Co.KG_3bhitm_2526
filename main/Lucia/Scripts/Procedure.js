let CONFIG = { scenes: {}, audio: {} };

fetch('../api/get_character.php?slug=lucia')
    .then(r => r.json())
    .then(data => {
        data.scenes.forEach(s => {
            const objMap = {};
            s.objects.forEach(o => { objMap[o.object_key] = o; });
            CONFIG.scenes[s.scene_key] = { ...s, objectMap: objMap };
        });
        CONFIG.audio = data.audio;
        introVillageScene();
    })
    .catch(() => introVillageScene());

let round        = 0;
const maxRounds  = 3;

const playerPositions = [
    { roomId: 'attic', right: 1150, bottom: 779 },
    { roomId: 'room1', right: 1250, bottom: 573 },
    { roomId: 'room2', right:  950, bottom: 573 },
    { roomId: 'room3', right: 1250, bottom: 353 },
    { roomId: 'room4', right:  950, bottom: 353 },
];

let randomPositions = [];

// ─────────────────────── INTRO VILLAGE ───────────────────────

function introVillageScene() {
    const s    = CONFIG.scenes.intro_village || {};
    const objs = s.objectMap || {};

    changeBackground(s.background_svg || 'SVGs/village.svg', s.bg_width || 1920, s.bg_height || 1080);

    const lucia = objs.lucia    || { svg_path: 'SVGs/LuciaNoArm.svg', pos_right: 1015, pos_bottom: 1000, width: 230 };
    const arm   = objs.luciaArm || { svg_path: 'SVGs/LuciaArm.svg',   pos_right:  900, pos_bottom:  500, width:  50 };

    addObject('lucia',    lucia.svg_path, lucia.pos_right, lucia.pos_bottom, lucia.width);
    addObject('luciaArm', arm.svg_path,   arm.pos_right,   arm.pos_bottom,   arm.width);

    setTimeout(() => {
        deleteObject('luciaArm');
        deleteObject('lucia');
        addObject('lucia', 'SVGs/Lucia.svg', lucia.pos_right, lucia.pos_bottom, lucia.width);
    }, 3000);

    const audio = new Audio(CONFIG.audio.intro || '../Rampatrap/audios/rampatrapVillageStartScene.mp3');
    audio.play();
    audio.addEventListener('ended', houseExplanationScene);
}

// ─────────────────────── HOUSE EXPLANATION ───────────────────────

function houseExplanationScene() {
    const s    = CONFIG.scenes.house_explanation || {};
    const objs = s.objectMap || {};

    changeBackground(s.background_svg || 'SVGs/house.svg', s.bg_width || 1920, s.bg_height || 843.6);
    deleteObject('lucia');

    const addRoom = (key, fallbackSvg, fr, fb, fw, fcls) => {
        const o = objs[key] || { svg_path: fallbackSvg, pos_right: fr, pos_bottom: fb, width: fw, css_class: fcls };
        addObject(key, o.svg_path, o.pos_right, o.pos_bottom, o.width, o.css_class || fcls);
    };

    const luciaObj = objs.lucia || { svg_path: 'SVGs/Lucia.svg', pos_right: 1800, pos_bottom: 700, width: 200 };
    addObject('lucia', luciaObj.svg_path, luciaObj.pos_right, luciaObj.pos_bottom, luciaObj.width);

    addRoom('attic', 'SVGs/attic.svg', 1580, 900, 500, 'light');
    addRoom('room1', 'SVGs/room1.svg', 1475, 680, 250, 'light');
    addRoom('room2', 'SVGs/room2.svg', 1175, 680, 250, 'light');
    addRoom('room3', 'SVGs/room3.svg', 1475, 460, 250, 'light');
    addRoom('room4', 'SVGs/room4.svg', 1175, 460, 250, 'light');

    const audio = new Audio(CONFIG.audio.explain || '../Rampatrap/audios/rampatrapHouseDecideScene.mp3');
    audio.play();
    audio.addEventListener('ended', () => {
        deleteObject('lucia');
        startGameRound();
    });
}

// ─────────────────────── GAME ROUND ───────────────────────

function startGameRound() {
    const s    = CONFIG.scenes.game_round || {};
    const objs = s.objectMap || {};

    objects   = [];
    textBoxes = [];
    document.getElementById('elements').innerHTML = '';

    changeBackground(s.background_svg || 'SVGs/house.svg', s.bg_width || 1920, s.bg_height || 843.6);

    const addRoom = (key, fallbackSvg, fr, fb, fw, fcls) => {
        const o = objs[key] || { svg_path: fallbackSvg, pos_right: fr, pos_bottom: fb, width: fw, css_class: fcls };
        addObject(key, o.svg_path, o.pos_right, o.pos_bottom, o.width, o.css_class || fcls);
    };

    addRoom('attic', 'SVGs/attic.svg', 1580, 900, 500, 'light');
    addRoom('room1', 'SVGs/room1.svg', 1475, 680, 250, 'light');
    addRoom('room2', 'SVGs/room2.svg', 1175, 680, 250, 'light');
    addRoom('room3', 'SVGs/room3.svg', 1475, 460, 250, 'light');
    addRoom('room4', 'SVGs/room4.svg', 1175, 460, 250, 'light');

    while (randomPositions.length < 2) {
        const rp = Math.floor(Math.random() * 5);
        if (!randomPositions.includes(rp)) randomPositions.push(rp);
    }

    for (let i = 0; i <= 1; i++) {
        addObject('fig' + i, '../Rampatrap/SVGs/rampatrap.svg',
            playerPositions[randomPositions[i]].right,
            playerPositions[randomPositions[i]].bottom, 50, 'figur');
    }

    addTextBox('instructionBox',
        'Schalte das Licht in leeren Räumen aus! (Runde ' + (round + 1) + ' / ' + maxRounds + ')',
        650, 30);

    ['attic', 'room1', 'room2', 'room3', 'room4'].forEach(id => {
        document.getElementById(id).onclick = function () { changeLight(this); };
    });
}

// ─────────────────────── LICHT WECHSELN ───────────────────────

function changeLight(object) {
    if (object.classList.contains('light')) {
        object.src = 'SVGs/' + object.id + 'Dark.svg';
        object.classList.replace('light', 'dark');
    } else {
        object.src = 'SVGs/' + object.id + '.svg';
        object.classList.replace('dark', 'light');
    }
    checkWin();
}

function checkWin() {
    const figRoom0 = playerPositions[randomPositions[0]].roomId;
    const figRoom1 = playerPositions[randomPositions[1]].roomId;
    let correct = true;

    if (!document.getElementById(figRoom0).classList.contains('light')) correct = false;
    if (!document.getElementById(figRoom1).classList.contains('light')) correct = false;

    ['attic', 'room1', 'room2', 'room3', 'room4'].forEach(id => {
        if (id !== figRoom0 && id !== figRoom1) {
            if (!document.getElementById(id).classList.contains('dark')) correct = false;
        }
    });

    if (!correct) return;

    ['attic', 'room1', 'room2', 'room3', 'room4'].forEach(id => {
        document.getElementById(id).onclick = null;
    });

    const audio = new Audio(CONFIG.audio.round_win || '../Rampatrap/audios/rampatrapRightDecision.mp3');
    round++;

    if (round >= maxRounds) {
        endVillageScene();
    } else {
        audio.play();
        audio.addEventListener('ended', () => {
            randomPositions = [];
            startGameRound();
        });
    }
}

// ─────────────────────── END VILLAGE ───────────────────────

function endVillageScene() {
    const s    = CONFIG.scenes.end_village || {};
    const objs = s.objectMap || {};

    objects   = [];
    textBoxes = [];
    document.getElementById('elements').innerHTML = '';

    changeBackground(s.background_svg || 'SVGs/village.svg', s.bg_width || 1920, s.bg_height || 1080);

    const lucia = objs.lucia || { svg_path: 'SVGs/Lucia.svg', pos_right: 1015, pos_bottom: 1000, width: 230 };
    addObject('lucia', lucia.svg_path, lucia.pos_right, lucia.pos_bottom, lucia.width);

    const audio = new Audio(CONFIG.audio.round_win || '../Rampatrap/audios/rampatrapRightDecision.mp3');
    audio.play();
    audio.addEventListener('ended', () => {
        window.location.href = '../worldmap/index.html';
    });
}
