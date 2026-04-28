-- ============================================================
--  TLC Datenbank – phpMyAdmin: SQL-Fenster (Datenbank: TLC)
-- ============================================================

DROP TABLE IF EXISTS scene_objects;
DROP TABLE IF EXISTS audio_files;
DROP TABLE IF EXISTS game_results;
DROP TABLE IF EXISTS scenes;
DROP TABLE IF EXISTS characters;

-- ──────────────────────────────────────────────────────────
--  TABELLEN
-- ──────────────────────────────────────────────────────────

CREATE TABLE characters (
    id               INT AUTO_INCREMENT PRIMARY KEY,
    name             VARCHAR(50)  NOT NULL,
    slug             VARCHAR(20)  NOT NULL UNIQUE,
    worldmap_svg     VARCHAR(200),
    worldmap_arm_svg VARCHAR(200),
    worldmap_no_arm_svg VARCHAR(200),
    worldmap_right   INT,
    worldmap_bottom  INT,
    worldmap_width   INT,
    worldmap_arm_right  INT,
    worldmap_arm_bottom INT,
    worldmap_arm_width  INT,
    link_url         VARCHAR(200)
);

CREATE TABLE scenes (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    character_id INT NOT NULL,
    scene_key    VARCHAR(50)  NOT NULL,
    background_svg VARCHAR(200),
    bg_width     FLOAT,
    bg_height    FLOAT,
    scene_order  INT DEFAULT 0,
    FOREIGN KEY (character_id) REFERENCES characters(id)
);

CREATE TABLE scene_objects (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    scene_id    INT NOT NULL,
    object_key  VARCHAR(50) NOT NULL,
    svg_path    VARCHAR(200),
    pos_right   FLOAT,
    pos_bottom  FLOAT,
    width       FLOAT,
    css_class   VARCHAR(50),
    FOREIGN KEY (scene_id) REFERENCES scenes(id)
);

CREATE TABLE audio_files (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    character_id INT NOT NULL,
    audio_key    VARCHAR(50) NOT NULL,
    file_path    VARCHAR(200),
    FOREIGN KEY (character_id) REFERENCES characters(id)
);

CREATE TABLE game_results (
    id               INT AUTO_INCREMENT PRIMARY KEY,
    character_id     INT NOT NULL,
    result_type      VARCHAR(20) NOT NULL,
    max_overshoot_ms INT,
    audio_key        VARCHAR(50),
    FOREIGN KEY (character_id) REFERENCES characters(id)
);

-- ──────────────────────────────────────────────────────────
--  CHARACTERS  (id 1=José, 2=Lucia, 3=Rampatrap)
-- ──────────────────────────────────────────────────────────

INSERT INTO characters
    (name, slug, worldmap_svg, worldmap_arm_svg, worldmap_no_arm_svg,
     worldmap_right, worldmap_bottom, worldmap_width,
     worldmap_arm_right, worldmap_arm_bottom, worldmap_arm_width,
     link_url)
VALUES
    ('José',      'jose',      '../José/SVGs/José.svg',           '../José/SVGs/JoséArm.svg',           '../José/SVGs/JoséWithoutArm.svg',      2400, 1040, 100, 2300, 955, 25, '../José/Josè.html'),
    ('Lucia',     'lucia',     '../Lucia/SVGs/Lucia.svg',         '../Lucia/SVGs/LuciaArm.svg',         '../Lucia/SVGs/LuciaNoArm.svg',         2050,  820, 100, 2050, 735, 25, '../Lucia/Lucia.html'),
    ('Rampatrap', 'rampatrap', '../Rampatrap/SVGs/rampatrap.svg', '../Rampatrap/SVGs/rampatrapArm.svg', '../Rampatrap/SVGs/rampatrapNoArm.svg', 1140, 1040, 100, 1070, 955, 25, '../Rampatrap/Rampatrap.html');

-- ──────────────────────────────────────────────────────────
--  SCENES – José  (scene_order 1-3)
-- ──────────────────────────────────────────────────────────

INSERT INTO scenes (character_id, scene_key, background_svg, bg_width, bg_height, scene_order) VALUES
    (1, 'introduction',      'SVGs/field.svg', 1920, 1080, 1),
    (1, 'introduction_sad',  'SVGs/field.svg', 1920, 1080, 2),
    (1, 'bath',              'SVGs/bath.svg',  1920, 1080, 3);

-- scene_objects – introduction (scene_id 1)
INSERT INTO scene_objects (scene_id, object_key, svg_path, pos_right, pos_bottom, width) VALUES
    (1, 'jose',       'SVGs/JoséWithoutArm.svg', 1615, 1400, 500),
    (1, 'joseArm',    'SVGs/JoséArm.svg',        1430,  740,  50);

-- scene_objects – introduction_sad (scene_id 2)
INSERT INTO scene_objects (scene_id, object_key, svg_path, pos_right, pos_bottom, width) VALUES
    (2, 'jose',       'SVGs/JoséSad.svg',        1615, 1400, 500);

-- scene_objects – bath (scene_id 3)
INSERT INTO scene_objects (scene_id, object_key, svg_path, pos_right, pos_bottom, width) VALUES
    (3, 'showerHand1', 'SVGs/ShowerHand.svg',    1430, 840, 200),
    (3, 'showerHand2', 'SVGs/ShowerHand.svg',    1030, 840, 200);

-- audio – José
INSERT INTO audio_files (character_id, audio_key, file_path) VALUES
    (1, 'start',   'audios/joseStart.mp3'),
    (1, 'explain', 'audios/joseExplain.mp3'),
    (1, 'good',    'audios/joseGood.mp3'),
    (1, 'medium',  'audios/joseMedium.mp3'),
    (1, 'bad',     'audios/joseBad.mp3');

-- game_results – José (Timer-Auswertung)
INSERT INTO game_results (character_id, result_type, max_overshoot_ms, audio_key) VALUES
    (1, 'good',   1000, 'good'),
    (1, 'medium', 2500, 'medium'),
    (1, 'bad',    NULL, 'bad');

-- ──────────────────────────────────────────────────────────
--  SCENES – Lucia  (scene_order 1-4)
-- ──────────────────────────────────────────────────────────

INSERT INTO scenes (character_id, scene_key, background_svg, bg_width, bg_height, scene_order) VALUES
    (2, 'intro_village',      'SVGs/village.svg', 1920, 1080,  1),
    (2, 'house_explanation',  'SVGs/house.svg',   1920,  843.6, 2),
    (2, 'game_round',         'SVGs/house.svg',   1920,  843.6, 3),
    (2, 'end_village',        'SVGs/village.svg', 1920, 1080,  4);

-- scene_objects – intro_village (scene_id 4)
INSERT INTO scene_objects (scene_id, object_key, svg_path, pos_right, pos_bottom, width, css_class) VALUES
    (4, 'lucia',    'SVGs/LuciaNoArm.svg', 1015, 1000, 230, NULL),
    (4, 'luciaArm', 'SVGs/LuciaArm.svg',   900,  500,  50, NULL);

-- scene_objects – house_explanation (scene_id 5)
INSERT INTO scene_objects (scene_id, object_key, svg_path, pos_right, pos_bottom, width, css_class) VALUES
    (5, 'lucia',  'SVGs/Lucia.svg',   1800,  700, 200, NULL),
    (5, 'attic',  'SVGs/attic.svg',   1580,  900, 500, 'light'),
    (5, 'room1',  'SVGs/room1.svg',   1475,  680, 250, 'light'),
    (5, 'room2',  'SVGs/room2.svg',   1175,  680, 250, 'light'),
    (5, 'room3',  'SVGs/room3.svg',   1475,  460, 250, 'light'),
    (5, 'room4',  'SVGs/room4.svg',   1175,  460, 250, 'light');

-- scene_objects – game_round (scene_id 6)
INSERT INTO scene_objects (scene_id, object_key, svg_path, pos_right, pos_bottom, width, css_class) VALUES
    (6, 'attic',  'SVGs/attic.svg',   1580,  900, 500, 'light'),
    (6, 'room1',  'SVGs/room1.svg',   1475,  680, 250, 'light'),
    (6, 'room2',  'SVGs/room2.svg',   1175,  680, 250, 'light'),
    (6, 'room3',  'SVGs/room3.svg',   1475,  460, 250, 'light'),
    (6, 'room4',  'SVGs/room4.svg',   1175,  460, 250, 'light');

-- scene_objects – end_village (scene_id 7)
INSERT INTO scene_objects (scene_id, object_key, svg_path, pos_right, pos_bottom, width) VALUES
    (7, 'lucia',  'SVGs/Lucia.svg',   1015, 1000, 230);

-- audio – Lucia
INSERT INTO audio_files (character_id, audio_key, file_path) VALUES
    (2, 'intro',      '../Rampatrap/audios/rampatrapVillageStartScene.mp3'),
    (2, 'explain',    '../Rampatrap/audios/rampatrapHouseDecideScene.mp3'),
    (2, 'round_win',  '../Rampatrap/audios/rampatrapRightDecision.mp3');

-- ──────────────────────────────────────────────────────────
--  SCENES – Rampatrap  (scene_order 1-5)
-- ──────────────────────────────────────────────────────────

INSERT INTO scenes (character_id, scene_key, background_svg, bg_width, bg_height, scene_order) VALUES
    (3, 'intro_village',       'SVGs/village.svg', 1920, 1080, 1),
    (3, 'explanation_village', 'SVGs/village.svg', 1920, 1080, 2),
    (3, 'house',               'SVGs/house.svg',   1920, 1080, 3),
    (3, 'wrong_decision',      'SVGs/house.svg',   1920, 1080, 4),
    (3, 'right_decision',      'SVGs/village.svg', 1920, 1080, 5);

-- scene_objects – intro_village (scene_id 8)
INSERT INTO scene_objects (scene_id, object_key, svg_path, pos_right, pos_bottom, width) VALUES
    (8, 'rampatrap',    'SVGs/rampatrapNoArm.svg', 1015, 1000, 230),
    (8, 'rampatrapArm', 'SVGs/rampatrapArm.svg',    640,  340,  50);

-- scene_objects – explanation_village (scene_id 9)
INSERT INTO scene_objects (scene_id, object_key, svg_path, pos_right, pos_bottom, width) VALUES
    (9, 'rampatrap',    'SVGs/rampatrapSad.svg',   1015, 1000, 230);

-- scene_objects – house (scene_id 10)
INSERT INTO scene_objects (scene_id, object_key, svg_path, pos_right, pos_bottom, width) VALUES
    (10, 'bike', 'SVGs/bike.svg', 1100, 600, 270),
    (10, 'car',  'SVGs/car.svg',  1900, 650, 500);

-- scene_objects – wrong_decision (scene_id 11)
INSERT INTO scene_objects (scene_id, object_key, svg_path, pos_right, pos_bottom, width) VALUES
    (11, 'rampatrap', 'SVGs/rampatrapSad.svg', 800, 700, 230);

-- scene_objects – right_decision (scene_id 12)
INSERT INTO scene_objects (scene_id, object_key, svg_path, pos_right, pos_bottom, width) VALUES
    (12, 'rampatrap', 'SVGs/rampatrap.svg', 1015, 1000, 230);

-- audio – Rampatrap
INSERT INTO audio_files (character_id, audio_key, file_path) VALUES
    (3, 'village_start',  'audios/rampatrapVillageStartScene.mp3'),
    (3, 'house_decide',   'audios/rampatrapHouseDecideScene.mp3'),
    (3, 'right',          'audios/rampatrapRightDecision.mp3'),
    (3, 'wrong',          'audios/rampatrapWrongDecision.mp3');
