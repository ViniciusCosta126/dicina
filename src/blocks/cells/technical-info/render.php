<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "technical-info {$attributes['variant']} technical-info-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
    .technical-info-<?=$randomComponentId ?> {
        background-color: <?=$attributes["bgColor"] ?>;
        margin-bottom: <?=$attributes["marginM"] ?>px;
    }

    @media (min-width: 768px) {
        .technical-info-<?=$randomComponentId ?> {
            margin-bottom: <?=$attributes["marginD"] ?>px;
        }
    }
    </style>

    <?= $content ?>
</div>
