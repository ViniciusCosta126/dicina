<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "scrollable-list {$attributes['variant']} scrollable-list-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .scrollable-list-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .scrollable-list-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="scrollable-list-content">
        <?= $content ?>
    </div>
</div>