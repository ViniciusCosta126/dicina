<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$variant = $attributes['variant'];
$activeClass = $attributes['isActive'] ? 'active' : '';
$id = $attributes['id'];
$classes = "tabs-item {$attributes['variant']} {$activeClass} tabs-item-{$randomComponentId}";
?>

<div class="<?= $classes; ?>" data-id="<?= $id; ?>">
    <style>
        .tabs-item-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
        }
    </style>

    <?php if ($variant === "button-tab") : ?>
        <?= $content ?>
    <?php elseif ($variant === "content-tab") : ?>
        <?= $content ?>
    <?php endif; ?>
</div>