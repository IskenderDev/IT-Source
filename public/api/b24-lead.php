<?php
declare(strict_types=1);



const B24_BASE = 'https://bitrix.itsource.kg/rest/435/js2sbw112xf0xb6u';
const ALLOWED_ORIGIN = '*'; 

$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header('Access-Control-Allow-Origin: ' . (ALLOWED_ORIGIN === '*' ? '*' : ALLOWED_ORIGIN));
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
  http_response_code(204);
  exit;
}

function getInput(): array {
  $raw = file_get_contents('php://input') ?: '';
  $ctype = $_SERVER['CONTENT_TYPE'] ?? '';
  if (stripos($ctype, 'application/json') !== false) {
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
  }
  return $_POST ?: [];
}

function respond(int $code, array $payload): void {
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

try {
  if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
  }

  $body    = getInput();
  $name    = trim((string)($body['name'] ?? ''));
  $phone   = trim((string)($body['phone'] ?? ''));
  $message = trim((string)($body['message'] ?? ''));
  $page    = trim((string)($body['page'] ?? ''));
  $utm     = is_array($body['utm'] ?? null) ? $body['utm'] : [];

  if ($name === '' || $phone === '') {
    respond(400, ['ok' => false, 'error' => 'name и phone обязательны']);
  }

  $phoneNorm = preg_replace('~[^\d\+\(\)\-\s]~u', '', $phone) ?: $phone;

  $comments = $message;
  if ($page !== '') {
    $comments .= ($comments ? "\n\n" : '') . 'Страница: ' . $page;
  }

  $payload = [
    'fields' => [
      'TITLE'      => 'Заявка с сайта: ' . $name,
      'NAME'       => $name,
      'PHONE'      => [['VALUE' => $phoneNorm, 'VALUE_TYPE' => 'WORK']],
      'COMMENTS'   => $comments,
      'SOURCE_ID'  => 'WEB', 
      'UTM_SOURCE'   => (string)($utm['utm_source'] ?? ''),
      'UTM_MEDIUM'   => (string)($utm['utm_medium'] ?? ''),
      'UTM_CAMPAIGN' => (string)($utm['utm_campaign'] ?? ''),
      'UTM_TERM'     => (string)($utm['utm_term'] ?? ''),
      'UTM_CONTENT'  => (string)($utm['utm_content'] ?? ''),
    ],
    'params' => ['REGISTER_SONET_EVENT' => 'Y'],
  ];

  $url = rtrim(B24_BASE, '/') . '/crm.lead.add.json';
  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
    CURLOPT_TIMEOUT        => 20,
  ]);

  $resp     = curl_exec($ch);
  $errno    = curl_errno($ch);
  $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  if ($errno !== 0 || $resp === false) {
    respond(502, ['ok' => false, 'error' => 'curl_error']);
  }

  $data = json_decode($resp, true);
  if ($httpCode >= 400 || isset($data['error'])) {
    respond(502, [
      'ok'    => false,
      'error' => $data['error_description'] ?? $data['error'] ?? ('HTTP ' . $httpCode),
      'raw'   => $data,
    ]);
  }

  $leadId  = $data['result'] ?? null;
  $portal  = explode('/rest/', B24_BASE, 2)[0];
  $leadUrl = $leadId ? ($portal . '/crm/lead/details/' . $leadId . '/') : null;

  respond(200, ['ok' => true, 'leadId' => $leadId, 'leadUrl' => $leadUrl]);

} catch (Throwable $e) {
  respond(500, ['ok' => false, 'error' => $e->getMessage()]);
}
