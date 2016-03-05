$( document ).ready(function() {

	var dungeons = null;
	var npc_decks = null;
	var cards = null;
	var fetch_ids = null;

	var dungeon_names = {
		'120001':'Beginner Dungeon',
		'120002':'Intermediate Dungeon',
		'120003':'Advanced Dungeon',
		'120004':'Frontier Dungeon',
		'120005':'Witch\'s Tower',
		'120006':'Shadowland',
		'120007':'Crux Training Camp',
		'120008':'Bamboo Garden',
		'120009':'Linia\'s Mansion',
		'120010':'Vampire Lands',
		'120011':'Goddess Tower',
		'120012':'Vita Public School',
		'120013':'Vivid World',
		'120014':'Dream Island',
		'120016':'Catacombs',
		'120017':'Ancient Sanctuary',
		'120018':'2S Detective Agency',
		'120021':'Catch That Cat!',
		'120022':'Linia\'s World',
		'120023':'Underground Library',
		'120024':'Underground Alter',
		'120025':'Loil City',
		'120028':'Muzisitter Land',
		'120033':'Weekly The Legend'
	};

	//Code i took from stackoverflow somewhere...?? loads stuff nicely
	function loadJSON(callback,file_name) {   

		var xobj = new XMLHttpRequest();
		    xobj.overrideMimeType("application/json");

		xobj.open('GET', '/site/templates/assets/jsons/'+ file_name +'.json', true);
		xobj.onreadystatechange = function () {
		      if (xobj.readyState == 4 && xobj.status == "200") {
		        callback(xobj.responseText);
		        // console.log(xobj.responseText);
		      }
		};
		xobj.send(null);  
	}

	//code i stole hue hue hue
	//http://stackoverflow.com/questions/19491336/get-url-parameter-jquery
	var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	};	

	function loadDungeons(dungeons){
		var el_container = $('.dungeons');

	

		$.each(dungeons,function(i){
			// console.log(dungeons[i].length);
			var boss = '';
			var counter = 0;

			$.each(dungeons[i],function(j){
				// console.log(dungeons[i][j]);

				boss_id = dungeons[i][j][(dungeons[i][j].length - 1)];

				// console.log(boss);
				// var boss_img = $('<img>').attr('src',"http://www.sword-girls.co.kr/Img/Card/" + boss_id + 'L.jpg');

				if(!boss_id)
					return;

				var boss_img = $('<img>').attr('src',"/site/templates/assets/dungeon_icons/" + boss_id.toString().substring(3, 6) + '.png').attr('data-id',boss_id);
				el_container.append(boss_img);
				counter ++;



				return;
			});


			// return false;
		});
	}

	function getDeck(npc_id){
		return npc_decks[npc_id];
	}

	function getCard(card_id){
		return cards['id_to_card'][card_id];
	}	

	function getSkill(skill_id){
		return cards['skill_text'][skill_id];
	}

	function getRewards(boss_id_str){
		return dungeons['rewards'][parseInt(boss_id_str, 10)-120001];
	}

	function getDungeonTitle(boss_id_str){
		return dungeon_names[boss_id_str];
	}

	function getCardImg(card_id, width){

 		if (typeof(width)==='undefined') width = 320;

		return $('<img>').attr('data-external-link',"http://www.sword-girls.co.kr/Img/Card/" + card_id + 'L.jpg').attr('data-internal-link',"/site/templates/assets/cards/" + card_id + '.jpg').attr('src','/').attr('data-id',card_id).attr('width',width);
	}

	function getDeckHtml(deck_id){

		var cards = getDeck(deck_id);
		for (var k in cards) {
			if (cards.hasOwnProperty(k) && cards[k] === 0) {
				delete cards[k];
			}
		}
		var html = $('<div></div>');
		var html_character = $('<div></div>').addClass('character'); //feature box changed my mind
		var html_followers = $('<div></div>').addClass('followers').addClass('active');
		var html_tabs = $('<div></div>').addClass('tabs');
		var html_tabs_controls = $('<div></div>').addClass('tab-controls');
		var html_tab_followers = $('<div></div>').addClass('tab-followers').addClass('active');
		var html_tab_rewards = $('<div></div>').addClass('tab-rewards');

		var card_img = getCardImg(deck_id);
		html_character.append(card_img);

		var card_img = getCardImg(deck_id,50);

		var card_wrapper = $('<div></div>').addClass('card-wrapper');
		var qty =  $('<div></div>').addClass('qty');

		card_wrapper.append(qty.append('1'));

		html_followers.append(card_wrapper.append(card_img));

		$.each(cards, function(i){
			var card_img = getCardImg(i,50);
			var card_wrapper = $('<div></div>').addClass('card-wrapper');
			var qty =  $('<div></div>').addClass('qty');

			card_wrapper.append(qty.append(cards[i]));

			html_followers.append(card_wrapper.append(card_img));
		});

		html_tabs_controls.append(html_tab_followers).append(html_tab_rewards);

		html_tabs.append(html_tabs_controls).append(html_followers);

		return html.append(html_character).append(html_tabs);
	}

	function bindTabsClick(){

		$('.deck-preview').on('click','.tab-rewards, .tab-followers', function(){
			$('.tab-rewards, .tab-followers, .rewards, .followers').removeClass('active');
			$(this).addClass('active');

			if ($(this).hasClass('tab-rewards'))
			{
				$('.rewards').addClass('active');
			}else{
				$('.followers').addClass('active');
			}
		});
	}

	function refreshImg(){

		var counter = 0;
		$('img[data-external-link]').each(function(i){
			var $current_img = $(this);
			var last = $('img[data-external-link]').length;
			$.get($(this).attr('data-internal-link'))
			    .done(function() { 
			        $current_img.attr('src',$current_img.attr('data-internal-link'));
			        counter++;
			    }).fail(function() { 
			        $current_img.attr('src',$current_img.attr('data-external-link'));
			        counter++;
			        addToFetchImg($current_img.attr('data-id'));
			        if (last === counter){
			        	fetchExternalImages();
			        }
			});
		});
	}

	//only works when log-in as admin
	function fetchExternalImages(){
		var url = window.location.origin + "/downloadimage?cards=" + fetch_ids;
		console.log('downloading');
		$.ajax({
		  url: url
		}).done(function() {
			console.log('finish fetching');
		});
	}

	function addToFetchImg(id){

		if (fetch_ids !== null && fetch_ids.search(id) > 0)
		{
			return;
		}

		if (fetch_ids === null)
			fetch_ids = id;
		else
			fetch_ids += '+' + id;
	}

	function getRewardHtml(reward_id){
		var floors = getRewards(reward_id);
		var boss_rewards = null;

		var container = $('<div></div>').addClass('rewards');
		var counter = 0;

		var last_floor = Object.keys(floors).length;

		$.each(floors,function(i){
			var floor = $('<div></div>');

			counter++;

			if (counter === last_floor)
				floor.append('Boss Floor');
			else
				floor.append('Floor: ' + (parseInt(i)+1));


			$.each(floors[i],function(j){
				var wins = $('<div></div>').addClass('clear-row');
				var clear = $('<div></div>').addClass('clear-amount');

				if(typeof floors[i][j]['cards'] === 'undefined')
					return;

				var clear_requirement = 'Requirement: ' +  j  + ' clear';

				if (j === '0')
				{
					clear_requirement = 'Default';
				}else if(j !== '1')
				{
					clear_requirement+='s';
				}

				floor.append(wins.append(clear.append(clear_requirement)));

				$.each(floors[i][j]['cards'],function(k){
					var card_img = getCardImg(k,'50');
					var quantity = $('<div></div>').addClass('qty');
					var container = $('<div></div>').addClass('reward-container');

					quantity.append(floors[i][j]['cards'][k]);

					container.append(card_img).append(quantity);

					wins.append(container);
				});

				
			});

			container.append(floor);
		});

		return container;
		
	}

	function getCardHtml(card_id){
		var card = getCard(card_id);
		var content = $('<div></div>');

		var delay_list = [];

		$.each(card, function(i){
			var row = $('<div></div>').addClass(i);
			var span = $('<span></span>').addClass('value');
			var row_label = $('<div></div>').addClass('label')

			var unset = [
				'kr_flavor',
				'kr_name',
				'level',
				'upgrade_path'
			];

			var type = [
				'Spell',
				'Follower',
				'Character'
			];

			if ($.inArray(i, unset ) > -1)
			{
				return;
			}

			if ($.inArray(card[i], type ) > -1)
			{
				content.addClass(card[i]);
			}

			row.append(row_label.html(i.replace('_',' ')));

			if (i === 'skills')
			{
				$.each(card[i],function(j){
					var div = $('<div></div>').addClass('skill-row');
					content.append(row.append(div.append(span.append(getSkill(card[i][j])))));
				});
				return;
			}
			content.append(row.append(span.append(card[i])));
		})

		$.each(delay_list,function(i){
			content.append(delay_list[i]);
		});

		return content;
	}

	function bindDungeonClick(){
		var el = $('.dungeons');
		var el_preview = $('.deck-preview');
		var el_container = $('.deck-container');
		var el_rewards = $('.rewards-preview');
		var el_title = $('.dungeon-title');

		el.on('click','img',function(){
			el_preview.empty();
			el_rewards.empty();

			el_title.html(getDungeonTitle($(this).attr('data-id')));

			el_container.addClass('front-3');
			el_preview.append(getDeckHtml($(this).attr('data-id')));
			// console.log(getReward($(this).attr('data-reward-id')));
			$('.tabs').append(getRewardHtml($(this).attr('data-id')));
			refreshImg();
			triggerCharacterClick();

			window.history.replaceState('', '', '?dungeon='+$(this).attr('data-id'));			
		});		
	}	

	function triggerCharacterClick(){
		$('.followers .card-wrapper:first-child img').click();
	}

	function bindCardClick(){
		var el_deck = $('.deck-preview');
		var el_card = $('.card-preview');

		el_deck.on('click','img',function(){
			if ($(this).parent().hasClass('character')){
				return false;
			}

			el_card.empty();
			el_card.append(getCardHtml($(this).attr('data-id')));
			$('.deck-preview .character img').attr('src',$(this).attr('src'));

			sortCardAttributes();

		});
	}

	//fuk it building a shitty sort list .... fix the getcardhtml like seriously
	function sortCardAttributes(){
		var sort_list = [
			'flavor',
			'skills',
			'size',
			'rarity',
			'points',
			'limit',
			'id',
			'faction',
			'episode',
			'stamina',
			'defense',
			'attack',
			'life',
			'type',
			'name'
		]

		$.each(sort_list, function(i){
			$('.card-preview > div').find('.'+sort_list[i]).prependTo($('.card-preview > div'));
		});
	}

	function bindCloseClick(){
		var el_container = $('.deck-container');
		var el_close = $('.close');
		el_close.click(function(){
			el_container.removeClass('front-3');
			window.history.replaceState('', '', '/');		
		});
	}

	function fixFooter(){
		$('.footer').height($(window).height() - $('.header').height() - $('.dungeons').outerHeight());
	}

	function finishLoading(){
		
		$('.loader').hide();
		$('.dungeons').addClass('ready');
	
	}

	function init()
	{
		loadJsonFiles();
		bindDungeonClick();
		bindCardClick();
		bindCloseClick();
		bindTabsClick();

		fixFooter();
	}

	function triggerDungeonClick(){
		var dungeon_parameter = getUrlParameter('dungeon');
		$('.dungeons img[data-id="' + dungeon_parameter + '"]').click();
	}

	function loadJsonFiles()
	{
		// load all json files.................. this looks retarded but I dont know how to fix it at the moment.
		loadJSON(function(response) {
			dungeons = JSON.parse(response);

			loadJSON(function(response) {
				cards = JSON.parse(response);

				loadJSON(function(response) {
					npc_decks = JSON.parse(response);
					loadDungeons(dungeons);
					triggerDungeonClick();
					finishLoading();
				},'npc_decks');	
						
			},'cards');

		},'dungeons');
	}

	init();
});
