<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$amount = $attributes["amount"];
$classes = "mosaic {$attributes['variant']} mosaic-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .mosaic-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .mosaic-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="mosaic-content mosaic-content-<?= $amount ?>">
        <?= $content ?>
    </div>
</div>