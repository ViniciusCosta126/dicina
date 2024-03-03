<!DOCTYPE HTML>
<html class="no-js" <?php language_attributes(); ?>>

<head>
	<meta charset="utf-8">
	<meta content="width=device-width, initial-scale=1" name="viewport" />

	<!-- Cookie Banner -->
	<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css" />

	<!-- RSS Feed -->
	<link rel="alternate" type="application/+xml" href="<?php bloginfo('rss2_url'); ?>">

	<?php
	// Default css
	global $css;

	$default_stylesheets = array(
		'css/main.css',
		'css/jquery.mCustomScrollbar.css'
	);
	populate_array($css, $default_stylesheets);
	get_stylesheets();

	wp_head();
	?>
</head>

<body <?= body_class() ?>>

	<?php
	// Seleciona o cabeçalho adequado
	if (isset($args["header"])) {
		if ($args["header"] === "imprensa") {
			block_template_part("header-imprensa");
		} else if ($args["header"] === "visible") {
			block_template_part("header-visible");
		} else {
			block_template_part("header");
		}
	} else {
		block_template_part("header");
	}
	?>