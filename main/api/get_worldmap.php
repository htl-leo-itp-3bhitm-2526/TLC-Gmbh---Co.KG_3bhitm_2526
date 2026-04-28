<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../config/db.php';

$stmt = $pdo->query('SELECT * FROM characters ORDER BY id');
echo json_encode($stmt->fetchAll());
