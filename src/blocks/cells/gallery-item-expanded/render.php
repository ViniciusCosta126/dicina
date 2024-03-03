<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$image = $attributes['image'];

$classes = "gallery-item-expanded {$attributes['variant']} gallery-item-expanded-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .gallery-item-expanded-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .gallery-item-expanded-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <figure class="gallery-item-expanded--image">
        <img src="<?= $image["src"]; ?>" alt="<?= $image["alt"]; ?>" height="<?= $image["height"]; ?>" width="<?= $image["width"]; ?>" />

        <?= $content ?>
    </figure>
</div>