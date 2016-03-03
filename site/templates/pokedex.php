<!DOCTYPE html>
<html lang="en">
<head>
	<title>Swordgirl's Nest</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="<?php echo $config->urls->templates . 'styles/main.css' ?>">

	<link href='https://fonts.googleapis.com/css?family=Lilita+One' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>

	<link rel="icon" type="image/png" href="<?php echo $config->urls->templates . 'assets/img/favicon.png' ?>" />
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
</head>
<body>
	<div class="header-toolbar">
		<span>SG Dungeons</span>
	</div>
	<div class="header">

	</div>
	<div class="dungeon-wrapper">
		<div class="loader"></div>
		<div class="wrapper">
			<div class="dungeons"></div>
		</div>
		<div class="deck-container">
			<div class="tools">
				<span class="close"><i class="fa fa-times"></i></span>
				<div class="dungeon-title"></div>
			</div>			
			<div class="deck-preview">
			</div>
			<div class="card-preview">
			</div>
			<div class="rewards-preview">
			</div>

		</div>
	</div>

	<div class="footer">
		Last updated Nov 29, 2015, Created by Shana
	</div>
	<script src="<?php echo $config->urls->templates . 'scripts/js-cookie-master/src/js.cookie.js' ?>"></script>
	<script src="<?php echo $config->urls->templates . 'scripts/jquery-2.1.4.min.js' ?>"></script>
	<script src="<?php echo $config->urls->templates . 'scripts/main.js' ?>"></script>

	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-49930865-5', 'auto');
	  ga('send', 'pageview');

	</script>

</body>
</html>
