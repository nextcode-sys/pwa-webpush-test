<?php
define( 'FCM_API_SEVER_KEY', '<サーバーキー>');
define( 'FCM_API_URL', 'https://fcm.googleapis.com/fcm/send' );
$data = [
	"notification" => [
		"title" => "テストタイトル",
		"body" => "PHPで遅れたかな",
		"icon" => "firebase-logo.png",
    	"click_action" => "http://~~~~~~",
	],
    "to" => "<送りたい人のトークン>",
];

$header = [
	'Authorization: key=' . FCM_API_SEVER_KEY,
	'Content-Type: application/json',
];
$context = stream_context_create(array(
	'http' => array(
		'method' => 'POST',
		'header' => implode(PHP_EOL,$header),
		'content'=>  json_encode($data),
		'ignore_errors' => true
	)
));

$response = file_get_contents(
	FCM_API_URL,
	false,
	$context
);

$result = json_decode($response,true);

// 返却値を確認
var_dump($result);