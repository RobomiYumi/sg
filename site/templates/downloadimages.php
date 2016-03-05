<?php

if (!$user->isLoggedin())
{
	return;
}

$qs = $_SERVER['QUERY_STRING'];

parse_str($qs, $qs_array);

$cards = explode(' ', $qs_array['cards']);

foreach ($cards as $card)
{
	getFile($card,'http://www.sword-girls.co.kr/Img/Card/'. $card . 'L.jpg');
}

function getFile($file_name,$url){
	$content = file_get_contents($url);
	$path = $config->paths->templates . 'assets/cards/'. $file_name .'.jpg';
	
	if ($content and !file_exists($path))
		file_put_contents($path, $content);
}
