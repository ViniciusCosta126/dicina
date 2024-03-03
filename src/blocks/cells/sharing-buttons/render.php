<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<div class="sharing-buttons <?= $attributes["variant"] ?> sharing-buttons-<?= $randomComponentId ?>">
    <style>
        .sharing-buttons-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .sharing-buttons-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <?= $content ?>
</div>