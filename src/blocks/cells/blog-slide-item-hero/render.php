<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$bgImageMobile = $attributes["bgImageMobile"];
$bgImage = $attributes["bgImage"];
$postLink = $attributes["postLink"];
?>

<div class="blog-slide-item-hero <?= $attributes['variant'] ?> blog-slide-item-hero-<?= $randomComponentId ?>">
    <style>
        .slide-item-<?= $randomComponentId ?> {
            background-color: <?= $attributes['bgColor'] ?>;
            margin-bottom: <?= $attributes['marginM'] ?>px;
        }

        @media (min-width: 768px) {
            .slide-item-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes['marginD'] ?>px;
            }
        }
    </style>

    <a href="<?= $postLink ?>">
        <?php if ($bgImage['src']) : ?>
            <picture class="slide-item--image">
                <source srcset="<?= $bgImage['src'] ? $bgImage['src'] : $bgImageMobile['src'] ?>" media=" (min-width: 768px)" />
                <img src="<?= $bgImageMobile['src'] ?>" alt="<?= $bgImageMobile['alt'] ?>" />
            </picture>
        <?php endif; ?>
    </a>

    <div class="container">
        <div class="slide-item--text-box">
            <?= $content ?>
        </div>
    </div>
</div>