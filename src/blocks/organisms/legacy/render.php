<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<section class="legacy <?= $attributes["variant"] ?> legacy-<?= $randomComponentId ?>">
	<div class="legacy__hero" style="background: url(<?= $attributes['bgImage']['src'] ?>) no-repeat center	top; background-size: cover">
		<h3 class="legacy__title"><?= $attributes["title"] ?> <br /><span class="senna-sans"><?= $attributes["titleFontSenna"] ?></span></h3>
	</div>
	<div class="container">
		<div class="legacy__content">
			<p class="legacy__content__paragraph"><?= $attributes["content"] ?></p>
			<div class="link">
				<?= $content ?>
			</div>
		</div>

	</div>
</section>