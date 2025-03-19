<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$textos = explode('<div class="slide-item--text-box">', $content);
?>

<section class="hero-blog <?= $attributes['variant'] ?> hero-blog-<?= $randomComponentId ?>">
	<style>
		.hero-blog-<?= $randomComponentId ?> {
			background-color: <?= $attributes['bgColor'] ?>;
			margin-bottom: <?= $attributes['marginM'] ?>px;
		}

		@media (min-width: 768px) {
			.hero-blog-<?= $randomComponentId ?> {
				margin-bottom: <?= $attributes['marginD'] ?>px;
			}
		}
	</style>

	<?= $content ?>

	<?php if (!wp_is_mobile()) : ?>
		<div class="post-content_container container">
			<?php if (sizeof($textos) >= 4) {
				for ($i = 0; $i < 3; $i++) :
					$myPostInfo = strstr($textos[$i + 1], '<');
					$myStrings = explode('</p>', $myPostInfo);
					$postCategory = $myStrings[0];
					$postTitle = explode('</h3>', $myStrings[1]);
			?>
					<div class="post-content" id="<?= $i ?>">
						<?= $postCategory ?>
						<?= $postTitle[0] ?>
					</div>
			<?php
				endfor;
			} ?>
		</div>
	<?php endif; ?>
</section>