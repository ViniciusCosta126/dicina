<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$video = $attributes["video"];
$showVideo = $attributes["showVideo"] ? 'with-video' : '';
?>

<section class="hero-seek-your-truth <?= $showVideo ?> <?= $attributes["variant"] ?> hero-seek-your-truth-<?= $randomComponentId ?>">
	<style>
		.hero-seek-your-truth-<?= $randomComponentId ?> {
			background-color: <?= $attributes["bgColor"] ?>;
			margin-bottom: <?= $attributes["marginM"] ?>px;
		}

		@media (min-width: 768px) {
			.hero-seek-your-truth-<?= $randomComponentId ?> {
				margin-bottom: <?= $attributes["marginD"] ?>px;
			}
		}
	</style>


	<div class="seek-your-truth__content">
		<h2>
			<?= $attributes["staticText"] ?>
			<div class="seek-typing">
				<div id="seek-typing-content"><?= $attributes["mutationText"] ?></div>
			</div>
		</h2>
	</div>

	<?php if ($attributes["showVideo"]) : ?>
		<div class="seek-your-truth__video">
			<video preload="none" title="<?= $video['alt'] ?>" autoplay playsinline muted="muted" controls poster="<?= $video['poster'] ?>">
				<source src="<?= $video['src'] ?>" type="<?= $video['type'] ?>" />
			</video>
		</div>
	<?php endif; ?>
</section>