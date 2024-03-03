<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<div class="product-list <?= $attributes["variant"] ?> product-list-<?= $randomComponentId ?>">
    <style>
        .product-list-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .product-list-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <?= $content ?>
</div>