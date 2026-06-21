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

const DEVICES = ['tv', 'lamp', 'roboter', 'powerStrip'];
const DEVICE_POSITIONS = {
    tv:         { right: 1873, bottom: 747, width: 446 },
    lamp:       { right: 314,  bottom: 849, width: 119 },
    roboter:    { right: 1209, bottom: 341, width: 165 },
    powerStrip: { right: 800,  bottom: 450, width: 165 },
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

    changeBackground(s.background_svg || 'SVGs/livingRoomWithNothing).svg', s.bg_width || 1920, s.bg_height || 1080);

    const getPos = (key) => {
        const o = objs[key];
        return o ? { right: o.pos_right, bottom: o.pos_bottom, width: o.width } : DEVICE_POSITIONS[key];
    };

    addObject('tv',         'SVGs/tvRed.svg',         getPos('tv').right,         getPos('tv').bottom,         getPos('tv').width,         'device');
    addObject('lamp',       'SVGs/lampRed.svg',        getPos('lamp').right,       getPos('lamp').bottom,       getPos('lamp').width,       'device');
    addObject('roboter',    'SVGs/roboterRed.svg',     getPos('roboter').right,    getPos('roboter').bottom,    getPos('roboter').width,    'device');
    addObject('powerStrip', 'SVGs/powerStripRed.svg',  getPos('powerStrip').right, getPos('powerStrip').bottom, getPos('powerStrip').width, 'device');

    addTextBox('instructionBox', 'Schalte alle Standby-Lichter aus!', 700, 30);

    attachGameHandlers();
}

function attachGameHandlers() {
    if (!gameActive) return;
    DEVICES.forEach(id => {
        const el = document.getElementById(id);
        if (el && !devicesOff.has(id)) el.onclick = () => turnOffDevice(id);
    });
}

function turnOffDevice(id) {
    if (!gameActive || devicesOff.has(id)) return;
    devicesOff.add(id);

    const obj = objects.find(o => o.id === id);
    const svgName = id === 'powerStrip' ? 'powerStrip' : id;
    if (obj) obj.img = `SVGs/${svgName}.svg`;

    const el = document.getElementById(id);
    if (el) {
        el.src          = `SVGs/${svgName}.svg`;
        el.onclick      = null;
        el.style.cursor = 'default';
    }

    if (DEVICES.every(d => devicesOff.has(d))) winScene();
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

    const goToMap = () => { window.location.href = '../worldmap/index.html'; };
    setTimeout(goToMap, 5000);

    try {
        const audio = new Audio(CONFIG.audio.win || 'audios/sailosiWin.mp3');
        audio.addEventListener('ended', goToMap);
        const p = audio.play();
        if (p) p.catch(() => {});
    } catch (e) {}
}
