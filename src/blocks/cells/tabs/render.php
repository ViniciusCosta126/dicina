<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$isMobileClass = wp_is_mobile() ? 'is-mobile' : '';
$autoHeight = $attributes['autoHeight'] === true ? "data-autoheight='true'" :  "data-autoheight='trufalse'";
$classes = "tabs {$attributes['variant']} {$isMobileClass} tabs-{$randomComponentId}";
?>

<div class="<?= $classes; ?>" <?= $autoHeight; ?>>
    <style>
        .tabs-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .tabs-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <?= $content ?>
</div>