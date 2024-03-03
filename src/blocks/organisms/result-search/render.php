<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$search_term = '';
if (isset($_GET['q'])) {
	$search_term = sanitize_text_field($_GET['q']);
}

$total_results = 0;
$search_data = [];

if ($search_term !== "") {
	$search_data = new WP_Query(
		array(
			'post_type' => 'post',
			'posts_per_page' => 6,
			's' => $search_term
		)
	);

	$total_results = $search_data->have_posts() ? $search_data->found_posts : 0;
}



$amount_results_translate_array = array(
	'pt' => array(
		'one' => 'Resultado encontrado',
		'other' => 'Resultados encontrados'
	),
	'en' => array(
		'one' => 'Result found',
		'other' => 'Results found'
	),
);

$language = function_exists('qtranxf_getLanguage') ? qtranxf_getLanguage() : "pt";

$language = !array_key_exists($language, $amount_results_translate_array) ? 'pt' : $language;


$amount_results_translate = $total_results == 1 ? $amount_results_translate_array[$language]['one'] : $amount_results_translate_array[$language]['other'];

$titleMostReadAttrs = array(
	"content" => $attributes['textPostListFail'],
	"tag" => 'h2',
	"fontFamily" => 'sennasans stroke',
	"manualSizes" => true,
	"manualSizeM" => 32,
	"manualSizeD" => 50,
	"widthStrokeM" => 2,
	"widthStrokeD" => 1.5,
	"color" => 'linear-gradient(0deg, #00A851 0%, #00A851 10%,#1832D7 100%)',
	"bgColor" => 'transparent',
	"extraClass" => 'title',
);

$auxTitleMostReadAttrs = array(
	"content" => $attributes['auxTextPostListFail'],
	"tag" => 'strong',
	"manualSizes" => true,
	"manualSizeM" => 32,
	"manualSizeD" => 40,
	"color" => '#002753',
	"bgColor" => 'transparent',
	"textWeight" => 'medium',
	"marginM" => 8,
	"marginD" => 16,
	"extraClass" => 'aux-title',

);

$titleMostReadBlock = sprintf('<!-- wp:il/typography %s /-->', json_encode($titleMostReadAttrs));
$auxTitleMostReadBlock = sprintf('<!-- wp:il/typography %s /-->', json_encode($auxTitleMostReadAttrs));

?>

<div class="result-search <?= $attributes["variant"] ?> result-search-<?= $randomComponentId ?>">
	<style>
		.result-search-<?= $randomComponentId ?> {
			margin-bottom: <?= $attributes["marginM"] ?>px;
		}

		@media (min-width: 768px) {
			.result-search-<?= $randomComponentId ?> {
				margin-bottom: <?= $attributes["marginD"] ?>px;
			}
		}
	</style>
	<div class="container">
		<?php if ($total_results > 0) : ?>
			<div class="result-search__header">
				<p class="title-term-search"><?= $attributes["textSuccess"] ?></p>
				<div class="term-result">
					<p class="term-search">"<?= $search_term ?>"</p>
					<p class="quantity-result"><?= $total_results . ' ' . $amount_results_translate ?></p>
				</div>

			</div>
			<?= $content ?>
		<?php endif; ?>

		<?php if ($total_results <= 0) : ?>
			<div class="result-search__header">
				<p class="title-term-search"><?= $attributes["textFail"] ?></p>
				<div class="term-result fail">
					<p class="text-fail"><?= $attributes["subTextFail"] ?></p>
					<br>
					<p class="term-search">"<?= $search_term ?>"</p>
					<br>

					<p class="link-fail-suggestion "><?= $attributes["failLinkSuggestion"] ?></p>
				</div>
			</div>

			<div class="header__list-posts">
				<?= do_blocks($auxTitleMostReadBlock) ?>
				<?= do_blocks($titleMostReadBlock) ?>
			</div>

			<?= do_blocks('<!-- wp:il/post-listing {"filterBy": -2, "paginationType": "see-all" } /-->') ?>
		<?php endif; ?>
	</div>
</div>
