<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$paddingMob = $attributes["paddingSize"]["mob"];
$paddingDesk = $attributes["paddingSize"]["desk"];
$classes = "{$attributes["containerSize"]} {$attributes["extraClass"]} container-{$randomComponentId} ";
?>

<div class="<?= $classes ?>">
    <style>
    .container-<?=$randomComponentId ?> {
        padding-top: <?=$paddingMob["top"] ?>px;
        padding-bottom: <?=$paddingMob["bottom"] ?>px;
    }

    @media (min-width: 768px) {
        .container-<?=$randomComponentId ?> {
            padding-top: <?=$paddingDesk["top"] ?>px;
            padding-bottom: <?=$paddingDesk["bottom"] ?>px;
        }
    }
    </style>

    <?= $content ?>
</div>