<?php
if (!$user->isLoggedin())
{
	return;
}

$dungeon_list = array(
	'001',
	'002',
	'003',
	'004',
	'005',
	'006',
	'007',
	'008',
	'009',
	'010',
	'011',
	'012',
	'013',
	'014', //skips
	'016',
	'017',
	'018', //skips
	'021',
	'022',	
	'023',	
	'024',
	'025', //skips
	'028',//skips
	'033',
);

// getFile('npc_decks','https://raw.githubusercontent.com/sharpobject/sgre/master/npc_decks_manual.json');
// getFile('dungeons','https://raw.githubusercontent.com/sharpobject/sgre/master/dungeons.json');
// getFile('cards','https://raw.githubusercontent.com/sharpobject/sgre/master/swogi.json');
// getDungeonIcons($dungeon_list);

function getFile($file_name,$url){
	file_put_contents($config->paths->templates . 'assets/jsons/'. $file_name .'.json', file_get_contents($url));
}

function getDungeonIcons($dungeons)
{
	$base_url = 'https://raw.githubusercontent.com/sharpobject/sgre/master/sg_assets/en_dungeon_icon_$$$.png';

	foreach($dungeons as $dungeon)
	{
		$url = str_replace('$$$', $dungeon, $base_url);
		file_put_contents($config->paths->templates . 'assets/dungeon_icons/'. $dungeon .'.png', file_get_contents($url));	
	}
	
}

?>