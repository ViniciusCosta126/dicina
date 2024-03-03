<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$video = $attributes["video"];
$showVideo = $attributes["showVideo"] ? '' : 'hideVideo';
$image = $attributes['image'];
?>

<section class="seek-your-truth <?=$showVideo?> seek-your-truth-section seek-your-truth-<?= $randomComponentId ?> default">
	<style>
		.seek-your-truth-<?= $randomComponentId ?> {
			margin-bottom: <?= $attributes["marginM"] ?>px
		}

		@media (min-width: 768px) {
			.seek-your-truth-<?= $randomComponentId ?> {
				margin-bottom: <?= $attributes["marginD"] ?>px
			}
		}
	</style>
	<div class="container <?= $attributes["variant"] ?>">
		<div class="seek-your-truth__content">
			<p class="seek-your-truth__text degrade-border-text" id='texto1SYT'><?= $attributes['line1'] ?></p>
			<p class="seek-your-truth__text degrade-border-text" id='texto2SYT'>
				<?= $attributes['line2'] ?>
				<img class="seek-your-truth__image" src="<?= $image['src'] ?>" alt="<?= $image['alt'] ?>">
			</p>
			<p class="seek-your-truth__text degrade-border-text" id='texto3SYT'><?= $attributes['line3'] ?></p>
		</div>

		<?if($attributes["showVideo"]):?>
		<div class="seek-your-truth__video">
			<div class="seek-your-truth__video--wrapper">
				<video class="video-image" preload="none" title="<?= $video['alt'] ?>" autoplay playsinline muted="muted" controls poster="<?= $video['poster'] ?>">
					<source src="<?= $video['src'] ?>" type="<?= $video['type'] ?>" />
				</video>
			</div>
		</div>
		<?php endif;?>
	</div>
</section>
