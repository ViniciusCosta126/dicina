<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "gallery-carousel {$attributes['variant']} gallery-carousel-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .gallery-carousel-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .gallery-carousel-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <?= $content ?>
</div>