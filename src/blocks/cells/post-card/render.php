<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$hasImage = isset($attributes["hasImage"]) ? $attributes["hasImage"] : true;
$hasImageClass = $hasImage ? "with-image" : "";

$classes = "{$attributes['variant']} {$hasImageClass} {$attributes["widthCard"]} post-card-$randomComponentId";
?>

<div class="post-card <?= $classes ?>" data-size="<?= $attributes["widthCard"] ?>">
	<style>
		.post-card-<?= $randomComponentId ?> {
			margin-bottom: <?= $attributes["marginM"] ?>px;
		}

		@media (min-width: 768px) {
			.post-card-<?= $randomComponentId ?> {
				margin-bottom: <?= $attributes["marginD"] ?>px;
			}
		}
	</style>

	<?php if ($hasImage) : ?>
		<a href="<?= $attributes["link"] ?>" class="post-card__img">
			<?php if ($attributes["cardImg"]["src"]) : ?>
				<img src="<?= $attributes["cardImg"]["src"] ?>" alt="<?= $attributes["cardImg"]["alt"] ?>" width="<?= $attributes["cardImg"]["width"] ?>" height="<?= $attributes["cardImg"]["height"] ?>">
			<?php endif; ?>
		</a>
	<?php endif; ?>

	<div class="post-card__content">
		<div class="post-card__content__info">
			<a href="<?= $attributes["category"]["url"] ?>" class="post-card__category"><?= $attributes["category"]["label"] ?></a>
			<div class="post-card__date"><?= $attributes["date"] ?></div>
		</div>
		<a href="<?= $attributes["link"] ?>" class="title-wrapper">
			<<?= $attributes['titleTag'] ?> class="post-card__title"><?= $attributes["title"] ?></<?= $attributes['titleTag'] ?>>
		</a>
	</div>
</div>