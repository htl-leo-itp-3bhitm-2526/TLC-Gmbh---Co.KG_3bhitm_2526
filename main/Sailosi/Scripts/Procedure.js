let CONFIG = { scenes: {}, audio: {} };

fetch('../api/get_character.php?slug=sailosi')
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

// Device IDs and their verified pixel-perfect positions within livingRoom.svg (1920x1080)
const DEVICES = ['tv', 'lamp', 'roboter'];
const DEVICE_POSITIONS = {
    tv:         { right: 1873, bottom: 747, width: 446 },
    lamp:       { right: 314,  bottom: 849, width: 119 },
    roboter:    { right: 1209, bottom: 341, width: 165 },
    powerStrip: { right: 713,  bottom: 485, width: 177 },
};

const devicesOff = new Set();
let gameActive   = false;

// ─────────────────────── INTRO VILLAGE ───────────────────────

function introVillageScene() {
    const s    = CONFIG.scenes.intro_village || {};
    const objs = s.objectMap || {};

    changeBackground(s.background_svg || 'SVGs/village.svg', s.bg_width || 1920, s.bg_height || 1080);

    const sailosi = objs.sailosi    || { svg_path: 'SVGs/SailosiNoArm.svg', pos_right: 1015, pos_bottom: 900, width: 200 };
    const arm     = objs.sailosiArm || { svg_path: 'SVGs/SailosiArm.svg',   pos_right: 800,  pos_bottom: 733, width: 50  };

    addObject('sailosi',    sailosi.svg_path, sailosi.pos_right, sailosi.pos_bottom, sailosi.width);
    addObject('sailosiArm', arm.svg_path,     arm.pos_right,     arm.pos_bottom,     arm.width);

    setTimeout(introSadScene, 4000);

    const audio = new Audio(CONFIG.audio.intro || 'audios/sailosiIntro.mp3');
    let sceneDone = false;
    const goToRoom = () => { if (!sceneDone) { sceneDone = true; livingRoomIntroScene(); } };
    audio.addEventListener('ended', goToRoom);
    const p = audio.play();
    if (p) p.catch(() => setTimeout(goToRoom, 8000));
}

function introSadScene() {
    const s    = CONFIG.scenes.intro_sad || {};
    const objs = s.objectMap || {};
    const sailosi = objs.sailosi || { svg_path: 'SVGs/SailosiSad.svg', pos_right: 1015, pos_bottom: 900, width: 200 };

    deleteObject('sailosiArm');
    deleteObject('sailosi');
    addObject('sailosi', sailosi.svg_path, sailosi.pos_right, sailosi.pos_bottom, sailosi.width);
}

// ─────────────────────── LIVING ROOM INTRO ───────────────────────

function livingRoomIntroScene() {
    const s    = CONFIG.scenes.living_room_intro || {};
    const objs = s.objectMap || {};

    objects   = [];
    textBoxes = [];
    document.getElementById('elements').innerHTML = '';

    // livingRoom.svg already contains all devices with their standby lights embedded
    changeBackground(s.background_svg || 'SVGs/livingRoom.svg', s.bg_width || 1920, s.bg_height || 1080);

    const sailosi = objs.sailosi || { svg_path: 'SVGs/Sailosi.svg', pos_right: 800, pos_bottom: 600, width: 130 };
    addObject('sailosi', sailosi.svg_path, sailosi.pos_right, sailosi.pos_bottom, sailosi.width);

    const audio = new Audio(CONFIG.audio.explain || 'audios/sailosiExplain.mp3');
    let sceneDone = false;
    const goToGame = () => { if (!sceneDone) { sceneDone = true; startGame(); } };
    audio.addEventListener('ended', goToGame);
    const p = audio.play();
    if (p) p.catch(() => setTimeout(goToGame, 10000));
}

// ─────────────────────── GAME ───────────────────────

function startGame() {
    const s    = CONFIG.scenes.game || {};
    const objs = s.objectMap || {};

    objects   = [];
    textBoxes = [];
    document.getElementById('elements').innerHTML = '';
    devicesOff.clear();
    gameActive = true;

    // Empty room background — device overlays are placed on top at exact positions
    changeBackground(s.background_svg || 'SVGs/livingRoomWithNothing).svg', s.bg_width || 1920, s.bg_height || 1080);

    const getPos = (key) => {
        const o = objs[key];
        return o ? { right: o.pos_right, bottom: o.pos_bottom, width: o.width } : DEVICE_POSITIONS[key];
    };

    const tvPos    = getPos('tv');
    const lampPos  = getPos('lamp');
    const botPos   = getPos('roboter');
    const stripPos = getPos('powerStrip');

    addObject('tv',         'SVGs/tvRed.svg',        tvPos.right,    tvPos.bottom,    tvPos.width,    'device');
    addObject('lamp',       'SVGs/lampRed.svg',       lampPos.right,  lampPos.bottom,  lampPos.width,  'device');
    addObject('roboter',    'SVGs/roboterRed.svg',    botPos.right,   botPos.bottom,   botPos.width,   'device');
    addObject('powerStrip', 'SVGs/powerStripRed.svg', stripPos.right, stripPos.bottom, stripPos.width, 'powerstrip');

    addTextBox('instructionBox', 'Schalte alle Standby-Lichter aus und drücke dann den Hauptschalter!', 700, 30);

    attachGameHandlers();
}

function attachGameHandlers() {
    if (!gameActive) return;
    DEVICES.forEach(id => {
        const el = document.getElementById(id);
        if (el && !devicesOff.has(id)) el.onclick = () => turnOffDevice(id);
    });
    const ps = document.getElementById('powerStrip');
    if (ps) ps.onclick = tryPowerStrip;
}

function turnOffDevice(id) {
    if (!gameActive || devicesOff.has(id)) return;
    devicesOff.add(id);

    // Update objects array so window resize keeps the device off
    const obj = objects.find(o => o.id === id);
    if (obj) obj.img = `SVGs/${id}.svg`;

    const el = document.getElementById(id);
    if (el) {
        el.src     = `SVGs/${id}.svg`;
        el.onclick = null;
        el.style.cursor = 'default';
    }
}

function tryPowerStrip() {
    if (!gameActive) return;
    if (DEVICES.every(id => devicesOff.has(id))) {
        winScene();
    } else {
        wrongAttempt();
    }
}

function wrongAttempt() {
    gameActive = false;

    // Reset all devices to red in the objects array BEFORE the DOM rebuild
    DEVICES.forEach(id => {
        devicesOff.delete(id);
        const obj = objects.find(o => o.id === id);
        if (obj) obj.img = `SVGs/${id}Red.svg`;
    });

    // addObject triggers loadHTMLs which rebuilds the DOM using the updated (red) img values
    addObject('sailosiSad', 'SVGs/SailosiSad.svg', 960, 600, 150);
    deleteTextBox('instructionBox');
    addTextBox('feedbackBox', 'Oh je! Mach erst alle roten Lichter aus, dann den Hauptschalter!', 700, 30);

    let resumed = false;
    const resume = () => {
        if (resumed) return;
        resumed = true;
        deleteObject('sailosiSad');
        deleteTextBox('feedbackBox');
        addTextBox('instructionBox', 'Schalte alle Standby-Lichter aus und drücke dann den Hauptschalter!', 700, 30);
        gameActive = true;
        attachGameHandlers();
    };

    // Safety net: immer nach 4 Sekunden fortsetzen, egal ob Audio funktioniert oder nicht
    setTimeout(resume, 4000);

    try {
        const audio = new Audio(CONFIG.audio.wrong || 'audios/sailosiWrong.mp3');
        audio.addEventListener('ended', resume);
        const p = audio.play();
        if (p) p.catch(() => {});
    } catch (e) {}
}

// ─────────────────────── WIN ───────────────────────

function winScene() {
    const s    = CONFIG.scenes.win || {};
    const objs = s.objectMap || {};
    gameActive = false;

    objects   = [];
    textBoxes = [];
    document.getElementById('elements').innerHTML = '';

    changeBackground(s.background_svg || 'SVGs/village.svg', s.bg_width || 1920, s.bg_height || 1080);

    const sailosi = objs.sailosi || { svg_path: 'SVGs/Sailosi.svg', pos_right: 1015, pos_bottom: 900, width: 200 };
    addObject('sailosi', sailosi.svg_path, sailosi.pos_right, sailosi.pos_bottom, sailosi.width);

    const audio = new Audio(CONFIG.audio.win || 'audios/sailosiWin.mp3');
    audio.play();
    audio.addEventListener('ended', () => {
        window.location.href = '../worldmap/index.html';
    });
}
