<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$featuredImage = $attributes['post']['featuredImage'];
?>

<div class="most-read-post-card <?= $attributes["variant"] ?> most-read-post-card-<?= $randomComponentId ?>">
    <style>
        .most-read-post-card-<?= $randomComponentId ?> {
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .most-read-post-card-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

	<a href="<?= $attributes['post']['link'] ?>" class="most-read-post-card__img">
		<img src="<?= $featuredImage["src"] ?>" alt="<?= $featuredImage['alt'] ?>" width="<?= $featuredImage['width'] ?>" height="<?= $featuredImage['height'] ?>" />
	</a>
	<div class="most-read-post-card__content">
		<strong class="most-read-post-card__category"><a href="<?= $attributes['category']['link'] ?>"><?= $attributes['category']['name'] ?></a></strong>
		<div class="most-read-post-card__wrapper-title">
			<h3 class='most-read-post-card__title'><a href="<?= $attributes['post']['link'] ?>"><?= $attributes['post']['title'] ?></a></h3>
		</div>
	</div>
</div>
