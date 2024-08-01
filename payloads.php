<?php
$secret = 'votre_clé_secrète'; // Remplacez par la clé secrète que vous avez configurée dans GitHub

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$headers = getallheaders();
if (!isset($headers['X-Hub-Signature']) || !isset($headers['X-Hub-Signature-256'])) {
    http_response_code(400);
    exit;
}

$payload = file_get_contents('php://input');
$signature = $headers['X-Hub-Signature-256'];

$hash = 'sha256=' . hash_hmac('sha256', $payload, $secret);

if (!hash_equals($hash, $signature)) {
    http_response_code(403);
    exit;
}

// Commande pour mettre à jour le dépôt (exécution de `git pull`)
exec('cd /chemin/vers/votre/site && git pull origin main', $output, $return_var);

if ($return_var === 0) {
    echo "Déploiement réussi.";
} else {
    echo "Erreur lors du déploiement.";
}
?>
