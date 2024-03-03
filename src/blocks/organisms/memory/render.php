<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "memory memory-parent {$attributes['variant']} memory-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .memory-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
        }
    </style>

    <div class="container">
        <?= $content ?>
    </div>

    <div class="request-content"></div>
</div>