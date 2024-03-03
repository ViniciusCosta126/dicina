<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "brand-big-numbers {$attributes['variant']} brand-big-numbers-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .brand-big-numbers-<?= $randomComponentId ?> {
            background: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .brand-big-numbers-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <?= $content ?>
</div>