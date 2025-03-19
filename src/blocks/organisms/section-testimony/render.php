<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<div class="section-testimony <?= $attributes["variant"] ?> section-testimony-<?= $randomComponentId ?>">
    <style>
        .section-testimony-<?= $randomComponentId ?> {
            background: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px
        }

        @media (min-width: 768px) {
            .section-testimony-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px
            }
        }
    </style>

    <?= $content ?>
</div>