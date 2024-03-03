<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$indexId = $attributes['indexId'];
$modalId = $attributes['modalId'];
$image = $attributes["image"];

$classes = "mosaic-item {$attributes['variant']} open-modal mosaic-item-{$randomComponentId}";
?>

<button class="<?= $classes; ?>" data-id="<?= $modalId ?>" data-indexID="<?= $indexId ?>">
    <style>
        .mosaic-item-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
        }
    </style>

    <img class src="<?= $image["src"]; ?>" alt="<?= $image["alt"]; ?>" height="<?= $image["height"]; ?>" width="<?= $image["width"]; ?>" />
</button>