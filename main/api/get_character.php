<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../config/db.php';

$slug = $_GET['slug'] ?? '';

if (empty($slug)) {
    echo json_encode(['error' => 'slug-Parameter fehlt']);
    exit;
}

$stmt = $pdo->prepare('SELECT * FROM characters WHERE slug = ?');
$stmt->execute([$slug]);
$character = $stmt->fetch();

if (!$character) {
    http_response_code(404);
    echo json_encode(['error' => 'Charakter nicht gefunden']);
    exit;
}

$charId = $character['id'];

// Szenen laden
$stmt = $pdo->prepare('SELECT * FROM scenes WHERE character_id = ? ORDER BY scene_order');
$stmt->execute([$charId]);
$scenes = $stmt->fetchAll();

// Objekte pro Szene laden
foreach ($scenes as &$scene) {
    $stmt = $pdo->prepare('SELECT * FROM scene_objects WHERE scene_id = ?');
    $stmt->execute([$scene['id']]);
    $scene['objects'] = $stmt->fetchAll();
}
unset($scene);

// Audio-Dateien als Key-Value-Map
$stmt = $pdo->prepare('SELECT audio_key, file_path FROM audio_files WHERE character_id = ?');
$stmt->execute([$charId]);
$audio = [];
foreach ($stmt->fetchAll() as $row) {
    $audio[$row['audio_key']] = $row['file_path'];
}

// Spielergebnisse (z.B. José Timer-Schwellwerte)
$stmt = $pdo->prepare('SELECT result_type, max_overshoot_ms, audio_key FROM game_results WHERE character_id = ? ORDER BY max_overshoot_ms');
$stmt->execute([$charId]);
$results = $stmt->fetchAll();

echo json_encode([
    'character' => $character,
    'scenes'    => $scenes,
    'audio'     => $audio,
    'results'   => $results,
]);
