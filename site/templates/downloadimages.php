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
	if ($content)
		file_put_contents($config->paths->templates . 'assets/cards/'. $file_name .'.jpg', $content);
}
