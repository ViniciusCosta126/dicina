<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$language = function_exists('qtranxf_getLanguage') ? qtranxf_getLanguage() : "pt";

$post = get_post();
$postID = $post->ID;
$post_meta = get_post_meta($postID);

// Images
$heroMobileId = isset($post_meta["hero_mobile"]) ? $post_meta["hero_mobile"][0] : null;
$heroDeskId = get_post_thumbnail_id($postID);
$heroMobile = null;
$heroDesk = wp_get_attachment_image_src($heroDeskId, 'adv-pos-a-default');
$alt_text = get_post_meta($post->ID, '_wp_attachment_image_alt', true);
$imageClass = "";

if ($heroMobileId) {
	$imageClass = "full-image";
	$heroMobile = wp_get_attachment_image_src($heroMobileId, 'adv-pos-a-default');
} else {
	$heroMobile = $heroDesk;
}

// Formate Data
if ($language == "pt") {
	$postData = new DateTime($post->post_date);
	$formatter = new IntlDateFormatter(
		'pt_BR',
		IntlDateFormatter::LONG,
		IntlDateFormatter::NONE,
		'America/Sao_Paulo',
		IntlDateFormatter::GREGORIAN
	);
	$date = $formatter->format($postData);
} else {
	$date = date_create($post->post_date)->format('Y F d');
}

$dataTitle = $language === 'pt' ? "Data" : "Date";
$timeTitle = $language === 'pt' ? "Tempo de leitura" : "Reading time";
$photographerTitle = $language === 'pt' ? "Fotógrafo" : "Photographer";
$photographer_name = isset($post_meta["photographer"]) ? $post_meta["photographer"][0] : null;
?>

<section class="hero-post <?= $attributes["variant"] ?> hero-post-<?= $randomComponentId ?>">
	<style>
		.hero-post-<?= $randomComponentId ?> {
			background-color: <?= $attributes["bgColor"] ?>;
			margin-bottom: <?= $attributes["marginM"] ?>px;
		}

		@media (min-width: 768px) {
			.hero-post-<?= $randomComponentId ?> {
				margin-bottom: <?= $attributes["marginD"] ?>px;
			}
		}
	</style>

	<div class="hero-post--image <?= $imageClass; ?>">
		<picture>
			<source srcset="<?= $heroDesk[0]; ?>" media="(min-width: 1024px)" width="<?= $heroDesk[1]; ?>" height="<?= $heroDesk[2]; ?>">
			<img loading="lazy" src="<?= $heroMobile[0]; ?>" alt="<?= $alt_text; ?>" width="<?= $heroMobile[1]; ?>" height="<?= $heroMobile[2]; ?>">
		</picture>
	</div>

	<div class="container">
		<div class="hero-post--container">
			<h1 class="hero-post--title"><?= get_the_title(); ?></h1>
			<div class="hero-post--content">
				<p class="hero-post--content-text"><strong><?= $dataTitle; ?>: </strong><?= $date; ?></p>
				<p class="hero-post--content-text"><strong><?= $timeTitle; ?>: </strong><?= is_single() ? reading_time($language) : 'Desconhecido' ?></p>
				<?php if ($photographer_name) : ?>
					<p class="hero-post--content-text"><strong><?= $photographerTitle; ?>: </strong><?= $photographer_name; ?></p>
				<?php endif; ?>
			</div>
		</div>
	</div>
</section>