<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

// dd($attributes);

$classes = "gallery-mosaic {$attributes['variant']} gallery-mosaic-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .gallery-mosaic-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .gallery-mosaic-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="gallery-mosaic-content">
        <?= $content ?>
    </div>
</div>