<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$language = 'isPortuguese';

?>

<section class="hero404 <?= $language ?> hero404-<?= $randomComponentId ?>">
	<div class="container">
		<div class="text-wrapper">
			<?= $content ?>
		</div>
	</div>

	<div class="img-wrapper">
		<picture>
			<source media="(min-width:2000px)" srcset=<?= $attributes["image4k"]["src"] ?> alt="" />
			<source media="(min-width:1024px)" srcset="<?= $attributes["imageDesk"]["src"] ?>" />
			<img src="<?= $attributes["image"]["src"] ?>" alt="olhar-senna" class="img" />
		</picture>
	</div>
</section>