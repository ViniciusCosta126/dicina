<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$imageMobile = $attributes["imageMobile"];
$image = $attributes["image"];
$bookLink = $attributes["bookLink"];
$classes = "book-for-carousel {$attributes['variant']} book-for-carousel-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .book-for-carousel-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .book-for-carousel-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <a href="<?= $bookLink ?>" target="_blank" rel="noopener noreferrer">
        <?php if ($image['src']) : ?>
            <picture class="slide-item--image">
                <source srcset="<?= $image['src'] ? $image['src'] : $imageMobile['src'] ?>" media=" (min-width: 768px)" />
                <img src="<?= $imageMobile['src'] ?>" alt="<?= $imageMobile['alt'] ?>" />
            </picture>
        <?php endif; ?>

        <?= $content ?>
    </a>
</div>