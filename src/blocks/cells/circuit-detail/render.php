<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$circuitImage = $attributes["circuitImage"];
$hasImage = $circuitImage !== null ? true : false;

$classes = "circuit-detail {$attributes['variant']} {$attributes['position']} circuit-detail-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .circuit-detail-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .circuit-detail-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <?php if ($hasImage) : ?>
        <img class="circuit-detail-image" src="<?= $circuitImage["src"]; ?>" alt="<?= $circuitImage["alt"]; ?>" height="<?= $circuitImage["height"]; ?>" width="<?= $circuitImage["width"]; ?>" />
    <?php endif; ?>

    <div class="circuit-detail-wrapper">
        <?= $content ?>
    </div>
</div>