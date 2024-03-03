<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "testimony-of-personalities {$attributes['variant']} testimony-of-personalities-{$randomComponentId} left";
$imageMobile = $attributes["bgImageMobile"];
$imageDesk = $attributes["bgImageDesk"];
?>

<div class="<?= $classes; ?>">
    <style>
        .testimony-of-personalities-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .testimony-of-personalities-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <?= $content ?>
</div>