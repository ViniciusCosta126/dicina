<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "news-journey-slider {$attributes['variant']} news-journey-slider-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
    .news-journey-slider-<?=$randomComponentId ?> {
        background-color: <?=$attributes["bgColor"] ?>;
        margin-bottom: <?=$attributes["marginM"] ?>px;
    }

    @media (min-width: 768px) {
        .news-journey-slider-<?=$randomComponentId ?> {
            margin-bottom: <?=$attributes["marginD"] ?>px;
        }
    }
    </style>
    <div class="container large-on-desk">
        <h2 class='news__content__title__container'>
            <p class='news__content__upper__title'><?= $attributes["upperTitle"] ?></p>
            <p class='news__content__title'><?= $attributes["title"] ?></p>
        </h2>
    </div>
    <?= $content ?>
</div>