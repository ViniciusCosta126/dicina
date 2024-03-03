<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$bgMob = $attributes["bgMob"];
$bgDesk = $attributes["bgDesk"];
$sennaLogo = $attributes["sennaLogo"];
$partnerLogo = $attributes["partnerLogo"];
?>

<div class="collabs-hero <?= $attributes["variant"] ?> collabs-hero-<?= $randomComponentId ?>">
	<style>
		.collabs-hero-<?= $randomComponentId ?> {
			background-image: url('<?= $bgMob["src"] ?>');
			margin-bottom: <?= $attributes["marginM"] ?>px;
		}

		@media (min-width: 768px) {
			.collabs-hero-<?= $randomComponentId ?> {
				background-image: url('<?= $bgDesk["src"] ?>');
				margin-bottom: <?= $attributes["marginD"] ?>px;
			}
		}
	</style>

	<div class="overlay">
		<div class="container <?= $attributes["variant"] ?>">
			<div class="logo-content">
				<div class="senna-logo">
					<?php if (isset($sennaLogo["src"]) and $sennaLogo["src"] !== "") : ?>
						<img src="<?= $sennaLogo["src"] ?>" alt="<?= $sennaLogo["alt"] ?>">
					<?php endif; ?>
				</div>

				<div class="partner-logo">
					<?php if (isset($partnerLogo["src"]) and $partnerLogo["src"] !== "") : ?>
						<img src="<?= $partnerLogo["src"] ?>" alt="<?= $partnerLogo["alt"] ?>">
					<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
</div>