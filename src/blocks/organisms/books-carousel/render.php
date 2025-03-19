<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "books-carousel {$attributes['variant']} books-carousel-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .books-carousel-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .books-carousel-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="container">
        <?= $content ?>
    </div>
</div>