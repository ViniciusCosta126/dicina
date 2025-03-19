<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$image1 = $attributes["image1"];
$image2 = $attributes["image2"];

$width1 = array_key_exists("width", $image1) ?? 'width="' . $image1['width'] . '"';
$height1 = array_key_exists("height", $image1) ?? 'height="' . $image1['height'] . '"';
$width2 =   array_key_exists("width", $image2) ?? 'width="' . $image2['width'] . '"';
$height2 =  array_key_exists("height", $image2) ?? 'height="' . $image2['height'] . '"';
// dd($attributes);

?>

<div class="product-item <?= $attributes['variant'] ?> product-<?= $randomComponentId ?> <?= $attributes['className'] ?>">
    <img loading="lazy" src="<?= $image1['src'] ?>" alt="<?= $image1['alt'] ? $image1['alt'] : "" ?>" <?= $width1 ?> <?= $height1 ?> class="products__carousel__card__img" />
    <img loading="lazy" src="<?= $image2['src'] ?>" alt="<?= $image2['alt'] ? $image2['alt'] : "" ?>" <?= $width2 ?> <?= $height2 ?> class="products__carousel__card__img--hover" />

    <div class="products__carousel__card__content">
        <p class="products__carousel__card__text1"><?= $attributes['category'] ?></p>
        <p class="products__carousel__card__text2"><?= $attributes['product'] ?></p>

        <?= $content ?>
    </div>
    <span class=overlay></span>
</div>
