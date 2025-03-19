<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$bgMob = $attributes["bgMob"];
$bgDesk = $attributes["bgDesk"];
?>

<section class="hero-journey <?= $attributes['variant'] ?> hero-journey-<?= $randomComponentId ?>">
    <style>
        .hero-journey-<?= $randomComponentId ?> {
            background-color: <?= $attributes['bgColor'] ?>;
			background-image: url('<?= $bgMob['src'] ?>');
            margin-bottom: <?= $attributes['marginM'] ?>px;
        }

        @media (min-width: 768px) {
            .hero-journey-<?= $randomComponentId ?> {
				background-image: url('<?= $bgDesk['src'] ?>');
                margin-bottom: <?= $attributes['marginD'] ?>px;
            }
        }
    </style>
	<div class="overlay">
		<div class="container">
			<div class="hero-journey__content">
				<?= $content ?>
			</div>
		</div>
        <button class="arrow-down" id="go-to-section-2"></button>
	</div>
	</section>
