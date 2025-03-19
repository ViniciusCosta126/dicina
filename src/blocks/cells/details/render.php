<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$activeClass = $attributes['isActive'] ? 'active' : '';
$classes = "details {$attributes['variant']} {$activeClass} details-{$randomComponentId}";
?>

<div class="<?= $classes; ?>" data-id="<?php $attributes['id'] ?>">
    <style>
        .details-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .details-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <?= $content ?>
</div>