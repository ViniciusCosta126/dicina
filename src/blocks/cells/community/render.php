<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$message = 'data-msg="' . $attributes["requiredMessage"] . '"';

$mainText = $attributes['textoPrincipal'];
$language = function_exists('qtranxf_getLanguage') ? qtranxf_getLanguage() : "pt";
?>

<section class="community <?= $attributes["variant"] ?> community-<?= $randomComponentId ?>" style="">
	<style>
		.community-<?= $randomComponentId ?> {
			margin-bottom: <?= $attributes["marginM"] ?>px;
			background-position: center left;
			background: linear-gradient(180deg, #002753 0%, rgba(0, 39, 83, 0) 100%), url(<?= $attributes["bgImage"]["src"] ?>) no-repeat;
			background-size: cover;
			background-position: right top;
		}

		@media (min-width: 768px) {
			.community-<?= $randomComponentId ?> {
				margin-bottom: <?= $attributes["marginD"] ?>px;

				background-position: left top;

			}
		}
	</style>

	<div class="container">
		<div class="community__content">
			<h3 class="community__title">
				<?= $mainText['normal'] ?>
				<br />
				<span class="community__title--senna-sans"><?= $mainText['sennaSans'] ?></span>
			</h3>
			<hr class="divider">
			<p class="community__description"><?= $attributes['subtitle'] ?></p>
		</div>

		<form <?= $message ?> class="community__form" action="<?= get_site_url() ?>/wp-admin/admin-ajax.php?action=insert_lead_sug">
			<input name='lead_lg' class='lg__text' type='hidden' value='<?= $language ?>' />
			<?= $content ?>
			<p class='return_message error_message'><?= $attributes['errorMessage'] ?></p>
			<p class='return_message success_message'><?= $attributes['successMessage'] ?></p>
		</form>
	</div>
</section>