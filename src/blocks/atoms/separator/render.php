<?php
$randomComponentId = random_int(1, 10000);
?>

<div class="separator <?= $attributes["variant"] ?> separator-<?= $randomComponentId ?>">
    <style>
        .separator-<?= $randomComponentId ?> {
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }


        @media (min-width: 768px) {
            .separator-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>
    <hr>
</div>