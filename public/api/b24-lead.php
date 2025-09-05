<?php
declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

$b24Base = $_ENV['B24_BASE'] ?? '';
$allowedOrigins = array_map('trim', explode(',', $_ENV['ALLOWED_ORIGINS'] ?? ''));
$maxBody = 65536;
$timeoutSec = 15;

if ($b24Base === '') {
  respond(500, ['ok' => false, 'error' => 'B24_BASE not configured']);
}

header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');
header('Permissions-Policy: interest-cohort=()');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$isAllowedOrigin = $origin !== '' && in_array($origin, $allowedOrigins, true);

if ($isAllowedOrigin) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Vary: Origin');
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Authorization');
}

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if ($method === 'OPTIONS') {
  http_response_code($isAllowedOrigin ? 204 : 400);
  exit;
}

if ($method !== 'POST') {
  respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

if ($origin !== '' && !$isAllowedOrigin) {
  respond(403, ['ok' => false, 'error' => 'forbidden_origin']);
}

$clen  = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($clen > $maxBody) {
  respond(413, ['ok' => false, 'error' => 'payload_too_large']);
}

$ctype = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($ctype, 'application/json') === false) {
  respond(415, ['ok' => false, 'error' => 'unsupported_media_type']);
}

$raw = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
  respond(400, ['ok' => false, 'error' => 'invalid_json']);
}

$name    = trim((string)($data['name'] ?? ''));
$phone   = trim((string)($data['phone'] ?? ''));
$message = trim((string)($data['message'] ?? ''));
$page    = trim((string)($data['page'] ?? ''));
$utm     = is_array($data['utm'] ?? null) ? $data['utm'] : [];

if ($name === '' || $phone === '') {
  respond(400, ['ok' => false, 'error' => 'name_and_phone_required']);
}

$phoneNorm = preg_replace('~[^\d\+\(\)\-\s]~u', '', $phone) ?: $phone;

$comments = $message;
if ($page !== '') {
  $comments .= ($comments ? "\n\n" : '') . 'Страница: ' . $page;
}

$payload = [
  'fields' => [
    'TITLE'       => 'Заявка с сайта: ' . $name,
    'NAME'        => $name,
    'PHONE'       => [['VALUE' => $phoneNorm, 'VALUE_TYPE' => 'WORK']],
    'COMMENTS'    => $comments,
    'SOURCE_ID'   => 'WEB',
    'UTM_SOURCE'   => (string)($utm['utm_source'] ?? ''),
    'UTM_MEDIUM'   => (string)($utm['utm_medium'] ?? ''),
    'UTM_CAMPAIGN' => (string)($utm['utm_campaign'] ?? ''),
    'UTM_TERM'     => (string)($utm['utm_term'] ?? ''),
    'UTM_CONTENT'  => (string)($utm['utm_content'] ?? ''),
  ],
  'params' => ['REGISTER_SONET_EVENT' => 'Y'],
];

$url = rtrim($b24Base, '/') . '/crm.lead.add.json';
[$httpCode, $respBody, $curlErr] = httpPostJson($url, $payload, $timeoutSec);

if ($curlErr !== null) {
  respond(502, ['ok' => false, 'error' => 'curl_error', 'raw' => $curlErr]);
}

$data = json_decode($respBody, true);
if ($httpCode >= 400 || isset($data['error'])) {
  respond(502, [
    'ok'    => false,
    'error' => $data['error_description'] ?? $data['error'] ?? ('HTTP ' . $httpCode),
    'raw'   => $data,
  ]);
}

$leadId  = $data['result'] ?? null;
$portal  = explode('/rest/', $b24Base, 2)[0];
$leadUrl = $leadId ? ($portal . '/crm/lead/details/' . $leadId . '/') : null;

respond(200, ['ok' => true, 'leadId' => $leadId, 'leadUrl' => $leadUrl]);

function respond(int $code, array $payload): void {
  header('Content-Type: application/json; charset=utf-8');
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

function httpPostJson(string $url, array $payload, int $timeoutSec = 15): array {
  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
    CURLOPT_TIMEOUT        => $timeoutSec,
  ]);
  $resp     = curl_exec($ch);
  $errno    = curl_errno($ch);
  $error    = $errno ? curl_error($ch) : null;
  $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  return [$httpCode, (string)$resp, $error];
}
