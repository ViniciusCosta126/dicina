<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "news-card-legacy {$attributes['variant']} news-card-legacy-{$randomComponentId}";
$imageDesk = $attributes['cardImgD'];
$imageMobile = $attributes['cardImgM'];
?>

<div class="<?= $classes; ?>">
    <style>
    .news-card-legacy-<?=$randomComponentId ?> {
        background-color: <?=$attributes["bgColor"] ?>;
        margin-bottom: <?=$attributes["marginM"] ?>px;
    }

    @media (min-width: 768px) {
        .news-card-legacy-<?=$randomComponentId ?> {
            margin-bottom: <?=$attributes["marginD"] ?>px;
        }
    }
    </style>
    <picture class="container-image">
        <source srcset="<?= $imageDesk["src"] ?>" media="(min-width: 1024px)" />
        <img src="<?= $imageMobile["src"]; ?>" alt="<?= $imageMobile["alt"]; ?>" />
    </picture>

    <?= $content ?>
</div>