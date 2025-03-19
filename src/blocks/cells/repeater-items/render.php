<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<div class="repeater-items <?= $attributes["variant"] ?> repeater-items-<?= $randomComponentId ?>">
    <style>
        <?php if ($attributes["bgColor"]) {
            echo ".repeater-items {
                    background-color:" . $attributes['bgColor'] . ";
                }";
        }; ?>.repeater-items-<?= $randomComponentId ?> {
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .repeater-items-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="repeater-items-content">
        <?= $content ?>
    </div>
</div>
