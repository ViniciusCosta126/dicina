<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<section class="news-slider news-slider-<?= $randomComponentId ?>">
    <style>
        .news-slider-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
        }
    </style>
    <h2 class='news__content__title__container'>
        <p class='news__content__upper__title'><?= $attributes["upperTitle"] ?></p>
        <p class='news__content__title'><?= $attributes["title"] ?></p>
    </h2>			
    <?= $content ?>
    <a href='#newsletter' class='news__content__link__content'>
        <p class='news__content__link'><?= $attributes["link"] ?></p>
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0953 0.90469L12.5321 0.904689L12.5321 17.6142L20.0166 10.1297L21.7572 11.8703L11.3137 22.3137L0.870307 11.8703L2.61088 10.1297L10.0953 17.6142L10.0953 0.90469Z" fill="white"/></svg>
    </a>
</section>