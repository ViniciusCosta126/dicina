<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$image = $attributes['productImage'];
$imageCover = $attributes['productImageCover'] ? 'cover' : '';
?>

<div class="product-item <?= $attributes["variant"] ?> product-item-<?= $randomComponentId ?>">
    <style>
        .product-item-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        .product-item-<?= $randomComponentId ?>.in-top .product-item-content::after {
            background: linear-gradient(to bottom, <?= $attributes["bgColor"] ?> 40%, transparent 100%);
        }

        @media (min-width: 768px) {
            .product-item-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="product-item-wrapper">
        <div class="img-wrapper <?= $imageCover ?>">
            <img src="<?= $image['src'] ?>" loading="lazy" alt="<?= $image['alt'] ?>" width="<?= $image['width'] ?>" height="<?= $image['height'] ?>" />
        </div>

        <div class="product-item-content">
            <?= $content ?>
        </div>
    </div>
</div>